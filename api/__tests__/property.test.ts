import 'dotenv/config'
import request from 'supertest'
import url from 'url'
import path from 'path'
import fs from 'node:fs/promises'
import { nanoid } from 'nanoid'
import * as movininTypes from ':movinin-types'
import * as databaseHelper from '../src/common/databaseHelper'
import app from '../src/app'
import * as env from '../src/config/env.config'
import * as testHelper from './testHelper'
import * as helper from '../src/common/helper'
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

//
// Unit tests
//

describe('POST /api/create-property', () => {
  it('should create a property', async () => {
    const token = await testHelper.signinAsAdmin()

    const mainImage = path.join(env.CDN_TEMP_PROPERTIES, MAIN_IMAGE1)
    if (!await helper.exists(mainImage)) {
      await fs.copyFile(MAIN_IMAGE1_PATH, mainImage)
    }
    const additionalImage1 = path.join(env.CDN_TEMP_PROPERTIES, ADDITIONAL_IMAGE1_1)
    if (!await helper.exists(additionalImage1)) {
      await fs.copyFile(ADDITIONAL_IMAGE1_1_PATH, additionalImage1)
    }
    const additionalImage2 = path.join(env.CDN_TEMP_PROPERTIES, ADDITIONAL_IMAGE1_2)
    if (!await helper.exists(additionalImage2)) {
      await fs.copyFile(ADDITIONAL_IMAGE1_2_PATH, additionalImage2)
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
    PROPERTY_ID = res.body._id

    if (!await helper.exists(mainImage)) {
      await fs.copyFile(MAIN_IMAGE1_PATH, mainImage)
    }
    payload.images = undefined
    res = await request(app)
      .post('/api/create-property')
      .set(env.X_ACCESS_TOKEN, token)
      .send(payload)
    expect(res.statusCode).toBe(200)
    const deleteRes = await Property.deleteOne({ _id: res.body._id })
    expect(deleteRes.deletedCount).toBe(1)

    if (!await helper.exists(mainImage)) {
      await fs.copyFile(MAIN_IMAGE1_PATH, mainImage)
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
    if (!await helper.exists(mainImage)) {
      await fs.copyFile(MAIN_IMAGE2_PATH, mainImage)
    }

    const additionalImage1 = path.join(env.CDN_TEMP_PROPERTIES, ADDITIONAL_IMAGE2_1)
    if (!await helper.exists(additionalImage1)) {
      await fs.copyFile(ADDITIONAL_IMAGE2_1_PATH, additionalImage1)
    }

    const additionalImage2 = path.join(env.CDN_TEMP_PROPERTIES, ADDITIONAL_IMAGE2_2)
    if (!await helper.exists(additionalImage2)) {
      await fs.copyFile(ADDITIONAL_IMAGE2_2_PATH, additionalImage2)
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

    if (!await helper.exists(mainImage)) {
      await fs.copyFile(MAIN_IMAGE2_PATH, mainImage)
    }
    if (!await helper.exists(additionalImage1)) {
      await fs.copyFile(ADDITIONAL_IMAGE2_1_PATH, additionalImage1)
    }
    if (!await helper.exists(additionalImage2)) {
      await fs.copyFile(ADDITIONAL_IMAGE2_2_PATH, additionalImage2)
    }
    payload.images = [ADDITIONAL_IMAGE2_1, ADDITIONAL_IMAGE2_2]
    res = await request(app)
      .put('/api/update-property')
      .set(env.X_ACCESS_TOKEN, token)
      .send(payload)
    expect(res.statusCode).toBe(200)

    if (!await helper.exists(mainImage)) {
      await fs.copyFile(MAIN_IMAGE2_PATH, mainImage)
    }
    payload.images = []
    res = await request(app)
      .put('/api/update-property')
      .set(env.X_ACCESS_TOKEN, token)
      .send(payload)
    expect(res.statusCode).toBe(200)

    if (await helper.exists(additionalImage1)) {
      fs.unlink(additionalImage1)
    }
    if (!await helper.exists(additionalImage1)) {
      await fs.copyFile(ADDITIONAL_IMAGE2_1_PATH, additionalImage1)
    }
    if (!await helper.exists(additionalImage2)) {
      await fs.copyFile(ADDITIONAL_IMAGE2_2_PATH, additionalImage2)
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
    if (!await helper.exists(mainImage)) {
      await fs.copyFile(MAIN_IMAGE2_PATH, mainImage)
    }
    if (!await helper.exists(additionalImage1)) {
      await fs.copyFile(ADDITIONAL_IMAGE2_1_PATH, additionalImage1)
    }
    if (!await helper.exists(additionalImage2)) {
      await fs.copyFile(ADDITIONAL_IMAGE2_2_PATH, additionalImage2)
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

    res = await request(app)
      .put('/api/update-property')
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(400)

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
    let imageExists = await helper.exists(additionalImagePath)
    expect(imageExists).toBeTruthy()
    let res = await request(app)
      .post(`/api/delete-property-image/${PROPERTY_ID}/${additionalImageName}`)
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(200)
    property = await Property.findById(PROPERTY_ID)
    expect(property?.images?.length).toBe(1)
    imageExists = await helper.exists(additionalImagePath)
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
    const imageExists = await helper.exists(filePath)
    expect(imageExists).toBeTruthy()
    await fs.unlink(filePath)

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
    if (!await helper.exists(tempImage)) {
      await fs.copyFile(MAIN_IMAGE1_PATH, tempImage)
    }
    let res = await request(app)
      .post(`/api/delete-temp-property-image/${MAIN_IMAGE1}`)
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(200)
    const tempImageExists = await helper.exists(tempImage)
    expect(tempImageExists).toBeFalsy()

    res = await request(app)
      .post('/api/delete-temp-property-image/unknown.jpg')
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(400)

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

    res = await request(app)
      .post(`/api/frontend-properties/${testHelper.PAGE}/${testHelper.SIZE}`)
    expect(res.statusCode).toBe(400)
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
      .delete(`/api/delete-property/${property.id}`)
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
      .delete(`/api/delete-property/${property.id}`)
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
