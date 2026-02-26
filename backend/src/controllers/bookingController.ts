import mongoose from 'mongoose'
import escapeStringRegexp from 'escape-string-regexp'
import { Expo, ExpoPushMessage, ExpoPushTicket } from 'expo-server-sdk'
import { Request, Response } from 'express'
import nodemailer from 'nodemailer'
import * as movininTypes from ':movinin-types'
import i18n from '../lang/i18n'
import Booking from '../models/Booking'
import User from '../models/User'
import Token from '../models/Token'
import Property from '../models/Property'
import Notification from '../models/Notification'
import NotificationCounter from '../models/NotificationCounter'
import PushToken from '../models/PushToken'
import Location from '../models/Location'
import * as env from '../config/env.config'
import * as mailHelper from '../utils/mailHelper'
import * as helper from '../utils/helper'
import * as logger from '../utils/logger'
import stripeAPI from '../payment/stripe'

/**
 * Create a Booking.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const create = async (req: Request, res: Response) => {
  try {
    const { body }: { body: movininTypes.Booking } = req
    const booking = new Booking(body)

    await booking.save()
    res.json(booking)
  } catch (err) {
    logger.error(`[booking.create] ${i18n.t('ERROR')} ${JSON.stringify(req.body)}`, err)
    res.status(400).send(i18n.t('ERROR') + err)
  }
}

/**
 * Notify a agency or admin.
 *
 * @async
 * @param {env.User} renter
 * @param {string} bookingId
 * @param {env.User} user
 * @param {boolean} notificationMessage
 * @returns {void}
 */
export const notify = async (renter: env.User, bookingId: string, user: env.User, notificationMessage: string) => {
  i18n.locale = user.language

  // notification
  const message = `${renter.fullName} ${notificationMessage} ${bookingId}.`
  const notification = new Notification({
    user: user._id,
    message,
    booking: bookingId,
  })

  await notification.save()
  let counter = await NotificationCounter.findOne({ user: user._id })
  if (counter && typeof counter.count !== 'undefined') {
    counter.count += 1
    await counter.save()
  } else {
    counter = new NotificationCounter({ user: user._id, count: 1 })
    await counter.save()
  }

  // mail
  if (user.enableEmailNotifications) {
    const mailOptions: nodemailer.SendMailOptions = {
      from: env.SMTP_FROM,
      to: user.email,
      subject: message,
      html: `<p>
    ${i18n.t('HELLO')}${user.fullName},<br><br>
    ${message}<br><br>
    ${helper.joinURL(env.ADMIN_HOST, `update-booking?b=${bookingId}`)}<br><br>
    ${i18n.t('REGARDS')}<br>
    </p>`,
    }

    await mailHelper.sendMail(mailOptions)
  }
}

/**
 * Send checkout confirmation email to renter.
 *
 * @async
 * @param {env.User} user
 * @param {env.Booking} booking
 * @param {boolean} payLater
 * @returns {unknown}
 */
export const confirm = async (user: env.User, booking: env.Booking, payLater: boolean) => {
  const { language } = user
  const locale = language === 'fr' ? 'fr-FR' : 'en-US'
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'long',
    year: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: env.TIMEZONE,
  }
  const from = booking.from.toLocaleString(locale, options)
  const to = booking.to.toLocaleString(locale, options)
  const property = await Property.findById(booking.property).populate<{ agency: env.User }>('agency')

  if (!property) {
    logger.info(`Property ${booking.property} not found`)
    return false
  }

  const location = await Location.findById(booking.location).populate<{ values: env.LocationValue[] }>('values')
  if (!location) {
    logger.info(`Location ${booking.location} not found`)
    return false
  }

  const mailOptions: nodemailer.SendMailOptions = {
    from: env.SMTP_FROM,
    to: user.email,
    subject: `${i18n.t('BOOKING_CONFIRMED_SUBJECT_PART1')} ${booking._id} ${i18n.t('BOOKING_CONFIRMED_SUBJECT_PART2')}`,
    html:
      `<p>${i18n.t('HELLO')}${user.fullName},<br><br>
        ${!payLater ? `${i18n.t('BOOKING_CONFIRMED_PART1')} ${booking._id} ${i18n.t('BOOKING_CONFIRMED_PART2')}`
        + '<br><br>' : ''}
        ${i18n.t('BOOKING_CONFIRMED_PART3')}${property.agency.fullName}${i18n.t('BOOKING_CONFIRMED_PART4')}${i18n.t('BOOKING_CONFIRMED_PART5')}`
      + `${from} ${i18n.t('BOOKING_CONFIRMED_PART6')}`
      + `${property.name}${i18n.t('BOOKING_CONFIRMED_PART7')}`
      + `${((property.address && (`<br><br>${i18n.t('BOOKING_CONFIRMED_ADDRESS')}${property.address}`)) || '')}`
      + `${((property.latitude && property.longitude && (`<br><br>${i18n.t('BOOKING_CONFIRMED_MAP_PART1')}<a href='https://maps.google.com/?q=${property.latitude},${property.longitude}'>${i18n.t('BOOKING_CONFIRMED_MAP_PART2')}</a>`)) || '')}`
      + `<br><br>${i18n.t('BOOKING_CONFIRMED_PART8')}<br><br>`
      + `${i18n.t('BOOKING_CONFIRMED_PART9')}${property.agency.fullName}${i18n.t('BOOKING_CONFIRMED_PART10')}${i18n.t('BOOKING_CONFIRMED_PART11')}`
      + `${to} ${i18n.t('BOOKING_CONFIRMED_PART12')}`
      + `<br><br>${i18n.t('BOOKING_CONFIRMED_PART13')}<br><br>${i18n.t('BOOKING_CONFIRMED_PART14')}${env.FRONTEND_HOST}<br><br>
        ${i18n.t('REGARDS')}<br></p>`,
  }
  await mailHelper.sendMail(mailOptions)

  return true
}

/**
 * Complete checkout process and create Booking.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const checkout = async (req: Request, res: Response) => {
  try {
    let user: env.User | null
    const { body }: { body: movininTypes.CheckoutPayload } = req
    const { renter } = body

    if (!body.booking) {
      throw new Error('Booking missing')
    }

    if (renter) {
      renter.verified = false
      renter.blacklisted = false

      user = new User(renter)
      await user.save()

      const token = new Token({ user: user._id, token: helper.generateToken() })
      await token.save()

      i18n.locale = user.language

      const mailOptions: nodemailer.SendMailOptions = {
        from: env.SMTP_FROM,
        to: user.email,
        subject: i18n.t('ACCOUNT_ACTIVATION_SUBJECT'),
        html: `<p>${i18n.t('HELLO')}${user.fullName},<br><br>
        ${i18n.t('ACCOUNT_ACTIVATION_LINK')}<br><br>
        ${helper.joinURL(env.FRONTEND_HOST, 'activate')}/?u=${encodeURIComponent(user._id.toString())}&e=${encodeURIComponent(user.email)}&t=${encodeURIComponent(token.token)}<br><br>
        ${i18n.t('REGARDS')}<br></p>`,
      }
      await mailHelper.sendMail(mailOptions)

      body.booking.renter = user._id.toString()
    } else {
      user = await User.findById(body.booking.renter)
    }

    if (!user) {
      logger.info('Renter not found', body)
      res.sendStatus(204)
      return
    }

    if (!body.payLater) {
      const { payPal, paymentIntentId, sessionId } = body

      if (!payPal && !paymentIntentId && !sessionId) {
        throw new Error('paymentIntentId and sessionId not found')
      }

      if (!payPal) {
        body.booking.customerId = body.customerId
      }

      if (paymentIntentId) {
        const paymentIntent = await stripeAPI.paymentIntents.retrieve(paymentIntentId)
        if (paymentIntent.status !== 'succeeded') {
          const message = `Payment failed: ${paymentIntent.status}`
          logger.error(message, body)
          res.status(400).send(message)
          return
        }

        body.booking.paymentIntentId = paymentIntentId
        body.booking.status = movininTypes.BookingStatus.Paid
      } else {
        //
        // Bookings created from checkout with Stripe are temporary
        // and are automatically deleted if the payment checkout session expires.
        //
        let expireAt = new Date()
        expireAt.setSeconds(expireAt.getSeconds() + env.BOOKING_EXPIRE_AT)

        body.booking.sessionId = !payPal ? body.sessionId : undefined
        body.booking.status = movininTypes.BookingStatus.Void
        body.booking.expireAt = expireAt

        //
        // Non verified and active users created from checkout with Stripe are temporary
        // and are automatically deleted if the payment checkout session expires.
        //
        if (!user.verified) {
          expireAt = new Date()
          expireAt.setSeconds(expireAt.getSeconds() + env.USER_EXPIRE_AT)

          user.expireAt = expireAt
          await user.save()
        }
      }
    }

    const { customerId } = body
    if (customerId) {
      user.customerId = customerId
      await user?.save()
    }

    const { language } = user
    i18n.locale = language

    const booking = new Booking(body.booking)

    await booking.save()

    if (body.payLater || (booking.status === movininTypes.BookingStatus.Paid && body.paymentIntentId && body.customerId)) {
      // Mark property as unavailable
      // if (env.MARK_PROPERTY_AS_UNAVAILABLE_ON_CHECKOUT) {
      //   await Property.updateOne({ _id: booking.property }, { available: false })
      // }

      // Send confirmation email
      if (!(await confirm(user, booking, body.payLater!))) {
        res.sendStatus(400)
        return
      }

      // Notify agency
      const agency = await User.findById(booking.agency)
      if (!agency) {
        logger.info(`Agency ${booking.agency} not found`)
        res.sendStatus(204)
        return
      }
      i18n.locale = agency.language
      let message = body.payLater ? i18n.t('BOOKING_PAY_LATER_NOTIFICATION') : i18n.t('BOOKING_PAID_NOTIFICATION')
      await notify(user, booking._id.toString(), agency, message)

      // Notify admin
      const admin = !!env.ADMIN_EMAIL && (await User.findOne({ email: env.ADMIN_EMAIL, type: movininTypes.UserType.Admin }))
      if (admin) {
        i18n.locale = admin.language
        message = body.payLater ? i18n.t('BOOKING_PAY_LATER_NOTIFICATION') : i18n.t('BOOKING_PAID_NOTIFICATION')
        await notify(user, booking._id.toString(), admin, message)
      }
    }

    res.status(200).send({ bookingId: booking._id })
  } catch (err) {
    logger.error(`[booking.checkout] ${i18n.t('ERROR')}`, err)
    res.status(400).send(i18n.t('ERROR') + err)
  }
}

/**
 * Notify customer and send push notification.
 *
 * @async
 * @param {env.Booking} booking
 * @returns {*}
 */
const notifyRenter = async (booking: env.Booking) => {
  const renter = await User.findById(booking.renter)

  if (!renter) {
    logger.info(`Renter ${booking.renter} not found`)
    return
  }

  i18n.locale = renter.language

  const message = `${i18n.t('BOOKING_UPDATED_NOTIFICATION_PART1')} ${booking._id} ${i18n.t('BOOKING_UPDATED_NOTIFICATION_PART2')}`
  const notification = new Notification({
    user: renter._id,
    message,
    booking: booking._id,
  })
  await notification.save()

  let counter = await NotificationCounter.findOne({ user: renter._id })
  if (counter && typeof counter.count !== 'undefined') {
    counter.count += 1
    await counter.save()
  } else {
    counter = new NotificationCounter({ user: renter._id, count: 1 })
    await counter.save()
  }

  // mail
  if (renter.enableEmailNotifications) {
    const mailOptions: nodemailer.SendMailOptions = {
      from: env.SMTP_FROM,
      to: renter.email,
      subject: message,
      html: `<p>${i18n.t('HELLO')}${renter.fullName},<br><br>
    ${message}<br><br>
    ${helper.joinURL(env.FRONTEND_HOST, `booking?b=${booking._id}`)}<br><br>
    ${i18n.t('REGARDS')}<br></p>`,
    }
    await mailHelper.sendMail(mailOptions)
  }

  // push notification
  const pushToken = await PushToken.findOne({ user: renter._id })
  if (pushToken) {
    const { token } = pushToken
    const expo = new Expo({ accessToken: env.EXPO_ACCESS_TOKEN, useFcmV1: true })

    if (!Expo.isExpoPushToken(token)) {
      logger.info(`Push token ${token} is not a valid Expo push token.`)
      return
    }

    const messages: ExpoPushMessage[] = [
      {
        to: token,
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
    const tickets: ExpoPushTicket[] = [];

    (async () => {
      // Send the chunks to the Expo push notification service. There are
      // different strategies you could use. A simple one is to send one chunk at a
      // time, which nicely spreads the load out over time:
      for (const chunk of chunks) {
        try {
          const ticketChunks = await expo.sendPushNotificationsAsync(chunk)

          tickets.push(...ticketChunks)

          // NOTE: If a ticket contains an error code in ticket.details.error, you
          // must handle it appropriately. The error codes are listed in the Expo
          // documentation:
          // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
          for (const ticketChunk of ticketChunks) {
            if (ticketChunk.status === 'ok') {
              logger.info(`Push notification sent: ${ticketChunk.id}`)
            } else {
              throw new Error(ticketChunk.message)
            }
          }
        } catch (error) {
          logger.error('Error while sending push notification', error)
        }
      }
    })()
  }
}

/**
 * Update Booking.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const update = async (req: Request, res: Response) => {
  try {
    const { body }: { body: movininTypes.Booking } = req
    if (!body._id) {
      throw new Error('body._id not found')
    }

    const booking = await Booking.findById(body._id)

    if (booking) {
      // begin of security check
      const sessionUserId = req.user?._id
      const sessionUser = await User.findById(sessionUserId)
      if (!sessionUser || sessionUser.type === movininTypes.UserType.User || (sessionUser.type === movininTypes.UserType.Agency && sessionUserId !== booking.agency?.toString())) {
        logger.error(`[booking.update] Unauthorized attempt to update booking ${booking._id.toString()} by user ${sessionUserId}`)
        res.status(403).send('Forbidden: You cannot update booking information')
        return
      }
      // end of security check

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
      } = body

      const previousStatus = booking.status

      booking.agency = new mongoose.Types.ObjectId(agency as string)
      booking.location = new mongoose.Types.ObjectId(location as string)
      booking.property = new mongoose.Types.ObjectId(property as string)
      booking.renter = new mongoose.Types.ObjectId(renter as string)
      booking.from = from
      booking.to = to
      booking.status = status
      booking.cancellation = cancellation
      booking.price = price as number

      await booking.save()

      if (previousStatus !== status) {
        // notify renter
        await notifyRenter(booking)
      }

      res.json(booking)
      return
    }

    logger.error('[booking.update] Booking not found:', body._id)
    res.sendStatus(204)
  } catch (err) {
    logger.error(`[booking.update] ${i18n.t('ERROR')} ${JSON.stringify(req.body)}`, err)
    res.status(400).send(i18n.t('ERROR') + err)
  }
}

/**
 * Update Booking Status.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const updateStatus = async (req: Request, res: Response) => {
  try {
    const { body }: { body: movininTypes.UpdateStatusPayload } = req
    const { ids: _ids, status } = body
    const ids = _ids.map((id) => new mongoose.Types.ObjectId(id))
    const bulk = Booking.collection.initializeOrderedBulkOp()
    const bookings = await Booking.find({ _id: { $in: ids } })

    bulk.find({ _id: { $in: ids } }).update({ $set: { status } })
    await bulk.execute()

    for (const booking of bookings) {
      if (booking.status !== status) {
        await notifyRenter(booking)
      }
    }

    res.sendStatus(200)
  } catch (err) {
    logger.error(`[booking.updateStatus] ${i18n.t('ERROR')} ${JSON.stringify(req.body)}`, err)
    res.status(400).send(i18n.t('ERROR') + err)
  }
}

/**
 * Delete Bookings.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const deleteBookings = async (req: Request, res: Response) => {
  try {
    const { body }: { body: string[] } = req
    const ids = body.map((id) => new mongoose.Types.ObjectId(id))

    const sessionUserId = req.user?._id
    const sessionUser = await User.findById(sessionUserId)

    let unauthorizedAttemptLogged = false
    for (const id of ids) {
      const booking = await Booking.findById(id)

      if (booking) {
        // begin of security check
        if (!sessionUser || sessionUser.type === movininTypes.UserType.User || (sessionUser.type === movininTypes.UserType.Agency && sessionUserId !== booking.agency?.toString())) {
          logger.error(`[booking.deleteBookings] Unauthorized attempt to delete booking ${booking._id.toString()} by user ${sessionUserId}`)
          unauthorizedAttemptLogged = true
          continue
        }
        // end of security check
        await booking.deleteOne()
      }
    }

    if (unauthorizedAttemptLogged) {
      res.status(403).send('Forbidden: You cannot delete some of the bookings')
      return
    }

    res.sendStatus(200)
  } catch (err) {
    logger.error(`[booking.deleteBookings] ${i18n.t('ERROR')} ${JSON.stringify(req.body)}`, err)
    res.status(400).send(i18n.t('ERROR') + err)
  }
}

/**
 * Delete temporary Booking created from checkout session.
 *
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const deleteTempBooking = async (req: Request, res: Response) => {
  const { bookingId, sessionId } = req.params

  try {
    const booking = await Booking.findOne({ _id: bookingId, sessionId, status: movininTypes.BookingStatus.Void, expireAt: { $ne: null } })
    if (booking) {
      const user = await User.findOne({ _id: booking.renter, verified: false, expireAt: { $ne: null } })
      await user?.deleteOne()
    }
    await booking?.deleteOne()
    res.sendStatus(200)
  } catch (err) {
    logger.error(`[booking.deleteTempBooking] ${i18n.t('ERROR')} ${JSON.stringify({ bookingId, sessionId })}`, err)
    res.status(400).send(i18n.t('ERROR') + err)
  }
}

/**
 * Get Booking by ID.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const getBooking = async (req: Request, res: Response) => {
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
      // begin of security check
      const sessionUserId = req.user?._id
      const sessionUser = await User.findById(sessionUserId)
      if (!sessionUser
        || (sessionUser.type === movininTypes.UserType.User && sessionUserId !== booking.renter._id?.toString())
        || (sessionUser.type === movininTypes.UserType.Agency && sessionUserId !== booking.agency._id?.toString())) {
        logger.error(`[booking.getBooking] Unauthorized attempt to get booking ${id} by user ${sessionUserId}`)
        res.status(403).send('Forbidden: You cannot get booking information')
        return
      }
      // end of security check

      const { language } = req.params

      booking.agency = {
        _id: booking.agency._id,
        fullName: booking.agency.fullName,
        avatar: booking.agency.avatar,
        payLater: booking.agency.payLater,
      }

      booking.property.agency = {
        _id: booking.property.agency._id,
        fullName: booking.property.agency.fullName,
        avatar: booking.property.agency.avatar,
        payLater: booking.property.agency.payLater,
      }

      booking.location.name = booking.location.values.filter((value) => value.language === language)[0].value
      res.json(booking)
      return
    }

    logger.error('[booking.getBooking] Booking not found:', id)
    res.sendStatus(204)
  } catch (err) {
    logger.error(`[booking.getBooking] ${i18n.t('ERROR')} ${id}`, err)
    res.status(400).send(i18n.t('ERROR') + err)
  }
}

/**
 * Get Booking by sessionId.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const getBookingId = async (req: Request, res: Response) => {
  const { sessionId } = req.params

  try {
    const booking = await Booking.findOne({ sessionId })

    if (!booking) {
      logger.error('[booking.getBookingId] Booking not found (sessionId):', sessionId)
      res.sendStatus(204)
      return
    }
    res.json(booking?._id.toString())
  } catch (err) {
    logger.error(`[booking.getBookingId] (sessionId) ${i18n.t('ERROR')} ${sessionId}`, err)
    res.status(400).send(i18n.t('ERROR') + err)
  }
}

/**
 * Get Bookings.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const getBookings = async (req: Request, res: Response) => {
  try {
    const { body }: { body: movininTypes.GetBookingsPayload } = req
    const page = Number.parseInt(req.params.page, 10)
    const size = Number.parseInt(req.params.size, 10)
    let agencies = body.agencies.map((id: string) => new mongoose.Types.ObjectId(id))
    const {
      statuses,
      user,
      property,
    } = body
    const location = (body.filter && body.filter.location) || null
    const from = (body.filter && body.filter.from && new Date(body.filter.from)) || null
    const dateBetween = (body.filter && body.filter.dateBetween && new Date(body.filter.dateBetween)) || null
    const to = (body.filter && body.filter.to && new Date(body.filter.to)) || null
    let keyword = (body.filter && body.filter.keyword) || ''
    const options = 'i'

    // begin of security check
    const sessionUserId = req.user?._id
    const sessionUser = await User.findById(sessionUserId)
    if (!sessionUser || sessionUser.type === movininTypes.UserType.User) {
      logger.error(`[booking.getBookings] Unauthorized attempt to get bookings by user ${sessionUserId}`)
      res.status(403).send('Forbidden: You cannot get booking information')
      return
    }
    if (sessionUser.type === movininTypes.UserType.Agency) {
      agencies = [new mongoose.Types.ObjectId(sessionUserId)]
    }
    // end of security check

    const $match: mongoose.QueryFilter<any> = {
      $and: [{ 'agency._id': { $in: agencies } }, { status: { $in: statuses } }, { expireAt: null }],
    }

    if (user) {
      $match.$and!.push({
        'renter._id': { $eq: new mongoose.Types.ObjectId(user) },
      })
    }
    if (property) {
      $match.$and!.push({
        'property._id': { $eq: new mongoose.Types.ObjectId(property) },
      })
    }
    if (location) {
      $match.$and!.push({ 'location._id': { $eq: new mongoose.Types.ObjectId(location) } })
    }
    if (from) {
      $match.$and!.push({ from: { $gte: from } })
    } // $from >= from

    if (dateBetween) {
      const dateBetweenStart = new Date(dateBetween)
      dateBetweenStart.setHours(0, 0, 0, 0)
      const dateBetweenEnd = new Date(dateBetween)
      dateBetweenEnd.setHours(23, 59, 59, 999)

      $match.$and!.push({
        $and: [
          { from: { $lte: dateBetweenEnd } },
          { to: { $gte: dateBetweenStart } },
        ],
      })
    } else if (from) {
      $match.$and!.push({ from: { $gte: from } }) // $from >= from
    }

    if (to) {
      $match.$and!.push({ to: { $lte: to } })
    } // $to <= to

    if (keyword) {
      const isObjectId = helper.isValidObjectId(keyword)
      if (isObjectId) {
        $match.$and!.push({
          _id: { $eq: new mongoose.Types.ObjectId(keyword) },
        })
      } else {
        keyword = escapeStringRegexp(keyword)
        $match.$and!.push({
          $or: [
            { 'agency.fullName': { $regex: keyword, $options: options } },
            { 'renter.fullName': { $regex: keyword, $options: options } },
            { 'property.name': { $regex: keyword, $options: options } },
            { 'location.name': { $regex: keyword, $options: options } },
          ],
        })
      }
    }

    const { language } = req.params

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
                        { $expr: { $eq: ['$language', language] } },
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
          resultData: [{ $sort: { createdAt: -1, _id: 1 } }, { $skip: (page - 1) * size }, { $limit: size }],
          pageInfo: [
            {
              $count: 'totalRecords',
            },
          ],
        },
      },
    ])

    const bookings: env.BookingInfo[] = data[0].resultData

    for (const booking of bookings) {
      const { _id, fullName, avatar } = booking.agency
      booking.agency = { _id, fullName, avatar }
    }

    res.json(data)
  } catch (err) {
    logger.error(`[booking.getBookings] ${i18n.t('ERROR')} ${JSON.stringify(req.body)}`, err)
    res.status(400).send(i18n.t('ERROR') + err)
  }
}

/**
 * Check if a customer has Bookings.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const hasBookings = async (req: Request, res: Response) => {
  const { renter } = req.params

  try {
    const count = await Booking
      .find({
        renter: new mongoose.Types.ObjectId(renter),
      })
      .limit(1)
      .countDocuments()

    if (count === 1) {
      res.sendStatus(200)
      return
    }

    res.sendStatus(204)
  } catch (err) {
    logger.error(`[booking.hasBookings] ${i18n.t('ERROR')} ${renter}`, err)
    res.status(400).send(i18n.t('ERROR') + err)
  }
}

/**
 * Cancel a Booking.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const cancelBooking = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const booking = await Booking
      .findOne({
        _id: new mongoose.Types.ObjectId(id),
      })
      .populate<{ agency: env.User }>('agency')
      .populate<{ renter: env.User }>('renter')

    if (booking && booking.cancellation && !booking.cancelRequest) {
      booking.cancelRequest = true
      await booking.save()

      // Notify agency
      const agency = await User.findById(booking.agency)
      if (!agency) {
        logger.info(`Agency ${booking.agency} not found`)
        res.sendStatus(204)
        return
      }
      i18n.locale = agency.language
      await notify(booking.renter, booking._id.toString().toString(), agency, i18n.t('CANCEL_BOOKING_NOTIFICATION'))

      // Notify admin
      const admin = !!env.ADMIN_EMAIL && (await User.findOne({ email: env.ADMIN_EMAIL, type: movininTypes.UserType.Admin }))
      if (admin) {
        i18n.locale = admin.language
        await notify(booking.renter, booking._id.toString().toString(), admin, i18n.t('CANCEL_BOOKING_NOTIFICATION'))
      }

      res.sendStatus(200)
      return
    }

    res.sendStatus(204)
  } catch (err) {
    logger.error(`[booking.cancelBooking] ${i18n.t('ERROR')} ${id}`, err)
    res.status(400).send(i18n.t('ERROR') + err)
  }
}
