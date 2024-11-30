import path from 'node:path'
import fs from 'node:fs/promises'
import escapeStringRegexp from 'escape-string-regexp'
import { Request, Response } from 'express'
import * as movininTypes from ':movinin-types'
import i18n from '../lang/i18n'
import * as env from '../config/env.config'
import User from '../models/User'
import NotificationCounter from '../models/NotificationCounter'
import Notification from '../models/Notification'
import Booking from '../models/Booking'
import Property from '../models/Property'
import * as helper from '../common/helper'
import * as logger from '../common/logger'

/**
 * Validate Agency fullname.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const validate = async (req: Request, res: Response) => {
  const { body }: { body: movininTypes.ValidateAgencyPayload } = req
  const { fullName } = body

  try {
    const keyword = escapeStringRegexp(fullName)
    const options = 'i'
    const user = await User.findOne({
      type: movininTypes.UserType.Agency,
      fullName: { $regex: new RegExp(`^${keyword}$`), $options: options },
    })
    return user ? res.sendStatus(204) : res.sendStatus(200)
  } catch (err) {
    logger.error(`[agency.validate] ${i18n.t('DB_ERROR')} ${fullName}`, err)
    return res.status(400).send(i18n.t('DB_ERROR') + err)
  }
}

/**
 * Update Agency.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const update = async (req: Request, res: Response) => {
  const { body }: { body: movininTypes.UpdateAgencyPayload } = req
  const { _id } = body

  try {
    if (!helper.isValidObjectId(_id)) {
      throw new Error('body._id is not valid')
    }
    const agency = await User.findById(_id)

    if (agency) {
      const {
        fullName,
        phone,
        location,
        bio,
        payLater,
      } = body
      agency.fullName = fullName
      agency.phone = phone
      agency.location = location
      agency.bio = bio
      agency.payLater = payLater

      await agency.save()
      return res.json({
        _id,
        fullName: agency.fullName,
        phone: agency.phone,
        location: agency.location,
        bio: agency.bio,
        avatar: agency.avatar,
        payLater: agency.payLater,
      })
    }

    logger.error('[agency.update] Agency not found:', _id)
    return res.sendStatus(204)
  } catch (err) {
    logger.error(`[agency.update] ${i18n.t('DB_ERROR')} ${_id}`, err)
    return res.status(400).send(i18n.t('DB_ERROR') + err)
  }
}

/**
 * Delete Agency by ID.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const deleteAgency = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const agency = await User.findById(id)

    if (agency) {
      await User.deleteOne({ _id: id })

      if (agency.avatar) {
        const avatar = path.join(env.CDN_USERS, agency.avatar)
        if (await helper.exists(avatar)) {
          await fs.unlink(avatar)
        }

        await NotificationCounter.deleteMany({ user: id })
        await Notification.deleteMany({ user: id })
        await Booking.deleteMany({ agency: id })
        const properties = await Property.find({ agency: id })
        await Property.deleteMany({ agency: id })
        for (const property of properties) {
          if (property.image) {
            const image = path.join(env.CDN_PROPERTIES, property.image)
            if (await helper.exists(image)) {
              await fs.unlink(image)
            }
          }
          if (property.images) {
            for (const imageFile of property.images) {
              const additionalImage = path.join(env.CDN_PROPERTIES, imageFile)
              if (await helper.exists(additionalImage)) {
                await fs.unlink(additionalImage)
              }
            }
          }
        }
      }
    } else {
      return res.sendStatus(204)
    }
    return res.sendStatus(200)
  } catch (err) {
    logger.error(`[agency.delete] ${i18n.t('DB_ERROR')} ${id}`, err)
    return res.status(400).send(i18n.t('DB_ERROR') + err)
  }
}

/**
 * Get Agency by ID.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const getAgency = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const user = await User.findById(id).lean()

    if (!user) {
      logger.error('[agency.getAgency] Agency not found:', id)
      return res.sendStatus(204)
    }

    const {
      _id,
      email,
      fullName,
      avatar,
      phone,
      location,
      bio,
      payLater,
    } = user

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
  } catch (err) {
    logger.error(`[agency.getAgency] ${i18n.t('DB_ERROR')} ${id}`, err)
    return res.status(400).send(i18n.t('DB_ERROR') + err)
  }
}

/**
 * Get Agencies.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const getAgencies = async (req: Request, res: Response) => {
  try {
    const page = Number.parseInt(req.params.page, 10)
    const size = Number.parseInt(req.params.size, 10)
    const keyword = escapeStringRegexp(String(req.query.s || ''))
    const options = 'i'

    const data = await User.aggregate(
      [
        {
          $match: {
            type: movininTypes.UserType.Agency,
            avatar: { $ne: null },
            fullName: { $regex: keyword, $options: options },
          },
        },
        {
          $facet: {
            resultData: [{ $sort: { fullName: 1, _id: 1 } }, { $skip: (page - 1) * size }, { $limit: size }],
            pageInfo: [
              {
                $count: 'totalRecords',
              },
            ],
          },
        },
      ],
      { collation: { locale: env.DEFAULT_LANGUAGE, strength: 2 } },
    )

    data[0].resultData = data[0].resultData.map((agency: env.User) => {
      const { _id, fullName, avatar } = agency
      return { _id, fullName, avatar }
    })

    return res.json(data)
  } catch (err) {
    logger.error(`[agency.getAgencies] ${i18n.t('DB_ERROR')} ${req.query.s}`, err)
    return res.status(400).send(i18n.t('DB_ERROR') + err)
  }
}

/**
 * Get all Agencies.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const getAllAgencies = async (req: Request, res: Response) => {
  try {
    let data = await User.aggregate(
      [
        { $match: { type: movininTypes.UserType.Agency, avatar: { $ne: null } } },
        { $sort: { fullName: 1, _id: 1 } },
      ],
      { collation: { locale: env.DEFAULT_LANGUAGE, strength: 2 } },
    )

    data = data.map((agency: env.User) => {
      const { _id, fullName, avatar } = agency
      return { _id, fullName, avatar }
    })

    return res.json(data)
  } catch (err) {
    logger.error(`[agency.getAllAgencies] ${i18n.t('DB_ERROR')}`, err)
    return res.status(400).send(i18n.t('DB_ERROR') + err)
  }
}
