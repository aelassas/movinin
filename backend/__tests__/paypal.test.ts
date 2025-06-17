import 'dotenv/config'
import request from 'supertest'
import * as movininTypes from ':movinin-types'
import app from '../src/app'
import * as databaseHelper from '../src/common/databaseHelper'
import * as testHelper from './testHelper'
import * as env from '../src/config/env.config'
import Booking from '../src/models/Booking'

//
// Connecting and initializing the database before running the test suite
//
beforeAll(async () => {
  testHelper.initializeLogger()

  await databaseHelper.connect(env.DB_URI, false, false)
})

//
// Closing and cleaning the database connection after running the test suite
//
afterAll(async () => {
  await databaseHelper.close()
})

describe('POST /api/create-paypal-order', () => {
  it('should create paypal order', async () => {
    // test success (create paypal order whith non existant user)
    const payload: movininTypes.CreatePayPalOrderPayload = {
      amount: 234,
      currency: 'USD',
      name: 'Beautiful House in Chicago',
      description: 'Beautiful House in Chicago',
      bookingId: testHelper.GetRandromObjectIdAsString(),
    }
    let res = await request(app)
      .post('/api/create-paypal-order')
      .send(payload)
    expect(res.statusCode).toBe(200)
    expect(res.body.length).toBeGreaterThan(0)

    // test failure (create paypal order failure)
    payload.currency = 'xxxxxxxxxxxxxxx'
    res = await request(app)
      .post('/api/create-paypal-order')
      .send(payload)
    expect(res.statusCode).toBe(400)
  })
})

describe('POST /api/check-paypal-order/:bookingId/:orderId', () => {
  it('should check paypal order', async () => {
    // test failure (order exists, booking exists and payment failed)
    const expireAt = new Date()
    expireAt.setSeconds(expireAt.getSeconds() + env.BOOKING_EXPIRE_AT)
    const from = new Date()
    from.setDate(from.getDate() + 1)
    const to = new Date(from)
    to.setDate(to.getDate() + 3)

    const booking = new Booking({
      agency: testHelper.GetRandromObjectId(),
      property: testHelper.GetRandromObjectId(),
      renter: testHelper.GetRandromObjectId(),
      location: testHelper.GetRandromObjectId(),
      from: new Date(2024, 2, 1),
      to: new Date(1990, 2, 4),
      status: movininTypes.BookingStatus.Void,
      expireAt,
      cancellation: true,
      price: 312,
    })
    try {
      await booking.save()

      const payload: movininTypes.CreatePayPalOrderPayload = {
        amount: booking.price,
        currency: 'USD',
        name: 'Beautiful House in Chicago',
        description: 'Beautiful House in Chicago',
        bookingId: booking.id,
      }
      let res = await request(app)
        .post('/api/create-paypal-order')
        .send(payload)
      expect(res.statusCode).toBe(200)
      expect(res.body.length).toBeGreaterThan(0)
      const orderId = res.body

      res = await request(app)
        .post(`/api/check-paypal-order/${booking.id}/${orderId}`)
      expect(res.statusCode).toBe(400)

      // test failure (booking exists, order does not exist)
      res = await request(app)
        .post(`/api/check-paypal-order/${booking.id}/${testHelper.GetRandromObjectIdAsString()}`)
      expect(res.statusCode).toBe(204)
    } catch (err) {
      console.error(err)
    } finally {
      await booking.deleteOne()
    }

    // test failure (booking does not exist)
    let res = await request(app)
      .post(`/api/check-paypal-order/${testHelper.GetRandromObjectIdAsString()}/${testHelper.GetRandromObjectIdAsString()}`)
    expect(res.statusCode).toBe(204)

    // test failure (lost db connection)
    try {
      databaseHelper.close()
      res = await request(app)
        .post(`/api/check-paypal-order/${testHelper.GetRandromObjectIdAsString()}/${testHelper.GetRandromObjectIdAsString()}`)
      expect(res.statusCode).toBe(400)
    } catch (err) {
      console.error(err)
    } finally {
      const dbRes = await databaseHelper.connect(env.DB_URI, false, false)
      expect(dbRes).toBeTruthy()
    }
  })
})
