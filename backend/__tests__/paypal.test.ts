import 'dotenv/config'
import { jest } from '@jest/globals'
import request from 'supertest'
import { nanoid } from 'nanoid'
import * as movininTypes from ':movinin-types'
import * as databaseHelper from '../src/utils/databaseHelper'
import * as testHelper from './testHelper'
import * as env from '../src/config/env.config'
import Booking from '../src/models/Booking'
import Property from '../src/models/Property'
import User from '../src/models/User'
import Notification from '../src/models/Notification'
import NotificationCounter from '../src/models/NotificationCounter'

//
// Configuration des mocks ESM avant l'importation de l'application
//
const mockGetOrder = jest.fn<(...args: any[]) => Promise<any>>()
const mockCreateOrder = jest.fn<(...args: any[]) => Promise<any>>()

await jest.unstable_mockModule('../src/payment/paypal.js', () => ({
  getOrder: mockGetOrder,
  getToken: jest.fn(() => Promise.resolve('fake-token')),
  createOrder: mockCreateOrder,
}))

const { default: app } = await import('../src/app')
const paypal = await import('../src/payment/paypal.js')

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
    mockCreateOrder.mockImplementation(() => Promise.resolve('ORDER-MOCK-123'))

    const orderId = await paypal.createOrder('booking123', 100, 'USD', 'Test Name', 'Test Description', 'US')

    expect(orderId).toBe('ORDER-MOCK-123')
    expect(paypal.createOrder).toHaveBeenCalledWith(
      'booking123',
      100,
      'USD',
      'Test Name',
      'Test Description',
      'US'
    )

    // Create a real booking record to verify server-side price lookup
    const booking = new Booking({
      agency: testHelper.GetRandromObjectId(),
      property: testHelper.GetRandromObjectId(),
      renter: testHelper.GetRandromObjectId(),
      location: testHelper.GetRandromObjectId(),
      from: new Date(),
      to: new Date(),
      status: movininTypes.BookingStatus.Void,
      price: 234,
    })
    await booking.save()

    // test success (create paypal order)
    const payload: movininTypes.CreatePayPalOrderPayload = {
      amount: 1, // Client sends manipulated amount, server uses booking.price (234)
      currency: 'USD',
      name: 'Beautiful House',
      description: 'Beautiful House',
      bookingId: booking._id.toString(),
    }
    let res = await request(app)
      .post('/api/create-paypal-order')
      .send(payload)
    expect(res.statusCode).toBe(200)
    expect(res.body.length).toBeGreaterThan(0)

    // test failure (create paypal order with non-existent booking)
    payload.bookingId = testHelper.GetRandromObjectIdAsString()
    res = await request(app)
      .post('/api/create-paypal-order')
      .send(payload)
    expect(res.statusCode).toBe(204)

    // test failure (create paypal order failure)
    mockCreateOrder.mockImplementation(() => Promise.reject(new Error('Simulated error')))

    await expect(paypal.createOrder('booking123', 100, 'USD', 'Test Name', 'Test Description', 'US')).rejects.toThrow('Simulated error')

    payload.bookingId = booking._id.toString()
    payload.currency = 'xxxxxxxxxxxxxxx'
    res = await request(app)
      .post('/api/create-paypal-order')
      .send(payload)
    expect(res.statusCode).toBe(400)

    await booking.deleteOne()
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

    const agencyName = nanoid()
    const agencyId = await testHelper.createAgency(`${agencyName}@test.movinin.ma`, agencyName)
    const renter = new User({
      fullName: 'renter',
      email: testHelper.GetRandomEmail(),
      language: testHelper.LANGUAGE,
      type: movininTypes.UserType.User,
    })
    await renter.save()

    const property = new Property({
      name: 'Beautiful House in Detroit',
      agency: agencyId,
      type: movininTypes.PropertyType.House,
      description: '<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium rem aperiam, veritatis et quasi.</p>',
      image: 'image.png',
      images: ['image.png'],
      bedrooms: 3,
      bathrooms: 2,
      kitchens: 1,
      parkingSpaces: 1,
      size: 200,
      petsAllowed: false,
      furnished: true,
      aircon: true,
      minimumAge: 21,
      location: testHelper.GetRandromObjectId(),
      address: '',
      price: 4000,
      hidden: true,
      cancellation: 0,
      available: false,
      rentalTerm: movininTypes.RentalTerm.Monthly,
    })
    await property.save()

    const locationId = await testHelper.createLocation('location en', 'location fr', testHelper.GetRandromObjectIdAsString())

    let booking = new Booking({
      agency: agencyId,
      property: property._id.toString(),
      renter: renter._id.toString(),
      location: locationId,
      from: new Date(2024, 2, 1),
      to: new Date(2024, 2, 4),
      status: movininTypes.BookingStatus.Void,
      expireAt,
      cancellation: true,
      amendments: true,
      theftProtection: false,
      collisionDamageWaiver: false,
      fullInsurance: false,
      price: 312,
      additionalDriver: true,
    })
    let booking2: typeof booking | undefined
    let booking3: typeof booking | undefined
    try {
      await booking.save()

      const orderId = nanoid()

      const mockPayPalOrder = (overrides = {}, unitOverrides = {}) => ({
        status: 'COMPLETED',
        purchase_units: [
          {
            invoice_id: booking._id.toString(),
            amount: {
              value: '312.00',
              currency_code: 'USD',
            },
            payments: {
              captures: [{ id: 'CAPTURE-123' }],
            },
            ...unitOverrides,
          },
        ],
        ...overrides,
      })

      // test success
      mockGetOrder.mockImplementation(() => Promise.resolve(mockPayPalOrder()))

      await expect(paypal.getOrder('123')).resolves.toStrictEqual(mockPayPalOrder())
      expect(paypal.getOrder).toHaveBeenCalledWith('123')

      let res = await request(app)
        .post(`/api/check-paypal-order/${booking._id.toString()}/${orderId}`)
      expect(res.statusCode).toBe(200)
      await testHelper.deleteNotifications(booking._id.toString())

      // test failure (price mismatch)
      await booking.deleteOne()
      booking = new Booking({
        agency: agencyId,
        property: property._id.toString(),
        renter: renter._id.toString(),
        location: locationId,
        from: new Date(2024, 2, 1),
        to: new Date(2024, 2, 4),
        status: movininTypes.BookingStatus.Void,
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

      mockGetOrder.mockImplementation(() => Promise.resolve(mockPayPalOrder({}, {
        invoice_id: booking._id.toString(),
        amount: { value: '1.00', currency_code: 'USD' },
      })))

      res = await request(app)
        .post(`/api/check-paypal-order/${booking._id.toString()}/${orderId}`)
      expect(res.statusCode).toBe(400)
      expect(res.text).toBe('Payment amount mismatch')

      // test failure (invoice id / booking id mismatch)
      mockGetOrder.mockImplementation(() => Promise.resolve(mockPayPalOrder({}, {
        invoice_id: testHelper.GetRandromObjectIdAsString(),
      })))

      res = await request(app)
        .post(`/api/check-paypal-order/${booking._id.toString()}/${orderId}`)
      expect(res.statusCode).toBe(400)
      expect(res.text).toBe('Booking ID mismatch')

      // test success (deposit)
      await booking.deleteOne()
      booking = new Booking({
        agency: agencyId,
        property: property._id.toString(),
        renter: renter._id.toString(),
        location: locationId,
        from: new Date(2024, 2, 1),
        to: new Date(2024, 2, 4),
        status: movininTypes.BookingStatus.Deposit,
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

      mockGetOrder.mockImplementation(() => Promise.resolve(mockPayPalOrder({}, {
        invoice_id: booking._id.toString(),
      })))

      res = await request(app)
        .post(`/api/check-paypal-order/${booking._id.toString()}/${orderId}`)
      expect(res.statusCode).toBe(200)
      await testHelper.deleteNotifications(booking._id.toString())

      // test failure (paypal order error)
      await booking.deleteOne()
      booking = new Booking({
        agency: agencyId,
        property: property._id.toString(),
        renter: renter._id.toString(),
        location: locationId,
        from: new Date(2024, 2, 1),
        to: new Date(2024, 2, 4),
        status: movininTypes.BookingStatus.Void,
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

      mockGetOrder.mockImplementation(() => Promise.reject(new Error('Simulated error')))

      await expect(paypal.getOrder('123')).rejects.toThrow('Simulated error')
      expect(paypal.getOrder).toHaveBeenCalledWith('123')

      res = await request(app)
        .post(`/api/check-paypal-order/${booking._id.toString()}/${orderId}`)
      expect(res.statusCode).toBe(204)

      // test failure (booking exists, order does not exist)
      mockGetOrder.mockImplementation(() => Promise.resolve(undefined))

      res = await request(app)
        .post(`/api/check-paypal-order/${booking._id.toString()}/${testHelper.GetRandromObjectIdAsString()}`)
      expect(res.statusCode).toBe(204)

      // test failure (payment expired)
      booking2 = new Booking({
        agency: agencyId,
        property: property._id.toString(),
        renter: renter._id.toString(),
        location: locationId,
        from: new Date(2024, 2, 1),
        to: new Date(2024, 2, 4),
        status: movininTypes.BookingStatus.Void,
        expireAt,
        cancellation: true,
        amendments: true,
        theftProtection: false,
        collisionDamageWaiver: false,
        fullInsurance: false,
        price: 312,
        additionalDriver: true,
      })
      await booking2.save()

      mockGetOrder.mockImplementation(() => Promise.resolve(mockPayPalOrder(
        { status: 'EXPIRED' },
        { invoice_id: booking2!._id.toString() }
      )))

      res = await request(app)
        .post(`/api/check-paypal-order/${booking2._id.toString()}/${orderId}`)
      expect(res.statusCode).toBe(400)
      const b = await Booking.findById(booking2._id.toString())
      expect(b).toBeFalsy()
      booking2 = undefined

      // test failure (missing members)
      booking3 = new Booking({
        agency: agencyId,
        property: testHelper.GetRandromObjectId(),
        renter: renter._id.toString(),
        location: locationId,
        from: new Date(2024, 2, 1),
        to: new Date(2024, 2, 4),
        status: movininTypes.BookingStatus.Void,
        expireAt,
        cancellation: true,
        amendments: true,
        theftProtection: false,
        collisionDamageWaiver: false,
        fullInsurance: false,
        price: 312,
        additionalDriver: true,
      })
      await booking3.save()

      mockGetOrder.mockImplementation(() => Promise.resolve(mockPayPalOrder(
        {},
        { invoice_id: booking3!._id.toString() }
      )))

      await expect(paypal.getOrder('123')).resolves.toStrictEqual(mockPayPalOrder({}, { invoice_id: booking3._id.toString() }))
      expect(paypal.getOrder).toHaveBeenCalledWith('123')

      // property missing
      res = await request(app)
        .post(`/api/check-paypal-order/${booking3._id.toString()}/${orderId}`)
      expect(res.statusCode).toBe(400)

      // agency missing
      await booking3.deleteOne()
      booking3 = new Booking({
        agency: testHelper.GetRandromObjectId(),
        property: property._id.toString(),
        renter: renter._id.toString(),
        location: locationId,
        from: new Date(2024, 2, 1),
        to: new Date(2024, 2, 4),
        status: movininTypes.BookingStatus.Void,
        expireAt,
        cancellation: true,
        amendments: true,
        theftProtection: false,
        collisionDamageWaiver: false,
        fullInsurance: false,
        price: 312,
        additionalDriver: true,
      })
      await booking3.save()

      mockGetOrder.mockImplementation(() => Promise.resolve(mockPayPalOrder(
        {},
        { invoice_id: booking3!._id.toString() }
      )))

      res = await request(app)
        .post(`/api/check-paypal-order/${booking3._id.toString()}/${orderId}`)
      expect(res.statusCode).toBe(400)

      // renter missing
      await booking3.deleteOne()
      booking3 = new Booking({
        agency: agencyId,
        property: property._id.toString(),
        renter: testHelper.GetRandromObjectId(),
        location: locationId,
        from: new Date(2024, 2, 1),
        to: new Date(2024, 2, 4),
        status: movininTypes.BookingStatus.Void,
        expireAt,
        cancellation: true,
        amendments: true,
        theftProtection: false,
        collisionDamageWaiver: false,
        fullInsurance: false,
        price: 312,
        additionalDriver: true,
      })
      await booking3.save()

      mockGetOrder.mockImplementation(() => Promise.resolve(mockPayPalOrder(
        {},
        { invoice_id: booking3!._id.toString() }
      )))

      res = await request(app)
        .post(`/api/check-paypal-order/${booking3._id.toString()}/${orderId}`)
      expect(res.statusCode).toBe(400)

      // location missing
      await booking3.deleteOne()
      booking3 = new Booking({
        agency: agencyId,
        property: property._id.toString(),
        renter: renter,
        location: testHelper.GetRandromObjectId(),
        from: new Date(2024, 2, 1),
        to: new Date(2024, 2, 4),
        status: movininTypes.BookingStatus.Void,
        expireAt,
        cancellation: true,
        amendments: true,
        theftProtection: false,
        collisionDamageWaiver: false,
        fullInsurance: false,
        price: 312,
        additionalDriver: true,
      })
      await booking3.save()

      mockGetOrder.mockImplementation(() => Promise.resolve(mockPayPalOrder(
        {},
        { invoice_id: booking3!._id.toString() }
      )))

      res = await request(app)
        .post(`/api/check-paypal-order/${booking3._id.toString()}/${orderId}`)
      expect(res.statusCode).toBe(400)
    } catch (err) {
      console.error(err)
      throw new Error(`Error during /api/check-paypal-order/: ${err}`)
    } finally {
      await booking.deleteOne()
      if (booking2) {
        await booking2.deleteOne()
      }
      if (booking3) {
        await booking3.deleteOne()
      }
      await property.deleteOne()
      await renter.deleteOne()
      await Notification.deleteMany({ user: renter._id.toString() })
      await NotificationCounter.deleteMany({ user: renter._id.toString() })
      await testHelper.deleteLocation(locationId)
      await testHelper.deleteAgency(agencyId)
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
