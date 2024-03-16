import fs from 'node:fs/promises'
import path from 'node:path'
import { v1 as uuid } from 'uuid'
import escapeStringRegexp from 'escape-string-regexp'
import mongoose from 'mongoose'
import { Request, Response } from 'express'
import * as movininTypes from 'movinin-types'
import Booking from '../models/Booking'
import Property from '../models/Property'
import i18n from '../lang/i18n'
import * as env from '../config/env.config'
import * as helper from '../common/helper'

/**
 * Create a Property.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const create = async (req: Request, res: Response) => {
  const { body }: { body: movininTypes.CreatePropertyPayload } = req

  try {
    const {
      name,
      type,
      agency,
      description,
      image: imageFile,
      images,
      bedrooms,
      bathrooms,
      kitchens,
      parkingSpaces,
      size,
      petsAllowed,
      furnished,
      minimumAge,
      location,
      address,
      price,
      hidden,
      cancellation,
      aircon,
      rentalTerm,
    } = body

    const _property = {
      name,
      type,
      agency,
      description,
      bedrooms,
      bathrooms,
      kitchens,
      parkingSpaces,
      size,
      petsAllowed,
      furnished,
      minimumAge,
      location,
      address,
      price,
      hidden,
      cancellation,
      aircon,
      rentalTerm,
    }

    const property = new Property(_property)
    await property.save()

    // image
    const _image = path.join(env.CDN_TEMP_PROPERTIES, imageFile)
    if (await helper.exists(_image)) {
      const filename = `${property._id}_${Date.now()}${path.extname(imageFile)}`
      const newPath = path.join(env.CDN_PROPERTIES, filename)

      await fs.rename(_image, newPath)
      property.image = filename
    } else {
      await Property.deleteOne({ _id: property._id })
      const err = 'Image file not found'
      console.error(i18n.t('ERROR'), err)
      return res.status(400).send(i18n.t('ERROR') + err)
    }

    // images
    property.images = []
    if (images) {
      let i = 1
      for (const img of images) {
        const _img = path.join(env.CDN_TEMP_PROPERTIES, img)

        if (await helper.exists(_img)) {
          const filename = `${property._id}_${uuid()}_${Date.now()}_${i}${path.extname(img)}`
          const newPath = path.join(env.CDN_PROPERTIES, filename)

          await fs.rename(_img, newPath)
          property.images.push(filename)
        } else {
          await Property.deleteOne({ _id: property._id })
          const err = 'Image file not found'
          console.error(i18n.t('ERROR'), err)
          return res.status(400).send(i18n.t('ERROR') + err)
        }
        i += 1
      }
    }

    await property.save()

    return res.json(property)
  } catch (err) {
    console.error(`[property.create] ${i18n.t('DB_ERROR')} ${body}`, err)
    return res.status(400).send(i18n.t('ERROR') + err)
  }
}

/**
 * Update a Property.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const update = async (req: Request, res: Response) => {
  const { body }: { body: movininTypes.UpdatePropertyPayload } = req
  const { _id } = body

  try {
    if (!helper.isValidObjectId(_id)) {
      throw new Error('body._id is not valid')
    }
    const property = await Property.findById(_id)

    if (property) {
      const {
        name,
        type,
        agency,
        description,
        available,
        image,
        images,
        bedrooms,
        bathrooms,
        kitchens,
        parkingSpaces,
        size,
        petsAllowed,
        furnished,
        minimumAge,
        location,
        address,
        price,
        hidden,
        cancellation,
        aircon,
        rentalTerm,
      } = body

      property.name = name
      property.type = type as movininTypes.PropertyType
      property.agency = new mongoose.Types.ObjectId(agency)
      property.description = description
      property.available = available
      property.bedrooms = bedrooms
      property.bathrooms = bathrooms
      property.kitchens = kitchens
      property.parkingSpaces = parkingSpaces
      property.size = size
      property.petsAllowed = petsAllowed
      property.furnished = furnished
      property.minimumAge = minimumAge
      property.location = new mongoose.Types.ObjectId(location)
      property.address = address
      property.price = price
      property.hidden = hidden
      property.cancellation = cancellation
      property.aircon = aircon
      property.rentalTerm = rentalTerm as movininTypes.RentalTerm

      if (image && image !== property.image) {
        const oldImage = path.join(env.CDN_PROPERTIES, property.image)
        if (await helper.exists(oldImage)) {
          await fs.unlink(oldImage)
        }

        const filename = `${property._id}_${Date.now()}${path.extname(image)}`
        const filepath = path.join(env.CDN_PROPERTIES, filename)

        const tempImagePath = path.join(env.CDN_TEMP_PROPERTIES, image)
        await fs.rename(tempImagePath, filepath)
        property.image = filename
      }

      // delete deleted images
      const _images: string[] = []
      if (images && property.images) {
        if (images.length === 0) {
          for (const img of property.images) {
            const _image = path.join(env.CDN_PROPERTIES, img)
            if (await helper.exists(_image)) {
              await fs.unlink(_image)
            }
          }
        } else {
          for (const img of property.images) {
            if (!images.includes(img)) {
              const _image = path.join(env.CDN_PROPERTIES, img)
              if (await helper.exists(_image)) {
                await fs.unlink(_image)
              }
            } else {
              _images.push(img)
            }
          }
        }
      }
      property.images = _images

      // add new images
      if (images) {
        let i = 1
        for (const img of images) {
          if (!property.images.includes(img)) {
            const _image = path.join(env.CDN_TEMP_PROPERTIES, img)

            if (await helper.exists(_image)) {
              const filename = `${property._id}_${uuid()}_${Date.now()}_${i}${path.extname(img)}`
              const newPath = path.join(env.CDN_PROPERTIES, filename)

              await fs.rename(_image, newPath)
              property.images.push(filename)
            }
          }
          i += 1
        }
      }

      await property.save()
      return res.json(property)
    }

    console.error('[property.update] Property not found:', _id)
    return res.sendStatus(204)
  } catch (err) {
    console.error(`[property.update] ${i18n.t('DB_ERROR')} ${_id}`, err)
    return res.status(400).send(i18n.t('ERROR') + err)
  }
}

/**
 * Check if a Property is related to a Booking.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const checkProperty = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const _id = new mongoose.Types.ObjectId(id)
    const count = await Booking
      .find({ property: _id })
      .limit(1)
      .countDocuments()

    if (count === 1) {
      return res.sendStatus(200)
    }

    return res.sendStatus(204)
  } catch (err) {
    console.error(`[property.check] ${i18n.t('DB_ERROR')} ${id}`, err)
    return res.status(400).send(i18n.t('ERROR') + err)
  }
}

/**
 * Delete a Property.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const deleteProperty = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const property = await Property.findById(id)
    if (property) {
      await Property.deleteOne({ _id: id })

      if (property.image) {
        const image = path.join(env.CDN_PROPERTIES, property.image)
        if (await helper.exists(image)) {
          await fs.unlink(image)
        }
      }

      if (Array.isArray(property.images)) {
        for (const imageName of property.images) {
          const image = path.join(env.CDN_PROPERTIES, imageName)
          if (await helper.exists(image)) {
            await fs.unlink(image)
          }
        }
      }

      await Booking.deleteMany({ property: property._id })
    } else {
      return res.sendStatus(204)
    }
    return res.sendStatus(200)
  } catch (err) {
    console.error(`[property.delete] ${i18n.t('DB_ERROR')} ${id}`, err)
    return res.status(400).send(i18n.t('DB_ERROR') + err)
  }
}

/**
 * Upload a Property image to temp folder.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const uploadImage = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      throw new Error('[property.uploadImage] req.file not found')
    }

    const filename = `${helper.getFilenameWithoutExtension(req.file.originalname)}_${uuid()}_${Date.now()}${path.extname(req.file.originalname)}`
    const filepath = path.join(env.CDN_TEMP_PROPERTIES, filename)

    await fs.writeFile(filepath, req.file.buffer)
    return res.json(filename)
  } catch (err) {
    console.error(i18n.t('ERROR'), err)
    return res.status(400).send(i18n.t('ERROR') + err)
  }
}

/**
 * Delete a temp Property image.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const deleteTempImage = async (req: Request, res: Response) => {
  try {
    const imageFile = path.join(env.CDN_TEMP_PROPERTIES, req.params.fileName)
    if (!await helper.exists(imageFile)) {
      throw new Error(`[property.deleteTempImage] temp image ${imageFile} not found`)
    }

    await fs.unlink(imageFile)

    return res.sendStatus(200)
  } catch (err) {
    console.error(i18n.t('ERROR'), err)
    return res.status(400).send(i18n.t('ERROR') + err)
  }
}

/**
 * Delete a Property image.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const deleteImage = async (req: Request, res: Response) => {
  try {
    const { property: propertyId, image: imageFileName } = req.params

    const property = await Property.findById(propertyId)

    if (property && property.images) {
      const index = property.images.findIndex((i) => i === imageFileName)

      if (index > -1) {
        const _image = path.join(env.CDN_PROPERTIES, imageFileName)
        if (await helper.exists(_image)) {
          await fs.unlink(_image)
        }
        property.images.splice(index, 1)
        await property.save()
        return res.sendStatus(200)
      }

      return res.sendStatus(204)
    }

    return res.sendStatus(204)
  } catch (err) {
    console.error(i18n.t('ERROR'), err)
    return res.status(400).send(i18n.t('ERROR') + err)
  }
}

/**
 * Get a Property by ID.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const getProperty = async (req: Request, res: Response) => {
  const { id, language } = req.params

  try {
    const property = await Property.findById(id)
      .populate<{ agency: env.UserInfo }>('agency')
      .populate<{ location: env.LocationInfo }>({
        path: 'location',
        populate: {
          path: 'values',
          model: 'LocationValue',
        },
      })
      .lean()

    if (property) {
      const {
        _id,
        fullName,
        avatar,
        payLater,
      } = property.agency
      property.agency = {
        _id,
        fullName,
        avatar,
        payLater,
      }

      property.location.name = property.location.values.filter((value) => value.language === language)[0].value

      return res.json(property)
    }

    console.error('[property.getProperty] Property not found:', id)
    return res.sendStatus(204)
  } catch (err) {
    console.error(`[property.getProperty] ${i18n.t('DB_ERROR')} ${id}`, err)
    return res.status(400).send(i18n.t('ERROR') + err)
  }
}

/**
 * Get Properties.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const getProperties = async (req: Request, res: Response) => {
  try {
    const { body }: { body: movininTypes.GetPropertiesPayload } = req
    const page = Number.parseInt(req.params.page, 10)
    const size = Number.parseInt(req.params.size, 10)
    const agencies = body.agencies.map((id) => new mongoose.Types.ObjectId(id))
    const keyword = escapeStringRegexp(String(req.query.s || ''))
    const types = body.types || []
    const rentalTerms = body.rentalTerms || []
    const { availability } = body
    const options = 'i'
    const language = body.language || env.DEFAULT_LANGUAGE

    const $match: mongoose.FilterQuery<any> = {
      $and: [
        { agency: { $in: agencies } },
        { type: { $in: types } },
        { rentalTerm: { $in: rentalTerms } },
      ],
    }

    if (availability) {
      if (availability.length === 1 && availability[0] === movininTypes.Availablity.Available) {
        $match.$and!.push({ available: true })
      } else if (availability.length === 1 && availability[0] === movininTypes.Availablity.Unavailable) {
        $match.$and!.push({ available: false })
      } else if (availability.length === 0) {
        return res.json([{ resultData: [], pageInfo: [] }])
      }
    }

    const data = await Property.aggregate(
      [
        { $match },
        {
          $lookup: {
            from: 'User',
            let: { userId: '$agency' },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ['$_id', '$$userId'] },
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
          $match: {
            $or: [
              { name: { $regex: keyword, $options: options } },
              { 'location.name': { $regex: keyword, $options: options } },
            ],
          },
        },
        {
          $facet: {
            resultData: [{ $sort: { name: 1 } }, { $skip: (page - 1) * size }, { $limit: size }],
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

    for (const property of data[0].resultData) {
      const { _id, fullName, avatar } = property.agency
      property.agency = { _id, fullName, avatar }
    }

    return res.json(data)
  } catch (err) {
    console.error(`[property.getProperties] ${i18n.t('DB_ERROR')} ${req.query.s}`, err)
    return res.status(400).send(i18n.t('DB_ERROR') + err)
  }
}

/**
 * Get Properties by Agency and Location.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const getBookingProperties = async (req: Request, res: Response) => {
  try {
    const { body }: { body: movininTypes.GetBookingPropertiesPayload } = req
    const agency = new mongoose.Types.ObjectId(body.agency)
    const location = new mongoose.Types.ObjectId(body.location)
    const keyword = escapeStringRegexp(String(req.query.s || ''))
    const options = 'i'
    const page = Number.parseInt(req.params.page, 10)
    const size = Number.parseInt(req.params.size, 10)

    const properties = await Property.aggregate(
      [
        {
          $match: {
            $and: [
              { agency: { $eq: agency } },
              { location },
              { name: { $regex: keyword, $options: options } }],
          },
        },
        { $sort: { name: 1 } },
        { $skip: (page - 1) * size },
        { $limit: size },
      ],
      { collation: { locale: env.DEFAULT_LANGUAGE, strength: 2 } },
    )

    return res.json(properties)
  } catch (err) {
    console.error(`[property.getBookingProperties] ${i18n.t('DB_ERROR')} ${req.query.s}`, err)
    return res.status(400).send(i18n.t('DB_ERROR') + err)
  }
}

/**
 * Get Properties available for rental.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const getFrontendProperties = async (req: Request, res: Response) => {
  try {
    const { body }: { body: movininTypes.GetPropertiesPayload } = req
    const page = Number.parseInt(req.params.page, 10)
    const size = Number.parseInt(req.params.size, 10)
    const agencies = body.agencies.map((id) => new mongoose.Types.ObjectId(id))
    const location = new mongoose.Types.ObjectId(body.location)
    const types = body.types || []
    const rentalTerms = body.rentalTerms || []

    const $match: mongoose.FilterQuery<any> = {
      $and: [
        { agency: { $in: agencies } },
        { location },
        { type: { $in: types } },
        { rentalTerm: { $in: rentalTerms } },
        { available: true },
        { hidden: false },
      ],
    }

    const data = await Property.aggregate(
      [
        { $match },
        {
          $lookup: {
            from: 'User',
            let: { userId: '$agency' },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ['$_id', '$$userId'] },
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
            let: { location: '$location' },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ['$_id', '$$location'] },
                },
              },
            ],
            as: 'location',
          },
        },
        {
          $facet: {
            resultData: [{ $sort: { name: 1 } }, { $skip: (page - 1) * size }, { $limit: size }],
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

    for (const property of data[0].resultData) {
      const { _id, fullName, avatar } = property.agency
      property.agency = { _id, fullName, avatar }
    }

    return res.json(data)
  } catch (err) {
    console.error(`[property.getFrontendProperties] ${i18n.t('DB_ERROR')} ${req.query.s}`, err)
    return res.status(400).send(i18n.t('DB_ERROR') + err)
  }
}
