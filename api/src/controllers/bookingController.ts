import mongoose from 'mongoose'
import escapeStringRegexp from 'escape-string-regexp'
import { v1 as uuid } from 'uuid'
import { Expo, ExpoPushMessage } from 'expo-server-sdk'
import { Request, Response } from 'express'
import strings from '../config/app.config'
import Booking from '../models/Booking'
import User from '../models/User'
import Token from '../models/Token'
import Property from '../models/Property'
import Notification from '../models/Notification'
import NotificationCounter from '../models/NotificationCounter'
import PushNotification from '../models/PushNotification'
import * as env from '../config/env.config'
import * as movininTypes from 'movinin-types'
import * as MailHelper from '../common/MailHelper'
import * as Helper from '../common/Helper'

export async function create(req: Request, res: Response) {
  try {
    const body: movininTypes.Booking = req.body
    const booking = new Booking(body)

    await booking.save()
    return res.json(booking)
  } catch (err) {
    console.error(`[booking.create]  ${strings.DB_ERROR} ${req.body}`, err)
    return res.status(400).send(strings.DB_ERROR + err)
  }
}

async function notifySupplier(user: env.User, bookingId: string, agency: env.User, notificationMessage: string) {
  // notification
  const message = `${user.fullName} ${notificationMessage} ${bookingId}.`
  const notification = new Notification({
    user: agency._id,
    message,
    booking: bookingId
  })

  await notification.save()
  let counter = await NotificationCounter.findOne({ user: agency._id })
  if (counter && typeof counter.count !== 'undefined') {
    counter.count++
    await counter.save()
  } else {
    counter = new NotificationCounter({ user: agency._id, count: 1 })
    await counter.save()
  }

  // mail
  strings.setLanguage(agency.language)

  const mailOptions = {
    from: env.SMTP_FROM,
    to: agency.email,
    subject: message,
    html: `<p>${strings.HELLO}${agency.fullName},<br><br>${message}<br><br>${Helper.joinURL(env.BACKEND_HOST, `booking?b=${bookingId}`)}<br><br>${strings.REGARDS}<br></p>`,
  }

  await MailHelper.sendMail(mailOptions)
}

export async function book(req: Request, res: Response) {
  try {
    let user: env.User | null
    const body: movininTypes.BookPayload = req.body
    const { renter } = body

    if (renter) {
      renter.verified = false
      renter.blacklisted = false

      user = new User(renter)
      await user.save()

      const token = new Token({ user: user._id, token: uuid() })
      await token.save()

      strings.setLanguage(user.language)

      const mailOptions = {
        from: env.SMTP_FROM,
        to: user.email,
        subject: strings.ACCOUNT_ACTIVATION_SUBJECT,
        html: `<p>${strings.HELLO}${user.fullName},<br><br>
        ${strings.ACCOUNT_ACTIVATION_LINK}<br><br>
        ${Helper.joinURL(env.FRONTEND_HOST, 'activate')}/?u=${encodeURIComponent(user._id.toString())}&e=${encodeURIComponent(user.email)}&t=${encodeURIComponent(token.token)}<br><br>
        ${strings.REGARDS}<br></p>`,
      }
      await MailHelper.sendMail(mailOptions)

      body.booking.renter = user._id.toString()
    } else {
      user = await User.findById(body.booking.renter)
    }

    if (!user) {
      console.log('Renter not found', body)
      return res.sendStatus(204)
    }

    let language = env.DEFAULT_LANGUAGE
    if (user.language) {
      language = user.language
      strings.setLanguage(user.language)
    }

    const booking = new Booking(body.booking)

    await booking.save()

    const locale = language === 'fr' ? 'fr-FR' : 'en-US'
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      month: 'long',
      year: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }
    const from = booking.from.toLocaleString(locale, options)
    const to = booking.to.toLocaleString(locale, options)
    const property = await Property.findById(booking.property).populate<{ agency: env.User }>('agency')

    if (!property) {
      console.log(`Property ${booking.property} not found`)
      return res.sendStatus(204)
    }

    const mailOptions = {
      from: env.SMTP_FROM,
      to: user.email,
      subject: `${strings.BOOKING_CONFIRMED_SUBJECT_PART1} ${booking._id} ${strings.BOOKING_CONFIRMED_SUBJECT_PART2}`,
      html:
        `<p>${strings.HELLO}${user.fullName},<br><br>
        ${!req.body.payLater ? `${strings.BOOKING_CONFIRMED_PART1} ${booking._id} ${strings.BOOKING_CONFIRMED_PART2}` + '<br><br>' : ''}
        ${strings.BOOKING_CONFIRMED_PART3}${property.agency.fullName}${strings.BOOKING_CONFIRMED_PART4}${strings.BOOKING_CONFIRMED_PART5}` +
        `${from} ${strings.BOOKING_CONFIRMED_PART6}` +
        `${property.name}${strings.BOOKING_CONFIRMED_PART7}` +
        `<br><br>${strings.BOOKING_CONFIRMED_PART8}<br><br>` +
        `${strings.BOOKING_CONFIRMED_PART9}${property.agency.fullName}${strings.BOOKING_CONFIRMED_PART10}${strings.BOOKING_CONFIRMED_PART11}` +
        `${to} ${strings.BOOKING_CONFIRMED_PART12}` +
        `<br><br>${strings.BOOKING_CONFIRMED_PART13}<br><br>${strings.BOOKING_CONFIRMED_PART14}${env.FRONTEND_HOST}<br><br>
        ${strings.REGARDS}<br></p>`,
    }
    await MailHelper.sendMail(mailOptions)

    // Notify agency
    const agency = await User.findById(booking.agency)
    if (!agency) {
      console.log(`Agency ${booking.agency} not found`)
      return res.sendStatus(204)
    }
    if (agency.language) {
      strings.setLanguage(agency.language)
    }
    await notifySupplier(user, booking._id.toString(), agency, strings.BOOKING_NOTIFICATION)

    return res.sendStatus(200)
  } catch (err) {
    console.error(`[booking.book]  ${strings.ERROR}`, err)
    return res.status(400).send(strings.ERROR + err)
  }
}

async function notifyDriver(booking: env.Booking) {
  const renter = await User.findById(booking.renter)
  if (!renter) {
    console.log(`Renter ${booking.renter} not found`)
    return
  }
  if (renter.language) {
    strings.setLanguage(renter.language)
  }

  const message = `${strings.BOOKING_UPDATED_NOTIFICATION_PART1} ${booking._id} ${strings.BOOKING_UPDATED_NOTIFICATION_PART2}`
  const notification = new Notification({
    user: renter._id,
    message,
    booking: booking._id,
  })
  await notification.save()

  let counter = await NotificationCounter.findOne({ user: renter._id })
  if (counter && typeof counter.count !== 'undefined') {
    counter.count++
    await counter.save()
  } else {
    counter = new NotificationCounter({ user: renter._id, count: 1 })
    await counter.save()
  }

  // mail
  const mailOptions = {
    from: env.SMTP_FROM,
    to: renter.email,
    subject: message,
    html: `<p>${strings.HELLO}${renter.fullName},<br><br>
    ${message}<br><br>
    ${Helper.joinURL(env.FRONTEND_HOST, `booking?b=${booking._id}`)}<br><br>
    ${strings.REGARDS}<br></p>`,
  }
  await MailHelper.sendMail(mailOptions)

  // push notification
  const pushNotification = await PushNotification.findOne({ user: renter._id })
  if (pushNotification) {
    const pushToken = pushNotification.token
    const expo = new Expo({ accessToken: env.EXPO_ACCESS_TOKEN })

    if (!Expo.isExpoPushToken(pushToken)) {
      console.log(`Push token ${pushToken} is not a valid Expo push token.`)
      return
    }

    const messages: ExpoPushMessage[] = [
      {
        to: pushToken,
        sound: 'default',
        body: message,
        data: {
          user: renter._id,
          notification: notification._id,
          booking: booking._id,
        },
      },
    ]

    // The Expo push notification service accepts batches of notifications so
    // that you don't need to send 1000 requests to send 1000 notifications. We
    // recommend you batch your notifications to reduce the number of requests
    // and to compress them (notifications with similar content will get
    // compressed).
    const chunks = expo.chunkPushNotifications(messages)
    const tickets = [];

    (async () => {
      // Send the chunks to the Expo push notification service. There are
      // different strategies you could use. A simple one is to send one chunk at a
      // time, which nicely spreads the load out over time:
      for (const chunk of chunks) {
        try {
          const ticketChunk = await expo.sendPushNotificationsAsync(chunk)

          tickets.push(...ticketChunk)
          // NOTE: If a ticket contains an error code in ticket.details.error, you
          // must handle it appropriately. The error codes are listed in the Expo
          // documentation:
          // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
        } catch (error) {
          console.error(error)
        }
      }
    })()
  }
}

export async function update(req: Request, res: Response) {
  try {
    const body: movininTypes.Booking = req.body
    const booking = await Booking.findById(body._id)

    if (booking) {
      const {
        agency,
        location,
        property,
        renter,
        from,
        to,
        status,
        cancellation,
        price,
      } = req.body

      const previousStatus = booking.status

      booking.agency = agency
      booking.location = location
      booking.property = property
      booking.renter = renter
      booking.from = from
      booking.to = to
      booking.status = status
      booking.cancellation = cancellation
      booking.price = price

      await booking.save()

      if (previousStatus !== status) {
        // notify renter
        await notifyDriver(booking)
      }

      return res.sendStatus(200)
    } else {
      console.error('[booking.update] Booking not found:', req.body._id)
      return res.sendStatus(204)
    }
  } catch (err) {
    console.error(`[booking.update]  ${strings.DB_ERROR} ${req.body}`, err)
    return res.status(400).send(strings.DB_ERROR + err)
  }
}

export async function updateStatus(req: Request, res: Response) {
  try {
    const body: movininTypes.UpdateStatusPayload = req.body
    const { ids: _ids, status } = body
    const ids = _ids.map((id) => new mongoose.Types.ObjectId(id))
    const bulk = Booking.collection.initializeOrderedBulkOp()
    const bookings = await Booking.find({ _id: { $in: ids } })

    bulk.find({ _id: { $in: ids } }).update({ $set: { status } })
    await bulk.execute()
    bookings.forEach(async (booking) => {
      if (booking.status !== status) {
        await notifyDriver(booking)
      }
    })

    return res.sendStatus(200)
  } catch (err) {
    console.error(`[booking.updateStatus]  ${strings.DB_ERROR} ${req.body}`, err)
    return res.status(400).send(strings.DB_ERROR + err)
  }
}

export async function deleteBookings(req: Request, res: Response) {
  try {
    const body: string[] = req.body
    const ids = body.map((id) => new mongoose.Types.ObjectId(id))

    await Booking.deleteMany({ _id: { $in: ids } })

    return res.sendStatus(200)
  } catch (err) {
    console.error(`[booking.deleteBookings]  ${strings.DB_ERROR} ${req.body}`, err)
    return res.status(400).send(strings.DB_ERROR + err)
  }
}

export async function getBooking(req: Request, res: Response) {
  const { id } = req.params

  try {
    const booking = await Booking.findById(id)
      .populate<{ agency: env.UserInfo }>('agency')
      .populate<{ location: env.LocationInfo }>({
        path: 'location',
        populate: {
          path: 'values',
          model: 'LocationValue',
        },
      })
      .populate<{ property: env.PropertyInfo }>({
        path: 'property',
        populate: {
          path: 'agency',
          model: 'User',
        },
      })
      .populate<{ renter: env.User }>('renter')
      .lean()

    if (booking) {
      const language = req.params.language

      if (booking.agency) {
        const { _id, fullName, avatar, payLater } = booking.agency
        booking.agency = { _id, fullName, avatar, payLater }
      }
      if (booking.property.agency) {
        const { _id, fullName, avatar, payLater } = booking.property.agency
        booking.property.agency = { _id, fullName, avatar, payLater }
      }
      booking.location.name = booking.location.values.filter((value) => value.language === language)[0].value
      return res.json(booking)
    } else {
      console.error('[booking.getBooking] Property not found:', id)
      return res.sendStatus(204)
    }
  } catch (err) {
    console.error(`[booking.getBooking]  ${strings.DB_ERROR} ${id}`, err)
    return res.status(400).send(strings.DB_ERROR + err)
  }
}

export async function getBookings(req: Request, res: Response) {
  try {
    const body: movininTypes.GetBookingsPayload = req.body
    const page = Number.parseInt(req.params.page) + 1
    const size = Number.parseInt(req.params.size)
    const agencies = body.agencies.map((id: string) => new mongoose.Types.ObjectId(id))
    const statuses = body.statuses
    const user = body.user
    const property = body.property
    const location = (body.filter && body.filter.location) || null
    const from = (body.filter && body.filter.from && new Date(body.filter.from)) || null
    const to = (body.filter && body.filter.to && new Date(body.filter.to)) || null
    let keyword = (body.filter && body.filter.keyword) || ''
    const options = 'i'
    const language = body.language

    const $match: mongoose.FilterQuery<any> = {
      $and: [{ 'agency._id': { $in: agencies } }, { status: { $in: statuses } }],
    }
    if ($match.$and) {
      if (user) {
        $match.$and.push({
          'renter._id': { $eq: new mongoose.Types.ObjectId(user) },
        })
      }
      if (property) {
        $match.$and.push({
          'property._id': { $eq: new mongoose.Types.ObjectId(property) },
        })
      }
      if (location) {
        $match.$and.push({ 'location._id': { $eq: new mongoose.Types.ObjectId(location) } })
      }
      if (from) {
        $match.$and.push({ from: { $gte: from } })
      } // $from > from
      if (to) {
        $match.$and.push({ to: { $lte: to } })
      } // $to < to
      if (keyword) {
        const isObjectId = mongoose.isValidObjectId(keyword)
        if (isObjectId) {
          $match.$and.push({
            _id: { $eq: new mongoose.Types.ObjectId(keyword) },
          })
        } else {
          keyword = escapeStringRegexp(keyword)
          $match.$and.push({
            $or: [
              { 'agency.fullName': { $regex: keyword, $options: options } },
              { 'renter.fullName': { $regex: keyword, $options: options } },
              { 'property.name': { $regex: keyword, $options: options } },
              { 'location.name': { $regex: keyword, $options: options } },
            ],
          })
        }
      }
    }
    console.log($match)
    const data = await Booking.aggregate([
      {
        $lookup: {
          from: 'User',
          let: { agencyId: '$agency' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$_id', '$$agencyId'] },
              },
            },
          ],
          as: 'agency',
        },
      },
      { $unwind: { path: '$agency', preserveNullAndEmptyArrays: false } },
      {
        $lookup: {
          from: 'Location',
          let: { locationId: '$location' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$_id', '$$locationId'] },
              },
            },
            {
              $lookup: {
                from: 'LocationValue',
                let: { values: '$values' },
                pipeline: [
                  {
                    $match: {
                      $and: [
                        { $expr: { $in: ['$_id', '$$values'] } },
                        { $expr: { $eq: ['$language', language] } }
                      ],
                    },
                  },
                ],
                as: 'value',
              },
            },
            { $unwind: { path: '$value', preserveNullAndEmptyArrays: false } },
            {
              $addFields: { name: '$value.value' },
            },
          ],
          as: 'location',
        },
      },
      { $unwind: { path: '$location', preserveNullAndEmptyArrays: false } },
      {
        $lookup: {
          from: 'Property',
          let: { propertyId: '$property' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$_id', '$$propertyId'] },
              },
            },
          ],
          as: 'property',
        },
      },
      { $unwind: { path: '$property', preserveNullAndEmptyArrays: false } },
      {
        $lookup: {
          from: 'User',
          let: { renterId: '$renter' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$_id', '$$renterId'] },
              },
            },
          ],
          as: 'renter',
        },
      },
      { $unwind: { path: '$renter', preserveNullAndEmptyArrays: false } },
      {
        $match,
      },
      {
        $facet: {
          resultData: [{ $sort: { createdAt: -1 } }, { $skip: (page - 1) * size }, { $limit: size }],
          pageInfo: [
            {
              $count: 'totalRecords',
            },
          ],
        },
      },
    ])

    if (data.length > 0) {
      const bookings: env.BookingInfo[] = data[0].resultData

      for (const booking of bookings) {
        const { _id, fullName, avatar } = booking.agency
        booking.agency = { _id, fullName, avatar }
      }
    }

    return res.json(data)
  } catch (err) {
    console.error(`[booking.getBookings] ${strings.DB_ERROR} ${req.body}`, err)
    return res.status(400).send(strings.DB_ERROR + err)
  }
}

export async function hasBookings(req: Request, res: Response) {
  const { renter } = req.params

  try {
    const count = await Booking.find({
      renter: new mongoose.Types.ObjectId(renter),
    })
      .limit(1)
      .count()

    if (count === 1) {
      return res.sendStatus(200)
    }

    return res.sendStatus(204)
  } catch (err) {
    console.error(`[booking.hasBookings] ${strings.DB_ERROR} ${renter}`, err)
    return res.status(400).send(strings.DB_ERROR + err)
  }
}

export async function cancelBooking(req: Request, res: Response) {
  const { id } = req.params

  try {
    const booking = await Booking.findOne({
      _id: new mongoose.Types.ObjectId(id),
    })
      .populate<{ agency: env.User }>('agency')
      .populate<{ renter: env.User }>('renter')

    if (booking && booking.cancellation && !booking.cancelRequest) {
      booking.cancelRequest = true
      await booking.save()

      // Notify supplier
      await notifySupplier(booking.renter, booking.id.toString(), booking.agency, strings.CANCEL_BOOKING_NOTIFICATION)

      return res.sendStatus(200)
    }

    return res.sendStatus(204)
  } catch (err) {
    console.error(`[booking.cancelBooking] ${strings.DB_ERROR} ${id}`, err)
    return res.status(400).send(strings.DB_ERROR + err)
  }
}
