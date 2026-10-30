import 'dotenv/config'
import { jest } from '@jest/globals'
import request from 'supertest'
import mongoose from 'mongoose'
import * as movininTypes from ':movinin-types'
import * as databaseHelper from '../src/utils/databaseHelper'
import app from '../src/app'
import * as env from '../src/config/env.config'
import * as testHelper from './testHelper'
import User from '../src/models/User'
import Property from '../src/models/Property'
import * as authHelper from '../src/utils/authHelper'

let AGENCY_ID: string
let LOCATION_ID: string
let VISIBLE_PROPERTY_ID: string
let HIDDEN_PROPERTY_ID: string

const CUSTOMER1_EMAIL = `${testHelper.getName('cust1')}@test.movinin.io`
const CUSTOMER2_EMAIL = `${testHelper.getName('cust2')}@test.movinin.io`
let CUSTOMER1_ID: string
let CUSTOMER2_ID: string
let CUSTOMER1_TOKEN: string
let CUSTOMER2_TOKEN: string
let ADMIN_TOKEN: string

beforeAll(async () => {
  testHelper.initializeLogger()
  await databaseHelper.connect(env.DB_URI, false, false)
  await testHelper.initialize()

  const agencyName = testHelper.getAgencyName()
  AGENCY_ID = await testHelper.createAgency(`${agencyName}@test.movinin.io`, agencyName)
  LOCATION_ID = await testHelper.createLocation('Test Location EN', 'Test Location FR')

  const passwordHash = await authHelper.hashPassword(testHelper.PASSWORD)

  const cust1 = new User({
    fullName: 'Customer One',
    email: CUSTOMER1_EMAIL,
    language: 'en',
    password: passwordHash,
    type: movininTypes.UserType.User,
  })
  await cust1.save()
  CUSTOMER1_ID = cust1._id.toString()

  const cust2 = new User({
    fullName: 'Customer Two',
    email: CUSTOMER2_EMAIL,
    language: 'en',
    password: passwordHash,
    type: movininTypes.UserType.User,
  })
  await cust2.save()
  CUSTOMER2_ID = cust2._id.toString()

  const visibleProperty = new Property({
    name: 'Visible Test Villa',
    agency: AGENCY_ID,
    type: movininTypes.PropertyType.House,
    description: '<p>A beautiful visible villa</p>',
    image: 'main.jpg',
    images: [],
    bedrooms: 3,
    bathrooms: 2,
    kitchens: 1,
    parkingSpaces: 1,
    size: 200,
    petsAllowed: true,
    furnished: true,
    aircon: true,
    location: LOCATION_ID,
    address: '123 Test St',
    price: 1500,
    hidden: false,
    cancellation: 0,
    available: true,
    rentalTerm: movininTypes.RentalTerm.Monthly,
    minimumAge: 21,
  })
  await visibleProperty.save()
  VISIBLE_PROPERTY_ID = visibleProperty._id.toString()

  const hiddenProperty = new Property({
    name: 'Hidden Test Villa',
    agency: AGENCY_ID,
    type: movininTypes.PropertyType.House,
    description: '<p>A hidden villa</p>',
    image: 'main2.jpg',
    images: [],
    bedrooms: 2,
    bathrooms: 1,
    kitchens: 1,
    parkingSpaces: 0,
    size: 100,
    petsAllowed: false,
    furnished: false,
    aircon: false,
    location: LOCATION_ID,
    address: '456 Hidden St',
    price: 1000,
    hidden: true,
    cancellation: 0,
    available: true,
    rentalTerm: movininTypes.RentalTerm.Monthly,
    minimumAge: 21,
  })
  await hiddenProperty.save()
  HIDDEN_PROPERTY_ID = hiddenProperty._id.toString()

  CUSTOMER1_TOKEN = await testHelper.signin(CUSTOMER1_EMAIL, movininTypes.AppType.Frontend)
  CUSTOMER2_TOKEN = await testHelper.signin(CUSTOMER2_EMAIL, movininTypes.AppType.Frontend)
  ADMIN_TOKEN = await testHelper.signinAsAdmin()
})

afterAll(async () => {
  await Property.deleteMany({ _id: { $in: [VISIBLE_PROPERTY_ID, HIDDEN_PROPERTY_ID] } })
  await User.deleteMany({ _id: { $in: [CUSTOMER1_ID, CUSTOMER2_ID] } })
  await testHelper.deleteAgency(AGENCY_ID)
  await testHelper.deleteLocation(LOCATION_ID)
  await testHelper.close()
  await databaseHelper.close()
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('PUT /api/saved-properties/:propertyId', () => {
  it('should return 400 for invalid property ID', async () => {
    const res = await request(app)
      .put('/api/saved-properties/invalid-id')
      .set(env.X_ACCESS_TOKEN, CUSTOMER1_TOKEN)

    expect(res.statusCode).toBe(400)
    expect(res.text).toBe('Invalid property id')
  })

  it('should return 403 when token is missing', async () => {
    const res = await request(app)
      .put(`/api/saved-properties/${VISIBLE_PROPERTY_ID}`)

    expect(res.statusCode).toBe(403)
  })

  it('should return 403 for non-customer accounts (admin)', async () => {
    const res = await request(app)
      .put(`/api/saved-properties/${VISIBLE_PROPERTY_ID}`)
      .set(env.X_ACCESS_TOKEN, ADMIN_TOKEN)

    expect(res.statusCode).toBe(403)
  })

  it('should return 404 for non-existent property', async () => {
    const fakeId = new mongoose.Types.ObjectId().toString()
    const res = await request(app)
      .put(`/api/saved-properties/${fakeId}`)
      .set(env.X_ACCESS_TOKEN, CUSTOMER1_TOKEN)

    expect(res.statusCode).toBe(404)
    expect(res.text).toBe('Property not found')
  })

  it('should return 404 for hidden property', async () => {
    const res = await request(app)
      .put(`/api/saved-properties/${HIDDEN_PROPERTY_ID}`)
      .set(env.X_ACCESS_TOKEN, CUSTOMER1_TOKEN)

    expect(res.statusCode).toBe(404)
    expect(res.text).toBe('Property not found')
  })

  it('should save a visible property for customer and persist to user document', async () => {
    const res = await request(app)
      .put(`/api/saved-properties/${VISIBLE_PROPERTY_ID}`)
      .set(env.X_ACCESS_TOKEN, CUSTOMER1_TOKEN)

    expect(res.statusCode).toBe(200)
    expect(res.body.savedProperties).toBeDefined()
    expect(res.body.savedProperties).toContain(VISIBLE_PROPERTY_ID)

    const user = await User.findById(CUSTOMER1_ID)
    expect(user?.savedProperties?.map((id) => id.toString())).toContain(VISIBLE_PROPERTY_ID)
  })

  it('should be idempotent (saving an already saved property does not duplicate)', async () => {
    const res = await request(app)
      .put(`/api/saved-properties/${VISIBLE_PROPERTY_ID}`)
      .set(env.X_ACCESS_TOKEN, CUSTOMER1_TOKEN)

    expect(res.statusCode).toBe(200)
    const occurrences = res.body.savedProperties.filter((id: string) => id === VISIBLE_PROPERTY_ID)
    expect(occurrences.length).toBe(1)
  })
})

describe('GET /api/saved-properties/:language', () => {
  it('should return 403 when token is missing', async () => {
    const res = await request(app)
      .get('/api/saved-properties/en')

    expect(res.statusCode).toBe(403)
  })

  it('should return 403 for non-customer accounts', async () => {
    const res = await request(app)
      .get('/api/saved-properties/en')
      .set(env.X_ACCESS_TOKEN, ADMIN_TOKEN)

    expect(res.statusCode).toBe(403)
  })

  it('should return empty list for customer with no saved properties', async () => {
    const res = await request(app)
      .get('/api/saved-properties/en')
      .set(env.X_ACCESS_TOKEN, CUSTOMER2_TOKEN)

    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body)).toBeTruthy()
    expect(res.body.length).toBe(0)
  })

  it('should return saved properties populated with agency and localized location', async () => {
    const res = await request(app)
      .get('/api/saved-properties/en')
      .set(env.X_ACCESS_TOKEN, CUSTOMER1_TOKEN)

    expect(res.statusCode).toBe(200)
    expect(res.body.length).toBe(1)
    expect(res.body[0]._id).toBe(VISIBLE_PROPERTY_ID)
    expect(res.body[0].name).toBe('Visible Test Villa')
    expect(res.body[0].agency).toBeDefined()
    expect(res.body[0].agency._id).toBe(AGENCY_ID)
    expect(res.body[0].location).toBeDefined()
    expect(res.body[0].location.name).toBe('Test Location EN')
  })

  it('should gracefully exclude hidden properties even if they were previously saved', async () => {
    await User.updateOne(
      { _id: CUSTOMER1_ID },
      { $addToSet: { savedProperties: new mongoose.Types.ObjectId(HIDDEN_PROPERTY_ID) } }
    )

    const res = await request(app)
      .get('/api/saved-properties/en')
      .set(env.X_ACCESS_TOKEN, CUSTOMER1_TOKEN)

    expect(res.statusCode).toBe(200)
    const propertyIds = res.body.map((p: movininTypes.Property) => p._id)
    expect(propertyIds).toContain(VISIBLE_PROPERTY_ID)
    expect(propertyIds).not.toContain(HIDDEN_PROPERTY_ID)
  })
})

describe('DELETE /api/saved-properties/:propertyId', () => {
  it('should return 400 for invalid property ID', async () => {
    const res = await request(app)
      .delete('/api/saved-properties/invalid-id')
      .set(env.X_ACCESS_TOKEN, CUSTOMER1_TOKEN)

    expect(res.statusCode).toBe(400)
    expect(res.text).toBe('Invalid property id')
  })

  it('should return 403 when token is missing', async () => {
    const res = await request(app)
      .delete(`/api/saved-properties/${VISIBLE_PROPERTY_ID}`)

    expect(res.statusCode).toBe(403)
  })

  it('should return 403 for non-customer accounts', async () => {
    const res = await request(app)
      .delete(`/api/saved-properties/${VISIBLE_PROPERTY_ID}`)
      .set(env.X_ACCESS_TOKEN, ADMIN_TOKEN)

    expect(res.statusCode).toBe(403)
  })

  it('should remove property from saved list and persist changes', async () => {
    const res = await request(app)
      .delete(`/api/saved-properties/${VISIBLE_PROPERTY_ID}`)
      .set(env.X_ACCESS_TOKEN, CUSTOMER1_TOKEN)

    expect(res.statusCode).toBe(200)
    expect(res.body.savedProperties).toBeDefined()
    expect(res.body.savedProperties).not.toContain(VISIBLE_PROPERTY_ID)

    const user = await User.findById(CUSTOMER1_ID)
    expect(user?.savedProperties?.map((id) => id.toString())).not.toContain(VISIBLE_PROPERTY_ID)
  })
})

describe('GET /api/user/:id with savedProperties', () => {
  it('should include savedProperties in getUser endpoint', async () => {
    await User.updateOne(
      { _id: CUSTOMER1_ID },
      { $set: { savedProperties: [new mongoose.Types.ObjectId(VISIBLE_PROPERTY_ID)] } }
    )

    const res = await request(app)
      .get(`/api/user/${CUSTOMER1_ID}`)
      .set(env.X_ACCESS_TOKEN, CUSTOMER1_TOKEN)

    expect(res.statusCode).toBe(200)
    expect(res.body.savedProperties).toBeDefined()
    expect(res.body.savedProperties.map((id: any) => id.toString())).toContain(VISIBLE_PROPERTY_ID)
  })
})
