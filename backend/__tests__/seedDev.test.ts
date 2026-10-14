import 'dotenv/config'
import bcrypt from 'bcrypt'
import * as movininTypes from ':movinin-types'
import * as env from '../src/config/env.config'
import * as databaseHelper from '../src/utils/databaseHelper'
import * as authHelper from '../src/utils/authHelper'
import User from '../src/models/User'
import Country from '../src/models/Country'
import Location from '../src/models/Location'
import LocationValue from '../src/models/LocationValue'
import Property from '../src/models/Property'
import Booking from '../src/models/Booking'
import Notification from '../src/models/Notification'
import NotificationCounter from '../src/models/NotificationCounter'
import Token from '../src/models/Token'
import PushToken from '../src/models/PushToken'
import {
  seedDev,
  assertSafeEnvironment,
  SEED_IDS,
  SEED_EMAILS,
  SEED_PASSWORD,
  SEED_OWNER_TAG,
  SEED_USER_IDS,
  SEED_PROPERTY_IDS,
  SEED_BOOKING_IDS,
  SEED_LOCATION_IDS,
  SEED_COUNTRY_IDS,
  SEED_LOCATION_VALUE_IDS,
  SEED_NOTIFICATION_IDS,
  SEED_IMAGE_SPECS,
} from '../src/setup/seedDev'
import { cleanDev } from '../src/setup/cleanDev'

beforeAll(async () => {
  await databaseHelper.connect(env.DB_URI, false, false)
})

afterAll(async () => {
  // Ensure seed data is cleaned up
  await cleanDev()
  await databaseHelper.close()
})

describe('Environment safeguards', () => {
  const originalEnv = process.env.NODE_ENV
  const originalAllowRemote = process.env.MI_SEED_ALLOW_REMOTE

  afterEach(() => {
    process.env.NODE_ENV = originalEnv
    process.env.MI_SEED_ALLOW_REMOTE = originalAllowRemote
  })

  it('should throw an error when NODE_ENV is "production"', () => {
    process.env.NODE_ENV = 'production'
    expect(() => assertSafeEnvironment()).toThrow(/production/)
  })

  it('should throw an error for non-local database URI when MI_SEED_ALLOW_REMOTE is not set', () => {
    process.env.NODE_ENV = 'development'
    delete process.env.MI_SEED_ALLOW_REMOTE
    expect(() => assertSafeEnvironment('mongodb+srv://production-cluster.mongodb.net/movinin')).toThrow(/not recognized as a local development database/)
  })

  it('should allow non-local URI when MI_SEED_ALLOW_REMOTE is true', () => {
    process.env.NODE_ENV = 'development'
    process.env.MI_SEED_ALLOW_REMOTE = 'true'
    expect(() => assertSafeEnvironment('mongodb+srv://remote-dev.mongodb.net/movinin')).not.toThrow()
  })

  it('should allow local URIs (127.0.0.1, localhost, mongo:)', () => {
    process.env.NODE_ENV = 'development'
    expect(() => assertSafeEnvironment('mongodb://127.0.0.1:27017/movinin')).not.toThrow()
    expect(() => assertSafeEnvironment('mongodb://localhost:27017/movinin')).not.toThrow()
    expect(() => assertSafeEnvironment('mongodb://admin:admin@mongo:27017/movinin')).not.toThrow()
  })
})

describe('Development database seeding (seedDev)', () => {
  beforeEach(async () => {
    await User.deleteMany({ _id: { $in: SEED_USER_IDS } })
    await Property.deleteMany({ _id: { $in: SEED_PROPERTY_IDS } })
    await Booking.deleteMany({ _id: { $in: SEED_BOOKING_IDS } })
    await Location.deleteMany({ _id: { $in: SEED_LOCATION_IDS } })
    await Country.deleteMany({ _id: { $in: SEED_COUNTRY_IDS } })
    await LocationValue.deleteMany({ _id: { $in: SEED_LOCATION_VALUE_IDS } })
    await Notification.deleteMany({ _id: { $in: SEED_NOTIFICATION_IDS } })
    await NotificationCounter.deleteMany({ user: { $in: SEED_USER_IDS } })
  })

  it('should seed all expected categories and counts of records including images', async () => {
    const result = await seedDev()

    expect(result.created.users).toBe(6)
    expect(result.created.locationValues).toBe(24)
    expect(result.created.countries).toBe(2)
    expect(result.created.locations).toBe(10)
    expect(result.created.properties).toBe(20)
    expect(result.created.bookings).toBe(12)
    expect(result.created.notifications).toBe(8)
    expect(result.created.notificationCounters).toBe(5)
    expect(result.created.images).toBeGreaterThanOrEqual(0)
    expect(SEED_IMAGE_SPECS.length).toBe(76)

    // Verify user accounts and authentication
    const admin = await User.findById(SEED_IDS.adminDev)
    expect(admin).not.toBeNull()
    expect(admin?.type).toBe(movininTypes.UserType.Admin)
    expect(admin?.email).toBe(SEED_EMAILS.adminDev)
    expect(admin?.active).toBe(true)
    expect(admin?.verified).toBe(true)
    expect(admin?.bio).toBe(SEED_OWNER_TAG)
    expect(admin?.avatar).toBeDefined()
    // Passwords must be hashed and match SEED_PASSWORD
    expect(admin?.password).not.toBe(SEED_PASSWORD)
    const adminPwMatch = await bcrypt.compare(SEED_PASSWORD, admin?.password as string)
    expect(adminPwMatch).toBe(true)

    // Verify agencies
    const agency1 = await User.findById(SEED_IDS.agency1)
    expect(agency1?.type).toBe(movininTypes.UserType.Agency)
    expect(agency1?.payLater).toBe(true)
    expect(agency1?.avatar).toBe('seed_user_agency1.jpg')

    const agency2 = await User.findById(SEED_IDS.agency2)
    expect(agency2?.type).toBe(movininTypes.UserType.Agency)
    expect(agency2?.payLater).toBe(false)
    expect(agency2?.avatar).toBe('seed_user_agency2.png')

    // Verify customer users
    const customer = await User.findById(SEED_IDS.customer1)
    expect(customer?.type).toBe(movininTypes.UserType.User)
    expect(customer?.phone).toBeDefined()
    expect(customer?.birthDate).toBeDefined()
    expect(customer?.avatar).toBeDefined()

    // Verify locations and image presence
    const seededLocations = await Location.find({ _id: { $in: SEED_LOCATION_IDS } })
    expect(seededLocations.length).toBe(10)
    for (const loc of seededLocations) {
      expect(loc.image).toBeDefined()
      expect(loc.image?.startsWith('seed_loc_')).toBe(true)
      expect(typeof loc.latitude).toBe('number')
      expect(typeof loc.longitude).toBe('number')
    }

    // Verify location hierarchy
    const manhattan = await Location.findById(SEED_IDS.locManhattan)
    expect(manhattan?.parentLocation?.toString()).toBe(SEED_IDS.locNY.toString())

    // Verify countries have >= 4 locations with images (satisfying minLocations requirement)
    const usLocations = await Location.countDocuments({ country: SEED_IDS.countryUS, image: { $ne: null } })
    const frLocations = await Location.countDocuments({ country: SEED_IDS.countryFR, image: { $ne: null } })
    expect(usLocations).toBeGreaterThanOrEqual(4)
    expect(frLocations).toBeGreaterThanOrEqual(4)

    // Verify all properties have main image and secondary images
    const seededProps = await Property.find({ _id: { $in: SEED_PROPERTY_IDS } })
    expect(seededProps.length).toBe(20)
    for (const p of seededProps) {
      expect(p.image).toBeDefined()
      expect(p.image?.startsWith('seed_prop_')).toBe(true)
      expect(Array.isArray(p.images)).toBe(true)
      expect(p.images?.length).toBe(2)
      for (const img of p.images || []) {
        expect(img.startsWith('seed_prop_')).toBe(true)
      }
    }

    // Verify all supported PropertyTypes are present
    const propertyTypes = new Set(seededProps.map((p) => p.type))
    expect(propertyTypes.has(movininTypes.PropertyType.Apartment)).toBe(true)
    expect(propertyTypes.has(movininTypes.PropertyType.Townhouse)).toBe(true)
    expect(propertyTypes.has(movininTypes.PropertyType.House)).toBe(true)
    expect(propertyTypes.has(movininTypes.PropertyType.Plot)).toBe(true)
    expect(propertyTypes.has(movininTypes.PropertyType.Farm)).toBe(true)
    expect(propertyTypes.has(movininTypes.PropertyType.Commercial)).toBe(true)
    expect(propertyTypes.has(movininTypes.PropertyType.Industrial)).toBe(true)

    // Verify all supported RentalTerms are present
    const rentalTerms = new Set(seededProps.map((p) => p.rentalTerm))
    expect(rentalTerms.has(movininTypes.RentalTerm.Daily)).toBe(true)
    expect(rentalTerms.has(movininTypes.RentalTerm.Weekly)).toBe(true)
    expect(rentalTerms.has(movininTypes.RentalTerm.Monthly)).toBe(true)
    expect(rentalTerms.has(movininTypes.RentalTerm.Yearly)).toBe(true)

    // Verify available & unavailable, hidden & visible
    expect(seededProps.some((p) => p.available === false)).toBe(true)
    expect(seededProps.some((p) => p.hidden === true)).toBe(true)

    // Verify all supported BookingStatuses are present
    const seededBookings = await Booking.find({ _id: { $in: SEED_BOOKING_IDS } })
    const bookingStatuses = new Set(seededBookings.map((b) => b.status))
    expect(bookingStatuses.has(movininTypes.BookingStatus.Void)).toBe(true)
    expect(bookingStatuses.has(movininTypes.BookingStatus.Pending)).toBe(true)
    expect(bookingStatuses.has(movininTypes.BookingStatus.Deposit)).toBe(true)
    expect(bookingStatuses.has(movininTypes.BookingStatus.Paid)).toBe(true)
    expect(bookingStatuses.has(movininTypes.BookingStatus.Reserved)).toBe(true)
    expect(bookingStatuses.has(movininTypes.BookingStatus.Cancelled)).toBe(true)

    // Verify notifications & unread counts
    const unreadNotifs = await Notification.countDocuments({ user: SEED_IDS.adminDev, isRead: false })
    const adminCounter = await NotificationCounter.findOne({ user: SEED_IDS.adminDev })
    expect(adminCounter?.count).toBe(unreadNotifs)
  })

  it('should maintain valid relational references across all seeded documents', async () => {
    await seedDev()

    // 1. All properties reference valid agency and location
    const properties = await Property.find({ _id: { $in: SEED_PROPERTY_IDS } })
    for (const prop of properties) {
      const agency = await User.findById(prop.agency)
      expect(agency).not.toBeNull()
      const location = await Location.findById(prop.location)
      expect(location).not.toBeNull()
    }

    // 2. All bookings reference valid property, agency, renter, location
    const bookings = await Booking.find({ _id: { $in: SEED_BOOKING_IDS } })
    for (const b of bookings) {
      const prop = await Property.findById(b.property)
      expect(prop).not.toBeNull()
      const agency = await User.findById(b.agency)
      expect(agency).not.toBeNull()
      const renter = await User.findById(b.renter)
      expect(renter).not.toBeNull()
      const loc = await Location.findById(b.location)
      expect(loc).not.toBeNull()
    }

    // 3. All locations reference valid country and location values
    const locations = await Location.find({ _id: { $in: SEED_LOCATION_IDS } })
    for (const loc of locations) {
      const country = await Country.findById(loc.country)
      expect(country).not.toBeNull()
      for (const valId of loc.values) {
        const lv = await LocationValue.findById(valId)
        expect(lv).not.toBeNull()
      }
    }

    // 4. All notifications reference valid users and bookings
    const notifications = await Notification.find({ _id: { $in: SEED_NOTIFICATION_IDS } })
    for (const n of notifications) {
      const user = await User.findById(n.user)
      expect(user).not.toBeNull()
      if (n.booking) {
        const booking = await Booking.findById(n.booking)
        expect(booking).not.toBeNull()
      }
    }
  })

  it('should be idempotent and not duplicate data when run repeatedly', async () => {
    // Run 1
    await seedDev()
    const users1 = await User.countDocuments({ _id: { $in: SEED_USER_IDS } })
    const props1 = await Property.countDocuments({ _id: { $in: SEED_PROPERTY_IDS } })
    const bookings1 = await Booking.countDocuments({ _id: { $in: SEED_BOOKING_IDS } })
    const locs1 = await Location.countDocuments({ _id: { $in: SEED_LOCATION_IDS } })

    // Run 2
    await seedDev()
    const users2 = await User.countDocuments({ _id: { $in: SEED_USER_IDS } })
    const props2 = await Property.countDocuments({ _id: { $in: SEED_PROPERTY_IDS } })
    const bookings2 = await Booking.countDocuments({ _id: { $in: SEED_BOOKING_IDS } })
    const locs2 = await Location.countDocuments({ _id: { $in: SEED_LOCATION_IDS } })

    expect(users2).toBe(users1)
    expect(props2).toBe(props1)
    expect(bookings2).toBe(bookings1)
    expect(locs2).toBe(locs1)
  })
})

describe('Safe database cleanup (cleanDev)', () => {
  it('should remove all seed-owned documents completely', async () => {
    await seedDev()

    const cleanRes = await cleanDev()
    expect(cleanRes.deleted.users).toBe(6)
    expect(cleanRes.deleted.properties).toBe(20)
    expect(cleanRes.deleted.bookings).toBe(12)
    expect(cleanRes.deleted.locations).toBe(10)
    expect(cleanRes.deleted.countries).toBe(2)
    expect(cleanRes.deleted.locationValues).toBe(24)
    expect(cleanRes.deleted.notifications).toBe(8)
    expect(cleanRes.deleted.notificationCounters).toBe(5)

    // Verify all seed records are gone
    const remainingUsers = await User.countDocuments({ _id: { $in: SEED_USER_IDS } })
    const remainingProps = await Property.countDocuments({ _id: { $in: SEED_PROPERTY_IDS } })
    const remainingBookings = await Booking.countDocuments({ _id: { $in: SEED_BOOKING_IDS } })
    const remainingLocs = await Location.countDocuments({ _id: { $in: SEED_LOCATION_IDS } })
    const remainingCountries = await Country.countDocuments({ _id: { $in: SEED_COUNTRY_IDS } })
    const remainingLvs = await LocationValue.countDocuments({ _id: { $in: SEED_LOCATION_VALUE_IDS } })
    const remainingNotifs = await Notification.countDocuments({ _id: { $in: SEED_NOTIFICATION_IDS } })
    const remainingCounters = await NotificationCounter.countDocuments({ user: { $in: SEED_USER_IDS } })

    expect(remainingUsers).toBe(0)
    expect(remainingProps).toBe(0)
    expect(remainingBookings).toBe(0)
    expect(remainingLocs).toBe(0)
    expect(remainingCountries).toBe(0)
    expect(remainingLvs).toBe(0)
    expect(remainingNotifs).toBe(0)
    expect(remainingCounters).toBe(0)
  })

  it('should succeed safely when seed data is absent', async () => {
    await cleanDev()
    const cleanRes = await cleanDev()

    const totalDeleted = Object.values(cleanRes.deleted).reduce((a, b) => a + b, 0)
    expect(totalDeleted).toBe(0)
  })

  it('should clean tokens created for seed users', async () => {
    await seedDev()

    // Simulate developer login creating a Token and PushToken for seed customer1
    const token = new Token({ user: SEED_IDS.customer1, token: 'mock-auth-token-123' })
    await token.save()
    const pushToken = new PushToken({ user: SEED_IDS.customer1, token: 'ExponentPushToken[mock]' })
    await pushToken.save()

    const cleanRes = await cleanDev()
    expect(cleanRes.deleted.tokens).toBe(1)
    expect(cleanRes.deleted.pushTokens).toBe(1)

    const remainingTokens = await Token.countDocuments({ user: SEED_IDS.customer1 })
    expect(remainingTokens).toBe(0)
  })

  it('should preserve unrelated sentinel records created by contributors', async () => {
    await cleanDev()
    await User.deleteOne({ email: 'sentinel.developer@custom-domain.org' })

    // Create sentinel records (simulating manual testing by a developer)
    const sentinelPw = await authHelper.hashPassword('SentinelPass1!')
    const sentinelUser = new User({
      fullName: 'Sentinel Developer',
      email: 'sentinel.developer@custom-domain.org',
      password: sentinelPw,
      language: 'en',
      type: movininTypes.UserType.User,
      active: true,
      verified: true,
      bio: 'Regular contributor account',
    })
    await sentinelUser.save()

    const sentinelLv = new LocationValue({ language: 'en', value: 'Sentinel City' })
    await sentinelLv.save()

    const sentinelCountry = new Country({ values: [sentinelLv._id] })
    await sentinelCountry.save()

    const sentinelLoc = new Location({ country: sentinelCountry._id, values: [sentinelLv._id] })
    await sentinelLoc.save()

    const sentinelProperty = new Property({
      name: 'Sentinel Property',
      type: movininTypes.PropertyType.House,
      agency: sentinelUser._id,
      location: sentinelLoc._id,
      description: 'Custom property not from seed script',
      bedrooms: 3,
      bathrooms: 2,
      kitchens: 1,
      parkingSpaces: 1,
      size: 120,
      price: 2000,
      rentalTerm: movininTypes.RentalTerm.Monthly,
      available: true,
      hidden: false,
      minimumAge: 21,
      furnished: true,
      petsAllowed: true,
    })
    await sentinelProperty.save()

    const sentinelBooking = new Booking({
      agency: sentinelUser._id,
      property: sentinelProperty._id,
      renter: sentinelUser._id,
      location: sentinelLoc._id,
      from: new Date('2028-01-01'),
      to: new Date('2028-01-15'),
      status: movininTypes.BookingStatus.Paid,
      cancellation: true,
      price: 2000,
    })
    await sentinelBooking.save()

    const sentinelNotif = new Notification({
      user: sentinelUser._id,
      message: 'Sentinel notification message',
      isRead: false,
    })
    await sentinelNotif.save()

    const sentinelCounter = new NotificationCounter({
      user: sentinelUser._id,
      count: 1,
    })
    await sentinelCounter.save()

    // Now seed the database
    await seedDev()

    // Now clean the database
    await cleanDev()

    // Assert sentinel records were NOT touched by cleanDev
    const checkUser = await User.findById(sentinelUser._id)
    expect(checkUser).not.toBeNull()

    const checkProp = await Property.findById(sentinelProperty._id)
    expect(checkProp).not.toBeNull()

    const checkBooking = await Booking.findById(sentinelBooking._id)
    expect(checkBooking).not.toBeNull()

    const checkLoc = await Location.findById(sentinelLoc._id)
    expect(checkLoc).not.toBeNull()

    const checkCountry = await Country.findById(sentinelCountry._id)
    expect(checkCountry).not.toBeNull()

    const checkLv = await LocationValue.findById(sentinelLv._id)
    expect(checkLv).not.toBeNull()

    const checkNotif = await Notification.findById(sentinelNotif._id)
    expect(checkNotif).not.toBeNull()

    const checkCounter = await NotificationCounter.findById(sentinelCounter._id)
    expect(checkCounter).not.toBeNull()

    // Cleanup sentinel records
    await NotificationCounter.deleteOne({ _id: sentinelCounter._id })
    await Notification.deleteOne({ _id: sentinelNotif._id })
    await Booking.deleteOne({ _id: sentinelBooking._id })
    await Property.deleteOne({ _id: sentinelProperty._id })
    await Location.deleteOne({ _id: sentinelLoc._id })
    await Country.deleteOne({ _id: sentinelCountry._id })
    await LocationValue.deleteOne({ _id: sentinelLv._id })
    await User.deleteOne({ _id: sentinelUser._id })
  })

  it('should never delete the admin account created by npm run setup', async () => {
    // Ensure setup admin exists
    let setupAdmin = await User.findOne({ email: env.ADMIN_EMAIL })
    if (!setupAdmin) {
      const pwHash = await authHelper.hashPassword('M00vinin')
      setupAdmin = new User({
        fullName: 'admin',
        email: env.ADMIN_EMAIL,
        password: pwHash,
        language: 'en',
        type: movininTypes.UserType.Admin,
        active: true,
        verified: true,
      })
      await setupAdmin.save()
    }

    // Seed and then clean
    await seedDev()
    await cleanDev()

    // Verify setup admin is still present
    const adminAfterClean = await User.findOne({ email: env.ADMIN_EMAIL })
    expect(adminAfterClean).not.toBeNull()
    expect(adminAfterClean?.email).toBe(env.ADMIN_EMAIL)
  })
})

describe('Error handling', () => {
  it('should handle database connection failures gracefully', async () => {
    await databaseHelper.close()
    const res = await databaseHelper.connect('wrong-uri', false, false)
    expect(res).toBe(false)

    // Re-connect to the valid database so teardown and remaining tests have an active connection
    await databaseHelper.connect(env.DB_URI, false, false)
  })
})
