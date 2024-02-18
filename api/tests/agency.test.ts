import 'dotenv/config'
import request from 'supertest'
import * as movininTypes from 'movinin-types'
import * as DatabaseHelper from '../src/common/DatabaseHelper'
import * as TestHelper from './TestHelper'
import app from '../src/app'
import * as env from '../src/config/env.config'
import User from '../src/models/User'

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

        const res = await request(app)
            .put('/api/update-agency')
            .set(env.X_ACCESS_TOKEN, token)
            .send(payload)

        expect(res.statusCode).toBe(200)
        expect(res.body.fullName).toBe(AGENCY1_NAME)
        expect(res.body.bio).toBe(bio)
        expect(res.body.location).toBe(location)
        expect(res.body.phone).toBe(phone)
        expect(res.body.payLater).toBeFalsy()

        await TestHelper.signout(token)
    })
})

describe('GET /api/agency/:id', () => {
    it('should get a agency', async () => {
        const token = await TestHelper.signinAsAdmin()

        const res = await request(app)
            .get(`/api/agency/${AGENCY1_ID}`)
            .set(env.X_ACCESS_TOKEN, token)

        expect(res.statusCode).toBe(200)
        expect(res.body.fullName).toBe(AGENCY1_NAME)

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
        const _id = await TestHelper.createAgency(`${agencyName}@test.movinin.io`, agencyName)

        let agency = await User.findById(_id)
        expect(agency).not.toBeNull()

        const res = await request(app)
            .delete(`/api/delete-agency/${_id}`)
            .set(env.X_ACCESS_TOKEN, token)

        expect(res.statusCode).toBe(200)

        agency = await User.findById(_id)
        expect(agency).toBeNull()

        await TestHelper.signout(token)
    })
})
