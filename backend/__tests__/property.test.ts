import 'dotenv/config'
import { jest } from '@jest/globals'
import request from 'supertest'
import mongoose from 'mongoose'
import url from 'url'
import path from 'path'
import asyncFs from 'node:fs/promises'
import { nanoid } from 'nanoid'
import * as movininTypes from ':movinin-types'
import * as databaseHelper from '../src/utils/databaseHelper'
import app from '../src/app'
import * as env from '../src/config/env.config'
import * as testHelper from './testHelper'
import * as helper from '../src/utils/helper'
import Property from '../src/models/Property'
import Booking from '../src/models/Booking'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const MAIN_IMAGE1 = 'main1.jpg'
const MAIN_IMAGE1_PATH = path.resolve(__dirname, `./img/${MAIN_IMAGE1}`)
const ADDITIONAL_IMAGE1_1 = 'additional1-1.jpg'
const ADDITIONAL_IMAGE1_1_PATH = path.resolve(__dirname, `./img/${ADDITIONAL_IMAGE1_1}`)
const ADDITIONAL_IMAGE1_2 = 'additional1-2.jpg'
const ADDITIONAL_IMAGE1_2_PATH = path.resolve(__dirname, `./img/${ADDITIONAL_IMAGE1_2}`)
const MAIN_IMAGE2 = 'main2.jpg'
const MAIN_IMAGE2_PATH = path.resolve(__dirname, `./img/${MAIN_IMAGE2}`)
const ADDITIONAL_IMAGE2_1 = 'additional2-1.jpg'
const ADDITIONAL_IMAGE2_1_PATH = path.resolve(__dirname, `./img/${ADDITIONAL_IMAGE2_1}`)
const ADDITIONAL_IMAGE2_2 = 'additional2-2.jpg'
const ADDITIONAL_IMAGE2_2_PATH = path.resolve(__dirname, `./img/${ADDITIONAL_IMAGE2_2}`)

let AGENCY1_ID: string
let AGENCY2_ID: string
let LOCATION1_ID: string
let LOCATION2_ID: string
let PROPERTY_ID: string

//
// Connecting and initializing the database before running the test suite
//
beforeAll(async () => {
  testHelper.initializeLogger()

  await databaseHelper.connect(env.DB_URI, false, false)
  await testHelper.initialize()

  // create two agencies
  const agencyName1 = testHelper.getAgencyName()
  AGENCY1_ID = await testHelper.createAgency(`${agencyName1}@test.movinin.io`, agencyName1)
  const agencyName2 = testHelper.getAgencyName()
  AGENCY2_ID = await testHelper.createAgency(`${agencyName2}@test.movinin.io`, agencyName2)

  // create two locations
  LOCATION1_ID = await testHelper.createLocation('Location 1 EN', 'Location 1 FR')
  LOCATION2_ID = await testHelper.createLocation('Location 2 EN', 'Location 2 FR')
})

//
// Closing and cleaning the database connection after running the test suite
//
afterAll(async () => {
  await testHelper.close()

  // delete agencies
  await testHelper.deleteAgency(AGENCY1_ID)
  await testHelper.deleteAgency(AGENCY2_ID)

  // delete locations
  await testHelper.deleteLocation(LOCATION1_ID)
  await testHelper.deleteLocation(LOCATION2_ID)

  await databaseHelper.close()
})

afterEach(() => {
  jest.clearAllMocks()
  jest.resetModules()
})

//
// Unit tests
//

describe('POST /api/create-property', () => {
  it('should create a property', async () => {
    const token = await testHelper.signinAsAdmin()

    const mainImage = path.join(env.CDN_TEMP_PROPERTIES, MAIN_IMAGE1)
    if (!(await helper.pathExists(mainImage))) {
      await asyncFs.copyFile(MAIN_IMAGE1_PATH, mainImage)
    }
    const additionalImage1 = path.join(env.CDN_TEMP_PROPERTIES, ADDITIONAL_IMAGE1_1)
    if (!(await helper.pathExists(additionalImage1))) {
      await asyncFs.copyFile(ADDITIONAL_IMAGE1_1_PATH, additionalImage1)
    }
    const additionalImage2 = path.join(env.CDN_TEMP_PROPERTIES, ADDITIONAL_IMAGE1_2)
    if (!(await helper.pathExists(additionalImage2))) {
      await asyncFs.copyFile(ADDITIONAL_IMAGE1_2_PATH, additionalImage2)
    }
    const payload: movininTypes.CreatePropertyPayload = {
      name: 'Beautiful House in Detroit',
      agency: AGENCY1_ID,
      type: movininTypes.PropertyType.House,
      description: '<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium rem aperiam, veritatis et quasi.</p>',
      image: MAIN_IMAGE1,
      images: [ADDITIONAL_IMAGE1_1, ADDITIONAL_IMAGE1_2],
      bedrooms: 3,
      bathrooms: 2,
      kitchens: 1,
      parkingSpaces: 1,
      size: 200,
      petsAllowed: false,
      furnished: true,
      aircon: true,
      minimumAge: 21,
      location: LOCATION1_ID,
      address: '',
      price: 4000,
      hidden: true,
      cancellation: 0,
      available: false,
      rentalTerm: movininTypes.RentalTerm.Monthly,
    }
    let res = await request(app)
      .post('/api/create-property')
      .set(env.X_ACCESS_TOKEN, token)
      .send(payload)
    expect(res.statusCode).toBe(200)
    const property = res.body
    expect(property.blockOnPay).toBe(true)
    PROPERTY_ID = property._id

    if (!(await helper.pathExists(mainImage))) {
      await asyncFs.copyFile(MAIN_IMAGE1_PATH, mainImage)
    }
    payload.images = undefined
    res = await request(app)
      .post('/api/create-property')
      .set(env.X_ACCESS_TOKEN, token)
      .send(payload)
    expect(res.statusCode).toBe(200)
    const deleteRes = await Property.deleteOne({ _id: res.body._id })
    expect(deleteRes.deletedCount).toBe(1)

    if (!(await helper.pathExists(mainImage))) {
      await asyncFs.copyFile(MAIN_IMAGE1_PATH, mainImage)
    }
    payload.images = ['unknown.jpg']
    res = await request(app)
      .post('/api/create-property')
      .set(env.X_ACCESS_TOKEN, token)
      .send(payload)
    expect(res.statusCode).toBe(400)

    res = await request(app)
      .post('/api/create-property')
      .set(env.X_ACCESS_TOKEN, token)
      .send(payload)
    expect(res.statusCode).toBe(400)

    payload.image = 'unknown.jpg'
    res = await request(app)
      .post('/api/create-property')
      .set(env.X_ACCESS_TOKEN, token)
      .send(payload)
    expect(res.statusCode).toBe(400)

    payload.image = MAIN_IMAGE1
    payload.images = [payload.image]
    res = await request(app)
      .post('/api/create-property')
      .set(env.X_ACCESS_TOKEN, token)
      .send(payload)
    expect(res.statusCode).toBe(400)

    res = await request(app)
      .post('/api/create-property')
      .set(env.X_ACCESS_TOKEN, token)
      .send({ image: 'image.jpg' })
    expect(res.statusCode).toBe(400)

    await testHelper.signout(token)
  })
})

describe('PUT /api/update-property', () => {
  it('should update a property', async () => {
    const token = await testHelper.signinAsAdmin()

    const mainImage = path.join(env.CDN_TEMP_PROPERTIES, MAIN_IMAGE2)
    if (!(await helper.pathExists(mainImage))) {
      await asyncFs.copyFile(MAIN_IMAGE2_PATH, mainImage)
    }

    const additionalImage1 = path.join(env.CDN_TEMP_PROPERTIES, ADDITIONAL_IMAGE2_1)
    if (!(await helper.pathExists(additionalImage1))) {
      await asyncFs.copyFile(ADDITIONAL_IMAGE2_1_PATH, additionalImage1)
    }

    const additionalImage2 = path.join(env.CDN_TEMP_PROPERTIES, ADDITIONAL_IMAGE2_2)
    if (!(await helper.pathExists(additionalImage2))) {
      await asyncFs.copyFile(ADDITIONAL_IMAGE2_2_PATH, additionalImage2)
    }

    const payload: movininTypes.UpdatePropertyPayload = {
      _id: PROPERTY_ID,
      name: 'Beautiful Townhouse in Detroit',
      agency: AGENCY2_ID,
      type: movininTypes.PropertyType.Townhouse,
      description: '<p>Perspiciatis unde omnis iste natus error sit voluptatem accusantium rem aperiam, veritatis et quasi.</p>',
      image: MAIN_IMAGE2,
      images: [ADDITIONAL_IMAGE2_1, ADDITIONAL_IMAGE2_2],
      bedrooms: 2,
      bathrooms: 1,
      kitchens: 2,
      parkingSpaces: 2,
      size: 250,
      petsAllowed: true,
      furnished: false,
      aircon: false,
      minimumAge: 23,
      location: LOCATION2_ID,
      address: 'Detroit',
      price: 1000,
      hidden: false,
      cancellation: 50,
      available: true,
      rentalTerm: movininTypes.RentalTerm.Weekly,
      blockOnPay: false,
    }
    let res = await request(app)
      .put('/api/update-property')
      .set(env.X_ACCESS_TOKEN, token)
      .send(payload)
    expect(res.statusCode).toBe(200)
    let property = res.body
    expect(property.name).toBe('Beautiful Townhouse in Detroit')
    expect(property.agency).toBe(AGENCY2_ID)
    expect(property.type).toBe(movininTypes.PropertyType.Townhouse)
    expect(property.description).toBe('<p>Perspiciatis unde omnis iste natus error sit voluptatem accusantium rem aperiam, veritatis et quasi.</p>')
    expect(property.image).toBeDefined()
    expect(property.images.length).toBe(2)
    expect(property.bedrooms).toBe(2)
    expect(property.bathrooms).toBe(1)
    expect(property.kitchens).toBe(2)
    expect(property.parkingSpaces).toBe(2)
    expect(property.size).toBe(250)
    expect(property.petsAllowed).toBeTruthy()
    expect(property.furnished).toBeFalsy()
    expect(property.aircon).toBeFalsy()
    expect(property.minimumAge).toBe(23)
    expect(property.location).toBe(LOCATION2_ID)
    expect(property.address).toBe('Detroit')
    expect(property.price).toBe(1000)
    expect(property.hidden).toBeFalsy()
    expect(property.cancellation).toBe(50)
    expect(property.available).toBeTruthy()
    expect(property.rentalTerm).toBe(movininTypes.RentalTerm.Weekly)
    expect(property.blockOnPay).toBe(false)

    payload.image = ''
    payload.images = undefined
    res = await request(app)
      .put('/api/update-property')
      .set(env.X_ACCESS_TOKEN, token)
      .send(payload)
    expect(res.statusCode).toBe(200)
    property = res.body
    expect(property.image).toBeDefined()
    expect(property.images.length).toBe(0)

    if (!(await helper.pathExists(mainImage))) {
      await asyncFs.copyFile(MAIN_IMAGE2_PATH, mainImage)
    }
    if (!(await helper.pathExists(additionalImage1))) {
      await asyncFs.copyFile(ADDITIONAL_IMAGE2_1_PATH, additionalImage1)
    }
    if (!(await helper.pathExists(additionalImage2))) {
      await asyncFs.copyFile(ADDITIONAL_IMAGE2_2_PATH, additionalImage2)
    }
    payload.images = [ADDITIONAL_IMAGE2_1, ADDITIONAL_IMAGE2_2]
    res = await request(app)
      .put('/api/update-property')
      .set(env.X_ACCESS_TOKEN, token)
      .send(payload)
    expect(res.statusCode).toBe(200)

    if (!(await helper.pathExists(mainImage))) {
      await asyncFs.copyFile(MAIN_IMAGE2_PATH, mainImage)
    }
    payload.images = []
    res = await request(app)
      .put('/api/update-property')
      .set(env.X_ACCESS_TOKEN, token)
      .send(payload)
    expect(res.statusCode).toBe(200)

    if (await helper.pathExists(additionalImage1)) {
      asyncFs.unlink(additionalImage1)
    }
    if (!(await helper.pathExists(additionalImage1))) {
      await asyncFs.copyFile(ADDITIONAL_IMAGE2_1_PATH, additionalImage1)
    }
    if (!(await helper.pathExists(additionalImage2))) {
      await asyncFs.copyFile(ADDITIONAL_IMAGE2_2_PATH, additionalImage2)
    }
    property = await Property.findById(PROPERTY_ID)
    property.images = [ADDITIONAL_IMAGE2_1, ADDITIONAL_IMAGE2_2, `${nanoid()}.jpg`]
    property.image = `${nanoid()}.jpg`
    await property.save()
    payload.images = [ADDITIONAL_IMAGE2_1, `${nanoid()}.jpg`]
    res = await request(app)
      .put('/api/update-property')
      .set(env.X_ACCESS_TOKEN, token)
      .send(payload)
    expect(res.statusCode).toBe(200)

    property = await Property.findById(PROPERTY_ID)
    property.images = [`${nanoid()}.jpg`]
    await property.save()
    payload.images = []
    res = await request(app)
      .put('/api/update-property')
      .set(env.X_ACCESS_TOKEN, token)
      .send(payload)
    expect(res.statusCode).toBe(200)

    property = await Property.findById(PROPERTY_ID)
    property.images = []
    await property.save()
    if (!(await helper.pathExists(mainImage))) {
      await asyncFs.copyFile(MAIN_IMAGE2_PATH, mainImage)
    }
    if (!(await helper.pathExists(additionalImage1))) {
      await asyncFs.copyFile(ADDITIONAL_IMAGE2_1_PATH, additionalImage1)
    }
    if (!(await helper.pathExists(additionalImage2))) {
      await asyncFs.copyFile(ADDITIONAL_IMAGE2_2_PATH, additionalImage2)
    }
    payload._id = PROPERTY_ID
    payload.image = MAIN_IMAGE2
    payload.images = [ADDITIONAL_IMAGE2_1, ADDITIONAL_IMAGE2_2]
    res = await request(app)
      .put('/api/update-property')
      .set(env.X_ACCESS_TOKEN, token)
      .send(payload)
    expect(res.statusCode).toBe(200)

    payload._id = testHelper.GetRandromObjectIdAsString()
    res = await request(app)
      .put('/api/update-property')
      .set(env.X_ACCESS_TOKEN, token)
      .send(payload)
    expect(res.statusCode).toBe(204)

    payload._id = '0'
    res = await request(app)
      .put('/api/update-property')
      .set(env.X_ACCESS_TOKEN, token)
      .send(payload)
    expect(res.statusCode).toBe(400)

    res = await request(app)
      .put('/api/update-property')
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(500)

    await testHelper.signout(token)
  })
})

describe('POST /api/delete-property-image/:id/:image', () => {
  it('should delete an additional property image', async () => {
    const token = await testHelper.signinAsAdmin()

    let property = await Property.findById(PROPERTY_ID)
    expect(property?.images).toBeDefined()
    expect(property?.images?.length).toBe(2)
    const additionalImageName = (property?.images ?? [])[0]
    const additionalImagePath = path.join(env.CDN_PROPERTIES, additionalImageName)
    let imageExists = await helper.pathExists(additionalImagePath)
    expect(imageExists).toBeTruthy()
    let res = await request(app)
      .post(`/api/delete-property-image/${PROPERTY_ID}/${additionalImageName}`)
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(200)
    property = await Property.findById(PROPERTY_ID)
    expect(property?.images?.length).toBe(1)
    imageExists = await helper.pathExists(additionalImagePath)
    expect(imageExists).toBeFalsy()

    const image = `${nanoid()}.jpg`
    property!.images?.push(image)
    await property?.save()
    res = await request(app)
      .post(`/api/delete-property-image/${PROPERTY_ID}/${image}`)
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(200)

    res = await request(app)
      .post(`/api/delete-property-image/${testHelper.GetRandromObjectIdAsString()}/${additionalImageName}`)
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(204)

    res = await request(app)
      .post(`/api/delete-property-image/${PROPERTY_ID}/unknown.jpg`)
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(204)

    res = await request(app)
      .post(`/api/delete-property-image/0/${additionalImageName}`)
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(400)

    await testHelper.signout(token)
  })
})

describe('POST /api/upload-property-image', () => {
  it('should upload a property image', async () => {
    const token = await testHelper.signinAsAdmin()

    let res = await request(app)
      .post('/api/upload-property-image')
      .set(env.X_ACCESS_TOKEN, token)
      .attach('image', MAIN_IMAGE1_PATH)
    expect(res.statusCode).toBe(200)
    const filename = res.body as string
    const filePath = path.resolve(env.CDN_TEMP_PROPERTIES, filename)
    const imageExists = await helper.pathExists(filePath)
    expect(imageExists).toBeTruthy()
    await asyncFs.unlink(filePath)

    res = await request(app)
      .post('/api/upload-property-image')
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(400)

    await testHelper.signout(token)
  })
})

describe('POST /api/delete-temp-property-image/:image', () => {
  it('should delete a temporary property image', async () => {
    const token = await testHelper.signinAsAdmin()

    const tempImage = path.join(env.CDN_TEMP_PROPERTIES, MAIN_IMAGE1)
    if (!(await helper.pathExists(tempImage))) {
      await asyncFs.copyFile(MAIN_IMAGE1_PATH, tempImage)
    }
    let res = await request(app)
      .post(`/api/delete-temp-property-image/${MAIN_IMAGE1}`)
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(200)
    const tempImageExists = await helper.pathExists(tempImage)
    expect(tempImageExists).toBeFalsy()

    // res = await request(app)
    //   .post('/api/delete-temp-property-image/unknown.jpg')
    //   .set(env.X_ACCESS_TOKEN, token)
    // expect(res.statusCode).toBe(400)

    await testHelper.signout(token)
  })
})

describe('GET /api/property/:id/:language', () => {
  it('should return a property', async () => {
    let res = await request(app)
      .get(`/api/property/${PROPERTY_ID}/${testHelper.LANGUAGE}`)
    expect(res.statusCode).toBe(200)
    expect(res.body.name).toBe('Beautiful Townhouse in Detroit')

    res = await request(app)
      .get(`/api/property/${testHelper.GetRandromObjectIdAsString()}/${testHelper.LANGUAGE}`)
    expect(res.statusCode).toBe(204)

    res = await request(app)
      .get(`/api/property/0/${testHelper.LANGUAGE}`)
    expect(res.statusCode).toBe(400)
  })
})

describe('POST /api/properties/:page/:size', () => {
  it('should return properties', async () => {
    const token = await testHelper.signinAsAdmin()

    const payload: movininTypes.GetPropertiesPayload = {
      agencies: [AGENCY2_ID],
      types: [movininTypes.PropertyType.Townhouse],
      rentalTerms: [movininTypes.RentalTerm.Weekly],
      availability: [movininTypes.Availablity.Available, movininTypes.Availablity.Unavailable],
      language: testHelper.LANGUAGE,
    }

    let res = await request(app)
      .post(`/api/properties/${testHelper.PAGE}/${testHelper.SIZE}`)
      .set(env.X_ACCESS_TOKEN, token)
      .send(payload)
    expect(res.statusCode).toBe(200)
    expect(res.body[0].resultData.length).toBeGreaterThan(0)

    res = await request(app)
      .post(`/api/properties/${testHelper.PAGE}/${testHelper.SIZE}`)
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(400)

    payload.availability = [movininTypes.Availablity.Available]
    res = await request(app)
      .post(`/api/properties/${testHelper.PAGE}/${testHelper.SIZE}`)
      .set(env.X_ACCESS_TOKEN, token)
      .send(payload)
    expect(res.statusCode).toBe(200)
    expect(res.body[0].resultData.length).toBeGreaterThan(0)

    payload.availability = [movininTypes.Availablity.Unavailable]
    res = await request(app)
      .post(`/api/properties/${testHelper.PAGE}/${testHelper.SIZE}`)
      .set(env.X_ACCESS_TOKEN, token)
      .send(payload)
    expect(res.statusCode).toBe(200)
    expect(res.body[0].resultData.length).toBe(0)

    payload.availability = []
    res = await request(app)
      .post(`/api/properties/${testHelper.PAGE}/${testHelper.SIZE}`)
      .set(env.X_ACCESS_TOKEN, token)
      .send(payload)
    expect(res.statusCode).toBe(200)
    expect(res.body[0].resultData.length).toBe(0)

    payload.types = undefined
    payload.rentalTerms = undefined
    payload.availability = undefined
    payload.language = undefined
    res = await request(app)
      .post(`/api/properties/${testHelper.PAGE}/${testHelper.SIZE}`)
      .set(env.X_ACCESS_TOKEN, token)
      .send(payload)
    expect(res.statusCode).toBe(200)
    expect(res.body[0].resultData.length).toBe(0)

    await testHelper.signout(token)
  })
})

describe('POST /api/booking-properties/:page/:size', () => {
  it('should return booking properties', async () => {
    const token = await testHelper.signinAsAdmin()

    const payload: movininTypes.GetBookingPropertiesPayload = {
      agency: AGENCY2_ID,
      location: LOCATION2_ID,
    }
    let res = await request(app)
      .post(`/api/booking-properties/${testHelper.PAGE}/${testHelper.SIZE}`)
      .set(env.X_ACCESS_TOKEN, token)
      .send(payload)
    expect(res.statusCode).toBe(200)
    expect(res.body.length).toBeGreaterThan(0)

    res = await request(app)
      .post(`/api/booking-properties/unknown/${testHelper.SIZE}`)
      .set(env.X_ACCESS_TOKEN, token)
      .send(payload)
    expect(res.statusCode).toBe(400)

    await testHelper.signout(token)
  })
})

describe('POST /api/frontend-properties/:page/:size', () => {
  it('should return frontend properties', async () => {
    const payload: movininTypes.GetPropertiesPayload = {
      agencies: [AGENCY2_ID],
      types: [movininTypes.PropertyType.Townhouse],
      rentalTerms: [movininTypes.RentalTerm.Weekly],
      location: LOCATION2_ID,
      from: new Date(2024, 0, 1),
      to: new Date(2024, 1, 1),
    }
    let res = await request(app)
      .post(`/api/frontend-properties/${testHelper.PAGE}/${testHelper.SIZE}`)
      .send(payload)
    expect(res.statusCode).toBe(200)
    expect(res.body[0].resultData.length).toBeGreaterThan(0)

    payload.types = undefined
    payload.rentalTerms = undefined
    res = await request(app)
      .post(`/api/frontend-properties/${testHelper.PAGE}/${testHelper.SIZE}`)
      .send(payload)
    expect(res.statusCode).toBe(200)
    expect(res.body[0].resultData.length).toBe(0)

    // test failure (from missing)
    payload.from = undefined
    res = await request(app)
      .post(`/api/frontend-properties/${testHelper.PAGE}/${testHelper.SIZE}`)
      .send(payload)
    expect(res.statusCode).toBe(400)
    payload.from = new Date(2024, 0, 1)

    // test failure (to missing)
    payload.to = undefined
    res = await request(app)
      .post(`/api/frontend-properties/${testHelper.PAGE}/${testHelper.SIZE}`)
      .send(payload)
    expect(res.statusCode).toBe(400)
    payload.to = new Date(2024, 1, 1)

    res = await request(app)
      .post(`/api/frontend-properties/${testHelper.PAGE}/${testHelper.SIZE}`)
    expect(res.statusCode).toBe(400)

    const env = await import('../src/config/env.config.js')
    jest.unstable_mockModule('../src/config/env.config.js', () => ({
      ADMIN_HOST: 'http://localhost:3003',
      FRONTEND_HOST: 'http://localhost:3004',
      STRIPE_SECRET_KEY: 'xxxxxxxxxxxx',
      DB_SERVER_SIDE_JAVASCRIPT: true,
      DEFAULT_LANGUAGE: 'en',
      CDN_ROOT: env.CDN_ROOT,
      CDN_USERS: env.CDN_USERS,
      CDN_TEMP_USERS: env.CDN_TEMP_USERS,
      CDN_LOCATIONS: env.CDN_LOCATIONS,
      CDN_TEMP_LOCATIONS: env.CDN_TEMP_LOCATIONS,
      CDN_PROPERTIES: env.CDN_PROPERTIES,
      CDN_TEMP_PROPERTIES: env.CDN_TEMP_PROPERTIES,
    }))

    jest.unstable_mockModule('../src/models/Location.js', () => ({
      default: {
        find: jest.fn(() => ({
          select: () => ({
            lean: () => Promise.resolve([
              { _id: new mongoose.Types.ObjectId('64a6f7a739a67a2f1c3c1234') },
              { _id: new mongoose.Types.ObjectId('64a6f7a739a67a2f1c3c5678') },
            ]),
          }),
        })),
      },
    }))

    jest.unstable_mockModule('../src/models/Property.js', () => ({
      default: {
        aggregate: jest.fn(() => Promise.resolve([
          {
            resultData: [
              {
                _id: new mongoose.Types.ObjectId(),
                name: 'Mocked Property',
                rentalTerm: 'Weekly',
                dailyPrice: 100,
                agency: {
                  _id: '64a6f7a739a67a2f1c3b4567',
                  fullName: 'Test Agency',
                  avatar: 'avatar.png',
                },
              },
            ],
            pageInfo: [{ totalRecords: 1 }],
          },
        ])),
      },
    }))

    jest.resetModules()
    await jest.isolateModulesAsync(async () => {
      const newApp = (await import('../src/app.js')).default
      res = await request(newApp)
        .post(`/api/frontend-properties/${testHelper.PAGE}/${testHelper.SIZE}`)
        .send(payload)
      expect(res.statusCode).toBe(200)
      expect(res.body[0].resultData.length).toBe(1)
    })
  })

  it('should sort frontend properties by price ascending and descending and default', async () => {
    const SORT_LOCATION_ID = await testHelper.createLocation('Sort Test EN', 'Sort Test FR')

    const propA = new Property({
      name: 'Alpha Property Low Price',
      type: movininTypes.PropertyType.Townhouse,
      agency: new mongoose.Types.ObjectId(AGENCY2_ID),
      location: new mongoose.Types.ObjectId(SORT_LOCATION_ID),
      description: 'Test Property A',
      bedrooms: 1,
      bathrooms: 1,
      kitchens: 1,
      parkingSpaces: 0,
      size: 50,
      petsAllowed: false,
      furnished: true,
      aircon: true,
      minimumAge: 21,
      price: 70, // daily: 70 / 7 = 10 / day
      rentalTerm: movininTypes.RentalTerm.Weekly,
      available: true,
      hidden: false,
    })
    await propA.save()

    const propB = new Property({
      name: 'Beta Property High Price',
      type: movininTypes.PropertyType.Townhouse,
      agency: new mongoose.Types.ObjectId(AGENCY2_ID),
      location: new mongoose.Types.ObjectId(SORT_LOCATION_ID),
      description: 'Test Property B',
      bedrooms: 1,
      bathrooms: 1,
      kitchens: 1,
      parkingSpaces: 0,
      size: 50,
      petsAllowed: false,
      furnished: true,
      aircon: true,
      minimumAge: 21,
      price: 500, // daily: 500 / day
      rentalTerm: movininTypes.RentalTerm.Daily,
      available: true,
      hidden: false,
    })
    await propB.save()

    const propC = new Property({
      name: 'Gamma Property Mid Price',
      type: movininTypes.PropertyType.Townhouse,
      agency: new mongoose.Types.ObjectId(AGENCY2_ID),
      location: new mongoose.Types.ObjectId(SORT_LOCATION_ID),
      description: 'Test Property C',
      bedrooms: 1,
      bathrooms: 1,
      kitchens: 1,
      parkingSpaces: 0,
      size: 50,
      petsAllowed: false,
      furnished: true,
      aircon: true,
      minimumAge: 21,
      price: 50, // daily: 50 / day
      rentalTerm: movininTypes.RentalTerm.Daily,
      available: true,
      hidden: false,
    })
    await propC.save()

    try {
      const payload: movininTypes.GetPropertiesPayload = {
        agencies: [AGENCY2_ID],
        types: [movininTypes.PropertyType.Townhouse],
        rentalTerms: [movininTypes.RentalTerm.Weekly, movininTypes.RentalTerm.Daily],
        location: SORT_LOCATION_ID,
        from: new Date(2024, 0, 1),
        to: new Date(2024, 1, 1),
      }

      // 1. Price Ascending (Low to High): propA ($10/day) -> propC ($50/day) -> propB ($500/day)
      let res = await request(app)
        .post('/api/frontend-properties/1/10')
        .send({ ...payload, sortBy: movininTypes.PropertySortType.PriceAsc })
      expect(res.statusCode).toBe(200)
      const ascNames = res.body[0].resultData.map((p: any) => p.name)
      expect(ascNames).toEqual([
        'Alpha Property Low Price',
        'Gamma Property Mid Price',
        'Beta Property High Price',
      ])

      // 2. Price Descending (High to Low): propB ($500/day) -> propC ($50/day) -> propA ($10/day)
      res = await request(app)
        .post('/api/frontend-properties/1/10')
        .send({ ...payload, sortBy: movininTypes.PropertySortType.PriceDesc })
      expect(res.statusCode).toBe(200)
      const descNames = res.body[0].resultData.map((p: any) => p.name)
      expect(descNames).toEqual([
        'Beta Property High Price',
        'Gamma Property Mid Price',
        'Alpha Property Low Price',
      ])

      // 3. Default (Alphabetical by name): Alpha -> Beta -> Gamma
      res = await request(app)
        .post('/api/frontend-properties/1/10')
        .send({ ...payload, sortBy: movininTypes.PropertySortType.Default })
      expect(res.statusCode).toBe(200)
      const defaultNames = res.body[0].resultData.map((p: any) => p.name)
      expect(defaultNames).toEqual([
        'Alpha Property Low Price',
        'Beta Property High Price',
        'Gamma Property Mid Price',
      ])

      // 4. Pagination with PriceAsc: page 1 of size 2, then page 2 of size 2
      const page1Res = await request(app)
        .post('/api/frontend-properties/1/2')
        .send({ ...payload, sortBy: movininTypes.PropertySortType.PriceAsc })
      expect(page1Res.statusCode).toBe(200)
      expect(page1Res.body[0].resultData.map((p: any) => p.name)).toEqual([
        'Alpha Property Low Price',
        'Gamma Property Mid Price',
      ])
      expect(page1Res.body[0].pageInfo[0].totalRecords).toBe(3)

      const page2Res = await request(app)
        .post('/api/frontend-properties/2/2')
        .send({ ...payload, sortBy: movininTypes.PropertySortType.PriceAsc })
      expect(page2Res.statusCode).toBe(200)
      expect(page2Res.body[0].resultData.map((p: any) => p.name)).toEqual([
        'Beta Property High Price',
      ])
    } finally {
      await Property.deleteMany({ _id: { $in: [propA._id, propB._id, propC._id] } })
      await testHelper.deleteLocation(SORT_LOCATION_ID)
    }
  })

  it('should handle equal price properties consistently with secondary sort', async () => {
    const TIE_LOCATION_ID = await testHelper.createLocation('Tie Test EN', 'Tie Test FR')

    const propTie1 = new Property({
      name: 'Zoo Property',
      type: movininTypes.PropertyType.Townhouse,
      agency: new mongoose.Types.ObjectId(AGENCY2_ID),
      location: new mongoose.Types.ObjectId(TIE_LOCATION_ID),
      description: 'Zoo Property',
      bedrooms: 1,
      bathrooms: 1,
      kitchens: 1,
      parkingSpaces: 0,
      size: 50,
      petsAllowed: false,
      furnished: true,
      aircon: true,
      minimumAge: 21,
      price: 100,
      rentalTerm: movininTypes.RentalTerm.Daily,
      available: true,
      hidden: false,
    })
    const propTie2 = new Property({
      name: 'Apple Property',
      type: movininTypes.PropertyType.Townhouse,
      agency: new mongoose.Types.ObjectId(AGENCY2_ID),
      location: new mongoose.Types.ObjectId(TIE_LOCATION_ID),
      description: 'Apple Property',
      bedrooms: 1,
      bathrooms: 1,
      kitchens: 1,
      parkingSpaces: 0,
      size: 50,
      petsAllowed: false,
      furnished: true,
      aircon: true,
      minimumAge: 21,
      price: 100,
      rentalTerm: movininTypes.RentalTerm.Daily,
      available: true,
      hidden: false,
    })
    await propTie1.save()
    await propTie2.save()

    try {
      const payload: movininTypes.GetPropertiesPayload = {
        agencies: [AGENCY2_ID],
        types: [movininTypes.PropertyType.Townhouse],
        rentalTerms: [movininTypes.RentalTerm.Daily],
        location: TIE_LOCATION_ID,
        from: new Date(2024, 0, 1),
        to: new Date(2024, 1, 1),
        sortBy: movininTypes.PropertySortType.PriceAsc,
      }

      const res = await request(app)
        .post('/api/frontend-properties/1/10')
        .send(payload)
      expect(res.statusCode).toBe(200)
      const names = res.body[0].resultData.map((p: any) => p.name)
      const appleIndex = names.indexOf('Apple Property')
      const zooIndex = names.indexOf('Zoo Property')
      expect(appleIndex).toBeGreaterThanOrEqual(0)
      expect(zooIndex).toBeGreaterThanOrEqual(0)
      expect(appleIndex).toBeLessThan(zooIndex)
    } finally {
      await Property.deleteMany({ _id: { $in: [propTie1._id, propTie2._id] } })
      await testHelper.deleteLocation(TIE_LOCATION_ID)
    }
  })
})

describe('GET /api/check-property/:id', () => {
  it('should check a property', async () => {
    const token = await testHelper.signinAsAdmin()

    let res = await request(app)
      .get(`/api/check-property/${PROPERTY_ID}`)
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(204)

    const booking = new Booking({
      agency: AGENCY1_ID,
      property: PROPERTY_ID,
      renter: testHelper.getUserId(),
      location: LOCATION1_ID,
      from: new Date(2024, 2, 1),
      to: new Date(1990, 2, 4),
      status: movininTypes.BookingStatus.Pending,
      cancellation: true,
      price: 4000,
    })
    await booking.save()
    res = await request(app)
      .get(`/api/check-property/${PROPERTY_ID}`)
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(200)
    await Booking.deleteOne({ _id: booking._id })

    res = await request(app)
      .get('/api/check-property/0')
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(400)

    res = await request(app)
      .get('/api/check-property/0')
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(400)

    await testHelper.signout(token)
  })
})

describe('DELETE /api/delete-property/:id', () => {
  it('should delete a property', async () => {
    const token = await testHelper.signinAsAdmin()

    let res = await request(app)
      .delete(`/api/delete-property/${PROPERTY_ID}`)
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(200)

    let property = new Property({
      name: 'Beautiful House in Detroit',
      agency: AGENCY1_ID,
      type: movininTypes.PropertyType.House,
      description: '<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium rem aperiam, veritatis et quasi.</p>',
      image: null,
      images: null,
      bedrooms: 3,
      bathrooms: 2,
      kitchens: 1,
      parkingSpaces: 1,
      size: 200,
      petsAllowed: false,
      furnished: true,
      aircon: true,
      minimumAge: 21,
      location: LOCATION1_ID,
      address: '',
      price: 1000,
      hidden: true,
      cancellation: 0,
      available: false,
      rentalTerm: movininTypes.RentalTerm.Daily,
    })
    await property.save()
    res = await request(app)
      .delete(`/api/delete-property/${property._id.toString()}`)
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(200)

    property = new Property({
      name: 'Beautiful House in Detroit',
      agency: AGENCY1_ID,
      type: movininTypes.PropertyType.House,
      description: '<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium rem aperiam, veritatis et quasi.</p>',
      image: `${nanoid()}.jpg`,
      images: [`${nanoid()}.jpg`],
      bedrooms: 3,
      bathrooms: 2,
      kitchens: 1,
      parkingSpaces: 1,
      size: 200,
      petsAllowed: false,
      furnished: true,
      aircon: true,
      minimumAge: 21,
      location: LOCATION1_ID,
      address: '',
      price: 1000,
      hidden: true,
      cancellation: 0,
      available: false,
      rentalTerm: movininTypes.RentalTerm.Daily,
    })
    await property.save()
    res = await request(app)
      .delete(`/api/delete-property/${property._id.toString()}`)
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(200)

    res = await request(app)
      .delete(`/api/delete-property/${testHelper.GetRandromObjectIdAsString()}`)
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(204)

    res = await request(app)
      .delete('/api/delete-property/0')
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(400)

    res = await request(app)
      .delete('/api/delete-property/0')
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(400)

    await testHelper.signout(token)
  })
})
