import fs from 'node:fs/promises'
import path from 'node:path'
import { nanoid } from 'nanoid'
import escapeStringRegexp from 'escape-string-regexp'
import mongoose from 'mongoose'
import { Request, Response } from 'express'
import * as movininTypes from ':movinin-types'
import * as helper from '../common/helper'
import * as env from '../config/env.config'
import i18n from '../lang/i18n'
import Location from '../models/Location'
import LocationValue from '../models/LocationValue'
import Property from '../models/Property'
import * as logger from '../common/logger'

/**
 * Validate a Location name with language code.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const validate = async (req: Request, res: Response) => {
  const { body }: { body: movininTypes.ValidateLocationPayload } = req
  const { language, name } = body

  try {
    const keyword = escapeStringRegexp(name)
    const options = 'i'

    const locations = await Location.aggregate(
      [
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
                    { $expr: { $regexMatch: { input: '$value', regex: new RegExp(`^${keyword}$`), options } } },
                  ],
                },
              },
            ],
            as: 'value',
          },
        },
        { $unwind: { path: '$value', preserveNullAndEmptyArrays: false } },
      ],
      { collation: { locale: env.DEFAULT_LANGUAGE, strength: 2 } },
    )

    return locations.length > 0 ? res.sendStatus(204) : res.sendStatus(200)
  } catch (err) {
    logger.error(`[location.validate]  ${i18n.t('DB_ERROR')} ${name}`, err)
    return res.status(400).send(i18n.t('DB_ERROR') + err)
  }
}

/**
 * Create a Location.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const create = async (req: Request, res: Response) => {
  const { body }: { body: movininTypes.UpsertLocationPayload } = req
  const {
    country,
    longitude,
    latitude,
    names,
    image,
  } = body

  try {
    if (image) {
      const _image = path.join(env.CDN_TEMP_LOCATIONS, image)

      if (!await helper.exists(_image)) {
        logger.error(i18n.t('LOCATION_IMAGE_NOT_FOUND'), body)
        return res.status(400).send(i18n.t('LOCATION_IMAGE_NOT_FOUND'))
      }
    }

    const values: string[] = []
    for (const name of names) {
      const locationValue = new LocationValue({
        language: name.language,
        value: name.name,
      })
      await locationValue.save()
      values.push(locationValue.id)
    }

    const location = new Location({
      country,
      longitude,
      latitude,
      values,
    })
    await location.save()

    if (image) {
      const _image = path.join(env.CDN_TEMP_LOCATIONS, image)

      if (await helper.exists(_image)) {
        const filename = `${location._id}_${Date.now()}${path.extname(image)}`
        const newPath = path.join(env.CDN_LOCATIONS, filename)

        await fs.rename(_image, newPath)
        location.image = filename
        await location.save()
      }
    }

    return res.send(location)
  } catch (err) {
    logger.error(`[location.create] ${i18n.t('DB_ERROR')} ${JSON.stringify(req.body)}`, err)
    return res.status(400).send(i18n.t('DB_ERROR') + err)
  }
}

/**
 * Update a Location.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const update = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const location = await Location
      .findById(id)
      .populate<{ values: env.LocationValue[] }>('values')

    if (location) {
      const { country, longitude, latitude, names }: movininTypes.UpsertLocationPayload = req.body

      location.country = new mongoose.Types.ObjectId(country)
      location.longitude = longitude
      location.latitude = latitude

      for (const name of names) {
        const locationValue = location.values.filter((value) => value.language === name.language)[0]
        if (locationValue) {
          locationValue.value = name.name
          await locationValue.save()
        } else {
          const lv = new LocationValue({
            language: name.language,
            value: name.name,
          })
          await lv.save()
          location.values.push(lv)
        }
      }

      await location.save()

      return res.json(location)
    }

    logger.error('[location.update] Location not found:', id)
    return res.sendStatus(204)
  } catch (err) {
    logger.error(`[location.update] ${i18n.t('DB_ERROR')} ${JSON.stringify(req.body)}`, err)
    return res.status(400).send(i18n.t('DB_ERROR') + err)
  }
}

/**
 * Delete a Location.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const deleteLocation = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const location = await Location.findById(id)
    if (!location) {
      const msg = `[location.delete] Location ${id} not found`
      logger.info(msg)
      return res.status(204).send(msg)
    }
    await LocationValue.deleteMany({ _id: { $in: location.values } })
    await Location.deleteOne({ _id: id })

    if (location.image) {
      const image = path.join(env.CDN_LOCATIONS, location.image)
      if (await helper.exists(image)) {
        await fs.unlink(image)
      }
    }

    return res.sendStatus(200)
  } catch (err) {
    logger.error(`[location.delete] ${i18n.t('DB_ERROR')} ${id}`, err)
    return res.status(400).send(i18n.t('DB_ERROR') + err)
  }
}

/**
 * Get a Location by ID.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const getLocation = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const location = await Location
      .findById(id)
      .populate<{ country: env.CountryInfo }>({
        path: 'country',
        populate: {
          path: 'values',
          model: 'LocationValue',
        },
      })
      .populate<{ values: env.LocationValue[] }>('values')
      .lean()

    if (location) {
      if (location.country) {
        const countryName = ((location.country as env.CountryInfo).values as env.LocationValue[]).filter((value) => value.language === req.params.language)[0].value
        location.country.name = countryName
      }
      const name = (location.values as env.LocationValue[]).filter((value) => value.language === req.params.language)[0].value
      const l = { ...location, name }
      return res.json(l)
    }
    logger.error('[location.getLocation] Location not found:', id)
    return res.sendStatus(204)
  } catch (err) {
    logger.error(`[location.getLocation] ${i18n.t('DB_ERROR')} ${id}`, err)
    return res.status(400).send(i18n.t('DB_ERROR') + err)
  }
}

/**
 * Get Locations.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const getLocations = async (req: Request, res: Response) => {
  try {
    const page = Number.parseInt(req.params.page, 10)
    const size = Number.parseInt(req.params.size, 10)
    const { language } = req.params
    const keyword = escapeStringRegexp(String(req.query.s || ''))
    const options = 'i'

    const locations = await Location.aggregate(
      [
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
                    { $expr: { $regexMatch: { input: '$value', regex: keyword, options } } },
                  ],
                },
              },
            ],
            as: 'value',
          },
        },
        { $unwind: { path: '$value', preserveNullAndEmptyArrays: false } },
        { $addFields: { name: '$value.value' } },

        {
          $lookup: {
            from: 'Country',
            let: { country: '$country' },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ['$_id', '$$country'] },
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
              { $addFields: { name: '$value.value' } },
            ],
            as: 'country',
          },
        },
        { $unwind: { path: '$country', preserveNullAndEmptyArrays: true } },
        {
          $facet: {
            resultData: [{ $sort: { name: 1, _id: 1 } }, { $skip: (page - 1) * size }, { $limit: size }],
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

    return res.json(locations)
  } catch (err) {
    logger.error(`[location.getLocations] ${i18n.t('DB_ERROR')} ${req.query.s}`, err)
    return res.status(400).send(i18n.t('DB_ERROR') + err)
  }
}

/**
 * Get Locations with position.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const getLocationsWithPosition = async (req: Request, res: Response) => {
  try {
    const { language } = req.params
    const keyword = escapeStringRegexp(String(req.query.s || ''))
    const options = 'i'

    const locations = await Location.aggregate(
      [
        {
          $match: {
            latitude: { $ne: null },
            longitude: { $ne: null },
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
                    { $expr: { $regexMatch: { input: '$value', regex: keyword, options } } },
                  ],
                },
              },
            ],
            as: 'value',
          },
        },
        { $unwind: { path: '$value', preserveNullAndEmptyArrays: false } },
        { $addFields: { name: '$value.value' } },
      ],
      { collation: { locale: env.DEFAULT_LANGUAGE, strength: 2 } },
    )

    return res.json(locations)
  } catch (err) {
    logger.error(`[location.getLocationsWithPosition] ${i18n.t('DB_ERROR')} ${req.query.s}`, err)
    return res.status(400).send(i18n.t('DB_ERROR') + err)
  }
}

/**
 * Check if a Location is used by a Property.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const checkLocation = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const _id = new mongoose.Types.ObjectId(id)

    const count = await Property
      .find({ location: _id })
      .limit(1)
      .countDocuments()

    if (count === 1) {
      return res.sendStatus(200)
    }

    return res.sendStatus(204)
  } catch (err) {
    logger.error(`[location.checkLocation] ${i18n.t('DB_ERROR')} ${id}`, err)
    return res.status(400).send(i18n.t('DB_ERROR') + err)
  }
}

/**
 * Get location Id from location name (en).
 *
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const getLocationId = async (req: Request, res: Response) => {
  const { name, language } = req.params

  try {
    const lv = await LocationValue.findOne({ language, value: { $regex: new RegExp(`^${escapeStringRegexp(helper.trim(name, ' '))}$`, 'i') } })
    if (lv) {
      const location = await Location.findOne({ values: lv.id })
      return res.status(200).json(location?.id)
    }
    return res.sendStatus(204)
  } catch (err) {
    logger.error(`[location.getLocationId] ${i18n.t('DB_ERROR')} ${name}`, err)
    return res.status(400).send(i18n.t('DB_ERROR') + err)
  }
}

/**
 * Upload a Location image to temp folder.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const createImage = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      throw new Error('[location.createImage] req.file not found')
    }

    const filename = `${helper.getFilenameWithoutExtension(req.file.originalname)}_${nanoid()}_${Date.now()}${path.extname(req.file.originalname)}`
    const filepath = path.join(env.CDN_TEMP_LOCATIONS, filename)

    await fs.writeFile(filepath, req.file.buffer)
    return res.json(filename)
  } catch (err) {
    logger.error(`[location.createImage] ${i18n.t('DB_ERROR')}`, err)
    return res.status(400).send(i18n.t('ERROR') + err)
  }
}

/**
 * Update a Location image.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const updateImage = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    if (!req.file) {
      const msg = '[location.updateImage] req.file not found'
      logger.error(msg)
      return res.status(400).send(msg)
    }

    const { file } = req

    const location = await Location.findById(id)

    if (location) {
      if (location.image) {
        const image = path.join(env.CDN_LOCATIONS, location.image)
        if (await helper.exists(image)) {
          await fs.unlink(image)
        }
      }

      const filename = `${location._id}_${Date.now()}${path.extname(file.originalname)}`
      const filepath = path.join(env.CDN_LOCATIONS, filename)

      await fs.writeFile(filepath, file.buffer)
      location.image = filename
      await location.save()
      return res.json(filename)
    }

    logger.error('[location.updateImage] Location not found:', id)
    return res.sendStatus(204)
  } catch (err) {
    logger.error(`[location.updateImage] ${i18n.t('DB_ERROR')} ${id}`, err)
    return res.status(400).send(i18n.t('DB_ERROR') + err)
  }
}

/**
 * Delete a Location image.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const deleteImage = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const location = await Location.findById(id)

    if (location) {
      if (location.image) {
        const image = path.join(env.CDN_LOCATIONS, location.image)
        if (await helper.exists(image)) {
          await fs.unlink(image)
        }
      }
      location.image = null

      await location.save()
      return res.sendStatus(200)
    }
    logger.error('[location.deleteImage] Location not found:', id)
    return res.sendStatus(204)
  } catch (err) {
    logger.error(`[location.deleteImage] ${i18n.t('DB_ERROR')} ${id}`, err)
    return res.status(400).send(i18n.t('DB_ERROR') + err)
  }
}

/**
 * Delete a temp Location image.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {*}
 */
export const deleteTempImage = async (req: Request, res: Response) => {
  const { image } = req.params

  try {
    const imageFile = path.join(env.CDN_TEMP_LOCATIONS, image)
    if (!await helper.exists(imageFile)) {
      throw new Error(`[location.deleteTempImage] temp image ${imageFile} not found`)
    }

    await fs.unlink(imageFile)

    res.sendStatus(200)
  } catch (err) {
    logger.error(`[location.deleteTempImage] ${i18n.t('DB_ERROR')} ${image}`, err)
    res.status(400).send(i18n.t('ERROR') + err)
  }
}
