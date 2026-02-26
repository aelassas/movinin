import asyncFs from 'node:fs/promises'
import path from 'node:path'
import { nanoid } from 'nanoid'
import escapeStringRegexp from 'escape-string-regexp'
import mongoose from 'mongoose'
import { Request, Response } from 'express'
import * as movininTypes from ':movinin-types'
import * as helper from '../utils/helper'
import * as env from '../config/env.config'
import i18n from '../lang/i18n'
import Location from '../models/Location'
import LocationValue from '../models/LocationValue'
import Property from '../models/Property'
import * as logger from '../utils/logger'

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
    if (language.length !== 2) {
      throw new Error('Invalid language code')
    }
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

    if (locations.length > 0) {
      res.sendStatus(204)
    } else {
      res.sendStatus(200)
    }
  } catch (err) {
    logger.error(`[location.validate]  ${i18n.t('ERROR')} ${name}`, err)
    res.status(400).send(i18n.t('ERROR') + err)
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
    parentLocation,
  } = body

  try {
    if (image) {
      const _image = path.join(env.CDN_TEMP_LOCATIONS, image)

      if (!(await helper.pathExists(_image))) {
        throw new Error(`Location image not found: ${_image}`)
      }
    }

    const values: string[] = []
    for (const name of names) {
      const locationValue = new LocationValue({
        language: name.language,
        value: name.name,
      })
      await locationValue.save()
      values.push(locationValue._id.toString())
    }

    const location = new Location({
      country,
      longitude,
      latitude,
      values,
      parentLocation,
    })
    await location.save()

 if (image) {
      // -----------------------------
      // 1. Sanitize filename
      // -----------------------------
      const safeImage = path.basename(image)

      // If basename changed it, it's a traversal attempt
      if (safeImage !== image) {
        logger.warn(`[location.create] Directory traversal attempt (image): ${image}`)
        res.status(400).send('Invalid image filename')
        return
      }

      const tempDir = path.resolve(env.CDN_TEMP_LOCATIONS)
      const locationsDir = path.resolve(env.CDN_LOCATIONS)

      const sourcePath = path.resolve(tempDir, safeImage)

      // -----------------------------
      // 2. Ensure source stays inside temp directory
      // -----------------------------
      if (!sourcePath.startsWith(tempDir + path.sep)) {
        logger.warn(`[location.create] Image source path escape attempt: ${sourcePath}`)
        res.status(400).send('Invalid image path')
        return
      }

      if (await helper.pathExists(sourcePath)) {
        const ext = path.extname(safeImage).toLowerCase()

        // -----------------------------
        // 3. Restrict allowed image extensions
        // -----------------------------
        if (!env.allowedImageExtensions.includes(ext)) {
          res.status(400).send('Invalid image type')
          return
        }

        const filename = `${location._id}_${Date.now()}${ext}`
        const newPath = path.resolve(locationsDir, filename)

        // -----------------------------
        // 4. Ensure destination stays inside locations directory
        // -----------------------------
        if (!newPath.startsWith(locationsDir + path.sep)) {
          logger.warn(`[location.create] Image destination path escape attempt: ${newPath}`)
          res.status(400).send('Invalid image destination')
          return
        }

        await asyncFs.rename(sourcePath, newPath)

        location.image = filename
        await location.save()
      }
    }

    res.send(location)
  } catch (err) {
    logger.error(`[location.create] ${i18n.t('ERROR')} ${JSON.stringify(req.body)}`, err)
    res.status(400).send(i18n.t('ERROR') + err)
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
      const {
        country,
        longitude,
        latitude,
        names,
        parentLocation,
      }: movininTypes.UpsertLocationPayload = req.body

      location.country = new mongoose.Types.ObjectId(country)
      location.longitude = longitude
      location.latitude = latitude
      location.parentLocation = parentLocation ? new mongoose.Types.ObjectId(parentLocation) : undefined

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

      res.json(location)
      return
    }

    logger.error('[location.update] Location not found:', id)
    res.sendStatus(204)
  } catch (err) {
    logger.error(`[location.update] ${i18n.t('ERROR')} ${JSON.stringify(req.body)}`, err)
    res.status(400).send(i18n.t('ERROR') + err)
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
      res.status(204).send(msg)
      return
    }
    await LocationValue.deleteMany({ _id: { $in: location.values } })
    await Location.deleteOne({ _id: id })

    if (location.image) {
      const image = path.join(env.CDN_LOCATIONS, location.image)
      if (await helper.pathExists(image)) {
        await asyncFs.unlink(image)
      }
    }

    res.sendStatus(200)
  } catch (err) {
    logger.error(`[location.delete] ${i18n.t('ERROR')} ${id}`, err)
    res.status(400).send(i18n.t('ERROR') + err)
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
      .populate<{
        parentLocation: env.LocationInfo
      }>({
        path: 'parentLocation',
        populate: {
          path: 'values',
          model: 'LocationValue',
        },
      })
      .lean()

    if (location) {
      const { language } = req.params
      const name = (location.values as env.LocationValue[]).filter((value) => value.language === language)[0].value

      if (location.country) {
        const countryName = ((location.country as env.CountryInfo).values as env.LocationValue[]).filter((value) => value.language === req.params.language)[0].value
        location.country.name = countryName
      }
      let parentLocation: env.LocationInfo | undefined
      if (location.parentLocation) {
        const parentLocationName = (location.parentLocation.values as env.LocationValue[]).filter((value) => value.language === language)[0].value
        parentLocation = { ...location.parentLocation, name: parentLocationName }
      }
      const loc = { ...location, name, parentLocation }
      res.json(loc)
      return
    }
    logger.error('[location.getLocation] Location not found:', id)
    res.sendStatus(204)
  } catch (err) {
    logger.error(`[location.getLocation] ${i18n.t('ERROR')} ${id}`, err)
    res.status(400).send(i18n.t('ERROR') + err)
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

    res.json(locations)
  } catch (err) {
    logger.error(`[location.getLocations] ${i18n.t('ERROR')} ${req.query.s}`, err)
    res.status(400).send(i18n.t('ERROR') + err)
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

    if (language.length !== 2) {
      throw new Error('Invalid language code')
    }

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

    res.json(locations)
  } catch (err) {
    logger.error(`[location.getLocationsWithPosition] ${i18n.t('ERROR')} ${req.query.s}`, err)
    res.status(400).send(i18n.t('ERROR') + err)
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

    const propertyCount = await Property
      .find({ location: _id })
      .limit(1)
      .countDocuments()

    const childLocationsCount = await Location
      .find({ parentLocation: _id })
      .limit(1)
      .countDocuments()

    if (propertyCount === 1 || childLocationsCount === 1) {
      res.sendStatus(200)
      return
    }

    res.sendStatus(204)
  } catch (err) {
    logger.error(`[location.checkLocation] ${i18n.t('ERROR')} ${id}`, err)
    res.status(400).send(i18n.t('ERROR') + err)
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
    if (language.length !== 2) {
      throw new Error('Invalid language code')
    }
    const lv = await LocationValue.findOne({ language, value: { $regex: new RegExp(`^${escapeStringRegexp(helper.trim(name, ' '))}$`, 'i') } })
    if (lv) {
      const location = await Location.findOne({ values: lv._id.toString() })
      res.status(200).json(location?._id.toString())
      return
    }
    res.sendStatus(204)
  } catch (err) {
    logger.error(`[location.getLocationId] ${i18n.t('ERROR')} ${name}`, err)
    res.status(400).send(i18n.t('ERROR') + err)
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

    // security check: restrict allowed extensions
    const ext = path.extname(filename)
    if (!env.allowedImageExtensions.includes(ext.toLowerCase())) {
      res.status(400).send('Invalid location image file type')
      return
    }

    await asyncFs.writeFile(filepath, req.file.buffer)
    res.json(filename)
  } catch (err) {
    logger.error(`[location.createImage] ${i18n.t('ERROR')}`, err)
    res.status(400).send(i18n.t('ERROR') + err)
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
      res.status(400).send(msg)
      return
    }

    const { file } = req

    const location = await Location.findById(id)

    if (location) {
      if (location.image) {
        const image = path.join(env.CDN_LOCATIONS, location.image)
        if (await helper.pathExists(image)) {
          await asyncFs.unlink(image)
        }
      }

      const filename = `${location._id}_${Date.now()}${path.extname(file.originalname)}`
      const filepath = path.join(env.CDN_LOCATIONS, filename)

      // security check: restrict allowed extensions
      const ext = path.extname(filename)
      if (!env.allowedImageExtensions.includes(ext.toLowerCase())) {
        res.status(400).send('Invalid location image file type')
        return
      }

      await asyncFs.writeFile(filepath, file.buffer)
      location.image = filename
      await location.save()
      res.json(filename)
      return
    }

    logger.error('[location.updateImage] Location not found:', id)
    res.sendStatus(204)
  } catch (err) {
    logger.error(`[location.updateImage] ${i18n.t('ERROR')} ${id}`, err)
    res.status(400).send(i18n.t('ERROR') + err)
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
    if (!helper.isValidObjectId(id)) {
      throw new Error(`Invalid ObjectId ${id}`)
    }
    const location = await Location.findById(id)

    if (location) {
      if (location.image) {
        const image = path.join(env.CDN_LOCATIONS, location.image)
        if (await helper.pathExists(image)) {
          await asyncFs.unlink(image)
        }
      }
      location.image = null

      await location.save()
      res.sendStatus(200)
      return
    }
    logger.error('[location.deleteImage] Location not found:', id)
    res.sendStatus(204)
  } catch (err) {
    logger.error(`[location.deleteImage] ${i18n.t('ERROR')} ${id}`, err)
    res.status(400).send(i18n.t('ERROR') + err)
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
    // prevent null bytes
    if (image.includes('\0')) {
      res.status(400).send('Invalid filename')
      return
    }

    const baseDir = path.resolve(env.CDN_TEMP_LOCATIONS)
    const targetPath = path.resolve(baseDir, image)

    // critical security check: prevent directory traversal
    if (!targetPath.startsWith(baseDir + path.sep)) {
      logger.warn(`Directory traversal attempt: ${image}`)
      res.status(403).send('Forbidden')
      return
    }

    if (await helper.pathExists(targetPath)) {
      await asyncFs.unlink(targetPath)
    }

    res.sendStatus(200)
  } catch (err) {
    logger.error(`[location.deleteTempImage] ${i18n.t('ERROR')} ${image}`, err)
    res.status(400).send(i18n.t('ERROR') + err)
  }
}
