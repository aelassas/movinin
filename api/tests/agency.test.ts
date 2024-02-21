import 'dotenv/config'
import request from 'supertest'
import url from 'url'
import path from 'path'
import fs from 'node:fs/promises'
import * as movininTypes from 'movinin-types'
import * as DatabaseHelper from '../src/common/DatabaseHelper'
import * as TestHelper from './TestHelper'
import app from '../src/app'
import * as env from '../src/config/env.config'
import * as Helper from '../src/common/Helper'
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
    if (await DatabaseHelper.Connect(false)) {
        await TestHelper.initializeDatabase()

        // create two agencies
        AGENCY1_NAME = TestHelper.getAgencyName()
        const agencyName2 = TestHelper.getAgencyName()
        AGENCY1_ID = await TestHelper.createAgency(`${AGENCY1_NAME}@test.movinin.io`, AGENCY1_NAME)
        AGENCY2_ID = await TestHelper.createAgency(`${agencyName2}@test.movinin.io`, agencyName2)
    }
})

//
// Closing and cleaning the database connection after running the test suite
//
afterAll(async () => {
    await TestHelper.clearDatabase()

    // delete agencies
    await TestHelper.deleteAgency(AGENCY1_ID)
    await TestHelper.deleteAgency(AGENCY2_ID)

    await DatabaseHelper.Close(false)
})

//
// Unit tests
//

describe('POST /api/validate-agency', () => {
    it('should validate a agency', async () => {
        const token = await TestHelper.signinAsAdmin()

        let payload: movininTypes.ValidateAgencyPayload = { fullName: AGENCY1_NAME }

        let res = await request(app)
            .post('/api/validate-agency')
            .set(env.X_ACCESS_TOKEN, token)
            .send(payload)

        expect(res.statusCode).toBe(204)

        payload = { fullName: TestHelper.getAgencyName() }

        res = await request(app)
            .post('/api/validate-agency')
            .set(env.X_ACCESS_TOKEN, token)
            .send(payload)

        expect(res.statusCode).toBe(200)

        await TestHelper.signout(token)
    })
})

describe('PUT /api/update-agency', () => {
    it('should update an agency', async () => {
        const token = await TestHelper.signinAsAdmin()

        AGENCY1_NAME = TestHelper.getAgencyName()
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

        payload._id = TestHelper.GetRandromObjectIdAsString()
        res = await request(app)
            .put('/api/update-agency')
            .set(env.X_ACCESS_TOKEN, token)
            .send(payload)
        expect(res.statusCode).toBe(204)

        await TestHelper.signout(token)
    })
})

describe('GET /api/agency/:id', () => {
    it('should get a agency', async () => {
        const token = await TestHelper.signinAsAdmin()

        let res = await request(app)
            .get(`/api/agency/${AGENCY1_ID}`)
            .set(env.X_ACCESS_TOKEN, token)
        expect(res.statusCode).toBe(200)
        expect(res.body.fullName).toBe(AGENCY1_NAME)

        res = await request(app)
            .get(`/api/agency/${TestHelper.GetRandromObjectIdAsString()}`)
            .set(env.X_ACCESS_TOKEN, token)
        expect(res.statusCode).toBe(204)

        await TestHelper.signout(token)
    })
})

describe('GET /api/agencies/:page/:size', () => {
    it('should get agencies', async () => {
        const token = await TestHelper.signinAsAdmin()

        const res = await request(app)
            .get(`/api/agencies/${TestHelper.PAGE}/${TestHelper.SIZE}`)
            .set(env.X_ACCESS_TOKEN, token)

        expect(res.statusCode).toBe(200)
        expect(res.body[0].resultData.length).toBeGreaterThan(1)

        await TestHelper.signout(token)
    })
})

describe('GET /api/all-agencies', () => {
    it('should get all agencies', async () => {
        const res = await request(app)
            .get('/api/all-agencies')

        expect(res.statusCode).toBe(200)
        expect(res.body.length).toBeGreaterThan(1)
    })
})

describe('DELETE /api/delete-agency/:id', () => {
    it('should delete a agency', async () => {
        const token = await TestHelper.signinAsAdmin()

        const agencyName = TestHelper.getAgencyName()
        const agencyId = await TestHelper.createAgency(`${agencyName}@test.movinin.io`, agencyName)

        let agency = await User.findById(agencyId)
        expect(agency).not.toBeNull()

        const avatarName = 'avatar1.jpg'
        const avatarPath = path.resolve(__dirname, `./img/${avatarName}`)

        const avatar = path.join(env.CDN_USERS, avatarName)
        if (!await Helper.exists(avatar)) {
            fs.copyFile(avatarPath, avatar)
        }
        agency!.avatar = avatarName
        await agency?.save()

        const locationId = await TestHelper.createLocation('Location 1 EN', 'Location 1 FR')

        const propertyImageName = 'main1.jpg'
        const propertyImagePath = path.resolve(__dirname, `./img/${propertyImageName}`)

        const property = new Property({
            name: 'Beautiful House in Detroit',
            agency: agencyId,
            type: movininTypes.PropertyType.House,
            description: '<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium rem aperiam, veritatis et quasi.</p>',
            image: propertyImageName,
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
            location: locationId,
            address: '',
            price: 4000,
            hidden: true,
            cancellation: 0,
            available: false,
            rentalTerm: movininTypes.RentalTerm.Monthly,
        })

        const propertyImage = path.join(env.CDN_PROPERTIES, propertyImageName)
        if (!await Helper.exists(propertyImage)) {
            fs.copyFile(propertyImagePath, propertyImage)
        }

        await property.save()

        let res = await request(app)
            .delete(`/api/delete-agency/${agencyId}`)
            .set(env.X_ACCESS_TOKEN, token)
        expect(res.statusCode).toBe(200)
        agency = await User.findById(agencyId)
        expect(agency).toBeNull()
        await TestHelper.deleteLocation(locationId)

        res = await request(app)
            .delete(`/api/delete-agency/${TestHelper.GetRandromObjectIdAsString()}`)
            .set(env.X_ACCESS_TOKEN, token)
        expect(res.statusCode).toBe(204)

        await TestHelper.signout(token)
    })
})
