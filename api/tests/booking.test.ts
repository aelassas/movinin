import 'dotenv/config'
import request from 'supertest'
import * as movininTypes from 'movinin-types'
import { v1 as uuid } from 'uuid'
import app from '../src/app'
import * as DatabaseHelper from '../src/common/DatabaseHelper'
import * as TestHelper from './TestHelper'
import Property from '../src/models/Property'
import Booking from '../src/models/Booking'
import User from '../src/models/User'
import PushNotification from '../src/models/PushNotification'
import * as env from '../src/config/env.config'

let AGENCY_ID: string
let RENTER1_ID: string
let RENTER2_ID: string
let LOCATION_ID: string
let PROPERTY1_ID: string
let PROPERTY2_ID: string
let BOOKING_ID: string

//
// Connecting and initializing the database before running the test suite
//
beforeAll(async () => {
    if (await DatabaseHelper.Connect()) {
        await TestHelper.initialize()

        // create a supplier
        const supplierName = TestHelper.getAgencyName()
        AGENCY_ID = await TestHelper.createAgency(`${supplierName}@test.movinin.io`, supplierName)

        // get user id
        RENTER1_ID = TestHelper.getUserId()

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
    await TestHelper.close()

    // delete the supplier
    await TestHelper.deleteAgency(AGENCY_ID)

    // delete the location
    await TestHelper.deleteLocation(LOCATION_ID)

    // delete the property
    await Property.deleteMany({ _id: { $in: [PROPERTY1_ID, PROPERTY2_ID] } })

    await DatabaseHelper.Close()
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
            renter: RENTER1_ID,
            location: LOCATION_ID,
            from: new Date(2024, 2, 1),
            to: new Date(1990, 2, 4),
            status: movininTypes.BookingStatus.Pending,
            cancellation: true,
            price: 4000,
        }
        let res = await request(app)
            .post('/api/create-booking')
            .set(env.X_ACCESS_TOKEN, token)
            .send(payload)
        expect(res.statusCode).toBe(200)
        BOOKING_ID = res.body._id

        res = await request(app)
            .post('/api/create-booking')
            .set(env.X_ACCESS_TOKEN, token)
        expect(res.statusCode).toBe(400)

        await TestHelper.signout(token)
    })
})

describe('POST /api/checkout', () => {
    it('should checkout', async () => {
        let bookings = await Booking.find({ renter: RENTER1_ID })
        expect(bookings.length).toBe(1)

        const payload: movininTypes.CheckoutPayload = {
            booking: {
                agency: AGENCY_ID,
                property: PROPERTY1_ID,
                renter: RENTER1_ID,
                location: LOCATION_ID,
                from: new Date(2024, 3, 1),
                to: new Date(1990, 3, 4),
                status: movininTypes.BookingStatus.Pending,
                cancellation: true,
                price: 4000,
            },
            payLater: true,
        }
        let res = await request(app)
            .post('/api/checkout')
            .send(payload)
        expect(res.statusCode).toBe(200)
        bookings = await Booking.find({ renter: RENTER1_ID })
        expect(bookings.length).toBeGreaterThan(1)

        payload.booking.agency = TestHelper.GetRandromObjectIdAsString()
        res = await request(app)
            .post('/api/checkout')
            .send(payload)
        expect(res.statusCode).toBe(204)

        payload.booking.agency = AGENCY_ID
        payload.renter = {
            fullName: 'renter',
            email: TestHelper.GetRandomEmail(),
            language: TestHelper.LANGUAGE,
        }
        res = await request(app)
            .post('/api/checkout')
            .send(payload)
        expect(res.statusCode).toBe(200)
        const renter2 = await User.findOne({ email: payload.renter.email })
        expect(renter2).not.toBeNull()
        RENTER2_ID = renter2?.id

        payload.renter = undefined
        res = await request(app)
            .post('/api/checkout')
            .send(payload)
        expect(res.statusCode).toBe(200)

        payload.booking!.property = TestHelper.GetRandromObjectIdAsString()
        res = await request(app)
            .post('/api/checkout')
            .send(payload)
        expect(res.statusCode).toBe(204)

        payload.booking!.property = PROPERTY1_ID
        payload.booking!.location = TestHelper.GetRandromObjectIdAsString()
        res = await request(app)
            .post('/api/checkout')
            .send(payload)
        expect(res.statusCode).toBe(204)

        payload.booking!.agency = AGENCY_ID
        payload.booking!.renter = TestHelper.GetRandromObjectIdAsString()
        res = await request(app)
            .post('/api/checkout')
            .send(payload)
        expect(res.statusCode).toBe(204)

        res = await request(app)
            .post('/api/checkout')
            .send({ booking: { renter: RENTER1_ID } })
        expect(res.statusCode).toBe(400)
    })
})

describe('POST /api/update-booking', () => {
    it('should update a booking', async () => {
        const token = await TestHelper.signinAsAdmin()

        const payload: movininTypes.Booking = {
            _id: BOOKING_ID,
            agency: AGENCY_ID,
            property: PROPERTY2_ID,
            renter: RENTER1_ID,
            location: LOCATION_ID,
            from: new Date(2024, 2, 1),
            to: new Date(1990, 2, 4),
            status: movininTypes.BookingStatus.Paid,
            cancellation: true,
            price: 4800,
        }
        let res = await request(app)
            .put('/api/update-booking')
            .set(env.X_ACCESS_TOKEN, token)
            .send(payload)
        expect(res.statusCode).toBe(200)
        expect(res.body.property).toBe(PROPERTY2_ID)
        expect(res.body.price).toBe(4800)
        expect(res.body.status).toBe(movininTypes.BookingStatus.Paid)

        payload._id = TestHelper.GetRandromObjectIdAsString()
        res = await request(app)
            .put('/api/update-booking')
            .set(env.X_ACCESS_TOKEN, token)
            .send(payload)
        expect(res.statusCode).toBe(204)

        // notifyDriver
        payload._id = BOOKING_ID
        payload.status = movininTypes.BookingStatus.Cancelled
        payload.renter = TestHelper.GetRandromObjectIdAsString()
        res = await request(app)
            .put('/api/update-booking')
            .set(env.X_ACCESS_TOKEN, token)
            .send(payload)
        expect(res.statusCode).toBe(200)

        payload.renter = RENTER1_ID
        payload.status = movininTypes.BookingStatus.Void
        let pushNotification = new PushNotification({ user: payload.renter, token: uuid() })
        await pushNotification.save()
        res = await request(app)
            .put('/api/update-booking')
            .set(env.X_ACCESS_TOKEN, token)
            .send(payload)
        expect(res.statusCode).toBe(200)
        await PushNotification.deleteOne({ _id: pushNotification._id })

        payload.status = movininTypes.BookingStatus.Cancelled
        pushNotification = new PushNotification({ user: payload.renter, token: '0' })
        await pushNotification.save()
        res = await request(app)
            .put('/api/update-booking')
            .set(env.X_ACCESS_TOKEN, token)
            .send(payload)
        expect(res.statusCode).toBe(200)
        await PushNotification.deleteOne({ _id: pushNotification._id })

        res = await request(app)
            .put('/api/update-booking')
            .set(env.X_ACCESS_TOKEN, token)
        expect(res.statusCode).toBe(400)

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
        let res = await request(app)
            .post('/api/update-booking-status')
            .set(env.X_ACCESS_TOKEN, token)
            .send(payload)
        expect(res.statusCode).toBe(200)
        const booking = await Booking.findById(BOOKING_ID)
        expect(booking?.status).toBe(movininTypes.BookingStatus.Reserved)

        res = await request(app)
            .post('/api/update-booking-status')
            .set(env.X_ACCESS_TOKEN, token)
        expect(res.statusCode).toBe(400)

        await TestHelper.signout(token)
    })
})

describe('GET /api/booking/:id/:language', () => {
    it('should get a booking', async () => {
        const token = await TestHelper.signinAsAdmin()

        let res = await request(app)
            .get(`/api/booking/${BOOKING_ID}/${TestHelper.LANGUAGE}`)
            .set(env.X_ACCESS_TOKEN, token)
        expect(res.statusCode).toBe(200)
        expect(res.body.property._id).toBe(PROPERTY2_ID)

        res = await request(app)
            .get(`/api/booking/${TestHelper.GetRandromObjectIdAsString()}/${TestHelper.LANGUAGE}`)
            .set(env.X_ACCESS_TOKEN, token)
        expect(res.statusCode).toBe(204)

        res = await request(app)
            .get(`/api/booking/${uuid()}/${TestHelper.LANGUAGE}`)
            .set(env.X_ACCESS_TOKEN, token)
        expect(res.statusCode).toBe(400)

        await TestHelper.signout(token)
    })
})

describe('POST /api/bookings/:page/:size/:language', () => {
    it('should get bookings', async () => {
        const token = await TestHelper.signinAsAdmin()

        const payload: movininTypes.GetBookingsPayload = {
            agencies: [AGENCY_ID],
            statuses: [movininTypes.BookingStatus.Reserved],
            filter: {
                location: LOCATION_ID,
                from: new Date(2024, 2, 1),
                to: new Date(1990, 2, 4),
                keyword: TestHelper.USER_FULL_NAME,
            },
            user: TestHelper.getUserId(),
            property: PROPERTY2_ID,
        }
        let res = await request(app)
            .post(`/api/bookings/${TestHelper.PAGE}/${TestHelper.SIZE}/${TestHelper.LANGUAGE}`)
            .set(env.X_ACCESS_TOKEN, token)
            .send(payload)
        expect(res.statusCode).toBe(200)
        expect(res.body[0].resultData.length).toBe(1)

        payload.filter!.keyword = BOOKING_ID
        res = await request(app)
            .post(`/api/bookings/${TestHelper.PAGE}/${TestHelper.SIZE}/${TestHelper.LANGUAGE}`)
            .set(env.X_ACCESS_TOKEN, token)
            .send(payload)
        expect(res.statusCode).toBe(200)
        expect(res.body[0].resultData.length).toBe(1)

        res = await request(app)
            .post(`/api/bookings/${TestHelper.PAGE}/${TestHelper.SIZE}/${TestHelper.LANGUAGE}`)
            .set(env.X_ACCESS_TOKEN, token)
        expect(res.statusCode).toBe(400)

        await TestHelper.signout(token)
    })
})

describe('GET /api/has-bookings/:renter', () => {
    it("should check renter's bookings", async () => {
        const token = await TestHelper.signinAsAdmin()

        let res = await request(app)
            .get(`/api/has-bookings/${RENTER1_ID}`)
            .set(env.X_ACCESS_TOKEN, token)
        expect(res.statusCode).toBe(200)

        res = await request(app)
            .get(`/api/has-bookings/${AGENCY_ID}`)
            .set(env.X_ACCESS_TOKEN, token)
        expect(res.statusCode).toBe(204)
        const booking = await Booking.findById(BOOKING_ID)
        expect(booking?.status).toBe(movininTypes.BookingStatus.Reserved)

        res = await request(app)
            .get(`/api/has-bookings/${uuid()}`)
            .set(env.X_ACCESS_TOKEN, token)
        expect(res.statusCode).toBe(400)

        await TestHelper.signout(token)
    })
})

describe('POST /api/cancel-booking/:id', () => {
    it('should cancel a booking', async () => {
        const token = await TestHelper.signinAsUser()

        let booking = await Booking.findById(BOOKING_ID)
        expect(booking?.cancelRequest).toBeFalsy()
        let res = await request(app)
            .post(`/api/cancel-booking/${BOOKING_ID}`)
            .set(env.X_ACCESS_TOKEN, token)
        expect(res.statusCode).toBe(200)
        booking = await Booking.findById(BOOKING_ID)
        expect(booking?.cancelRequest).toBeTruthy()

        res = await request(app)
            .post(`/api/cancel-booking/${TestHelper.GetRandromObjectIdAsString()}`)
            .set(env.X_ACCESS_TOKEN, token)
        expect(res.statusCode).toBe(204)

        res = await request(app)
            .post(`/api/cancel-booking/${uuid()}`)
            .set(env.X_ACCESS_TOKEN, token)
        expect(res.statusCode).toBe(400)

        await TestHelper.signout(token)
    })
})

describe('DELETE /api/delete-bookings', () => {
    it('should delete bookings', async () => {
        const token = await TestHelper.signinAsAdmin()

        const renters = [RENTER1_ID, RENTER2_ID]

        let bookings = await Booking.find({ renter: { $in: renters } })
        expect(bookings.length).toBeGreaterThan(0)
        const payload: string[] = bookings.map((u) => u.id)
        let res = await request(app)
            .post('/api/delete-bookings')
            .set(env.X_ACCESS_TOKEN, token)
            .send(payload)
        expect(res.statusCode).toBe(200)
        bookings = await Booking.find({ driver: { $in: renters } })
        expect(bookings.length).toBe(0)

        res = await request(app)
            .post('/api/delete-bookings')
            .set(env.X_ACCESS_TOKEN, token)
        expect(res.statusCode).toBe(400)

        await TestHelper.signout(token)
    })
})
