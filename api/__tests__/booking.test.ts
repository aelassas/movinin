import 'dotenv/config'
import request from 'supertest'
import { nanoid } from 'nanoid'
import * as movininTypes from ':movinin-types'
import app from '../src/app'
import * as databaseHelper from '../src/common/databaseHelper'
import * as testHelper from './testHelper'
import Property from '../src/models/Property'
import Booking from '../src/models/Booking'
import User from '../src/models/User'
import PushToken from '../src/models/PushToken'
import Token from '../src/models/Token'
import * as env from '../src/config/env.config'
import stripeAPI from '../src/stripe'
import Notification from '../src/models/Notification'
import NotificationCounter from '../src/models/NotificationCounter'

const RENTER1_NAME = 'Renter 1'

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
  testHelper.initializeLogger()

  await databaseHelper.connect(env.DB_URI, false, false)

  await testHelper.initialize()

  // create a agency
  const agencyName = testHelper.getAgencyName()
  AGENCY_ID = await testHelper.createAgency(`${agencyName}@test.movinin.io`, agencyName)

  // create renter 1
  const renter1 = new User({
    fullName: RENTER1_NAME,
    email: testHelper.GetRandomEmail(),
    language: testHelper.LANGUAGE,
    type: movininTypes.UserType.User,
  })
  await renter1.save()
  RENTER1_ID = renter1.id

  // create a location
  LOCATION_ID = await testHelper.createLocation('Location 1 EN', 'Location 1 FR')

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
})

//
// Closing and cleaning the database connection after running the test suite
//
afterAll(async () => {
  await testHelper.close()

  // delete the agency
  await testHelper.deleteAgency(AGENCY_ID)

  // delete the location
  await testHelper.deleteLocation(LOCATION_ID)

  // delete the property
  await Property.deleteMany({ _id: { $in: [PROPERTY1_ID, PROPERTY2_ID] } })

  // delete renters
  await User.deleteMany({ _id: { $in: [RENTER1_ID, RENTER2_ID] } })
  await Notification.deleteMany({ user: { $in: [RENTER1_ID, RENTER2_ID] } })
  await NotificationCounter.deleteMany({ user: { $in: [RENTER1_ID, RENTER2_ID] } })

  await databaseHelper.close()
})

//
// Unit tests
//

describe('POST /api/create-booking', () => {
  it('should create a booking', async () => {
    const token = await testHelper.signinAsAdmin()

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

    await testHelper.signout(token)
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

    // Test failed stripe payment
    payload.payLater = false
    const receiptEmail = testHelper.GetRandomEmail()
    const paymentIntentPayload: movininTypes.CreatePaymentPayload = {
      amount: 534,
      currency: 'usd',
      receiptEmail,
      customerName: 'John Doe',
      description: "Movin' In Testing Service",
      locale: 'en',
      name: 'Test',
    }
    res = await request(app)
      .post('/api/create-payment-intent')
      .send(paymentIntentPayload)
    expect(res.statusCode).toBe(200)
    expect(res.body.paymentIntentId).not.toBeNull()
    expect(res.body.customerId).not.toBeNull()
    const { paymentIntentId, customerId } = res.body
    payload.payLater = false
    payload.paymentIntentId = paymentIntentId
    payload.customerId = customerId
    res = await request(app)
      .post('/api/checkout')
      .send(payload)
    expect(res.statusCode).toBe(400)

    // Test successful stripe payment
    await stripeAPI.paymentIntents.confirm(paymentIntentId, {
      payment_method: 'pm_card_visa',
    })
    const renter = await User.findOne({ _id: RENTER1_ID })
    renter!.language = 'fr'
    await renter?.save()
    res = await request(app)
      .post('/api/checkout')
      .send(payload)
    try {
      expect(res.statusCode).toBe(200)
      bookings = await Booking.find({ renter: RENTER1_ID })
      expect(bookings.length).toBeGreaterThan(2)
    } catch (err) {
      console.error(err)
    } finally {
      const customer = await stripeAPI.customers.retrieve(customerId)
      if (customer) {
        await stripeAPI.customers.del(customerId)
      }
    }

    // Test checkout session
    payload.paymentIntentId = undefined
    payload.sessionId = 'xxxxxxxxxxxxxx'
    res = await request(app)
      .post('/api/checkout')
      .send(payload)
    expect(res.statusCode).toBe(200)
    const { bookingId } = res.body
    expect(bookingId).toBeTruthy()
    const booking = await Booking.findById(bookingId)
    expect(booking?.status).toBe(movininTypes.BookingStatus.Void)
    expect(booking?.sessionId).toBe(payload.sessionId)
    payload.payLater = true

    payload.booking!.agency = testHelper.GetRandromObjectIdAsString()
    res = await request(app)
      .post('/api/checkout')
      .send(payload)
    expect(res.statusCode).toBe(204)

    payload.booking!.agency = AGENCY_ID
    payload.renter = {
      fullName: 'renter',
      email: testHelper.GetRandomEmail(),
      language: testHelper.LANGUAGE,
    }
    res = await request(app)
      .post('/api/checkout')
      .send(payload)
    expect(res.statusCode).toBe(200)
    const renter2 = await User.findOne({ email: payload.renter.email })
    expect(renter2).not.toBeNull()
    RENTER2_ID = renter2?.id
    const token = await Token.findOne({ user: RENTER2_ID })
    expect(token).not.toBeNull()
    expect(token?.token.length).toBeGreaterThan(0)
    await token?.deleteOne()

    payload.renter = undefined
    res = await request(app)
      .post('/api/checkout')
      .send(payload)
    expect(res.statusCode).toBe(200)

    payload.booking!.property = testHelper.GetRandromObjectIdAsString()
    res = await request(app)
      .post('/api/checkout')
      .send(payload)
    expect(res.statusCode).toBe(400)

    payload.booking!.property = PROPERTY1_ID
    payload.booking!.location = testHelper.GetRandromObjectIdAsString()
    res = await request(app)
      .post('/api/checkout')
      .send(payload)
    expect(res.statusCode).toBe(400)

    payload.booking!.agency = AGENCY_ID
    payload.booking!.renter = testHelper.GetRandromObjectIdAsString()
    res = await request(app)
      .post('/api/checkout')
      .send(payload)
    expect(res.statusCode).toBe(204)

    res = await request(app)
      .post('/api/checkout')
      .send({ booking: { renter: RENTER1_ID } })
    expect(res.statusCode).toBe(400)

    payload.booking = undefined
    res = await request(app)
      .post('/api/checkout')
      .send(payload)
    expect(res.statusCode).toBe(400)
  })
})

describe('POST /api/update-booking', () => {
  it('should update a booking', async () => {
    const token = await testHelper.signinAsAdmin()

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

    res = await request(app)
      .put('/api/update-booking')
      .set(env.X_ACCESS_TOKEN, token)
      .send(payload)
    expect(res.statusCode).toBe(200)
    expect(res.body.property).toBe(PROPERTY2_ID)
    expect(res.body.price).toBe(4800)
    expect(res.body.status).toBe(movininTypes.BookingStatus.Paid)

    payload._id = testHelper.GetRandromObjectIdAsString()
    res = await request(app)
      .put('/api/update-booking')
      .set(env.X_ACCESS_TOKEN, token)
      .send(payload)
    expect(res.statusCode).toBe(204)

    // notifyDriver
    payload._id = BOOKING_ID
    payload.status = movininTypes.BookingStatus.Cancelled
    payload.renter = testHelper.GetRandromObjectIdAsString()
    res = await request(app)
      .put('/api/update-booking')
      .set(env.X_ACCESS_TOKEN, token)
      .send(payload)
    expect(res.statusCode).toBe(200)

    payload.renter = RENTER1_ID
    payload.status = movininTypes.BookingStatus.Void
    let pushToken = new PushToken({ user: payload.renter, token: 'ExponentPushToken[CokU9KJ9-Yq2ulVTyYOI8J]' })
    await pushToken.save()
    res = await request(app)
      .put('/api/update-booking')
      .set(env.X_ACCESS_TOKEN, token)
      .send(payload)
    expect(res.statusCode).toBe(200)
    await PushToken.deleteOne({ _id: pushToken._id })

    payload.status = movininTypes.BookingStatus.Deposit
    pushToken = new PushToken({ user: payload.renter, token: 'ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]' })
    await pushToken.save()
    res = await request(app)
      .put('/api/update-booking')
      .set(env.X_ACCESS_TOKEN, token)
      .send(payload)
    expect(res.statusCode).toBe(200)
    await PushToken.deleteOne({ _id: pushToken._id })

    payload.status = movininTypes.BookingStatus.Cancelled
    pushToken = new PushToken({ user: payload.renter, token: '0' })
    await pushToken.save()
    res = await request(app)
      .put('/api/update-booking')
      .set(env.X_ACCESS_TOKEN, token)
      .send(payload)
    expect(res.statusCode).toBe(200)
    await PushToken.deleteOne({ _id: pushToken._id })

    res = await request(app)
      .put('/api/update-booking')
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(400)

    await testHelper.signout(token)
  })
})

describe('POST /api/update-booking-status', () => {
  it('should update booking status', async () => {
    const token = await testHelper.signinAsAdmin()

    const payload: movininTypes.UpdateStatusPayload = {
      ids: [BOOKING_ID],
      status: movininTypes.BookingStatus.Reserved,
    }
    let res = await request(app)
      .post('/api/update-booking-status')
      .set(env.X_ACCESS_TOKEN, token)
      .send(payload)
    expect(res.statusCode).toBe(200)
    let booking = await Booking.findById(BOOKING_ID)
    expect(booking?.status).toBe(movininTypes.BookingStatus.Reserved)

    res = await request(app)
      .post('/api/update-booking-status')
      .set(env.X_ACCESS_TOKEN, token)
      .send(payload)
    expect(res.statusCode).toBe(200)
    booking = await Booking.findById(BOOKING_ID)
    expect(booking?.status).toBe(movininTypes.BookingStatus.Reserved)

    res = await request(app)
      .post('/api/update-booking-status')
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(400)

    await testHelper.signout(token)
  })
})

describe('GET /api/booking/:id/:language', () => {
  it('should get a booking', async () => {
    const token = await testHelper.signinAsAdmin()

    let res = await request(app)
      .get(`/api/booking/${BOOKING_ID}/${testHelper.LANGUAGE}`)
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(200)
    expect(res.body.property._id).toBe(PROPERTY2_ID)

    res = await request(app)
      .get(`/api/booking/${testHelper.GetRandromObjectIdAsString()}/${testHelper.LANGUAGE}`)
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(204)

    res = await request(app)
      .get(`/api/booking/${nanoid()}/${testHelper.LANGUAGE}`)
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(400)

    await testHelper.signout(token)
  })
})

describe('GET /api/booking-id/:sessionId', () => {
  it('should get a booking id from session id', async () => {
    // test success
    const booking = await Booking.findById(BOOKING_ID)
    const sessionId = nanoid()
    booking!.sessionId = sessionId
    await booking!.save()
    let res = await request(app)
      .get(`/api/booking-id/${sessionId}`)
    expect(res.statusCode).toBe(200)
    expect(res.body).toBe(booking!.id)

    // test success (booking not found)
    res = await request(app)
      .get(`/api/booking-id/${nanoid()}`)
    expect(res.statusCode).toBe(204)

    // test failure (lost db connection)
    await databaseHelper.close()
    res = await request(app)
      .get(`/api/booking-id/${nanoid()}`)
    expect(res.statusCode).toBe(400)
    const connRes = await databaseHelper.connect(env.DB_URI, false, false)
    expect(connRes).toBeTruthy()
  })
})

describe('POST /api/bookings/:page/:size/:language', () => {
  it('should get bookings', async () => {
    const token = await testHelper.signinAsAdmin()

    const payload: movininTypes.GetBookingsPayload = {
      agencies: [AGENCY_ID],
      statuses: [movininTypes.BookingStatus.Reserved],
      filter: {
        location: LOCATION_ID,
        from: new Date(2024, 2, 1),
        to: new Date(1990, 2, 4),
        keyword: RENTER1_NAME,
      },
      user: RENTER1_ID,
      property: PROPERTY2_ID,
    }
    let res = await request(app)
      .post(`/api/bookings/${testHelper.PAGE}/${testHelper.SIZE}/${testHelper.LANGUAGE}`)
      .set(env.X_ACCESS_TOKEN, token)
      .send(payload)
    expect(res.statusCode).toBe(200)
    expect(res.body[0].resultData.length).toBe(1)

    payload.user = undefined
    payload.property = undefined
    payload.filter!.from = undefined
    payload.filter!.to = undefined
    payload.filter!.location = undefined
    payload.filter!.keyword = undefined
    res = await request(app)
      .post(`/api/bookings/${testHelper.PAGE}/${testHelper.SIZE}/${testHelper.LANGUAGE}`)
      .set(env.X_ACCESS_TOKEN, token)
      .send(payload)
    expect(res.statusCode).toBe(200)
    expect(res.body[0].resultData.length).toBe(1)

    payload.filter!.keyword = BOOKING_ID
    res = await request(app)
      .post(`/api/bookings/${testHelper.PAGE}/${testHelper.SIZE}/${testHelper.LANGUAGE}`)
      .set(env.X_ACCESS_TOKEN, token)
      .send(payload)
    expect(res.statusCode).toBe(200)
    expect(res.body[0].resultData.length).toBe(1)

    res = await request(app)
      .post(`/api/bookings/${testHelper.PAGE}/${testHelper.SIZE}/${testHelper.LANGUAGE}`)
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(400)

    await testHelper.signout(token)
  })
})

describe('GET /api/has-bookings/:renter', () => {
  it("should check renter's bookings", async () => {
    const token = await testHelper.signinAsAdmin()

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
      .get(`/api/has-bookings/${nanoid()}`)
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(400)

    await testHelper.signout(token)
  })
})

describe('POST /api/cancel-booking/:id', () => {
  it('should cancel a booking', async () => {
    const token = await testHelper.signinAsUser()

    let booking = await Booking.findById(BOOKING_ID)
    expect(booking?.cancelRequest).toBeFalsy()
    let res = await request(app)
      .post(`/api/cancel-booking/${BOOKING_ID}`)
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(200)
    booking = await Booking.findById(BOOKING_ID)
    expect(booking?.cancelRequest).toBeTruthy()

    res = await request(app)
      .post(`/api/cancel-booking/${testHelper.GetRandromObjectIdAsString()}`)
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(204)

    res = await request(app)
      .post(`/api/cancel-booking/${nanoid()}`)
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(400)

    await testHelper.signout(token)
  })
})

describe('POST /api/delete-bookings', () => {
  it('should delete bookings', async () => {
    const token = await testHelper.signinAsAdmin()

    const renters = [RENTER1_ID, RENTER2_ID]

    let bookings = await Booking.find({ renter: { $in: renters } })
    expect(bookings.length).toBeGreaterThan(0)
    const payload: string[] = bookings.map((u) => u.id)
    let res = await request(app)
      .post('/api/delete-bookings')
      .set(env.X_ACCESS_TOKEN, token)
      .send(payload)
    expect(res.statusCode).toBe(200)
    bookings = await Booking.find({ renter: { $in: renters } })
    expect(bookings.length).toBe(0)

    res = await request(app)
      .post('/api/delete-bookings')
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(400)

    await testHelper.signout(token)
  })
})

describe('DELETE /api/delete-temp-booking', () => {
  it('should delete temporary booking', async () => {
    //
    // Test successful delete
    //
    const sessionId = testHelper.GetRandromObjectIdAsString()
    const expireAt = new Date()
    expireAt.setSeconds(expireAt.getSeconds() + env.BOOKING_EXPIRE_AT)

    const renter = new User({
      fullName: 'Renter',
      email: testHelper.GetRandomEmail(),
      language: testHelper.LANGUAGE,
      type: movininTypes.UserType.User,
      expireAt,
    })
    await renter.save()

    const booking = new Booking({
      agency: AGENCY_ID,
      property: PROPERTY1_ID,
      renter: renter.id,
      location: LOCATION_ID,
      from: new Date(2024, 2, 1),
      to: new Date(1990, 2, 4),
      status: movininTypes.BookingStatus.Void,
      sessionId,
      expireAt,
      cancellation: true,
      amendments: true,
      theftProtection: false,
      collisionDamageWaiver: false,
      fullInsurance: false,
      price: 312,
      additionalDriver: true,
    })
    await booking.save()

    let res = await request(app)
      .delete(`/api/delete-temp-booking/${booking.id}/${sessionId}`)
    expect(res.statusCode).toBe(200)
    const _booking = await Booking.findById(booking._id)
    expect(_booking).toBeNull()
    const _renter = await User.findById(renter._id)
    expect(_renter).toBeNull()

    //
    // Test failure
    //
    try {
      await databaseHelper.close()
      res = await request(app)
        .delete(`/api/delete-temp-booking/${booking.id}/${sessionId}`)
      expect(res.statusCode).toBe(400)
    } catch (err) {
      console.error(err)
    } finally {
      const connRes = await databaseHelper.connect(env.DB_URI, false, false)
      expect(connRes).toBeTruthy()
    }
  })
})
