import 'dotenv/config'
import request from 'supertest'
import * as movininTypes from 'movinin-types'
import url from 'url'
import path from 'path'
import fs from 'node:fs/promises'
import * as DatabaseHelper from '../src/common/DatabaseHelper'
import app from '../src/app'
import * as env from '../src/config/env.config'
import * as TestHelper from './TestHelper'
import * as Helper from '../src/common/Helper'
import Property from '../src/models/Property'

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
    if (await DatabaseHelper.Connect(false)) {
        await TestHelper.initializeDatabase()

        // create two agencies
        const agencyName1 = TestHelper.getAgencyName()
        const agencyName2 = TestHelper.getAgencyName()
        AGENCY1_ID = await TestHelper.createAgency(`${agencyName1}@test.movinin.ma`, agencyName1)
        AGENCY2_ID = await TestHelper.createAgency(`${agencyName2}@test.movinin.ma`, agencyName2)

        // create two locations
        LOCATION1_ID = await TestHelper.createLocation('Location 1 EN', 'Location 1 FR')
        LOCATION2_ID = await TestHelper.createLocation('Location 2 EN', 'Location 2 FR')
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

    // delete locations
    await TestHelper.deleteLocation(LOCATION1_ID)
    await TestHelper.deleteLocation(LOCATION2_ID)

    await DatabaseHelper.Close(false)
})

//
// Unit tests
//

describe('POST /api/create-property', () => {
    it('should create a property', async () => {
        const token = await TestHelper.signinAsAdmin()

        const mainImage = path.join(env.CDN_TEMP_PROPERTIES, MAIN_IMAGE1)
        if (!await Helper.exists(mainImage)) {
            fs.copyFile(MAIN_IMAGE1_PATH, mainImage)
        }

        const additionalImage1 = path.join(env.CDN_TEMP_PROPERTIES, ADDITIONAL_IMAGE1_1)
        if (!await Helper.exists(additionalImage1)) {
            fs.copyFile(ADDITIONAL_IMAGE1_1_PATH, additionalImage1)
        }

        const additionalImage2 = path.join(env.CDN_TEMP_PROPERTIES, ADDITIONAL_IMAGE1_2)
        if (!await Helper.exists(additionalImage2)) {
            fs.copyFile(ADDITIONAL_IMAGE1_2_PATH, additionalImage2)
        }

        const res = await request(app)
            .post('/api/create-property')
            .set(env.X_ACCESS_TOKEN, token)
            .send({
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
            })

        expect(res.statusCode).toBe(200)
        PROPERTY_ID = res.body._id

        await TestHelper.signout(token)
    })
})

describe('PUT /api/update-property', () => {
    it('should update a property', async () => {
        const token = await TestHelper.signinAsAdmin()

        const mainImage = path.join(env.CDN_TEMP_PROPERTIES, MAIN_IMAGE2)
        if (!await Helper.exists(mainImage)) {
            fs.copyFile(MAIN_IMAGE2_PATH, mainImage)
        }

        const additionalImage1 = path.join(env.CDN_TEMP_PROPERTIES, ADDITIONAL_IMAGE2_1)
        if (!await Helper.exists(additionalImage1)) {
            fs.copyFile(ADDITIONAL_IMAGE2_1_PATH, additionalImage1)
        }

        const additionalImage2 = path.join(env.CDN_TEMP_PROPERTIES, ADDITIONAL_IMAGE2_2)
        if (!await Helper.exists(additionalImage2)) {
            fs.copyFile(ADDITIONAL_IMAGE2_2_PATH, additionalImage2)
        }

        const res = await request(app)
            .put('/api/update-property')
            .set(env.X_ACCESS_TOKEN, token)
            .send({
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
            })

        expect(res.statusCode).toBe(200)

        const property = res.body
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

        await TestHelper.signout(token)
    })
})

describe('POST /api/delete-property-image/:id/:image', () => {
    it('should delete an additional property image', async () => {
        const token = await TestHelper.signinAsAdmin()

        let property = await Property.findById(PROPERTY_ID)
        expect(property?.images).toBeDefined()
        expect(property?.images?.length).toBe(2)
        const additionalImageName = (property?.images ?? [])[0]
        const additionalImagePath = path.join(env.CDN_PROPERTIES, additionalImageName)
        let imageExists = await Helper.exists(additionalImagePath)
        expect(imageExists).toBeTruthy()

        const res = await request(app)
            .post(`/api/delete-property-image/${PROPERTY_ID}/${additionalImageName}`)
            .set(env.X_ACCESS_TOKEN, token)

        expect(res.statusCode).toBe(200)
        property = await Property.findById(PROPERTY_ID)
        expect(property?.images?.length).toBe(1)
        imageExists = await Helper.exists(additionalImagePath)
        expect(imageExists).toBeFalsy()

        await TestHelper.signout(token)
    })
})

describe('POST /api/upload-property-image', () => {
    it('should upload a property image', async () => {
        const token = await TestHelper.signinAsAdmin()

        const res = await request(app)
            .post('/api/upload-property-image')
            .set(env.X_ACCESS_TOKEN, token)
            .attach('image', MAIN_IMAGE1_PATH)

        expect(res.statusCode).toBe(200)
        const filename = res.body as string
        const imageExists = await Helper.exists(path.resolve(env.CDN_TEMP_PROPERTIES, filename))
        expect(imageExists).toBeTruthy()

        await TestHelper.signout(token)
    })
})

describe('POST /api/delete-temp-property-image/:image', () => {
    it('should delete a temporary property image', async () => {
        const token = await TestHelper.signinAsAdmin()

        const tempImage = path.join(env.CDN_TEMP_PROPERTIES, MAIN_IMAGE1)
        if (!await Helper.exists(tempImage)) {
            fs.copyFile(MAIN_IMAGE1_PATH, tempImage)
        }

        const res = await request(app)
            .post(`/api/delete-temp-property-image/${MAIN_IMAGE1}`)
            .set(env.X_ACCESS_TOKEN, token)

        expect(res.statusCode).toBe(200)
        const tempImageExists = await Helper.exists(tempImage)
        expect(tempImageExists).toBeFalsy()

        await TestHelper.signout(token)
    })
})

describe('GET /api/property/:id/:language', () => {
    it('should return a property', async () => {
        const res = await request(app)
            .get(`/api/property/${PROPERTY_ID}/${TestHelper.LANGUAGE}`)

        expect(res.statusCode).toBe(200)
        expect(res.body.name).toBe('Beautiful Townhouse in Detroit')
    })
})

describe('POST /api/properties/:page/:size', () => {
    it('should return properties', async () => {
        const token = await TestHelper.signinAsAdmin()

        const res = await request(app)
            .post(`/api/properties/${TestHelper.PAGE}/${TestHelper.SIZE}`)
            .set(env.X_ACCESS_TOKEN, token)
            .send(
                {
                    agencies: [AGENCY2_ID],
                    types: [movininTypes.PropertyType.Townhouse],
                    rentalTerms: [movininTypes.RentalTerm.Weekly],
                    availability: [movininTypes.Availablity.Available, movininTypes.Availablity.Unavailable],
                    language: TestHelper.LANGUAGE,
                },
            )

        expect(res.statusCode).toBe(200)
        expect(res.body[0].resultData.length).toBeGreaterThan(0)

        await TestHelper.signout(token)
    })
})

describe('POST /api/booking-properties/:page/:size', () => {
    it('should return booking properties', async () => {
        const token = await TestHelper.signinAsAdmin()

        const res = await request(app)
            .post(`/api/booking-properties/${TestHelper.PAGE}/${TestHelper.SIZE}`)
            .set(env.X_ACCESS_TOKEN, token)
            .send(
                {
                    agency: AGENCY2_ID,
                    location: LOCATION2_ID,
                },
            )

        expect(res.statusCode).toBe(200)
        expect(res.body.length).toBeGreaterThan(0)
        await TestHelper.signout(token)
    })
})

describe('POST /api/frontend-properties/:page/:size', () => {
    it('should return frontend properties', async () => {
        const res = await request(app)
            .post(`/api/frontend-properties/${TestHelper.PAGE}/${TestHelper.SIZE}`)
            .send(
                {
                    agencies: [AGENCY2_ID],
                    types: [movininTypes.PropertyType.Townhouse],
                    rentalTerms: [movininTypes.RentalTerm.Weekly],
                    location: LOCATION2_ID,
                },
            )

        expect(res.statusCode).toBe(200)
        expect(res.body[0].resultData.length).toBeGreaterThan(0)
    })
})

describe('GET /api/check-property/:id', () => {
    it('should check a property', async () => {
        const token = await TestHelper.signinAsAdmin()

        const res = await request(app)
            .get(`/api/check-property/${PROPERTY_ID}`)
            .set(env.X_ACCESS_TOKEN, token)

        expect(res.statusCode).toBe(204)

        await TestHelper.signout(token)
    })
})

describe('DELETE /api/delete-property/:id', () => {
    it('should delete a property', async () => {
        const token = await TestHelper.signinAsAdmin()

        const res = await request(app)
            .delete(`/api/delete-property/${PROPERTY_ID}`)
            .set(env.X_ACCESS_TOKEN, token)

        expect(res.statusCode).toBe(200)

        await TestHelper.signout(token)
    })
})
