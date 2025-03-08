import 'dotenv/config'
import request from 'supertest'
import url from 'url'
import path from 'path'
import fs from 'node:fs/promises'
import { nanoid } from 'nanoid'
import * as movininTypes from ':movinin-types'
import * as databaseHelper from '../src/common/databaseHelper'
import * as testHelper from './testHelper'
import app from '../src/app'
import * as env from '../src/config/env.config'
import * as helper from '../src/common/helper'
import User from '../src/models/User'
import Property from '../src/models/Property'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let AGENCY1_ID: string
let AGENCY2_ID: string
let AGENCY1_NAME: string

//
// Connecting and initializing the database before running the test suite
//
beforeAll(async () => {
  testHelper.initializeLogger()

  await databaseHelper.connect(env.DB_URI, false, false)

  await testHelper.initialize()

  // create two agencies
  AGENCY1_NAME = testHelper.getAgencyName()
  const agencyName2 = testHelper.getAgencyName()
  AGENCY1_ID = await testHelper.createAgency(`${AGENCY1_NAME}@test.movinin.io`, AGENCY1_NAME)
  AGENCY2_ID = await testHelper.createAgency(`${agencyName2}@test.movinin.io`, agencyName2)
})

//
// Closing and cleaning the database connection after running the test suite
//
afterAll(async () => {
  await testHelper.close()

  // delete agencies
  await testHelper.deleteAgency(AGENCY1_ID)
  await testHelper.deleteAgency(AGENCY2_ID)

  await databaseHelper.close()
})

//
// Unit tests
//

describe('POST /api/validate-agency', () => {
  it('should validate a agency', async () => {
    const token = await testHelper.signinAsAdmin()

    let payload: movininTypes.ValidateAgencyPayload = { fullName: AGENCY1_NAME }
    let res = await request(app)
      .post('/api/validate-agency')
      .set(env.X_ACCESS_TOKEN, token)
      .send(payload)
    expect(res.statusCode).toBe(204)

    payload = { fullName: testHelper.getAgencyName() }
    res = await request(app)
      .post('/api/validate-agency')
      .set(env.X_ACCESS_TOKEN, token)
      .send(payload)
    expect(res.statusCode).toBe(200)

    res = await request(app)
      .post('/api/validate-agency')
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(400)

    await testHelper.signout(token)
  })
})

describe('PUT /api/update-agency', () => {
  it('should update an agency', async () => {
    const token = await testHelper.signinAsAdmin()

    AGENCY1_NAME = testHelper.getAgencyName()
    const bio = 'bio1'
    const location = 'location1'
    const phone = '01010101'
    const payLater = false

    const payload: movininTypes.UpdateAgencyPayload = {
      _id: AGENCY1_ID,
      fullName: AGENCY1_NAME,
      bio,
      location,
      phone,
      payLater,
    }

    let res = await request(app)
      .put('/api/update-agency')
      .set(env.X_ACCESS_TOKEN, token)
      .send(payload)
    expect(res.statusCode).toBe(200)
    expect(res.body.fullName).toBe(AGENCY1_NAME)
    expect(res.body.bio).toBe(bio)
    expect(res.body.location).toBe(location)
    expect(res.body.phone).toBe(phone)
    expect(res.body.payLater).toBeFalsy()

    payload._id = testHelper.GetRandromObjectIdAsString()
    res = await request(app)
      .put('/api/update-agency')
      .set(env.X_ACCESS_TOKEN, token)
      .send(payload)
    expect(res.statusCode).toBe(204)

    res = await request(app)
      .put('/api/update-agency')
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(400)

    await testHelper.signout(token)
  })
})

describe('GET /api/agency/:id', () => {
  it('should get a agency', async () => {
    const token = await testHelper.signinAsAdmin()

    let res = await request(app)
      .get(`/api/agency/${AGENCY1_ID}`)
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(200)
    expect(res.body.fullName).toBe(AGENCY1_NAME)

    res = await request(app)
      .get(`/api/agency/${testHelper.GetRandromObjectIdAsString()}`)
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(204)

    res = await request(app)
      .get('/api/agency/0')
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(400)

    await testHelper.signout(token)
  })
})

describe('GET /api/agencies/:page/:size', () => {
  it('should get agencies', async () => {
    const token = await testHelper.signinAsAdmin()

    let res = await request(app)
      .get(`/api/agencies/${testHelper.PAGE}/${testHelper.SIZE}`)
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(200)
    expect(res.body[0].resultData.length).toBeGreaterThan(1)

    res = await request(app)
      .get(`/api/agencies/unknown/${testHelper.SIZE}`)
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(400)

    res = await request(app)
      .get(`/api/agencies/${testHelper.PAGE}/${testHelper.SIZE}?s=${nanoid()}`)
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(200)
    expect(res.body[0].resultData.length).toBe(0)

    await testHelper.signout(token)
  })
})

describe('GET /api/all-agencies', () => {
  it('should get all agencies', async () => {
    let res = await request(app)
      .get('/api/all-agencies')
    expect(res.statusCode).toBe(200)
    expect(res.body.length).toBeGreaterThan(1)

    await databaseHelper.close()
    res = await request(app)
      .get('/api/all-agencies')
    expect(res.statusCode).toBe(400)
    expect(await databaseHelper.connect(env.DB_URI, false, false)).toBeTruthy()
  })
})

describe('DELETE /api/delete-agency/:id', () => {
  it('should delete a agency', async () => {
    const token = await testHelper.signinAsAdmin()

    let agencyName = testHelper.getAgencyName()
    let agencyId = await testHelper.createAgency(`${agencyName}@test.movinin.io`, agencyName)
    let agency = await User.findById(agencyId)
    expect(agency).not.toBeNull()
    let avatarName = 'avatar1.jpg'
    let avatarPath = path.resolve(__dirname, `./img/${avatarName}`)
    let avatar = path.join(env.CDN_USERS, avatarName)
    if (!await helper.exists(avatar)) {
      await fs.copyFile(avatarPath, avatar)
    }
    agency!.avatar = avatarName
    await agency?.save()
    let locationId = await testHelper.createLocation('Location 1 EN', 'Location 1 FR')
    const propertyImageName = 'main1.jpg'
    const propertyImagePath = path.resolve(__dirname, `./img/${propertyImageName}`)
    const additionalImageName = 'additional1-1.jpg'
    const additionalImagePath = path.resolve(__dirname, `./img/${additionalImageName}`)
    let property = new Property({
      name: 'Beautiful House in Detroit',
      agency: agencyId,
      type: movininTypes.PropertyType.House,
      description: '<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium rem aperiam, veritatis et quasi.</p>',
      image: propertyImageName,
      images: [additionalImageName],
      bedrooms: 3,
      bathrooms: 2,
      kitchens: 1,
      parkingSpaces: 1,
      size: 200,
      petsAllowed: false,
      furnished: true,
      aircon: true,
      minimumAge: 21,
      location: locationId,
      address: '',
      price: 4000,
      hidden: true,
      cancellation: 0,
      available: false,
      rentalTerm: movininTypes.RentalTerm.Monthly,
    })
    const propertyImage = path.join(env.CDN_PROPERTIES, propertyImageName)
    if (!await helper.exists(propertyImage)) {
      await fs.copyFile(propertyImagePath, propertyImage)
    }
    const additionalImage = path.join(env.CDN_PROPERTIES, additionalImageName)
    if (!await helper.exists(propertyImage)) {
      await fs.copyFile(additionalImagePath, additionalImage)
    }
    await property.save()
    let res = await request(app)
      .delete(`/api/delete-agency/${agencyId}`)
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(200)
    agency = await User.findById(agencyId)
    expect(agency).toBeNull()
    await testHelper.deleteLocation(locationId)
    expect(await helper.exists(propertyImage)).toBeFalsy()
    expect(await helper.exists(additionalImage)).toBeFalsy()

    res = await request(app)
      .delete(`/api/delete-agency/${testHelper.GetRandromObjectIdAsString()}`)
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(204)

    res = await request(app)
      .delete('/api/delete-agency/0')
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(400)

    agencyName = testHelper.getAgencyName()
    agencyId = await testHelper.createAgency(`${agencyName}@test.movinin.io`, agencyName)
    agency = await User.findById(agencyId)
    expect(agency).not.toBeNull()
    await agency?.save()
    res = await request(app)
      .delete(`/api/delete-agency/${agencyId}`)
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(200)
    agency = await User.findById(agencyId)
    expect(agency).toBeNull()

    agencyName = testHelper.getAgencyName()
    agencyId = await testHelper.createAgency(`${agencyName}@test.movinin.io`, agencyName)
    agency = await User.findById(agencyId)
    expect(agency).not.toBeNull()
    agency!.avatar = `${nanoid()}.jpg`
    await agency?.save()
    locationId = await testHelper.createLocation('Location 1 EN', 'Location 1 FR')
    property = new Property({
      name: 'Beautiful House in Detroit',
      agency: agencyId,
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
      location: locationId,
      address: '',
      price: 4000,
      hidden: true,
      cancellation: 0,
      available: false,
      rentalTerm: movininTypes.RentalTerm.Monthly,
    })
    await property.save()
    res = await request(app)
      .delete(`/api/delete-agency/${agencyId}`)
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(200)
    agency = await User.findById(agencyId)
    expect(agency).toBeNull()
    await testHelper.deleteLocation(locationId)

    agencyName = testHelper.getAgencyName()
    agencyId = await testHelper.createAgency(`${agencyName}@test.movinin.io`, agencyName)
    agency = await User.findById(agencyId)
    expect(agency).not.toBeNull()
    avatarName = 'avatar1.jpg'
    avatarPath = path.resolve(__dirname, `./img/${avatarName}`)
    avatar = path.join(env.CDN_USERS, avatarName)
    if (!await helper.exists(avatar)) {
      await fs.copyFile(avatarPath, avatar)
    }
    agency!.avatar = avatarName
    await agency?.save()
    locationId = await testHelper.createLocation('Location 1 EN', 'Location 1 FR')
    property = new Property({
      name: 'Beautiful House in Detroit',
      agency: agencyId,
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
      location: locationId,
      address: '',
      price: 4000,
      hidden: true,
      cancellation: 0,
      available: false,
      rentalTerm: movininTypes.RentalTerm.Monthly,
    })
    await property.save()
    res = await request(app)
      .delete(`/api/delete-agency/${agencyId}`)
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(200)
    agency = await User.findById(agencyId)
    expect(agency).toBeNull()
    await testHelper.deleteLocation(locationId)

    await testHelper.signout(token)
  })
})
