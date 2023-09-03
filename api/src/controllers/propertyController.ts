import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { v1 as uuid } from 'uuid'
import escapeStringRegexp from 'escape-string-regexp'
import mongoose from 'mongoose'
import { Request, Response } from 'express'
import Booking from '../models/Booking.js'
import Property from '../models/Property.js'
import strings from '../config/app.config.js'
import * as env from '../config/env.config.js'
import * as Helper from '../common/helper.js'
import * as movininTypes from 'movinin-types'

const CDN = String(process.env.MI_CDN_PROPERTIES)
const CDN_TEMP = String(process.env.MI_CDN_TEMP_PROPERTIES)

export async function create(req: Request, res: Response) {
  const body: movininTypes.CreatePropertyPayload = req.body

  try {
    if (!body.image) {
      console.error(`[property.create] ${strings.PROPERTY_IMAGE_REQUIRED} ${body}`)
      return res.status(400).send(strings.PROPERTY_IMAGE_REQUIRED)
    }

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
      soldOut,
      hidden,
      cancellation
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
      soldOut,
      hidden,
      cancellation
    }

    const property = new Property(_property)
    await property.save()

    // image
    const _image = path.join(CDN_TEMP, imageFile)
    if (await Helper.exists(_image)) {
      const filename = `${property._id}_${Date.now()}${path.extname(imageFile)}`
      const newPath = path.join(CDN, filename)

      await fs.rename(_image, newPath)
      property.image = filename
    } else {
      await Property.deleteOne({ _id: property._id })
      const err = 'Image file not found'
      console.error(strings.ERROR, err)
      return res.status(400).send(strings.ERROR + err)
    }

    // images
    property.images = []
    for (let i = 0; i < images.length; i++) {
      const imageFile = images[i]
      const _image = path.join(CDN_TEMP, imageFile)

      if (await Helper.exists(_image)) {
        const filename = `${property._id}_${uuid()}_${Date.now()}_${i}${path.extname(imageFile)}`
        const newPath = path.join(CDN, filename)

        await fs.rename(_image, newPath)
        property.images.push(filename)
      } else {
        await Property.deleteOne({ _id: property._id })
        const err = 'Image file not found'
        console.error(strings.ERROR, err)
        return res.status(400).send(strings.ERROR + err)
      }
    }

    return res.json(property)
  } catch (err) {
    console.error(`[property.create] ${strings.DB_ERROR} ${body}`, err)
    return res.status(400).send(strings.ERROR + err)
  }
}

export async function update(req: Request, res: Response) {
  const body: movininTypes.UpdatePropertyPayload = req.body
  const _id = body

  try {
    const property = await Property.findById(_id)

    if (property) {
      const {
        name,
        type,
        agency,
        description,
        image,
        images,
        tempImages,
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
        soldOut,
        hidden,
        cancellation
      } = body

      property.name = name
      property.type = type as movininTypes.PropertyType
      property.agency = new mongoose.Types.ObjectId(agency)
      property.description = description
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
      property.soldOut = soldOut
      property.hidden = hidden
      property.cancellation = cancellation

      if (!await Helper.exists(CDN)) {
        await fs.mkdir(CDN, { recursive: true })
      }

      if (image) {
        const oldImage = path.join(CDN, property.image)
        if (await Helper.exists(oldImage)) {
          await fs.unlink(oldImage)
        }

        const filename = `${property._id}_${Date.now()}${path.extname(image)}`
        const filepath = path.join(CDN, filename)

        const tempImagePath = path.join(CDN_TEMP, image)
        await fs.rename(tempImagePath, filepath)
        property.image = filename
      }

      // delete deleted images
      if (property.images) {
        for (const image of property.images) {
          if (!images.includes(image)) {
            const _image = path.join(CDN, image)
            if (await Helper.exists(_image)) {
              await fs.unlink(_image)
            }
            const index = property.images.indexOf(image)
            property.images.splice(index, 1)
          }
        }
      } else {
        property.images = []
      }

      // add new images
      for (let i = 0; i < tempImages.length; i++) {
        const imageFile = tempImages[i]
        const _image = path.join(CDN_TEMP, imageFile)

        if (await Helper.exists(_image)) {
          const filename = `${property._id}_${uuid()}_${Date.now()}_${i}${path.extname(imageFile)}`
          const newPath = path.join(CDN, filename)

          await fs.rename(_image, newPath)
          property.images.push(filename)
        }
      }

      await property.save()
      return res.sendStatus(200)
    } else {
      console.error('[property.update] Property not found:', _id)
      return res.sendStatus(204)
    }
  } catch (err) {
    console.error(`[property.update] ${strings.DB_ERROR} ${_id}`, err)
    return res.status(400).send(strings.ERROR + err)
  }
}

export async function checkProperty(req: Request, res: Response) {
  const { id } = req.params

  try {
    const _id = new mongoose.Types.ObjectId(id)
    const count = await Booking.find({ property: _id }).limit(1).count()

    if (count === 1) {
      return res.sendStatus(200)
    }

    return res.sendStatus(204)
  } catch (err) {
    console.error(`[property.check] ${strings.DB_ERROR} ${id}`, err)
    return res.status(400).send(strings.ERROR + err)
  }
}

export async function deleteProperty(req: Request, res: Response) {
  const { id } = req.params

  try {
    const property = await Property.findByIdAndDelete(id)
    if (property) {
      if (property.image) {
        const image = path.join(CDN, property.image)
        if (await Helper.exists(image)) {
          await fs.unlink(image)
        }
      }
      await Booking.deleteMany({ property: property._id })
    } else {
      return res.sendStatus(404)
    }
    return res.sendStatus(200)
  } catch (err) {
    console.error(`[property.delete] ${strings.DB_ERROR} ${id}`, err)
    return res.status(400).send(strings.DB_ERROR + err)
  }
}

export async function uploadImage(req: Request, res: Response) {
  try {
    if (!req.file) {
      const msg = `[property.uploadImage] req.file not found`
      console.error(msg)
      return res.status(400).send(msg)
    }

    if (!await Helper.exists(CDN_TEMP)) {
      await fs.mkdir(CDN_TEMP, { recursive: true })
    }

    const filename = `${uuid()}_${Date.now()}${path.extname(req.file.originalname)}`
    const filepath = path.join(CDN_TEMP, filename)

    await fs.writeFile(filepath, req.file.buffer)
    return res.json(filename)
  } catch (err) {
    console.error(strings.ERROR, err)
    return res.status(400).send(strings.ERROR + err)
  }
}

export async function deleteTempImage(req: Request, res: Response) {
  try {
    const _image = path.join(CDN_TEMP, req.params.fileName)
    if (await Helper.exists(_image)) {
      await fs.unlink(_image)
    }
    return res.sendStatus(200)
  } catch (err) {
    console.error(strings.ERROR, err)
    return res.status(400).send(strings.ERROR + err)
  }
}

export async function deleteImage(req: Request, res: Response) {
  try {
    const { property: propertyId, image: imageFileName } = req.params

    const property = await Property.findById(propertyId)

    if (property && property.images) {
      const index = property.images.findIndex(i => i === imageFileName)

      if (index > -1) {
        const _image = path.join(CDN, imageFileName)
        if (await Helper.exists(_image)) {
          await fs.unlink(_image)
        }
        property.images.splice(index, 1)
        await property.save()
        return res.sendStatus(200)
      } else {
        return res.sendStatus(204)
      }

    } else {
      return res.sendStatus(204)
    }
  } catch (err) {
    console.error(strings.ERROR, err)
    return res.status(400).send(strings.ERROR + err)
  }
}

export async function getProperty(req: Request, res: Response) {
  const { id, language } = req.params

  try {
    const property = await Property.findById(id)
      .populate<{ agency: env.UserInfo }>('')
      .populate<{ locations: env.LocationInfo[] }>({
        path: 'locations',
        populate: {
          path: 'values',
          model: 'LocationValue',
        },
      })
      .lean()

    if (property) {
      if (property.agency) {
        const { _id, fullName, avatar, payLater } = property.agency
        property.agency = { _id, fullName, avatar, payLater }
      }

      for (let i = 0; i < property.locations.length; i++) {
        const location = property.locations[i]
        location.name = location.values.filter((value) => value.language === language)[0].value
      }

      return res.json(property)
    } else {
      console.error('[property.getProperty] Property not found:', id)
      return res.sendStatus(204)
    }
  } catch (err) {
    console.error(`[property.getProperty] ${strings.DB_ERROR} ${id}`, err)
    return res.status(400).send(strings.ERROR + err)
  }
}

export async function getProperties(req: Request, res: Response) {
  try {
    const body: { agencies: string[] } = req.body
    const page = Number.parseInt(req.params.page)
    const size = Number.parseInt(req.params.size)
    const agencies = body.agencies.map((id) => new mongoose.Types.ObjectId(id))
    const keyword = escapeStringRegexp(String(req.query.s || ''))
    const options = 'i'

    const $match: mongoose.FilterQuery<any> = {
      $and: [{ name: { $regex: keyword, $options: options } }, { agency: { $in: agencies } }],
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

    if (data.length > 0) {
      data[0].resultData.forEach((property: env.PropertyInfo) => {
        if (property.agency) {
          const { _id, fullName, avatar } = property.agency
          property.agency = { _id, fullName, avatar }
        }
      })
    }

    return res.json(data)
  } catch (err) {
    console.error(`[property.getProperties] ${strings.DB_ERROR} ${req.query.s}`, err)
    return res.status(400).send(strings.DB_ERROR + err)
  }
}

export async function getBookingyProperties(req: Request, res: Response) {
  try {
    const body: movininTypes.GetBookingPropertiesPayload = req.body
    const agency = new mongoose.Types.ObjectId(body.agency)
    const location = new mongoose.Types.ObjectId(body.location)
    const keyword = escapeStringRegexp(String(req.query.s || ''))
    const options = 'i'
    const page = Number.parseInt(req.params.page)
    const size = Number.parseInt(req.params.size)

    const propertys = await Property.aggregate(
      [
        {
          $match: {
            $and: [
              { agency: { $eq: agency } },
              { location: location },
              { name: { $regex: keyword, $options: options } }]
          },
        },
        { $sort: { name: 1 } },
        { $skip: (page - 1) * size },
        { $limit: size },
      ],
      { collation: { locale: env.DEFAULT_LANGUAGE, strength: 2 } },
    )

    return res.json(propertys)
  } catch (err) {
    console.error(`[property.getBookingProperties] ${strings.DB_ERROR} ${req.query.s}`, err)
    return res.status(400).send(strings.DB_ERROR + err)
  }
}

export async function getFrontendProperties(req: Request, res: Response) {
  try {
    const body: { agencies: string[], location: string } = req.body
    const page = Number.parseInt(req.params.page)
    const size = Number.parseInt(req.params.size)
    const agencies = body.agencies.map((id) => new mongoose.Types.ObjectId(id))
    const location = new mongoose.Types.ObjectId(body.location)

    const $match = {
      $and: [{ agency: { $in: agencies } }, { location: location }]
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
                  $expr: { $eq: ['$_id', '$$locatios'] },
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

    if (data.length > 0) {
      data[0].resultData.forEach((property: env.PropertyInfo) => {
        if (property.agency) {
          const { _id, fullName, avatar } = property.agency
          property.agency = { _id, fullName, avatar }
        }
      })
    }

    return res.json(data)
  } catch (err) {
    console.error(`[property.getFrontendProperties] ${strings.DB_ERROR} ${req.query.s}`, err)
    return res.status(400).send(strings.DB_ERROR + err)
  }
}
