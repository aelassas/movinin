import path from 'node:path'
import fs from 'node:fs/promises'
import process from 'node:process'
import escapeStringRegexp from 'escape-string-regexp'
import { Request, Response } from 'express'
import strings from '../config/app.config'
import * as Env from '../config/env.config'
import User from '../models/User'
import NotificationCounter from '../models/NotificationCounter'
import Notification from '../models/Notification'
import Booking from '../models/Booking'
import Property from '../models/Property'
import * as Helper from '../common/helper'
import * as MovininTypes from 'movinin-types'

const CDN: string = String(process.env.MI_CDN_USERS)
const CDN_PROPERTIES: string = String(process.env.MI_CDN_PROPERTIES)

export async function validate(req: Request, res: Response) {
  const fullName: string = req.body.fullName

  try {
    const keyword = escapeStringRegexp(fullName)
    const options = 'i'
    const user = await User.findOne({
      type: Env.UserType.Agency,
      fullName: { $regex: new RegExp(`^${keyword}$`), $options: options },
    })
    return user ? res.sendStatus(204) : res.sendStatus(200)
  } catch (err) {
    console.error(`[agency.validate] ${strings.DB_ERROR} ${fullName}`, err)
    return res.status(400).send(strings.DB_ERROR + err)
  }
}

export async function update(req: Request, res: Response) {
  const body: MovininTypes.UpdateAgencyBody = req.body
  const { _id } = body

  try {
    const agency = await User.findById(_id)

    if (agency) {
      const { fullName, phone, location, bio, payLater } = body
      agency.fullName = fullName
      agency.phone = phone
      agency.location = location
      agency.bio = bio
      agency.payLater = payLater

      await agency.save()
      return res.sendStatus(200)
    } else {
      console.error('[agency.update] Agency not found:', _id)
      return res.sendStatus(204)
    }
  } catch (err) {
    console.error(`[agency.update] ${strings.DB_ERROR} ${_id}`, err)
    return res.status(400).send(strings.DB_ERROR + err)
  }
}

export async function deleteAgency(req: Request, res: Response) {
  const { id } = req.params

  try {
    const agency = await User.findByIdAndDelete(id)
    if (agency) {
      if (agency.avatar) {
        const avatar = path.join(CDN, agency.avatar)
        if (await Helper.exists(avatar)) {
          await fs.unlink(avatar)
        }

        await NotificationCounter.deleteMany({ user: id })
        await Notification.deleteMany({ user: id })
        await Booking.deleteMany({ agency: id })
        const properties = await Property.find({ agency: id })
        await Property.deleteMany({ agency: id })
        for (const car of properties) {
          const image = path.join(CDN_PROPERTIES, car.image)
          if (await Helper.exists(image)) {
            await fs.unlink(image)
          }
        }
      }
    } else {
      return res.sendStatus(404)
    }
    return res.sendStatus(200)
  } catch (err) {
    console.error(`[agency.delete] ${strings.DB_ERROR} ${id}`, err)
    return res.status(400).send(strings.DB_ERROR + err)
  }
}

export async function getAgency(req: Request, res: Response) {
  const { id } = req.params

  try {
    const user = await User.findById(id).lean()

    if (!user) {
      console.error('[agency.getAgency] Agency not found:', id)
      return res.sendStatus(204)
    } else {
      const { _id, email, fullName, avatar, phone, location, bio, payLater } = user
      return res.json({
        _id,
        email,
        fullName,
        avatar,
        phone,
        location,
        bio,
        payLater,
      })
    }
  } catch (err) {
    console.error(`[agency.getAgency] ${strings.DB_ERROR} ${id}`, err)
    return res.status(400).send(strings.DB_ERROR + err)
  }
}

export async function getAgencies(req: Request, res: Response) {
  try {
    const page = Number.parseInt(req.params.page)
    const size = Number.parseInt(req.params.size)
    const keyword = escapeStringRegexp(String(req.query.s || ''))
    const options = 'i'

    const data = await User.aggregate(
      [
        {
          $match: {
            type: Env.UserType.Agency,
            fullName: { $regex: keyword, $options: options },
          },
        },
        {
          $facet: {
            resultData: [{ $sort: { fullName: 1 } }, { $skip: (page - 1) * size }, { $limit: size }],
            pageInfo: [
              {
                $count: 'totalRecords',
              },
            ],
          },
        },
      ],
      { collation: { locale: Env.DEFAULT_LANGUAGE, strength: 2 } },
    )

    if (data.length > 0) {
      data[0].resultData = data[0].resultData.map((agency: Env.User) => {
        const { _id, fullName, avatar } = agency
        return { _id, fullName, avatar }
      })
    }

    return res.json(data)
  } catch (err) {
    console.error(`[agency.getAgencies] ${strings.DB_ERROR} ${req.query.s}`, err)
    return res.status(400).send(strings.DB_ERROR + err)
  }
}

export async function getAllAgencies(req: Request, res: Response) {
  try {
    let data = await User.aggregate(
      [
        { $match: { type: Env.UserType.Agency } },
        { $sort: { fullName: 1 } },
      ],
      { collation: { locale: Env.DEFAULT_LANGUAGE, strength: 2 } },
    )

    if (data.length > 0) {
      data = data.map((agency: Env.User) => {
        const { _id, fullName, avatar } = agency
        return { _id, fullName, avatar }
      })
    }

    return res.json(data)
  } catch (err) {
    console.error(`[agency.getAllAgencies] ${strings.DB_ERROR}`, err)
    return res.status(400).send(strings.DB_ERROR + err)
  }
}
