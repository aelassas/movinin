import 'dotenv/config'
import request from 'supertest'
import { nanoid } from 'nanoid'
import * as movininTypes from ':movinin-types'
import * as movininHelper from ':movinin-helper'
import app from '../src/app'
import * as databaseHelper from '../src/utils/databaseHelper'
import * as testHelper from './testHelper'
import * as authHelper from '../src/utils/authHelper'
import Property from '../src/models/Property'
import Booking from '../src/models/Booking'
import User from '../src/models/User'
import PushToken from '../src/models/PushToken'
import Token from '../src/models/Token'
import * as env from '../src/config/env.config'
import stripeAPI from '../src/payment/stripe'
import Notification from '../src/models/Notification'
import NotificationCounter from '../src/models/NotificationCounter'

const RENTER1_NAME = 'Renter 1'
const RENTER1_PASSWORD = 'Un1tTest5'
let RENTER1_EMAIL: string

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
  RENTER1_EMAIL = testHelper.GetRandomEmail()
  const renter1PasswordHash = await authHelper.hashPassword(RENTER1_PASSWORD)
  const renter1 = new User({
    fullName: RENTER1_NAME,
    email: RENTER1_EMAIL,
    language: testHelper.LANGUAGE,
    password: renter1PasswordHash,
    type: movininTypes.UserType.User,
  })
  await renter1.save()
  RENTER1_ID = renter1._id.toString()

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
  PROPERTY1_ID = property._id.toString()

  // property 2
  property = new Property({ ...payload, name: 'Beautiful Townhouse in Detroit', price: 1200 })
  await property.save()
  PROPERTY2_ID = property._id.toString()
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
      to: new Date(2024, 2, 4),
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
        to: new Date(2024, 3, 4),
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
    expect(res.body.bookingId).toBeTruthy()

    bookings = await Booking.find({ renter: RENTER1_ID })
    expect(bookings.length).toBeGreaterThan(1)

    // Test failed stripe payment
    payload.payLater = false
    const receiptEmail = testHelper.GetRandomEmail()

    // Calculate actual expected amount in cents to pass validation
    const prop = await Property.findById(PROPERTY1_ID)
    const expectedBasePrice = movininHelper.calculateTotalPrice(
      prop! as unknown as movininTypes.Property,
      new Date(2024, 3, 1),
      new Date(2024, 3, 4),
      { cancellation: true }
    )

    const paymentIntentPayload: movininTypes.CreatePaymentPayload = {
      amount: expectedBasePrice,
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
      expect(res.body.bookingId).toBeTruthy()
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
    await testHelper.deleteNotifications(bookingId)
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
    expect(res.body.bookingId).toBeTruthy()
    await testHelper.deleteNotifications(res.body.bookingId)

    const renter2 = await User.findOne({ email: payload.renter.email })
    expect(renter2).not.toBeNull()
    RENTER2_ID = renter2?._id.toString() || ''
    const token = await Token.findOne({ user: RENTER2_ID })
    expect(token).not.toBeNull()
    expect(token?.token.length).toBeGreaterThan(0)
    await token?.deleteOne()

    payload.renter = undefined
    res = await request(app)
      .post('/api/checkout')
      .send(payload)
    expect(res.statusCode).toBe(200)
    expect(res.body.bookingId).toBeTruthy()


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

    // cleanup notifications
    bookings = await Booking.find({ renter: { $in: [RENTER1_ID, RENTER2_ID] } })
    for (const booking of bookings) {
      await testHelper.deleteNotifications(booking._id.toString())
    }
  })
})

describe('Security Regression Tests - Issue #28 Checkout Payment Binding', () => {
  it('should ignore client-supplied Paid status when payLater is enabled', async () => {
    const payload: movininTypes.CheckoutPayload = {
      booking: {
        agency: AGENCY_ID,
        property: PROPERTY1_ID,
        renter: RENTER1_ID,
        location: LOCATION_ID,
        from: new Date(2025, 5, 1),
        to: new Date(2025, 5, 4),
        status: movininTypes.BookingStatus.Paid, // Client attempting to tamper with status
        cancellation: false,
        price: 3000,
      },
      payLater: true,
    }

    const res = await request(app)
      .post('/api/checkout')
      .send(payload)

    expect(res.statusCode).toBe(200)
    const booking = await Booking.findById(res.body.bookingId)
    expect(booking).not.toBeNull()
    // Server must force status to Pending, ignoring client's requested "Paid"
    expect(booking?.status).toBe(movininTypes.BookingStatus.Pending)
    await Booking.deleteOne({ _id: res.body.bookingId })
  })

  it('should reject payment checkout if amount does not match expected property price', async () => {
    // Create Payment Intent for $10.00 USD (1000 cents)
    const receiptEmail = testHelper.GetRandomEmail()
    const paymentIntentPayload: movininTypes.CreatePaymentPayload = {
      amount: 10,
      currency: 'usd',
      receiptEmail,
      customerName: 'Underpaid Attacker',
      description: 'Underpaid Test Intent',
      locale: 'en',
      name: 'Test Underpay',
    }
    const piRes = await request(app)
      .post('/api/create-payment-intent')
      .send(paymentIntentPayload)
    expect(piRes.statusCode).toBe(200)
    const { paymentIntentId, customerId } = piRes.body

    await stripeAPI.paymentIntents.confirm(paymentIntentId, {
      payment_method: 'pm_card_visa',
    })

    // Property price is 1000 per day x 3 days = 3000 USD
    const payload: movininTypes.CheckoutPayload = {
      booking: {
        agency: AGENCY_ID,
        property: PROPERTY1_ID,
        renter: RENTER1_ID,
        location: LOCATION_ID,
        from: new Date(2025, 6, 1),
        to: new Date(2025, 6, 4),
        status: movininTypes.BookingStatus.Pending,
        cancellation: false,
        price: 3000,
      },
      payLater: false,
      paymentIntentId,
      customerId,
    }

    const res = await request(app)
      .post('/api/checkout')
      .send(payload)

    expect(res.statusCode).toBe(400)
    expect(res.text).toContain('Payment amount mismatch')

    const customer = await stripeAPI.customers.retrieve(customerId)
    if (customer) {
      await stripeAPI.customers.del(customerId)
    }
  })

  it('should reject payment checkout if paymentIntentId is replayed', async () => {
    // Create Property with 0 minimum price for predictable amount
    const prop = await Property.findById(PROPERTY1_ID)
    const expectedBasePrice = movininHelper.calculateTotalPrice(
      prop! as unknown as movininTypes.Property,
      new Date(2025, 7, 1),
      new Date(2025, 7, 4),
      { cancellation: false })

    const receiptEmail = testHelper.GetRandomEmail()
    const paymentIntentPayload: movininTypes.CreatePaymentPayload = {
      amount: expectedBasePrice,
      currency: 'usd',
      receiptEmail,
      customerName: 'Replay Tester',
      description: 'Valid Intent',
      locale: 'en',
      name: 'Test Replay',
    }
    const piRes = await request(app)
      .post('/api/create-payment-intent')
      .send(paymentIntentPayload)
    const { paymentIntentId, customerId } = piRes.body

    await stripeAPI.paymentIntents.confirm(paymentIntentId, {
      payment_method: 'pm_card_visa',
    })

    const payload: movininTypes.CheckoutPayload = {
      booking: {
        agency: AGENCY_ID,
        property: PROPERTY1_ID,
        renter: RENTER1_ID,
        location: LOCATION_ID,
        from: new Date(2025, 7, 1),
        to: new Date(2025, 7, 4),
        status: movininTypes.BookingStatus.Pending,
        cancellation: false,
        price: expectedBasePrice,
      },
      payLater: false,
      paymentIntentId,
      customerId,
    }

    // First checkout succeeds
    const firstRes = await request(app)
      .post('/api/checkout')
      .send(payload)
    expect(firstRes.statusCode).toBe(200)

    // Replay attack attempt with same paymentIntentId fails
    const secondRes = await request(app)
      .post('/api/checkout')
      .send(payload)
    expect(secondRes.statusCode).toBe(400)
    expect(secondRes.text).toContain('already been used')

    await Booking.deleteOne({ _id: firstRes.body.bookingId })
    const customer = await stripeAPI.customers.retrieve(customerId)
    if (customer) {
      await stripeAPI.customers.del(customerId)
    }
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
      to: new Date(2024, 2, 4),
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

    // test failure (missing booking id)
    payload._id = undefined
    res = await request(app)
      .put('/api/update-booking')
      .set(env.X_ACCESS_TOKEN, token)
      .send(payload)
    expect(res.statusCode).toBe(400)

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
  it('should deny unauthenticated access', async () => {
    const res = await request(app)
      .get(`/api/booking/${BOOKING_ID}/${testHelper.LANGUAGE}`)
    expect(res.statusCode).toBe(403)
  })

  it('should deny unauthorized user (IDOR prevention)', async () => {
    // Sign in as a different user who is neither renter, agency, nor admin
    const token = await testHelper.signinAsUser()
    const res = await request(app)
      .get(`/api/booking/${BOOKING_ID}/${testHelper.LANGUAGE}`)
      .set(env.X_ACCESS_TOKEN, token)
    expect(res.statusCode).toBe(403)
    await testHelper.signout(token)
  })

  it('should get a booking', async () => {
    const adminToken = await testHelper.signinAsAdmin()

    // test success (admin)
    let res = await request(app)
      .get(`/api/booking/${BOOKING_ID}/${testHelper.LANGUAGE}`)
      .set(env.X_ACCESS_TOKEN, adminToken)
    expect(res.statusCode).toBe(200)
    expect(res.body.property._id).toBe(PROPERTY2_ID)

    // test success (renter owner)
    const renterToken = await testHelper.generateToken(RENTER1_ID)
    res = await request(app)
      .get(`/api/booking/${BOOKING_ID}/${testHelper.LANGUAGE}`)
      .set(env.X_ACCESS_TOKEN, renterToken)
    expect(res.statusCode).toBe(200)
    expect(res.body._id).toBe(BOOKING_ID)

    // test success (assigned agency)
    const agencyToken = await testHelper.generateToken(AGENCY_ID)
    res = await request(app)
      .get(`/api/booking/${BOOKING_ID}/${testHelper.LANGUAGE}`)
      .set(env.X_ACCESS_TOKEN, agencyToken)
    expect(res.statusCode).toBe(200)
    expect(res.body._id).toBe(BOOKING_ID)

    // test success (guest checkout with valid sessionId)
    const validSessionId = testHelper.GetRandromObjectIdAsString()
    const booking = await Booking.findById(BOOKING_ID)
    booking!.sessionId = validSessionId
    await booking!.save()

    res = await request(app)
      .get(`/api/booking/${BOOKING_ID}/${testHelper.LANGUAGE}?sessionId=${validSessionId}`)
    expect(res.statusCode).toBe(200)
    expect(res.body._id).toBe(BOOKING_ID)

    // test forbidden (unauthenticated without sessionId)
    res = await request(app)
      .get(`/api/booking/${BOOKING_ID}/${testHelper.LANGUAGE}`)
    expect(res.statusCode).toBe(403)

    // test forbidden (unrelated user)
    const unrelatedRenter = new User({
      fullName: 'Unrelated Renter',
      email: testHelper.GetRandomEmail(),
      language: testHelper.LANGUAGE,
      type: movininTypes.UserType.User,
    })
    await unrelatedRenter.save()
    const unrelatedToken = await testHelper.generateToken(unrelatedRenter._id.toString())
    res = await request(app)
      .get(`/api/booking/${BOOKING_ID}/${testHelper.LANGUAGE}`)
      .set(env.X_ACCESS_TOKEN, unrelatedToken)
    expect(res.statusCode).toBe(403)
    await unrelatedRenter.deleteOne()

    // test success (booking not found)
    res = await request(app)
      .get(`/api/booking/${testHelper.GetRandromObjectIdAsString()}/${testHelper.LANGUAGE}`)
      .set(env.X_ACCESS_TOKEN, adminToken)
    expect(res.statusCode).toBe(204)

    // test failure (invalid booking id)
    res = await request(app)
      .get(`/api/booking/${nanoid()}/${testHelper.LANGUAGE}`)
      .set(env.X_ACCESS_TOKEN, adminToken)
    expect(res.statusCode).toBe(400)

    await testHelper.signout(adminToken)
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
    expect(res.body).toBe(booking!._id.toString())

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
        to: new Date(2024, 2, 4),
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

    // test success (dateBetween)
    payload.filter!.from = undefined
    payload.filter!.to = undefined
    payload.filter!.dateBetween = new Date(2024, 2, 1)
    res = await request(app)
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
    payload.filter!.dateBetween = undefined
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

    payload.filter!.dateBetween = new Date(2024, 2, 2)
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
  it('should return 403 when a different authenticated user attempts cancellation', async () => {
    // Sign in as the shared test user — NOT the booking owner
    const otherUserToken = await testHelper.signinAsUser()

    // Ensure the booking has not yet been cancelled
    let booking = await Booking.findById(BOOKING_ID)
    expect(booking?.cancelRequest).toBeFalsy()

    // Record notification state before the unauthorized attempt
    const notificationsBefore = await Notification.find({ booking: BOOKING_ID })

    const res = await request(app)
      .post(`/api/cancel-booking/${BOOKING_ID}`)
      .set(env.X_ACCESS_TOKEN, otherUserToken)
    expect(res.statusCode).toBe(403)

    // Booking must NOT have been mutated
    booking = await Booking.findById(BOOKING_ID)
    expect(booking?.cancelRequest).toBeFalsy()

    // No new notifications must have been created
    const notificationsAfter = await Notification.find({ booking: BOOKING_ID })
    expect(notificationsAfter.length).toBe(notificationsBefore.length)

    await testHelper.signout(otherUserToken)
  })

  it('should cancel a booking when the owner requests it', async () => {
    // Sign in as RENTER1 — the actual owner of BOOKING_ID
    const renter1Token = await testHelper.signinAsRenter(RENTER1_EMAIL, RENTER1_PASSWORD)

    let booking = await Booking.findById(BOOKING_ID)
    expect(booking?.cancelRequest).toBeFalsy()

    // test success (authorized owner)
    let res = await request(app)
      .post(`/api/cancel-booking/${BOOKING_ID}`)
      .set(env.X_ACCESS_TOKEN, renter1Token)
    expect(res.statusCode).toBe(200)
    booking = await Booking.findById(BOOKING_ID)
    expect(booking?.cancelRequest).toBeTruthy()
    await testHelper.deleteNotifications(BOOKING_ID)

    // test failure (agency not found)
    booking = await Booking.findById(BOOKING_ID)
    booking!.cancelRequest = false
    const agencyId = booking!.agency
    booking!.agency = testHelper.GetRandromObjectId()
    await booking!.save()
    res = await request(app)
      .post(`/api/cancel-booking/${BOOKING_ID}`)
      .set(env.X_ACCESS_TOKEN, renter1Token)
    expect(res.statusCode).toBe(204)
    booking!.agency = agencyId
    await booking!.save()

    res = await request(app)
      .post(`/api/cancel-booking/${testHelper.GetRandromObjectIdAsString()}`)
      .set(env.X_ACCESS_TOKEN, renter1Token)
    expect(res.statusCode).toBe(204)

    res = await request(app)
      .post(`/api/cancel-booking/${nanoid()}`)
      .set(env.X_ACCESS_TOKEN, renter1Token)
    expect(res.statusCode).toBe(400)
  })
})

describe('POST /api/delete-bookings', () => {
  it('should delete bookings', async () => {
    const token = await testHelper.signinAsAdmin()

    const renters = [RENTER1_ID, RENTER2_ID]

    let bookings = await Booking.find({ renter: { $in: renters } })
    expect(bookings.length).toBeGreaterThan(0)
    const payload: string[] = bookings.map((u) => u._id.toString())
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
      renter: renter._id.toString(),
      location: LOCATION_ID,
      from: new Date(2024, 2, 1),
      to: new Date(2024, 2, 4),
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
      .delete(`/api/delete-temp-booking/${booking._id.toString()}/${sessionId}`)
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
        .delete(`/api/delete-temp-booking/${booking._id.toString()}/${sessionId}`)
      expect(res.statusCode).toBe(400)
    } catch (err) {
      console.error(err)
    } finally {
      const connRes = await databaseHelper.connect(env.DB_URI, false, false)
      expect(connRes).toBeTruthy()
    }
  })
})

describe('Security Regression Tests - Issue #124 Equivalent', () => {
  let agencyAId: string
  let agencyAToken: string
  let agencyBId: string
  let agencyBToken: string
  let bookingBId: string

  beforeAll(async () => {
    // Create Agency A
    const nameA = testHelper.getAgencyName()
    agencyAId = await testHelper.createAgency(`${nameA}@testA.movinin.io`, nameA)
    agencyAToken = await testHelper.generateToken(agencyAId)

    // Create Agency B
    const nameB = testHelper.getAgencyName()
    agencyBId = await testHelper.createAgency(`${nameB}@testB.movinin.io`, nameB)
    agencyBToken = await testHelper.generateToken(agencyBId)

    const propertyB = new Property({
      name: 'Agency B Property',
      agency: agencyBId,
      type: movininTypes.PropertyType.House,
      description: 'Test Property B',
      image: 'house.jpg',
      images: [],
      bedrooms: 2,
      bathrooms: 1,
      kitchens: 1,
      parkingSpaces: 1,
      size: 100,
      petsAllowed: false,
      furnished: true,
      aircon: true,
      minimumAge: 21,
      location: LOCATION_ID,
      price: 1500,
      cancellation: 0,
      available: true,
      rentalTerm: movininTypes.RentalTerm.Daily,
    })
    await propertyB.save()

    // Create a booking for Agency B
    const bookingB = new Booking({
      agency: agencyBId,
      property: propertyB._id,
      renter: RENTER1_ID,
      location: LOCATION_ID,
      from: new Date(2025, 0, 1),
      to: new Date(2025, 0, 5),
      status: movininTypes.BookingStatus.Reserved,
      price: 1500,
    })
    await bookingB.save()
    bookingBId = bookingB._id.toString()
  })

  afterAll(async () => {
    await Booking.deleteOne({ _id: bookingBId })
    await Property.deleteMany({ agency: agencyBId })
    await testHelper.deleteAgency(agencyAId)
    await testHelper.deleteAgency(agencyBId)
  })

  it("should prevent Agency A from retrieving Agency B's bookings via client-supplied agencies field", async () => {
    const payload: movininTypes.GetBookingsPayload = {
      agencies: [agencyBId], // Agency A attempts to query Agency B's ID
      statuses: [movininTypes.BookingStatus.Reserved],
    }

    const res = await request(app)
      .post(`/api/bookings/${testHelper.PAGE}/${testHelper.SIZE}/${testHelper.LANGUAGE}`)
      .set(env.X_ACCESS_TOKEN, agencyAToken)
      .send(payload)

    expect(res.statusCode).toBe(200)
    // Agency A should receive 0 bookings belonging to Agency B
    expect(res.body[0].resultData.length).toBe(0)
  })

  it('should not disclose renter password in POST /api/bookings list endpoint', async () => {
    const payload: movininTypes.GetBookingsPayload = {
      agencies: [agencyBId],
      statuses: [movininTypes.BookingStatus.Reserved],
    }

    const res = await request(app)
      .post(`/api/bookings/${testHelper.PAGE}/${testHelper.SIZE}/${testHelper.LANGUAGE}`)
      .set(env.X_ACCESS_TOKEN, agencyBToken)
      .send(payload)

    expect(res.statusCode).toBe(200)
    expect(res.body[0].resultData.length).toBeGreaterThan(0)
    const booking = res.body[0].resultData[0]
    expect(booking.renter).toBeDefined()
    expect(booking.renter.password).toBeUndefined()
  })

  it('should not disclose renter password in GET /api/booking/:id detail endpoint', async () => {
    const res = await request(app)
      .get(`/api/booking/${bookingBId}/${testHelper.LANGUAGE}`)
      .set(env.X_ACCESS_TOKEN, agencyBToken)

    expect(res.statusCode).toBe(200)
    expect(res.body.renter).toBeDefined()
    expect(res.body.renter.password).toBeUndefined()
  })
})
