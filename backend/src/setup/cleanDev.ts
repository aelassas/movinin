import 'dotenv/config'
import process from 'node:process'
import * as env from '../config/env.config'
import * as databaseHelper from '../utils/databaseHelper'
import * as logger from '../utils/logger'
import User from '../models/User'
import Country from '../models/Country'
import Location from '../models/Location'
import LocationValue from '../models/LocationValue'
import Property from '../models/Property'
import Booking from '../models/Booking'
import Notification from '../models/Notification'
import NotificationCounter from '../models/NotificationCounter'
import Token from '../models/Token'
import PushToken from '../models/PushToken'
import {
  assertSafeEnvironment,
  SEED_USER_IDS,
  SEED_COUNTRY_IDS,
  SEED_LOCATION_VALUE_IDS,
  SEED_LOCATION_IDS,
  SEED_PROPERTY_IDS,
  SEED_BOOKING_IDS,
  SEED_NOTIFICATION_IDS,
  SEED_EMAILS,
  SEED_OWNER_TAG,
  SEED_IDS,
  cleanSeedImages,
} from './seedDev'

// ──────────────────────────────────────────────────────────────
// Safe Clean function
// ──────────────────────────────────────────────────────────────
export async function cleanDev(): Promise<{ deleted: Record<string, number> }> {
  const counts: Record<string, number> = {
    notifications: 0,
    notificationCounters: 0,
    tokens: 0,
    pushTokens: 0,
    bookings: 0,
    properties: 0,
    locations: 0,
    countries: 0,
    locationValues: 0,
    users: 0,
    images: 0,
  }

  // 1. Delete seed notifications
  const notifRes = await Notification.deleteMany({ _id: { $in: SEED_NOTIFICATION_IDS } })
  counts.notifications = notifRes.deletedCount || 0

  // 2. Delete notification counters for seed users
  const ncRes = await NotificationCounter.deleteMany({ user: { $in: SEED_USER_IDS } })
  counts.notificationCounters = ncRes.deletedCount || 0

  // 3. Delete any tokens and push tokens created for seed users
  const tokenRes = await Token.deleteMany({ user: { $in: SEED_USER_IDS } })
  counts.tokens = tokenRes.deletedCount || 0

  const ptRes = await PushToken.deleteMany({ user: { $in: SEED_USER_IDS } })
  counts.pushTokens = ptRes.deletedCount || 0

  // 4. Delete seed bookings
  const bookingRes = await Booking.deleteMany({ _id: { $in: SEED_BOOKING_IDS } })
  counts.bookings = bookingRes.deletedCount || 0

  // 5. Delete seed properties
  const propRes = await Property.deleteMany({ _id: { $in: SEED_PROPERTY_IDS } })
  counts.properties = propRes.deletedCount || 0

  // 6. Delete seed locations (child first, then parents)
  // Ensure we don't delete any location that is referenced by non-seed properties
  const remainingProperties = await Property.find({ _id: { $nin: SEED_PROPERTY_IDS } })
  const usedLocationIds = new Set(remainingProperties.map((p) => p.location?.toString()).filter(Boolean))

  const safeLocationIdsToDelete = SEED_LOCATION_IDS.filter((id) => !usedLocationIds.has(id.toString()))

  // Delete child location first if safe
  if (safeLocationIdsToDelete.some((id) => id.equals(SEED_IDS.locManhattan))) {
    const childRes = await Location.deleteOne({ _id: SEED_IDS.locManhattan })
    counts.locations += childRes.deletedCount || 0
  }

  // Delete remaining parent locations
  const parentLocIds = safeLocationIdsToDelete.filter((id) => !id.equals(SEED_IDS.locManhattan))
  if (parentLocIds.length > 0) {
    const parentRes = await Location.deleteMany({ _id: { $in: parentLocIds } })
    counts.locations += parentRes.deletedCount || 0
  }

  // 7. Delete seed countries
  // Ensure we don't delete countries referenced by any remaining non-seed locations
  const remainingLocations = await Location.find({ _id: { $nin: SEED_LOCATION_IDS } })
  const usedCountryIds = new Set(remainingLocations.map((l) => l.country?.toString()).filter(Boolean))

  const safeCountryIdsToDelete = SEED_COUNTRY_IDS.filter((id) => !usedCountryIds.has(id.toString()))
  if (safeCountryIdsToDelete.length > 0) {
    const countryRes = await Country.deleteMany({ _id: { $in: safeCountryIdsToDelete } })
    counts.countries = countryRes.deletedCount || 0
  }

  // 8. Delete seed location values
  // Ensure we don't delete location values still referenced by any location or country
  const allCurrentLocations = await Location.find()
  const allCurrentCountries = await Country.find()

  const referencedLvIds = new Set<string>()
  for (const loc of allCurrentLocations) {
    for (const v of loc.values || []) {
      referencedLvIds.add(v.toString())
    }
  }
  for (const country of allCurrentCountries) {
    for (const v of country.values || []) {
      referencedLvIds.add(v.toString())
    }
  }

  const safeLvIdsToDelete = SEED_LOCATION_VALUE_IDS.filter((id) => !referencedLvIds.has(id.toString()))
  if (safeLvIdsToDelete.length > 0) {
    const lvRes = await LocationValue.deleteMany({ _id: { $in: safeLvIdsToDelete } })
    counts.locationValues = lvRes.deletedCount || 0
  }

  // 9. Delete seed users (strict guards: matching ID, seed email, seed bio tag, and NOT env.ADMIN_EMAIL)
  const userRes = await User.deleteMany({
    _id: { $in: SEED_USER_IDS },
    email: { $ne: env.ADMIN_EMAIL, $in: Object.values(SEED_EMAILS) },
    bio: SEED_OWNER_TAG,
  })
  counts.users = userRes.deletedCount || 0

  // 10. Clean copied seed images
  counts.images = await cleanSeedImages()

  return { deleted: counts }
}

// ──────────────────────────────────────────────────────────────
// CLI runner
// ──────────────────────────────────────────────────────────────
export async function runCleanCli(): Promise<void> {
  try {
    assertSafeEnvironment()

    const connected = await databaseHelper.connect(env.DB_URI, env.DB_SSL, env.DB_DEBUG)
    if (!connected) {
      logger.error('clean:dev — Failed to connect to the database')
      process.exit(1)
    }

    logger.info('clean:dev — Starting development database cleanup...')
    const result = await cleanDev()

    const totalDeleted = Object.values(result.deleted).reduce((a, b) => a + b, 0)
    if (totalDeleted === 0) {
      logger.info('clean:dev — No development seed records found to clean.')
    } else {
      logger.info('clean:dev — Cleanup complete! Removed records:')
      for (const [key, value] of Object.entries(result.deleted)) {
        if (value > 0) {
          logger.info(`  ${key}: ${value}`)
        }
      }
    }

    await databaseHelper.close()
    process.exit(0)
  } catch (err) {
    logger.error('clean:dev — Error during cleanup:', err)
    try {
      await databaseHelper.close()
    } catch {
      // ignore
    }
    process.exit(1)
  }
}

const isMain = process.argv[1] && (
  process.argv[1].endsWith('cleanDev.js') ||
  process.argv[1].endsWith('cleanDev.ts') ||
  process.argv[1].endsWith('cleanDev')
)

if (isMain) {
  runCleanCli()
}
