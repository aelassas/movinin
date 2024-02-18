import 'dotenv/config'
import request from 'supertest'
import * as movininTypes from 'movinin-types'
import app from '../src/app'
import * as DatabaseHelper from '../src/common/DatabaseHelper'
import * as TestHelper from './TestHelper'
import Property from '../src/models/Property'
import Booking from '../src/models/Booking'
import * as env from '../src/config/env.config'

let AGENCY_ID: string
let USER_ID: string
let LOCATION_ID: string
let PROPERTY1_ID: string
let PROPERTY2_ID: string
let BOOKING_ID: string

//
// Connecting and initializing the database before running the test suite
//
beforeAll(async () => {
    if (await DatabaseHelper.Connect(false)) {
        await TestHelper.initializeDatabase()

        // create a supplier
        const supplierName = TestHelper.getAgencyName()
        AGENCY_ID = await TestHelper.createAgency(`${supplierName}@test.movinin.ma`, supplierName)

        // get user id
        USER_ID = TestHelper.getUserId()

        // create a location
        LOCATION_ID = await TestHelper.createLocation('Location 1 EN', 'Location 1 FR')

        // create property
        const payload: movininTypes.CreatePropertyPayload = {
            name: 'Beautiful House in Detroit',
            agency: AGENCY_ID,
            type: movininTypes.PropertyType.House,
            description: '<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium rem aperiam, veritatis et quasi.</p>',
            image: 'house.jpg',
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
            price: 1000,
            hidden: true,
            cancellation: 0,
            available: false,
            rentalTerm: movininTypes.RentalTerm.Daily,
        }

        // property 1
        let property = new Property(payload)
        await property.save()
        PROPERTY1_ID = property.id

        // property 2
        property = new Property({ ...payload, name: 'Beautiful Townhouse in Detroit', price: 1200 })
        await property.save()
        PROPERTY2_ID = property.id
    }
})

//
// Closing and cleaning the database connection after running the test suite
//
afterAll(async () => {
    await TestHelper.clearDatabase()

    // delete the supplier
    await TestHelper.deleteAgency(AGENCY_ID)

    // delete the location
    await TestHelper.deleteLocation(LOCATION_ID)

    // delete the property
    await Property.deleteMany({ _id: { $in: [PROPERTY1_ID, PROPERTY2_ID] } })

    await DatabaseHelper.Close(false)
})

//
// Unit tests
//

describe('POST /api/create-booking', () => {
    it('should create a booking', async () => {
        const token = await TestHelper.signinAsAdmin()

        const payload: movininTypes.Booking = {
            agency: AGENCY_ID,
            property: PROPERTY1_ID,
            renter: USER_ID,
            location: LOCATION_ID,
            from: new Date(2024, 2, 1),
            to: new Date(1990, 2, 4),
            status: movininTypes.BookingStatus.Pending,
            cancellation: true,
            price: 4000,
        }

        const res = await request(app)
            .post('/api/create-booking')
            .set(env.X_ACCESS_TOKEN, token)
            .send(payload)

        expect(res.statusCode).toBe(200)
        BOOKING_ID = res.body._id

        await TestHelper.signout(token)
    })
})

describe('POST /api/checkout', () => {
    it('should checkout', async () => {
        const token = await TestHelper.signinAsUser()

        let bookings = await Booking.find({ renter: USER_ID })
        expect(bookings.length).toBe(1)

        const payload: movininTypes.CheckoutPayload = {
            booking: {
                agency: AGENCY_ID,
                property: PROPERTY1_ID,
                renter: USER_ID,
                location: LOCATION_ID,
                from: new Date(2024, 3, 1),
                to: new Date(1990, 3, 4),
                status: movininTypes.BookingStatus.Pending,
                cancellation: true,
                price: 4000,
            },
            payLater: true,
        }

        const res = await request(app)
            .post('/api/checkout')
            .set(env.X_ACCESS_TOKEN, token)
            .send(payload)

        bookings = await Booking.find({ renter: USER_ID })
        expect(bookings.length).toBeGreaterThan(1)

        expect(res.statusCode).toBe(200)

        await TestHelper.signout(token)
    })
})

describe('POST /api/update-booking', () => {
    it('should update a booking', async () => {
        const token = await TestHelper.signinAsAdmin()

        const payload: movininTypes.Booking = {
            _id: BOOKING_ID,
            agency: AGENCY_ID,
            property: PROPERTY2_ID,
            renter: USER_ID,
            location: LOCATION_ID,
            from: new Date(2024, 2, 1),
            to: new Date(1990, 2, 4),
            status: movininTypes.BookingStatus.Paid,
            cancellation: true,
            price: 4800,
        }

        const res = await request(app)
            .put('/api/update-booking')
            .set(env.X_ACCESS_TOKEN, token)
            .send(payload)

        expect(res.statusCode).toBe(200)
        expect(res.body.property).toBe(PROPERTY2_ID)
        expect(res.body.price).toBe(4800)
        expect(res.body.status).toBe(movininTypes.BookingStatus.Paid)

        await TestHelper.signout(token)
    })
})

describe('POST /api/update-booking-status', () => {
    it('should update booking status', async () => {
        const token = await TestHelper.signinAsAdmin()

        const payload: movininTypes.UpdateStatusPayload = {
            ids: [BOOKING_ID],
            status: movininTypes.BookingStatus.Reserved,
        }

        const res = await request(app)
            .post('/api/update-booking-status')
            .set(env.X_ACCESS_TOKEN, token)
            .send(payload)

        const booking = await Booking.findById(BOOKING_ID)
        expect(booking?.status).toBe(movininTypes.BookingStatus.Reserved)

        expect(res.statusCode).toBe(200)

        await TestHelper.signout(token)
    })
})

describe('GET /api/booking/:id/:language', () => {
    it('should get a booking', async () => {
        const token = await TestHelper.signinAsAdmin()

        const res = await request(app)
            .get(`/api/booking/${BOOKING_ID}/${TestHelper.LANGUAGE}`)
            .set(env.X_ACCESS_TOKEN, token)

        expect(res.statusCode).toBe(200)
        expect(res.body.property._id).toBe(PROPERTY2_ID)

        await TestHelper.signout(token)
    })
})

describe('POST /api/bookings/:page/:size/:language', () => {
    it('should get bookings', async () => {
        const token = await TestHelper.signinAsAdmin()

        const payload: movininTypes.GetBookingsPayload = {
            agencies: [AGENCY_ID],
            statuses: [movininTypes.BookingStatus.Reserved],
        }

        const res = await request(app)
            .post(`/api/bookings/${TestHelper.PAGE}/${TestHelper.SIZE}/${TestHelper.LANGUAGE}`)
            .set(env.X_ACCESS_TOKEN, token)
            .send(payload)

        expect(res.statusCode).toBe(200)
        expect(res.body[0].resultData.length).toBeGreaterThan(0)

        await TestHelper.signout(token)
    })
})

describe('GET /api/has-bookings/:renter', () => {
    it("should check renter's bookings", async () => {
        const token = await TestHelper.signinAsAdmin()

        let res = await request(app)
            .get(`/api/has-bookings/${USER_ID}`)
            .set(env.X_ACCESS_TOKEN, token)

        expect(res.statusCode).toBe(200)

        res = await request(app)
            .get(`/api/has-bookings/${AGENCY_ID}`)
            .set(env.X_ACCESS_TOKEN, token)

        expect(res.statusCode).toBe(204)

        const booking = await Booking.findById(BOOKING_ID)
        expect(booking?.status).toBe(movininTypes.BookingStatus.Reserved)

        await TestHelper.signout(token)
    })
})

describe('POST /api/cancel-booking/:id', () => {
    it('should cancel a booking', async () => {
        const token = await TestHelper.signinAsUser()

        let booking = await Booking.findById(BOOKING_ID)
        expect(booking?.cancelRequest).toBeFalsy()

        const res = await request(app)
            .post(`/api/cancel-booking/${BOOKING_ID}`)
            .set(env.X_ACCESS_TOKEN, token)

        expect(res.statusCode).toBe(200)

        booking = await Booking.findById(BOOKING_ID)
        expect(booking?.cancelRequest).toBeTruthy()

        await TestHelper.signout(token)
    })
})

describe('DELETE /api/delete-bookings', () => {
    it('should delete bookings', async () => {
        const token = await TestHelper.signinAsAdmin()

        let bookings = await Booking.find({ renter: USER_ID })
        expect(bookings.length).toBe(2)

        const payload: string[] = bookings.map((u) => u.id)

        const res = await request(app)
            .post('/api/delete-bookings')
            .set(env.X_ACCESS_TOKEN, token)
            .send(payload)

        expect(res.statusCode).toBe(200)

        bookings = await Booking.find({ renter: USER_ID })
        expect(bookings.length).toBe(0)

        await TestHelper.signout(token)
    })
})
