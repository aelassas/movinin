import 'dotenv/config'
import request from 'supertest'
import { v1 as uuid } from 'uuid'
import * as movininTypes from 'movinin-types'
import app from '../src/app'
import * as databaseHelper from '../src/common/databaseHelper'
import * as testHelper from './testHelper'
import * as env from '../src/config/env.config'
import LocationValue from '../src/models/LocationValue'
import Location from '../src/models/Location'
import Property from '../src/models/Property'

let LOCATION_ID: string

let LOCATION_NAMES: movininTypes.LocationName[] = [
    {
        language: 'en',
        name: uuid(),
    },
    {
        language: 'fr',
        name: uuid(),
    },
]

//
// Connecting and initializing the database before running the test suite
//
beforeAll(async () => {
    if (await databaseHelper.Connect(env.DB_URI, false, false)) {
        await testHelper.initialize()
    }
})

//
// Closing and cleaning the database connection after running the test suite
//
afterAll(async () => {
    await testHelper.close()
    await databaseHelper.Close()
})

//
// Unit tests
//

describe('POST /api/validate-location', () => {
    it('should validate a location', async () => {
        const token = await testHelper.signinAsAdmin()

        const language = testHelper.LANGUAGE
        const name = uuid()
        const locationValue = new LocationValue({ language, value: name })
        await locationValue.save()
        const payload: movininTypes.ValidateLocationPayload = {
            language,
            name,
        }
        let res = await request(app)
            .post('/api/validate-location')
            .set(env.X_ACCESS_TOKEN, token)
            .send(payload)
        expect(res.statusCode).toBe(204)

        payload.name = uuid()
        res = await request(app)
            .post('/api/validate-location')
            .set(env.X_ACCESS_TOKEN, token)
            .send(payload)
        expect(res.statusCode).toBe(200)
        await LocationValue.deleteOne({ _id: locationValue._id })

        res = await request(app)
            .post('/api/validate-location')
            .set(env.X_ACCESS_TOKEN, token)
        expect(res.statusCode).toBe(400)

        await testHelper.signout(token)
    })
})

describe('POST /api/create-location', () => {
    it('should create a location', async () => {
        const token = await testHelper.signinAsAdmin()

        const payload: movininTypes.LocationName[] = LOCATION_NAMES
        let res = await request(app)
            .post('/api/create-location')
            .set(env.X_ACCESS_TOKEN, token)
            .send(payload)
        expect(res.statusCode).toBe(200)
        expect(res.body?.values?.length).toBe(2)
        LOCATION_ID = res.body?._id

        res = await request(app)
            .post('/api/create-location')
            .set(env.X_ACCESS_TOKEN, token)
        expect(res.statusCode).toBe(400)

        await testHelper.signout(token)
    })
})

describe('PUT /api/update-location/:id', () => {
    it('should update a location', async () => {
        const token = await testHelper.signinAsAdmin()

        LOCATION_NAMES = [
            {
                language: 'en',
                name: uuid(),
            },
            {
                language: 'fr',
                name: uuid(),
            },
            {
                language: 'es',
                name: uuid(),
            },
        ]
        let res = await request(app)
            .put(`/api/update-location/${LOCATION_ID}`)
            .set(env.X_ACCESS_TOKEN, token)
            .send(LOCATION_NAMES)
        expect(res.statusCode).toBe(200)
        expect(res.body.values?.length).toBe(3)

        res = await request(app)
            .put(`/api/update-location/${testHelper.GetRandromObjectIdAsString()}`)
            .set(env.X_ACCESS_TOKEN, token)
            .send(LOCATION_NAMES)
        expect(res.statusCode).toBe(204)

        res = await request(app)
            .put(`/api/update-location/${LOCATION_ID}`)
            .set(env.X_ACCESS_TOKEN, token)
        expect(res.statusCode).toBe(400)

        await testHelper.signout(token)
    })
})

describe('GET /api/location/:id/:language', () => {
    it('should get a location', async () => {
        const language = 'en'

        let res = await request(app)
            .get(`/api/location/${LOCATION_ID}/${language}`)
        expect(res.statusCode).toBe(200)
        expect(res.body?.name).toBe(LOCATION_NAMES.filter((v) => v.language === language)[0].name)

        res = await request(app)
            .get(`/api/location/${testHelper.GetRandromObjectIdAsString()}/${language}`)
        expect(res.statusCode).toBe(204)

        res = await request(app)
            .get(`/api/location/${LOCATION_ID}/zh`)
        expect(res.statusCode).toBe(400)
    })
})

describe('GET /api/locations/:page/:size/:language', () => {
    it('should get locations', async () => {
        const language = 'en'

        let res = await request(app)
            .get(`/api/locations/${testHelper.PAGE}/${testHelper.SIZE}/${language}?s=${LOCATION_NAMES[0].name}`)
        expect(res.statusCode).toBe(200)
        expect(res.body.length).toBe(1)

        res = await request(app)
            .get(`/api/locations/unknown/${testHelper.SIZE}/${language}`)
        expect(res.statusCode).toBe(400)
    })
})

describe('GET /api/check-location/:id', () => {
    it('should check a location', async () => {
        const token = await testHelper.signinAsAdmin()

        const agencyName = testHelper.getAgencyName()
        const agencyId = await testHelper.createAgency(`${agencyName}@test.movinin.io`, agencyName)
        const property = new Property({
            name: 'Beautiful House in Detroit',
            agency: agencyId,
            type: movininTypes.PropertyType.House,
            description: '<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium rem aperiam, veritatis et quasi.</p>',
            image: 'main1.jpg',
            images: [],
            bedrooms: 3,
            bathrooms: 2,
            kitchens: 1,
            parkingSpaces: 1,
            size: 200,
            petsAllowed: false,
            furnished: true,
            aircon: true,
            minimumAge: 21,
            location: LOCATION_ID,
            address: '',
            price: 4000,
            hidden: true,
            cancellation: 0,
            available: false,
            rentalTerm: movininTypes.RentalTerm.Monthly,
        })
        await property.save()
        let res = await request(app)
            .get(`/api/check-location/${LOCATION_ID}`)
            .set(env.X_ACCESS_TOKEN, token)
        expect(res.statusCode).toBe(200)
        await Property.deleteOne({ _id: property._id })
        await testHelper.deleteAgency(agencyId)

        res = await request(app)
            .get(`/api/check-location/${LOCATION_ID}`)
            .set(env.X_ACCESS_TOKEN, token)
        expect(res.statusCode).toBe(204)

        res = await request(app)
            .get(`/api/check-location/${uuid()}`)
            .set(env.X_ACCESS_TOKEN, token)
        expect(res.statusCode).toBe(400)

        await testHelper.signout(token)
    })
})

describe('DELETE /api/delete-location/:id', () => {
    it('should delete a location', async () => {
        const token = await testHelper.signinAsAdmin()

        let location = await Location.findById(LOCATION_ID)
        expect(location).not.toBeNull()

        let res = await request(app)
            .delete(`/api/delete-location/${LOCATION_ID}`)
            .set(env.X_ACCESS_TOKEN, token)
        expect(res.statusCode).toBe(200)
        location = await Location.findById(LOCATION_ID)
        expect(location).toBeNull()

        res = await request(app)
            .delete(`/api/delete-location/${LOCATION_ID}`)
            .set(env.X_ACCESS_TOKEN, token)
        expect(res.statusCode).toBe(204)

        res = await request(app)
            .delete('/api/delete-location/0')
            .set(env.X_ACCESS_TOKEN, token)
        expect(res.statusCode).toBe(400)

        await testHelper.signout(token)
    })
})
