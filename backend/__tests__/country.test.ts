import 'dotenv/config'
import request from 'supertest'
import { nanoid } from 'nanoid'
import * as movininTypes from ':movinin-types'
import app from '../src/app'
import * as databaseHelper from '../src/utils/databaseHelper'
import * as testHelper from './testHelper'
import * as env from '../src/config/env.config'
import LocationValue from '../src/models/LocationValue'
import Country from '../src/models/Country'
import Location from '../src/models/Location'

let COUNTRY_ID: string

let COUNTRY_NAMES: movininTypes.CountryName[] = [
  {
    language: 'en',
    name: nanoid(),
  },
  {
    language: 'fr',
    name: nanoid(),
  },
]

//
// Connecting and initializing the database before running the test suite
//
beforeAll(async () => {
  testHelper.initializeLogger()

  await databaseHelper.connect(env.DB_URI, false, false)
  await testHelper.initialize()
})

//
// Closing and cleaning the database connection after running the test suite
//
afterAll(async () => {
  await testHelper.close()
  await databaseHelper.close()
})

//
// Unit tests
//

describe('POST /api/validate-country', () => {
  it('should validate a country', async () => {
    const token = await testHelper.signinAsAdmin()

    // test success (country found)
    const language = testHelper.LANGUAGE
    const name = nanoid()
    const countryValue = new LocationValue({ language, value: name })
    await countryValue.save()
    const country = new Country({ values: [countryValue.id] })
    await country.save()
    const payload: movininTypes.ValidateCountryPayload = {
      language,
      name,
    }
    let res = await request(app)
      .post('/api/validate-country')
      .set(env.X_ACCESS_TOKEN, token)
      .send(payload)
    expect(res.statusCode).toBe(204)

    // test success (country not found)
    payload.name = nanoid()
    res = await request(app)
      .post('/api/validate-country')
      .set(env.X_ACCESS_TOKEN, token)
      .send(payload)
    expect(res.statusCode).toBe(200)
    await countryValue.deleteOne()
    await country.deleteOne()

    // test failure (wrong language)
    payload.language = 'unknown'
    res = await request(app)
      .post('/api/validate-country')
      .set(env.X_ACCESS_TOKEN, token)
      .send(payload)
    expect(res.statusCode).toBe(400)

    // test failure (no payload)
    res = await request(app)
      .post('/api/validate-country')
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(500)

    await testHelper.signout(token)
  })
})

describe('POST /api/create-country', () => {
  it('should create a country', async () => {
    const token = await testHelper.signinAsAdmin()

    let res = await request(app)
      .post('/api/create-country')
      .set(env.X_ACCESS_TOKEN, token)
      .send(COUNTRY_NAMES)
    expect(res.statusCode).toBe(200)
    expect(res.body?.values?.length).toBe(2)
    COUNTRY_ID = res.body?._id

    res = await request(app)
      .post('/api/create-country')
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(400)

    await testHelper.signout(token)
  })
})

describe('PUT /api/update-country/:id', () => {
  it('should update a country', async () => {
    const token = await testHelper.signinAsAdmin()

    COUNTRY_NAMES = [
      {
        language: 'en',
        name: nanoid(),
      },
      {
        language: 'fr',
        name: nanoid(),
      },
      {
        language: 'es',
        name: nanoid(),
      },
    ]

    let res = await request(app)
      .put(`/api/update-country/${COUNTRY_ID}`)
      .set(env.X_ACCESS_TOKEN, token)
      .send(COUNTRY_NAMES)
    expect(res.statusCode).toBe(200)
    expect(res.body.values?.length).toBe(3)

    res = await request(app)
      .put(`/api/update-country/${testHelper.GetRandromObjectIdAsString()}`)
      .set(env.X_ACCESS_TOKEN, token)
      .send(COUNTRY_NAMES)
    expect(res.statusCode).toBe(204)

    res = await request(app)
      .put(`/api/update-country/${COUNTRY_ID}`)
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(400)

    await testHelper.signout(token)
  })
})

describe('GET /api/country/:id/:language', () => {
  it('should get a country', async () => {
    const token = await testHelper.signinAsAdmin()
    const language = 'en'

    let res = await request(app)
      .get(`/api/country/${COUNTRY_ID}/${language}`)
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(200)
    expect(res.body?.name).toBe(COUNTRY_NAMES.filter((v) => v.language === language)[0].name)

    res = await request(app)
      .get(`/api/country/${testHelper.GetRandromObjectIdAsString()}/${language}`)
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(204)

    res = await request(app)
      .get(`/api/country/${COUNTRY_ID}/zh`)
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(400)

    await testHelper.signout(token)
  })
})

describe('GET /api/countries/:page/:size/:language', () => {
  it('should get countries', async () => {
    const token = await testHelper.signinAsAdmin()
    const language = 'en'

    let res = await request(app)
      .get(`/api/countries/${testHelper.PAGE}/${testHelper.SIZE}/${language}?s=${COUNTRY_NAMES[0].name}`)
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(200)
    expect(res.body.length).toBe(1)

    res = await request(app)
      .get(`/api/countries/unknown/${testHelper.SIZE}/${language}`)
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(400)

    await testHelper.signout(token)
  })
})

describe('GET /api/check-country/:id', () => {
  it('should check a country', async () => {
    const token = await testHelper.signinAsAdmin()

    const locationId = await testHelper.createLocation('test-en', 'test-fr', COUNTRY_ID)

    let res = await request(app)
      .get(`/api/check-country/${COUNTRY_ID}`)
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(200)

    const location = await Location.findById(locationId)
    await LocationValue.deleteMany({ _id: { $in: location?.values } })
    await Location.deleteOne({ _id: locationId })
    res = await request(app)
      .get(`/api/check-country/${COUNTRY_ID}`)
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(204)

    res = await request(app)
      .get(`/api/check-country/${nanoid()}`)
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(400)

    await testHelper.signout(token)
  })
})

describe('GET /api/countries-with-locations/:language/:imageRequired/:minLocations', () => {
  it('should get a countries with location', async () => {
    const language = 'en'

    const locationValueEn = new LocationValue({ language, value: 'Location 1 en' })
    await locationValueEn.save()
    const locationValueFr = new LocationValue({ language: 'fr', value: 'Location 1 fr' })
    await locationValueFr.save()

    const location = new Location({ country: COUNTRY_ID, values: [locationValueEn.id, locationValueFr.id] })
    await location.save()

    let res = await request(app)
      .get(`/api/countries-with-locations/${language}/false/1`)
    expect(res.statusCode).toBe(200)
    expect(res.body.find((country: movininTypes.Country) => country._id === COUNTRY_ID)).toBeDefined()

    res = await request(app)
      .get(`/api/countries-with-locations/${language}/true/1`)
    expect(res.statusCode).toBe(200)
    expect(res.body.find((country: movininTypes.Country) => country._id === COUNTRY_ID)).toBeUndefined()

    await locationValueEn.deleteOne()
    await locationValueFr.deleteOne()
    await location.deleteOne()

    res = await request(app)
      .get(`/api/countries-with-locations/${language}/false/1`)
    expect(res.statusCode).toBe(200)
    expect(res.body.find((country: movininTypes.Country) => country._id === COUNTRY_ID)).toBeUndefined()

    // test failure (wrong language)
    res = await request(app)
      .get('/api/countries-with-locations/unknoaw/false/1')
    expect(res.statusCode).toBe(400)
  })
})

describe('GET /api/country-id/:name/:language', () => {
  it('should get a country id', async () => {
    const token = await testHelper.signinAsAdmin()
    const language = 'en'

    let res = await request(app)
      .get(`/api/country-id/${COUNTRY_NAMES.find((n) => n.language === language)?.name}/${language}`)
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(200)
    expect(res.body).toBe(COUNTRY_ID)

    // test failure (wrong language)
    res = await request(app)
      .get('/api/country-id/unknown/unknown')
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(400)

    res = await request(app)
      .get(`/api/country-id/unknown/${language}`)
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(204)

    await testHelper.signout(token)
  })
})

describe('DELETE /api/delete-country/:id', () => {
  it('should delete a country', async () => {
    const token = await testHelper.signinAsAdmin()

    let country = await Country.findById(COUNTRY_ID)
    expect(country).not.toBeNull()
    let res = await request(app)
      .delete(`/api/delete-country/${COUNTRY_ID}`)
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(200)
    country = await Country.findById(COUNTRY_ID)
    expect(country).toBeNull()

    res = await request(app)
      .delete(`/api/delete-country/${COUNTRY_ID}`)
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(204)

    res = await request(app)
      .delete('/api/delete-country/0')
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(400)

    await testHelper.signout(token)
  })
})
