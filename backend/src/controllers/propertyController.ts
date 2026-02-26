import asyncFs from 'node:fs/promises'
import path from 'node:path'
import { nanoid } from 'nanoid'
import escapeStringRegexp from 'escape-string-regexp'
import mongoose from 'mongoose'
import { Request, Response } from 'express'
import * as movininTypes from ':movinin-types'
import Booking from '../models/Booking'
import Property from '../models/Property'
import i18n from '../lang/i18n'
import * as env from '../config/env.config'
import * as helper from '../utils/helper'
import * as logger from '../utils/logger'
import Location from '../models/Location'

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
      latitude,
      longitude,
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
      latitude,
      longitude,
      price,
      hidden,
      cancellation,
      aircon,
      rentalTerm,
    }

    const property = new Property(_property)
    await property.save()

    const tempDir = path.resolve(env.CDN_TEMP_PROPERTIES)
    const propertiesDir = path.resolve(env.CDN_PROPERTIES)

    // 1. MAIN IMAGE
    if (!imageFile) {
      await Property.deleteOne({ _id: property._id })
      const err = 'Image file is required'
      logger.error(i18n.t('ERROR'), err)
      res.status(400).send(i18n.t('ERROR') + err)
      return
    }

    const safeImage = path.basename(imageFile)

    if (safeImage !== imageFile) {
      await Property.deleteOne({ _id: property._id })
      const err = 'Invalid image filename'
      logger.warn(`[property.create] Directory traversal attempt: ${imageFile}`)
      res.status(400).send(i18n.t('ERROR') + err)
      return
    }

    const sourceImagePath = path.resolve(tempDir, safeImage)

    if (!sourceImagePath.startsWith(tempDir + path.sep)) {
      await Property.deleteOne({ _id: property._id })
      const err = 'Invalid image path'
      logger.warn(`[property.create] Source path escape attempt: ${sourceImagePath}`)
      res.status(400).send(i18n.t('ERROR') + err)
      return
    }

    if (!(await helper.pathExists(sourceImagePath))) {
      await Property.deleteOne({ _id: property._id })
      const err = 'Image file not found'
      logger.error(i18n.t('ERROR'), err)
      res.status(400).send(i18n.t('ERROR') + err)
      return
    }

    const mainExt = path.extname(safeImage).toLowerCase()

    if (!env.allowedImageExtensions.includes(mainExt)) {
      await Property.deleteOne({ _id: property._id })
      const err = 'Invalid image type'
      res.status(400).send(i18n.t('ERROR') + err)
      return
    }

    const mainFilename = `${property._id}_${Date.now()}${mainExt}`
    const mainDestPath = path.resolve(propertiesDir, mainFilename)

    if (!mainDestPath.startsWith(propertiesDir + path.sep)) {
      await Property.deleteOne({ _id: property._id })
      const err = 'Invalid destination path'
      res.status(400).send(i18n.t('ERROR') + err)
      return
    }

    await asyncFs.rename(sourceImagePath, mainDestPath)
    property.image = mainFilename

    // 2. ADDITIONAL IMAGES
    property.images = []

    if (images && Array.isArray(images)) {
      let i = 1

      for (const img of images) {
        const safeImg = path.basename(img)

        if (safeImg !== img) {
          await Property.deleteOne({ _id: property._id })
          const err = 'Invalid image filename'
          logger.warn(`[property.create] Directory traversal attempt: ${img}`)
          res.status(400).send(i18n.t('ERROR') + err)
          return
        }

        const sourceImgPath = path.resolve(tempDir, safeImg)

        if (!sourceImgPath.startsWith(tempDir + path.sep)) {
          await Property.deleteOne({ _id: property._id })
          const err = 'Invalid image path'
          logger.warn(`[property.create] Source path escape attempt: ${sourceImgPath}`)
          res.status(400).send(i18n.t('ERROR') + err)
          return
        }

        if (!(await helper.pathExists(sourceImgPath))) {
          await Property.deleteOne({ _id: property._id })
          const err = 'Image file not found'
          logger.error(i18n.t('ERROR'), err)
          res.status(400).send(i18n.t('ERROR') + err)
          return
        }

        const ext = path.extname(safeImg).toLowerCase()

        if (!env.allowedImageExtensions.includes(ext)) {
          await Property.deleteOne({ _id: property._id })
          const err = 'Invalid image type'
          res.status(400).send(i18n.t('ERROR') + err)
          return
        }

        const filename = `${property._id}_${nanoid()}_${Date.now()}_${i}${ext}`
        const destPath = path.resolve(propertiesDir, filename)

        if (!destPath.startsWith(propertiesDir + path.sep)) {
          await Property.deleteOne({ _id: property._id })
          const err = 'Invalid destination path'
          res.status(400).send(i18n.t('ERROR') + err)
          return
        }

        await asyncFs.rename(sourceImgPath, destPath)
        property.images.push(filename)

        i += 1
      }
    }

    await property.save()

    res.json(property)
  } catch (err) {
    logger.error(`[property.create] ${i18n.t('ERROR')} ${JSON.stringify(body)}`, err)
    res.status(400).send(i18n.t('ERROR') + err)
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
        latitude,
        longitude,
        price,
        hidden,
        cancellation,
        aircon,
        rentalTerm,
        blockOnPay,
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
      property.latitude = latitude
      property.longitude = longitude
      property.price = price
      property.hidden = hidden
      property.cancellation = cancellation
      property.aircon = aircon
      property.rentalTerm = rentalTerm as movininTypes.RentalTerm
      property.blockOnPay = blockOnPay

      const tempDir = path.resolve(env.CDN_TEMP_PROPERTIES)
      const propertiesDir = path.resolve(env.CDN_PROPERTIES)

      // 1. MAIN IMAGE
      if (image && image !== property.image) {
        // Delete old image
        if (property.image) {
          const oldImagePath = path.resolve(propertiesDir, path.basename(property.image))
          if (oldImagePath.startsWith(propertiesDir + path.sep) && await helper.pathExists(oldImagePath)) {
            await asyncFs.unlink(oldImagePath)
          }
        }

        // Sanitize new image
        const safeImage = path.basename(image)
        if (safeImage !== image) {
          throw new Error('Invalid image filename')
        }

        const tempImagePath = path.resolve(tempDir, safeImage)
        if (!tempImagePath.startsWith(tempDir + path.sep) || !(await helper.pathExists(tempImagePath))) {
          throw new Error('Image file not found')
        }

        const ext = path.extname(safeImage).toLowerCase()
        if (!env.allowedImageExtensions.includes(ext)) {
          throw new Error('Invalid image type')
        }

        const filename = `${property._id}_${Date.now()}${ext}`
        const destPath = path.resolve(propertiesDir, filename)
        if (!destPath.startsWith(propertiesDir + path.sep)) {
          throw new Error('Invalid destination path')
        }

        await asyncFs.rename(tempImagePath, destPath)
        property.image = filename
      }

      // 2. DELETE DELETED IMAGES
      const updatedImages: string[] = []
      if (images && property.images) {
        for (const img of property.images) {
          if (!images.includes(img)) {
            const oldPath = path.resolve(propertiesDir, path.basename(img))
            if (oldPath.startsWith(propertiesDir + path.sep) && await helper.pathExists(oldPath)) {
              await asyncFs.unlink(oldPath)
            }
          } else {
            updatedImages.push(img)
          }
        }
      }
      property.images = updatedImages

      // 3. ADD NEW IMAGES
      if (images) {
        let i = 1
        for (const img of images) {
          if (!property.images.includes(img)) {
            const safeImg = path.basename(img)
            if (safeImg !== img) {
              throw new Error('Invalid image filename')
            }

            const tempImgPath = path.resolve(tempDir, safeImg)
            if (!tempImgPath.startsWith(tempDir + path.sep)) {
              throw new Error(`Directory traversal attempt: ${safeImg}`)
            }

            const ext = path.extname(safeImg).toLowerCase()
            if (!env.allowedImageExtensions.includes(ext)) {
              throw new Error('Invalid image type')
            }

            const filename = `${property._id}_${nanoid()}_${Date.now()}_${i}${ext}`
            const destPath = path.resolve(propertiesDir, filename)
            if (!destPath.startsWith(propertiesDir + path.sep)) {
              throw new Error('Invalid destination path')
            }

            if ((await helper.pathExists(tempImgPath))) {
              await asyncFs.rename(tempImgPath, destPath)
              property.images.push(filename)
            }
          }
          i += 1
        }
      }

      // 4. SAVE PROPERTY
      await property.save()
      res.json(property)
      return
    }

    logger.error('[property.update] Property not found:', _id)
    res.sendStatus(204)
  } catch (err) {
    logger.error(`[property.update] ${i18n.t('ERROR')} ${_id}`, err)
    res.status(400).send(i18n.t('ERROR') + err)
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
      res.sendStatus(200)
      return
    }

    res.sendStatus(204)
  } catch (err) {
    logger.error(`[property.check] ${i18n.t('ERROR')} ${id}`, err)
    res.status(400).send(i18n.t('ERROR') + err)
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
        if (await helper.pathExists(image)) {
          await asyncFs.unlink(image)
        }
      }

      if (Array.isArray(property.images)) {
        for (const imageName of property.images) {
          const image = path.join(env.CDN_PROPERTIES, imageName)
          if (await helper.pathExists(image)) {
            await asyncFs.unlink(image)
          }
        }
      }

      await Booking.deleteMany({ property: property._id })
    } else {
      res.sendStatus(204)
      return
    }
    res.sendStatus(200)
  } catch (err) {
    logger.error(`[property.delete] ${i18n.t('ERROR')} ${id}`, err)
    res.status(400).send(i18n.t('ERROR') + err)
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

    const filename = `${helper.getFilenameWithoutExtension(req.file.originalname)}_${nanoid()}_${Date.now()}${path.extname(req.file.originalname)}`
    const filepath = path.join(env.CDN_TEMP_PROPERTIES, filename)

    // security check: restrict allowed extensions
    const ext = path.extname(filename)
    if (!env.allowedImageExtensions.includes(ext.toLowerCase())) {
      res.status(400).send('Invalid property image file type')
      return
    }

    await asyncFs.writeFile(filepath, req.file.buffer)
    res.json(filename)
  } catch (err) {
    logger.error(i18n.t('ERROR'), err)
    res.status(400).send(i18n.t('ERROR') + err)
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
  const { fileName } = req.params

  try {
    // prevent null bytes
    if (fileName.includes('\0')) {
      res.status(400).send('Invalid filename')
      return
    }

    const baseDir = path.resolve(env.CDN_TEMP_PROPERTIES)
    const targetPath = path.resolve(baseDir, fileName)

    // critical security check: prevent directory traversal
    if (!targetPath.startsWith(baseDir + path.sep)) {
      logger.warn(`Directory traversal attempt: ${fileName}`)
      res.status(403).send('Forbidden')
      return
    }

    if (await helper.pathExists(targetPath)) {
      await asyncFs.unlink(targetPath)
    }

    res.sendStatus(200)
  } catch (err) {
    logger.error(i18n.t('ERROR'), err)
    res.status(400).send(i18n.t('ERROR') + err)
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
        if (await helper.pathExists(_image)) {
          await asyncFs.unlink(_image)
        }
        property.images.splice(index, 1)
        await property.save()
        res.sendStatus(200)
        return
      }

      res.sendStatus(204)
      return
    }

    res.sendStatus(204)
  } catch (err) {
    logger.error(i18n.t('ERROR'), err)
    res.status(400).send(i18n.t('ERROR') + err)
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

      res.json(property)
      return
    }

    logger.error('[property.getProperty] Property not found:', id)
    res.sendStatus(204)
  } catch (err) {
    logger.error(`[property.getProperty] ${i18n.t('ERROR')} ${id}`, err)
    res.status(400).send(i18n.t('ERROR') + err)
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
    // const language = body.language || env.DEFAULT_LANGUAGE

    const $match: mongoose.QueryFilter<movininTypes.Property> = {
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
        res.json([{ resultData: [], pageInfo: [] }])
        return
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
        // {
        //   $lookup: {
        //     from: 'Location',
        //     let: { locationId: '$location' },
        //     pipeline: [
        //       {
        //         $match: {
        //           $expr: { $eq: ['$_id', '$$locationId'] },
        //         },
        //       },
        //       {
        //         $lookup: {
        //           from: 'LocationValue',
        //           let: { values: '$values' },
        //           pipeline: [
        //             {
        //               $match: {
        //                 $and: [
        //                   { $expr: { $in: ['$_id', '$$values'] } },
        //                   { $expr: { $eq: ['$language', language] } },
        //                 ],
        //               },
        //             },
        //           ],
        //           as: 'value',
        //         },
        //       },
        //       { $unwind: { path: '$value', preserveNullAndEmptyArrays: false } },
        //       {
        //         $addFields: { name: '$value.value' },
        //       },
        //     ],
        //     as: 'location',
        //   },
        // },
        // { $unwind: { path: '$location', preserveNullAndEmptyArrays: false } },
        // {
        //   $match: {
        //     $or: [
        //       { name: { $regex: keyword, $options: options } },
        //       { 'location.name': { $regex: keyword, $options: options } },
        //     ],
        //   },
        // },
        {
          $match: {
            name: { $regex: keyword, $options: options },
          },
        },
        {
          $facet: {
            resultData: [{ $sort: { updatedAt: -1, _id: 1 } }, { $skip: (page - 1) * size }, { $limit: size }],
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

    res.json(data)
  } catch (err) {
    logger.error(`[property.getProperties] ${i18n.t('ERROR')} ${req.query.s}`, err)
    res.status(400).send(i18n.t('ERROR') + err)
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
        { $sort: { name: 1, _id: 1 } },
        { $skip: (page - 1) * size },
        { $limit: size },
      ],
      { collation: { locale: env.DEFAULT_LANGUAGE, strength: 2 } },
    )

    res.json(properties)
  } catch (err) {
    logger.error(`[property.getBookingProperties] ${i18n.t('ERROR')} ${req.query.s}`, err)
    res.status(400).send(i18n.t('ERROR') + err)
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
    const { from, to } = body

    if (!from) {
      throw new Error('from date is required')
    }

    if (!to) {
      throw new Error('to date is required')
    }

    // Include location and child locations are included in search results
    const locIds = await Location.find({
      $or: [
        { _id: location },
        { parentLocation: location },
      ],
    }).select('_id').lean()

    const locationIds = locIds.map((loc) => loc._id)

    const $match: mongoose.QueryFilter<movininTypes.Property> = {
      $and: [
        { agency: { $in: agencies } },
        // { location },
        { location: { $in: locationIds } },
        { type: { $in: types } },
        { rentalTerm: { $in: rentalTerms } },
        { available: true },
        { hidden: false },
      ],
    }

    let $addFields = {}
    let $sort: Record<string, 1 | -1> = { name: 1, _id: 1 }
    if (env.DB_SERVER_SIDE_JAVASCRIPT) {
      $addFields = {
        dailyPrice:
        {
          $function:
          {
            body: function (price, rentalTerm) {
              let dailyPrice = 0
              const now = new Date()
              if (rentalTerm === 'MONTHLY') {
                dailyPrice = price / new Date(now.getFullYear(), now.getMonth(), 0).getDate()
              } else if (rentalTerm === 'WEEKLY') {
                dailyPrice = price / 7
              } else if (rentalTerm === 'DAILY') {
                dailyPrice = price
              } else if (rentalTerm === 'YEARLY') {
                const year = now.getFullYear()
                dailyPrice = price / (((year % 4 === 0 && year % 100 > 0) || year % 400 === 0) ? 366 : 365)
              }

              dailyPrice = Number((Math.trunc(dailyPrice * 100) / 100).toFixed(2))
              if (dailyPrice % 1 === 0) {
                return Math.round(dailyPrice)
              }
              return dailyPrice
            },
            args: ['$price', '$rentalTerm'],
            lang: 'js',
          },
        },
      }

      $sort = { dailyPrice: 1, name: 1, _id: 1 }
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
                  // $expr: { $eq: ['$_id', '$$userId'] },
                  $and: [{ $expr: { $eq: ['$_id', '$$userId'] } }, { blacklisted: false }]
                },
              },
            ],
            as: 'agency',
          },
        },
        { $unwind: { path: '$agency', preserveNullAndEmptyArrays: false } },

        // begining of booking overlap check -----------------------------------
        // if property.blockOnPay is true and (from, to) overlaps with paid, confirmed or deposit bookings of the property the property will
        // not be included in search results
        // ----------------------------------------------------------------------
        {
          $lookup: {
            from: 'Booking',
            let: { propertyId: '$_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$property', '$$propertyId'] },
                      {
                        // Match only bookings that overlap with the requested rental period
                        // (i.e., NOT completely before or after the requested time range)
                        $not: [
                          {
                            $or: [
                              // Booking ends before the requested rental period starts → no overlap
                              { $lt: ['$to', new Date(from)] },
                              // Booking starts after the requested rental period ends → no overlap
                              { $gt: ['$from', new Date(to)] }
                            ]
                          }
                        ]
                      },
                      {
                        // include Paid, Reserved and Deposit bookings
                        $in: ['$status', [
                          movininTypes.BookingStatus.Paid,
                          movininTypes.BookingStatus.Reserved,
                          movininTypes.BookingStatus.Deposit,
                        ]]
                      },
                    ]
                  }
                }
              }
            ],
            as: 'overlappingBookings'
          }
        },
        {
          $match: {
            $expr: {
              $or: [
                { $eq: [{ $ifNull: ['$blockOnPay', false] }, false] },
                { $eq: [{ $size: '$overlappingBookings' }, 0] }
              ]
            }
          }
        },
        // end of booking overlap check -----------------------------------

        // {
        //   $lookup: {
        //     from: 'Location',
        //     let: { location: '$location' },
        //     pipeline: [
        //       {
        //         $match: {
        //           $expr: { $eq: ['$_id', '$$location'] },
        //         },
        //       },
        //     ],
        //     as: 'location',
        //   },
        // },
        {
          $addFields,
        },
        {
          $facet: {
            resultData: [{ $sort }, { $skip: (page - 1) * size }, { $limit: size }],
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

    res.json(data)
  } catch (err) {
    logger.error(`[property.getFrontendProperties] ${i18n.t('ERROR')} ${req.query.s}`, err)
    res.status(400).send(i18n.t('ERROR') + err)
  }
}
