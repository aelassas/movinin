import 'dotenv/config'
import * as DatabaseHelper from '../src/common/DatabaseHelper'
import * as TestHelper from './TestHelper'

let SUPPLIER1_ID: string
let SUPPLIER2_ID: string

//
// Connecting and initializing the database before running the test suite
//
beforeAll(async () => {
    if (await DatabaseHelper.Connect(false)) {
        await TestHelper.initializeDatabase()

        // create two agencies
        const agencyName1 = TestHelper.getAgencyName()
        const agencyName2 = TestHelper.getAgencyName()
        SUPPLIER1_ID = await TestHelper.createAgency(`${agencyName1}@test.bookcars.ma`, agencyName1)
        SUPPLIER2_ID = await TestHelper.createAgency(`${agencyName2}@test.bookcars.ma`, agencyName2)
    }
})

//
// Closing and cleaning the database connection after running the test suite
//
afterAll(async () => {
    await TestHelper.clearDatabase()

    // delete agencies
    await TestHelper.deleteAgency(SUPPLIER1_ID)
    await TestHelper.deleteAgency(SUPPLIER2_ID)

    await DatabaseHelper.Close(false)
})

//
// Unit tests
//

describe('POST /api/validate-agency', () => {
    it('should validate an agency', async () => {
        const token = await TestHelper.signinAsAdmin()

        // TODO

        await TestHelper.signout(token)
    })
})

describe('PUT /api/update-agency', () => {
    it('should update an agency', async () => {
        const token = await TestHelper.signinAsAdmin()

        // TODO

        await TestHelper.signout(token)
    })
})

describe('GET /api/agency/:id', () => {
    it('should get an agency', async () => {
        const token = await TestHelper.signinAsAdmin()

        // TODO

        await TestHelper.signout(token)
    })
})

describe('GET /api/agencies/:page/:size', () => {
    it('should get agencies', async () => {
        const token = await TestHelper.signinAsAdmin()

        // TODO

        await TestHelper.signout(token)
    })
})

describe('GET /api/all-agencies', () => {
    it('should get all agencies', async () => {

        // TODO

    })
})

describe('DELETE /api/delete-agency/:id', () => {
    it('should delete an agency', async () => {
        const token = await TestHelper.signinAsAdmin()

        // TODO

        await TestHelper.signout(token)
    })
})
