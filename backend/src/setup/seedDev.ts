import 'dotenv/config'
import process from 'node:process'
import url from 'node:url'
import path from 'node:path'
import fs from 'node:fs'
import mongoose from 'mongoose'
import * as movininTypes from ':movinin-types'
import * as env from '../config/env.config'
import * as databaseHelper from '../utils/databaseHelper'
import * as logger from '../utils/logger'
import * as authHelper from '../utils/authHelper'
import User from '../models/User'
import Country from '../models/Country'
import Location from '../models/Location'
import LocationValue from '../models/LocationValue'
import Property from '../models/Property'
import Booking from '../models/Booking'
import Notification from '../models/Notification'
import NotificationCounter from '../models/NotificationCounter'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// ──────────────────────────────────────────────────────────────
// Safety guard
// ──────────────────────────────────────────────────────────────
export const assertSafeEnvironment = (dbUri?: string): void => {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Refused to run development command: NODE_ENV is set to "production".')
  }
  const uri = dbUri || env.DB_URI
  const localPatterns = ['127.0.0.1', 'localhost', 'mongo:']
  const isLocal = localPatterns.some((p) => uri.includes(p))
  if (!isLocal) {
    if (process.env.MI_SEED_ALLOW_REMOTE !== 'true') {
      throw new Error(
        `Refused to run development command: DB_URI "${uri}" is not recognized as a local development database. ` +
        'Set MI_SEED_ALLOW_REMOTE=true to override.'
      )
    }
    logger.warn(`Running development command against non-local URI: ${uri}`)
  }
}

// ──────────────────────────────────────────────────────────────
// Ownership tag — stored in user bio / property description prefix
// ──────────────────────────────────────────────────────────────
export const SEED_OWNER_TAG = '__SEED_DEV__'

// ──────────────────────────────────────────────────────────────
// Deterministic ObjectIds
// ──────────────────────────────────────────────────────────────
const oid = (hex: string) => new mongoose.Types.ObjectId(hex)

export const SEED_IDS = {
  // Admin
  adminDev: oid('aaa000000000000000000001'),
  // Agencies
  agency1: oid('aaa000000000000000000010'),
  agency2: oid('aaa000000000000000000011'),
  // Customers
  customer1: oid('aaa000000000000000000020'),
  customer2: oid('aaa000000000000000000021'),
  customer3: oid('aaa000000000000000000022'),
  // Countries
  countryUS: oid('bbb000000000000000000001'),
  countryFR: oid('bbb000000000000000000002'),
  // LocationValues (en/fr)
  lvNYen: oid('ccc000000000000000000001'),
  lvNYfr: oid('ccc000000000000000000002'),
  lvLAen: oid('ccc000000000000000000003'),
  lvLAfr: oid('ccc000000000000000000004'),
  lvSFen: oid('ccc000000000000000000005'),
  lvSFfr: oid('ccc000000000000000000006'),
  lvParisEn: oid('ccc000000000000000000007'),
  lvParisFr: oid('ccc000000000000000000008'),
  lvLyonEn: oid('ccc000000000000000000009'),
  lvLyonFr: oid('ccc00000000000000000000a'),
  cvUSen: oid('ccc00000000000000000000b'),
  cvUSfr: oid('ccc00000000000000000000c'),
  cvFRen: oid('ccc00000000000000000000d'),
  cvFRfr: oid('ccc00000000000000000000e'),
  lvManhattanEn: oid('ccc00000000000000000000f'),
  lvManhattanFr: oid('ccc000000000000000000010'),
  lvMiamiEn: oid('ccc000000000000000000011'),
  lvMiamiFr: oid('ccc000000000000000000012'),
  lvMarseilleEn: oid('ccc000000000000000000013'),
  lvMarseilleFr: oid('ccc000000000000000000014'),
  lvNiceEn: oid('ccc000000000000000000015'),
  lvNiceFr: oid('ccc000000000000000000016'),
  lvBordeauxEn: oid('ccc000000000000000000017'),
  lvBordeauxFr: oid('ccc000000000000000000018'),
  // Locations
  locNY: oid('ddd000000000000000000001'),
  locLA: oid('ddd000000000000000000002'),
  locSF: oid('ddd000000000000000000003'),
  locParis: oid('ddd000000000000000000004'),
  locLyon: oid('ddd000000000000000000005'),
  locManhattan: oid('ddd000000000000000000006'),
  locMiami: oid('ddd000000000000000000007'),
  locMarseille: oid('ddd000000000000000000008'),
  locNice: oid('ddd000000000000000000009'),
  locBordeaux: oid('ddd00000000000000000000a'),
  // Properties (20)
  prop01: oid('eee000000000000000000001'),
  prop02: oid('eee000000000000000000002'),
  prop03: oid('eee000000000000000000003'),
  prop04: oid('eee000000000000000000004'),
  prop05: oid('eee000000000000000000005'),
  prop06: oid('eee000000000000000000006'),
  prop07: oid('eee000000000000000000007'),
  prop08: oid('eee000000000000000000008'),
  prop09: oid('eee000000000000000000009'),
  prop10: oid('eee00000000000000000000a'),
  prop11: oid('eee00000000000000000000b'),
  prop12: oid('eee00000000000000000000c'),
  prop13: oid('eee00000000000000000000d'),
  prop14: oid('eee00000000000000000000e'),
  prop15: oid('eee00000000000000000000f'),
  prop16: oid('eee000000000000000000010'),
  prop17: oid('eee000000000000000000011'),
  prop18: oid('eee000000000000000000012'),
  prop19: oid('eee000000000000000000013'),
  prop20: oid('eee000000000000000000014'),
  // Bookings (12)
  booking01: oid('fff000000000000000000001'),
  booking02: oid('fff000000000000000000002'),
  booking03: oid('fff000000000000000000003'),
  booking04: oid('fff000000000000000000004'),
  booking05: oid('fff000000000000000000005'),
  booking06: oid('fff000000000000000000006'),
  booking07: oid('fff000000000000000000007'),
  booking08: oid('fff000000000000000000008'),
  booking09: oid('fff000000000000000000009'),
  booking10: oid('fff00000000000000000000a'),
  booking11: oid('fff00000000000000000000b'),
  booking12: oid('fff00000000000000000000c'),
  // Notifications (8)
  notif01: oid('aab000000000000000000001'),
  notif02: oid('aab000000000000000000002'),
  notif03: oid('aab000000000000000000003'),
  notif04: oid('aab000000000000000000004'),
  notif05: oid('aab000000000000000000005'),
  notif06: oid('aab000000000000000000006'),
  notif07: oid('aab000000000000000000007'),
  notif08: oid('aab000000000000000000008'),
}

export const SEED_USER_IDS = [
  SEED_IDS.adminDev,
  SEED_IDS.agency1,
  SEED_IDS.agency2,
  SEED_IDS.customer1,
  SEED_IDS.customer2,
  SEED_IDS.customer3,
]

export const SEED_COUNTRY_IDS = [
  SEED_IDS.countryUS,
  SEED_IDS.countryFR,
]

export const SEED_LOCATION_VALUE_IDS = [
  SEED_IDS.cvUSen,
  SEED_IDS.cvUSfr,
  SEED_IDS.cvFRen,
  SEED_IDS.cvFRfr,
  SEED_IDS.lvNYen,
  SEED_IDS.lvNYfr,
  SEED_IDS.lvLAen,
  SEED_IDS.lvLAfr,
  SEED_IDS.lvSFen,
  SEED_IDS.lvSFfr,
  SEED_IDS.lvMiamiEn,
  SEED_IDS.lvMiamiFr,
  SEED_IDS.lvParisEn,
  SEED_IDS.lvParisFr,
  SEED_IDS.lvLyonEn,
  SEED_IDS.lvLyonFr,
  SEED_IDS.lvMarseilleEn,
  SEED_IDS.lvMarseilleFr,
  SEED_IDS.lvNiceEn,
  SEED_IDS.lvNiceFr,
  SEED_IDS.lvBordeauxEn,
  SEED_IDS.lvBordeauxFr,
  SEED_IDS.lvManhattanEn,
  SEED_IDS.lvManhattanFr,
]

export const SEED_LOCATION_IDS = [
  SEED_IDS.locManhattan,
  SEED_IDS.locNY,
  SEED_IDS.locLA,
  SEED_IDS.locSF,
  SEED_IDS.locMiami,
  SEED_IDS.locParis,
  SEED_IDS.locLyon,
  SEED_IDS.locMarseille,
  SEED_IDS.locNice,
  SEED_IDS.locBordeaux,
]

export const SEED_PROPERTY_IDS = [
  SEED_IDS.prop01,
  SEED_IDS.prop02,
  SEED_IDS.prop03,
  SEED_IDS.prop04,
  SEED_IDS.prop05,
  SEED_IDS.prop06,
  SEED_IDS.prop07,
  SEED_IDS.prop08,
  SEED_IDS.prop09,
  SEED_IDS.prop10,
  SEED_IDS.prop11,
  SEED_IDS.prop12,
  SEED_IDS.prop13,
  SEED_IDS.prop14,
  SEED_IDS.prop15,
  SEED_IDS.prop16,
  SEED_IDS.prop17,
  SEED_IDS.prop18,
  SEED_IDS.prop19,
  SEED_IDS.prop20,
]

export const SEED_BOOKING_IDS = [
  SEED_IDS.booking01,
  SEED_IDS.booking02,
  SEED_IDS.booking03,
  SEED_IDS.booking04,
  SEED_IDS.booking05,
  SEED_IDS.booking06,
  SEED_IDS.booking07,
  SEED_IDS.booking08,
  SEED_IDS.booking09,
  SEED_IDS.booking10,
  SEED_IDS.booking11,
  SEED_IDS.booking12,
]

export const SEED_NOTIFICATION_IDS = [
  SEED_IDS.notif01,
  SEED_IDS.notif02,
  SEED_IDS.notif03,
  SEED_IDS.notif04,
  SEED_IDS.notif05,
  SEED_IDS.notif06,
  SEED_IDS.notif07,
  SEED_IDS.notif08,
]

// ──────────────────────────────────────────────────────────────
// Credentials
// ──────────────────────────────────────────────────────────────
export const SEED_PASSWORD = 'SeedDev1!'

export const SEED_EMAILS = {
  adminDev: 'dev-admin@example.com',
  agency1: 'sunshine-realty@example.com',
  agency2: 'urban-homes@example.com',
  customer1: 'alice.johnson@example.com',
  customer2: 'bob.smith@example.com',
  customer3: 'carol.white@example.com',
}

// ──────────────────────────────────────────────────────────────
// CDN Seed Images Specification & Helpers
// ──────────────────────────────────────────────────────────────
export interface SeedImageSpec {
  folder: string
  filename: string
  source: string
}

const generatePropertyImageSpecs = (): SeedImageSpec[] => {
  const specs: SeedImageSpec[] = []
  for (let i = 1; i <= 20; i++) {
    const num = i.toString().padStart(2, '0')
    const isOdd = i % 2 === 1
    specs.push({
      folder: env.CDN_PROPERTIES,
      filename: `seed_prop_${num}_main.jpg`,
      source: isOdd ? 'main1.jpg' : 'main2.jpg',
    })
    specs.push({
      folder: env.CDN_PROPERTIES,
      filename: `seed_prop_${num}_add1.jpg`,
      source: isOdd ? 'additional1-1.jpg' : 'additional2-1.jpg',
    })
    specs.push({
      folder: env.CDN_PROPERTIES,
      filename: `seed_prop_${num}_add2.jpg`,
      source: isOdd ? 'additional1-2.jpg' : 'additional2-2.jpg',
    })
  }
  return specs
}

export const SEED_IMAGE_SPECS: SeedImageSpec[] = [
  // Locations (US)
  { folder: env.CDN_LOCATIONS, filename: 'seed_loc_new_york.jpg', source: 'location0.jpg' },
  { folder: env.CDN_LOCATIONS, filename: 'seed_loc_los_angeles.jpg', source: 'location1.jpg' },
  { folder: env.CDN_LOCATIONS, filename: 'seed_loc_san_francisco.jpg', source: 'location2.jpg' },
  { folder: env.CDN_LOCATIONS, filename: 'seed_loc_manhattan.jpg', source: 'location0.jpg' },
  { folder: env.CDN_LOCATIONS, filename: 'seed_loc_miami.jpg', source: 'location1.jpg' },
  // Locations (France)
  { folder: env.CDN_LOCATIONS, filename: 'seed_loc_paris.jpg', source: 'location2.jpg' },
  { folder: env.CDN_LOCATIONS, filename: 'seed_loc_lyon.jpg', source: 'location0.jpg' },
  { folder: env.CDN_LOCATIONS, filename: 'seed_loc_marseille.jpg', source: 'location1.jpg' },
  { folder: env.CDN_LOCATIONS, filename: 'seed_loc_nice.jpg', source: 'location2.jpg' },
  { folder: env.CDN_LOCATIONS, filename: 'seed_loc_bordeaux.jpg', source: 'location0.jpg' },
  // Users
  { folder: env.CDN_USERS, filename: 'seed_user_admin.jpg', source: 'avatar1.jpg' },
  { folder: env.CDN_USERS, filename: 'seed_user_agency1.jpg', source: 'avatar1.jpg' },
  { folder: env.CDN_USERS, filename: 'seed_user_agency2.png', source: 'avatar2.png' },
  { folder: env.CDN_USERS, filename: 'seed_user_customer1.jpg', source: 'avatar1.jpg' },
  { folder: env.CDN_USERS, filename: 'seed_user_customer2.png', source: 'avatar2.png' },
  { folder: env.CDN_USERS, filename: 'seed_user_customer3.jpg', source: 'avatar1.jpg' },
  // Properties
  ...generatePropertyImageSpecs(),
]

export const getSourceImgDir = (): string | null => {
  const candidates = [
    path.resolve(__dirname, '../../__tests__/img'),
    path.resolve(__dirname, '../../../__tests__/img'),
    path.resolve(process.cwd(), '__tests__/img'),
    path.resolve(process.cwd(), 'backend/__tests__/img'),
  ]
  for (const c of candidates) {
    if (fs.existsSync(c)) {
      return c
    }
  }
  return null
}

export const copySeedImages = async (): Promise<number> => {
  const srcDir = getSourceImgDir()
  if (!srcDir) {
    logger.warn('seed:dev — Source images directory __tests__/img not found, skipping image copy')
    return 0
  }

  let copied = 0
  for (const spec of SEED_IMAGE_SPECS) {
    try {
      if (!fs.existsSync(spec.folder)) {
        fs.mkdirSync(spec.folder, { recursive: true })
      }
      const srcFile = path.join(srcDir, spec.source)
      const dstFile = path.join(spec.folder, spec.filename)
      if (fs.existsSync(srcFile)) {
        fs.copyFileSync(srcFile, dstFile)
        copied++
      }
    } catch (err) {
      logger.warn(`seed:dev — Could not copy image ${spec.filename} to ${spec.folder}:`, err)
    }
  }
  return copied
}

export const cleanSeedImages = async (): Promise<number> => {
  let cleaned = 0
  for (const spec of SEED_IMAGE_SPECS) {
    try {
      const dstFile = path.join(spec.folder, spec.filename)
      if (fs.existsSync(dstFile)) {
        fs.unlinkSync(dstFile)
        cleaned++
      }
    } catch {
      // ignore
    }
  }
  return cleaned
}

// ──────────────────────────────────────────────────────────────
// Date helper
// ──────────────────────────────────────────────────────────────
export const daysFromNow = (days: number): Date => {
  const d = new Date()
  d.setDate(d.getDate() + days)
  d.setHours(12, 0, 0, 0)
  return d
}

// ──────────────────────────────────────────────────────────────
// Upsert helper — replace-by-id for strict schemas
// ──────────────────────────────────────────────────────────────
async function upsertById<T>(model: mongoose.Model<T>, id: mongoose.Types.ObjectId, doc: Record<string, any>) {
  await model.deleteOne({ _id: id })
  const created = new model({ _id: id, ...doc })
  await created.save()
  return created
}

// ──────────────────────────────────────────────────────────────
// Main seed function
// ──────────────────────────────────────────────────────────────
export async function seedDev(): Promise<{ created: Record<string, number> }> {
  const counts: Record<string, number> = {
    users: 0,
    locationValues: 0,
    countries: 0,
    locations: 0,
    properties: 0,
    bookings: 0,
    notifications: 0,
    notificationCounters: 0,
    images: 0,
  }

  const passwordHash = await authHelper.hashPassword(SEED_PASSWORD)

  // ── A. Copy CDN Seed Images ───────────────────────────────
  counts.images = await copySeedImages()

  // ── B. Users ──────────────────────────────────────────────
  const users = [
    {
      _id: SEED_IDS.adminDev,
      fullName: 'Dev Admin',
      email: SEED_EMAILS.adminDev,
      password: passwordHash,
      language: 'en',
      type: movininTypes.UserType.Admin,
      active: true,
      verified: true,
      bio: SEED_OWNER_TAG,
      avatar: 'seed_user_admin.jpg',
    },
    {
      _id: SEED_IDS.agency1,
      fullName: 'Sunshine Realty',
      email: SEED_EMAILS.agency1,
      password: passwordHash,
      language: 'en',
      type: movininTypes.UserType.Agency,
      active: true,
      verified: true,
      payLater: true,
      bio: SEED_OWNER_TAG,
      avatar: 'seed_user_agency1.jpg',
    },
    {
      _id: SEED_IDS.agency2,
      fullName: 'Urban Homes',
      email: SEED_EMAILS.agency2,
      password: passwordHash,
      language: 'fr',
      type: movininTypes.UserType.Agency,
      active: true,
      verified: true,
      payLater: false,
      bio: SEED_OWNER_TAG,
      avatar: 'seed_user_agency2.png',
    },
    {
      _id: SEED_IDS.customer1,
      fullName: 'Alice Johnson',
      email: SEED_EMAILS.customer1,
      password: passwordHash,
      language: 'en',
      type: movininTypes.UserType.User,
      active: true,
      verified: true,
      birthDate: new Date('1990-05-15'),
      phone: '+12025550123',
      bio: SEED_OWNER_TAG,
      avatar: 'seed_user_customer1.jpg',
    },
    {
      _id: SEED_IDS.customer2,
      fullName: 'Bob Smith',
      email: SEED_EMAILS.customer2,
      password: passwordHash,
      language: 'en',
      type: movininTypes.UserType.User,
      active: true,
      verified: true,
      birthDate: new Date('1985-11-22'),
      phone: '+12025550124',
      bio: SEED_OWNER_TAG,
      avatar: 'seed_user_customer2.png',
    },
    {
      _id: SEED_IDS.customer3,
      fullName: 'Carol White',
      email: SEED_EMAILS.customer3,
      password: passwordHash,
      language: 'fr',
      type: movininTypes.UserType.User,
      active: true,
      verified: true,
      birthDate: new Date('1995-03-08'),
      phone: '+33612345678',
      bio: SEED_OWNER_TAG,
      avatar: 'seed_user_customer3.jpg',
    },
  ]

  for (const u of users) {
    await upsertById(User, u._id, u)
    counts.users++
  }

  // ── C. Countries & Locations ──────────────────────────────
  const locationValues = [
    { _id: SEED_IDS.cvUSen, language: 'en', value: 'United States' },
    { _id: SEED_IDS.cvUSfr, language: 'fr', value: 'États-Unis' },
    { _id: SEED_IDS.cvFRen, language: 'en', value: 'France' },
    { _id: SEED_IDS.cvFRfr, language: 'fr', value: 'France' },
    { _id: SEED_IDS.lvNYen, language: 'en', value: 'New York' },
    { _id: SEED_IDS.lvNYfr, language: 'fr', value: 'New York' },
    { _id: SEED_IDS.lvLAen, language: 'en', value: 'Los Angeles' },
    { _id: SEED_IDS.lvLAfr, language: 'fr', value: 'Los Angeles' },
    { _id: SEED_IDS.lvSFen, language: 'en', value: 'San Francisco' },
    { _id: SEED_IDS.lvSFfr, language: 'fr', value: 'San Francisco' },
    { _id: SEED_IDS.lvMiamiEn, language: 'en', value: 'Miami' },
    { _id: SEED_IDS.lvMiamiFr, language: 'fr', value: 'Miami' },
    { _id: SEED_IDS.lvParisEn, language: 'en', value: 'Paris' },
    { _id: SEED_IDS.lvParisFr, language: 'fr', value: 'Paris' },
    { _id: SEED_IDS.lvLyonEn, language: 'en', value: 'Lyon' },
    { _id: SEED_IDS.lvLyonFr, language: 'fr', value: 'Lyon' },
    { _id: SEED_IDS.lvMarseilleEn, language: 'en', value: 'Marseille' },
    { _id: SEED_IDS.lvMarseilleFr, language: 'fr', value: 'Marseille' },
    { _id: SEED_IDS.lvNiceEn, language: 'en', value: 'Nice' },
    { _id: SEED_IDS.lvNiceFr, language: 'fr', value: 'Nice' },
    { _id: SEED_IDS.lvBordeauxEn, language: 'en', value: 'Bordeaux' },
    { _id: SEED_IDS.lvBordeauxFr, language: 'fr', value: 'Bordeaux' },
    { _id: SEED_IDS.lvManhattanEn, language: 'en', value: 'Manhattan' },
    { _id: SEED_IDS.lvManhattanFr, language: 'fr', value: 'Manhattan' },
  ]

  for (const lv of locationValues) {
    await upsertById(LocationValue, lv._id, lv)
    counts.locationValues++
  }

  const countries = [
    { _id: SEED_IDS.countryUS, values: [SEED_IDS.cvUSen, SEED_IDS.cvUSfr] },
    { _id: SEED_IDS.countryFR, values: [SEED_IDS.cvFRen, SEED_IDS.cvFRfr] },
  ]

  for (const c of countries) {
    await upsertById(Country, c._id, c)
    counts.countries++
  }

  const locations = [
    {
      _id: SEED_IDS.locNY,
      country: SEED_IDS.countryUS,
      latitude: 40.7128,
      longitude: -74.006,
      values: [SEED_IDS.lvNYen, SEED_IDS.lvNYfr],
      image: 'seed_loc_new_york.jpg',
    },
    {
      _id: SEED_IDS.locLA,
      country: SEED_IDS.countryUS,
      latitude: 34.0522,
      longitude: -118.2437,
      values: [SEED_IDS.lvLAen, SEED_IDS.lvLAfr],
      image: 'seed_loc_los_angeles.jpg',
    },
    {
      _id: SEED_IDS.locSF,
      country: SEED_IDS.countryUS,
      latitude: 37.7749,
      longitude: -122.4194,
      values: [SEED_IDS.lvSFen, SEED_IDS.lvSFfr],
      image: 'seed_loc_san_francisco.jpg',
    },
    {
      _id: SEED_IDS.locMiami,
      country: SEED_IDS.countryUS,
      latitude: 25.7617,
      longitude: -80.1918,
      values: [SEED_IDS.lvMiamiEn, SEED_IDS.lvMiamiFr],
      image: 'seed_loc_miami.jpg',
    },
    {
      _id: SEED_IDS.locManhattan,
      country: SEED_IDS.countryUS,
      latitude: 40.7831,
      longitude: -73.9712,
      values: [SEED_IDS.lvManhattanEn, SEED_IDS.lvManhattanFr],
      parentLocation: SEED_IDS.locNY,
      image: 'seed_loc_manhattan.jpg',
    },
    {
      _id: SEED_IDS.locParis,
      country: SEED_IDS.countryFR,
      latitude: 48.8566,
      longitude: 2.3522,
      values: [SEED_IDS.lvParisEn, SEED_IDS.lvParisFr],
      image: 'seed_loc_paris.jpg',
    },
    {
      _id: SEED_IDS.locLyon,
      country: SEED_IDS.countryFR,
      latitude: 45.764,
      longitude: 4.8357,
      values: [SEED_IDS.lvLyonEn, SEED_IDS.lvLyonFr],
      image: 'seed_loc_lyon.jpg',
    },
    {
      _id: SEED_IDS.locMarseille,
      country: SEED_IDS.countryFR,
      latitude: 43.2965,
      longitude: 5.3698,
      values: [SEED_IDS.lvMarseilleEn, SEED_IDS.lvMarseilleFr],
      image: 'seed_loc_marseille.jpg',
    },
    {
      _id: SEED_IDS.locNice,
      country: SEED_IDS.countryFR,
      latitude: 43.7102,
      longitude: 7.262,
      values: [SEED_IDS.lvNiceEn, SEED_IDS.lvNiceFr],
      image: 'seed_loc_nice.jpg',
    },
    {
      _id: SEED_IDS.locBordeaux,
      country: SEED_IDS.countryFR,
      latitude: 44.8378,
      longitude: -0.5792,
      values: [SEED_IDS.lvBordeauxEn, SEED_IDS.lvBordeauxFr],
      image: 'seed_loc_bordeaux.jpg',
    },
  ]

  for (const loc of locations) {
    await upsertById(Location, loc._id, loc)
    counts.locations++
  }

  // ── D. Properties (20) ─────────────────────────────────────
  const desc = (text: string) => `${SEED_OWNER_TAG} ${text}`
  const propImg = (i: number) => {
    const num = i.toString().padStart(2, '0')
    return {
      image: `seed_prop_${num}_main.jpg`,
      images: [`seed_prop_${num}_add1.jpg`, `seed_prop_${num}_add2.jpg`],
    }
  }

  const propertyDefs = [
    { _id: SEED_IDS.prop01, name: 'Sunny Manhattan Apartment', type: movininTypes.PropertyType.Apartment, agency: SEED_IDS.agency1, location: SEED_IDS.locManhattan, description: desc('Modern apartment with city views in Manhattan'), bedrooms: 2, bathrooms: 1, kitchens: 1, parkingSpaces: 0, size: 75, petsAllowed: false, furnished: true, aircon: true, minimumAge: 21, price: 3500, rentalTerm: movininTypes.RentalTerm.Monthly, hidden: false, available: true, cancellation: 500, blockOnPay: true, ...propImg(1) },
    { _id: SEED_IDS.prop02, name: 'Brooklyn Townhouse', type: movininTypes.PropertyType.Townhouse, agency: SEED_IDS.agency1, location: SEED_IDS.locNY, description: desc('Charming brownstone townhouse in Brooklyn'), bedrooms: 3, bathrooms: 2, kitchens: 1, parkingSpaces: 1, size: 150, petsAllowed: true, furnished: false, aircon: false, minimumAge: 21, price: 5000, rentalTerm: movininTypes.RentalTerm.Monthly, hidden: false, available: true, cancellation: 1000, ...propImg(2) },
    { _id: SEED_IDS.prop03, name: 'LA Beach House', type: movininTypes.PropertyType.House, agency: SEED_IDS.agency1, location: SEED_IDS.locLA, description: desc('Beautiful beach house near Santa Monica'), bedrooms: 4, bathrooms: 3, kitchens: 2, parkingSpaces: 2, size: 250, petsAllowed: true, furnished: true, aircon: true, minimumAge: 25, price: 8500, rentalTerm: movininTypes.RentalTerm.Monthly, hidden: false, available: true, cancellation: 2000, ...propImg(3) },
    { _id: SEED_IDS.prop04, name: 'Silicon Valley Plot', type: movininTypes.PropertyType.Plot, agency: SEED_IDS.agency1, location: SEED_IDS.locSF, description: desc('Prime development land in Silicon Valley'), bedrooms: 0, bathrooms: 0, kitchens: 0, parkingSpaces: 0, size: 2000, petsAllowed: false, furnished: false, aircon: false, minimumAge: 21, price: 15000, rentalTerm: movininTypes.RentalTerm.Yearly, hidden: false, available: true, cancellation: 0, ...propImg(4) },
    { _id: SEED_IDS.prop05, name: 'Miami Luxury Villa', type: movininTypes.PropertyType.House, agency: SEED_IDS.agency1, location: SEED_IDS.locMiami, description: desc('Waterfront villa with private dock in Miami Beach'), bedrooms: 5, bathrooms: 4, kitchens: 2, parkingSpaces: 3, size: 450, petsAllowed: true, furnished: true, aircon: true, minimumAge: 25, price: 16000, rentalTerm: movininTypes.RentalTerm.Monthly, hidden: false, available: true, cancellation: 3000, ...propImg(5) },
    { _id: SEED_IDS.prop06, name: 'Downtown LA Office', type: movininTypes.PropertyType.Commercial, agency: SEED_IDS.agency1, location: SEED_IDS.locLA, description: desc('Class A office space in downtown LA'), bedrooms: 0, bathrooms: 2, kitchens: 1, parkingSpaces: 10, size: 500, petsAllowed: false, furnished: true, aircon: true, minimumAge: 21, price: 12000, rentalTerm: movininTypes.RentalTerm.Monthly, hidden: false, available: true, cancellation: 3000, ...propImg(6) },
    { _id: SEED_IDS.prop07, name: 'SF Industrial Warehouse', type: movininTypes.PropertyType.Industrial, agency: SEED_IDS.agency1, location: SEED_IDS.locSF, description: desc('Large warehouse space for logistics'), bedrooms: 0, bathrooms: 1, kitchens: 0, parkingSpaces: 20, size: 3000, petsAllowed: false, furnished: false, aircon: false, minimumAge: 21, price: 8000, rentalTerm: movininTypes.RentalTerm.Monthly, hidden: false, available: true, cancellation: 0, ...propImg(7) },
    { _id: SEED_IDS.prop08, name: 'Appartement Haussmannien', type: movininTypes.PropertyType.Apartment, agency: SEED_IDS.agency2, location: SEED_IDS.locParis, description: desc('Magnifique appartement Haussmannien avec vue sur Paris'), bedrooms: 3, bathrooms: 2, kitchens: 1, parkingSpaces: 0, size: 120, petsAllowed: false, furnished: true, aircon: true, minimumAge: 21, price: 4500, rentalTerm: movininTypes.RentalTerm.Monthly, hidden: false, available: true, cancellation: 800, ...propImg(8) },
    { _id: SEED_IDS.prop09, name: 'Maison de Ville Lyon', type: movininTypes.PropertyType.Townhouse, agency: SEED_IDS.agency2, location: SEED_IDS.locLyon, description: desc('Belle maison de ville dans le Vieux Lyon'), bedrooms: 4, bathrooms: 2, kitchens: 1, parkingSpaces: 1, size: 180, petsAllowed: true, furnished: false, aircon: false, minimumAge: 21, price: 3200, rentalTerm: movininTypes.RentalTerm.Monthly, hidden: false, available: true, cancellation: 600, ...propImg(9) },
    { _id: SEED_IDS.prop10, name: 'Paris Studio Weekly', type: movininTypes.PropertyType.Apartment, agency: SEED_IDS.agency2, location: SEED_IDS.locParis, description: desc('Cozy studio for short-term weekly stays'), bedrooms: 1, bathrooms: 1, kitchens: 1, parkingSpaces: 0, size: 30, petsAllowed: false, furnished: true, aircon: true, minimumAge: 21, price: 800, rentalTerm: movininTypes.RentalTerm.Weekly, hidden: false, available: true, cancellation: 200, ...propImg(10) },
    { _id: SEED_IDS.prop11, name: 'Lyon Daily Loft', type: movininTypes.PropertyType.Apartment, agency: SEED_IDS.agency2, location: SEED_IDS.locLyon, description: desc('Industrial loft available for daily rental'), bedrooms: 1, bathrooms: 1, kitchens: 1, parkingSpaces: 0, size: 55, petsAllowed: false, furnished: true, aircon: true, minimumAge: 21, price: 120, rentalTerm: movininTypes.RentalTerm.Daily, hidden: false, available: true, cancellation: 0, ...propImg(11) },
    { _id: SEED_IDS.prop12, name: 'NYC Penthouse', type: movininTypes.PropertyType.Apartment, agency: SEED_IDS.agency1, location: SEED_IDS.locManhattan, description: desc('Luxury penthouse with rooftop terrace'), bedrooms: 5, bathrooms: 4, kitchens: 2, parkingSpaces: 2, size: 350, petsAllowed: true, furnished: true, aircon: true, minimumAge: 30, price: 25000, rentalTerm: movininTypes.RentalTerm.Monthly, hidden: false, available: true, cancellation: 5000, blockOnPay: true, ...propImg(12) },
    { _id: SEED_IDS.prop13, name: 'Miami Beachfront Condo', type: movininTypes.PropertyType.Apartment, agency: SEED_IDS.agency1, location: SEED_IDS.locMiami, description: desc('Modern condo overlooking South Beach'), bedrooms: 2, bathrooms: 2, kitchens: 1, parkingSpaces: 1, size: 110, petsAllowed: true, furnished: true, aircon: true, minimumAge: 21, price: 5500, rentalTerm: movininTypes.RentalTerm.Monthly, hidden: false, available: true, cancellation: 800, ...propImg(13) },
    { _id: SEED_IDS.prop14, name: 'Marseille Vieux-Port Commercial', type: movininTypes.PropertyType.Commercial, agency: SEED_IDS.agency2, location: SEED_IDS.locMarseille, description: desc('Prime restaurant and retail space overlooking the Old Port'), bedrooms: 0, bathrooms: 2, kitchens: 1, parkingSpaces: 0, size: 220, petsAllowed: false, furnished: true, aircon: true, minimumAge: 21, price: 6500, rentalTerm: movininTypes.RentalTerm.Monthly, hidden: false, available: true, cancellation: 1500, ...propImg(14) },
    { _id: SEED_IDS.prop15, name: 'Nice Promenade Apartment', type: movininTypes.PropertyType.Apartment, agency: SEED_IDS.agency2, location: SEED_IDS.locNice, description: desc('Under renovation — not currently available'), bedrooms: 2, bathrooms: 1, kitchens: 1, parkingSpaces: 0, size: 65, petsAllowed: false, furnished: false, aircon: false, minimumAge: 21, price: 2800, rentalTerm: movininTypes.RentalTerm.Monthly, hidden: false, available: false, cancellation: 0, ...propImg(15) },
    { _id: SEED_IDS.prop16, name: 'Hidden NYC Loft', type: movininTypes.PropertyType.Apartment, agency: SEED_IDS.agency1, location: SEED_IDS.locNY, description: desc('Draft listing — hidden from public search'), bedrooms: 2, bathrooms: 1, kitchens: 1, parkingSpaces: 0, size: 80, petsAllowed: false, furnished: true, aircon: true, minimumAge: 21, price: 4000, rentalTerm: movininTypes.RentalTerm.Monthly, hidden: true, available: true, cancellation: 0, ...propImg(16) },
    { _id: SEED_IDS.prop17, name: 'Bordeaux Vineyard Chateau', type: movininTypes.PropertyType.Farm, agency: SEED_IDS.agency2, location: SEED_IDS.locBordeaux, description: desc('Historic castle surrounded by grand cru vineyards in Bordeaux'), bedrooms: 8, bathrooms: 6, kitchens: 2, parkingSpaces: 10, size: 8000, petsAllowed: true, furnished: true, aircon: false, minimumAge: 25, price: 40000, rentalTerm: movininTypes.RentalTerm.Yearly, hidden: false, available: true, cancellation: 10000, ...propImg(17) },
    { _id: SEED_IDS.prop18, name: 'Marseille Sea View Weekly', type: movininTypes.PropertyType.Apartment, agency: SEED_IDS.agency2, location: SEED_IDS.locMarseille, description: desc('Bright coastal apartment for vacation rental'), bedrooms: 2, bathrooms: 1, kitchens: 1, parkingSpaces: 1, size: 65, petsAllowed: false, furnished: true, aircon: true, minimumAge: 21, price: 950, rentalTerm: movininTypes.RentalTerm.Weekly, hidden: false, available: true, cancellation: 200, ...propImg(18) },
    { _id: SEED_IDS.prop19, name: 'Nice Colline Villa', type: movininTypes.PropertyType.House, agency: SEED_IDS.agency2, location: SEED_IDS.locNice, description: desc('Stunning hilltop villa with infinity pool over the Mediterranean'), bedrooms: 4, bathrooms: 3, kitchens: 1, parkingSpaces: 3, size: 280, petsAllowed: true, furnished: true, aircon: true, minimumAge: 25, price: 11000, rentalTerm: movininTypes.RentalTerm.Monthly, hidden: false, available: true, cancellation: 2500, ...propImg(19) },
    { _id: SEED_IDS.prop20, name: 'Bordeaux Centre Suite Daily', type: movininTypes.PropertyType.Apartment, agency: SEED_IDS.agency2, location: SEED_IDS.locBordeaux, description: desc('Boutique daily suite in the historic center of Bordeaux'), bedrooms: 1, bathrooms: 1, kitchens: 1, parkingSpaces: 0, size: 45, petsAllowed: false, furnished: true, aircon: true, minimumAge: 21, price: 160, rentalTerm: movininTypes.RentalTerm.Daily, hidden: false, available: true, cancellation: 40, ...propImg(20) },
  ]

  for (const p of propertyDefs) {
    await upsertById(Property, p._id, p)
    counts.properties++
  }

  // ── E. Bookings (12) ──────────────────────────────────────
  const bookingDefs = [
    { _id: SEED_IDS.booking01, agency: SEED_IDS.agency1, property: SEED_IDS.prop01, renter: SEED_IDS.customer1, location: SEED_IDS.locManhattan, from: daysFromNow(10), to: daysFromNow(40), status: movininTypes.BookingStatus.Pending, cancellation: true, price: 3500 },
    { _id: SEED_IDS.booking02, agency: SEED_IDS.agency1, property: SEED_IDS.prop03, renter: SEED_IDS.customer2, location: SEED_IDS.locLA, from: daysFromNow(5), to: daysFromNow(35), status: movininTypes.BookingStatus.Paid, cancellation: true, price: 8500 },
    { _id: SEED_IDS.booking03, agency: SEED_IDS.agency2, property: SEED_IDS.prop08, renter: SEED_IDS.customer3, location: SEED_IDS.locParis, from: daysFromNow(15), to: daysFromNow(45), status: movininTypes.BookingStatus.Deposit, cancellation: true, price: 4500 },
    { _id: SEED_IDS.booking04, agency: SEED_IDS.agency2, property: SEED_IDS.prop10, renter: SEED_IDS.customer1, location: SEED_IDS.locParis, from: daysFromNow(20), to: daysFromNow(27), status: movininTypes.BookingStatus.Reserved, cancellation: false, price: 800 },
    { _id: SEED_IDS.booking05, agency: SEED_IDS.agency1, property: SEED_IDS.prop02, renter: SEED_IDS.customer1, location: SEED_IDS.locNY, from: daysFromNow(-60), to: daysFromNow(-30), status: movininTypes.BookingStatus.Paid, cancellation: true, price: 5000 },
    { _id: SEED_IDS.booking06, agency: SEED_IDS.agency2, property: SEED_IDS.prop09, renter: SEED_IDS.customer2, location: SEED_IDS.locLyon, from: daysFromNow(-45), to: daysFromNow(-15), status: movininTypes.BookingStatus.Cancelled, cancellation: true, price: 3200, cancelRequest: false },
    { _id: SEED_IDS.booking07, agency: SEED_IDS.agency1, property: SEED_IDS.prop06, renter: SEED_IDS.customer3, location: SEED_IDS.locLA, from: daysFromNow(-30), to: daysFromNow(-1), status: movininTypes.BookingStatus.Void, cancellation: false, price: 12000 },
    { _id: SEED_IDS.booking08, agency: SEED_IDS.agency1, property: SEED_IDS.prop13, renter: SEED_IDS.customer2, location: SEED_IDS.locMiami, from: daysFromNow(-5), to: daysFromNow(25), status: movininTypes.BookingStatus.Paid, cancellation: true, price: 5500 },
    { _id: SEED_IDS.booking09, agency: SEED_IDS.agency1, property: SEED_IDS.prop12, renter: SEED_IDS.customer3, location: SEED_IDS.locManhattan, from: daysFromNow(7), to: daysFromNow(37), status: movininTypes.BookingStatus.Pending, cancellation: true, cancelRequest: true, price: 25000 },
    { _id: SEED_IDS.booking10, agency: SEED_IDS.agency2, property: SEED_IDS.prop11, renter: SEED_IDS.customer1, location: SEED_IDS.locLyon, from: daysFromNow(3), to: daysFromNow(10), status: movininTypes.BookingStatus.Reserved, cancellation: false, price: 840 },
    { _id: SEED_IDS.booking11, agency: SEED_IDS.agency2, property: SEED_IDS.prop15, renter: SEED_IDS.customer2, location: SEED_IDS.locNice, from: daysFromNow(-14), to: daysFromNow(-7), status: movininTypes.BookingStatus.Deposit, cancellation: false, price: 1750 },
    { _id: SEED_IDS.booking12, agency: SEED_IDS.agency2, property: SEED_IDS.prop17, renter: SEED_IDS.customer3, location: SEED_IDS.locBordeaux, from: daysFromNow(60), to: daysFromNow(74), status: movininTypes.BookingStatus.Paid, cancellation: true, price: 40000 },
  ]

  for (const b of bookingDefs) {
    await upsertById(Booking, b._id, b)
    counts.bookings++
  }

  // ── F. Notifications ──────────────────────────────────────
  const notifDefs = [
    { _id: SEED_IDS.notif01, user: SEED_IDS.adminDev, message: `${SEED_OWNER_TAG} New booking received from Alice Johnson`, booking: SEED_IDS.booking01, isRead: false },
    { _id: SEED_IDS.notif02, user: SEED_IDS.adminDev, message: `${SEED_OWNER_TAG} Payment confirmed for booking #${SEED_IDS.booking02}`, booking: SEED_IDS.booking02, isRead: true },
    { _id: SEED_IDS.notif03, user: SEED_IDS.agency1, message: `${SEED_OWNER_TAG} Cancellation request from Carol White`, booking: SEED_IDS.booking09, isRead: false },
    { _id: SEED_IDS.notif04, user: SEED_IDS.agency1, message: `${SEED_OWNER_TAG} New booking: LA Beach House`, booking: SEED_IDS.booking02, isRead: true },
    { _id: SEED_IDS.notif05, user: SEED_IDS.agency2, message: `${SEED_OWNER_TAG} Deposit received for Paris apartment`, booking: SEED_IDS.booking03, isRead: false },
    { _id: SEED_IDS.notif06, user: SEED_IDS.customer1, message: `${SEED_OWNER_TAG} Your booking has been confirmed`, booking: SEED_IDS.booking01, isRead: false },
    { _id: SEED_IDS.notif07, user: SEED_IDS.customer2, message: `${SEED_OWNER_TAG} Your payment was processed successfully`, booking: SEED_IDS.booking02, isRead: true },
    { _id: SEED_IDS.notif08, user: SEED_IDS.customer3, message: `${SEED_OWNER_TAG} Booking update: deposit status`, booking: SEED_IDS.booking03, isRead: false },
  ]

  for (const n of notifDefs) {
    await upsertById(Notification, n._id, n)
    counts.notifications++
  }

  // ── F.2 Notification counters ─────────────────────────────
  const unreadCounts: Record<string, number> = {}
  for (const n of notifDefs) {
    if (!n.isRead) {
      const key = n.user.toString()
      unreadCounts[key] = (unreadCounts[key] || 0) + 1
    }
  }

  const usersWithNotifs = [
    SEED_IDS.adminDev,
    SEED_IDS.agency1,
    SEED_IDS.agency2,
    SEED_IDS.customer1,
    SEED_IDS.customer2,
    SEED_IDS.customer3,
  ]

  for (const userId of usersWithNotifs) {
    const count = unreadCounts[userId.toString()] || 0
    await NotificationCounter.deleteOne({ user: userId })
    if (count > 0) {
      const nc = new NotificationCounter({ user: userId, count })
      await nc.save()
      counts.notificationCounters++
    }
  }

  return { created: counts }
}

// ──────────────────────────────────────────────────────────────
// CLI runner
// ──────────────────────────────────────────────────────────────
export async function runSeedCli(): Promise<void> {
  try {
    assertSafeEnvironment()

    const connected = await databaseHelper.connect(env.DB_URI, env.DB_SSL, env.DB_DEBUG)
    if (!connected) {
      logger.error('seed:dev — Failed to connect to the database')
      process.exit(1)
    }

    logger.info('seed:dev — Starting development database seeding...')
    const result = await seedDev()

    logger.info('seed:dev — Seeding complete! Summary:')
    for (const [key, value] of Object.entries(result.created)) {
      logger.info(`  ${key}: ${value}`)
    }

    logger.info('')
    logger.info('═══════════════════════════════════════════════')
    logger.info('  Development Login Credentials')
    logger.info('═══════════════════════════════════════════════')
    logger.info('  Admin Panel (localhost:3003):')
    logger.info('    Email:    dev-admin@example.com')
    logger.info(`    Password: ${SEED_PASSWORD}`)
    logger.info('')
    logger.info('  Admin Panel (Agency Accounts):')
    logger.info('    Email:    sunshine-realty@example.com')
    logger.info('    Email:    urban-homes@example.com')
    logger.info(`    Password: ${SEED_PASSWORD}`)
    logger.info('')
    logger.info('  Frontend (localhost:3004 / localhost:8081):')
    logger.info('    Email:    alice.johnson@example.com')
    logger.info('    Email:    bob.smith@example.com')
    logger.info('    Email:    carol.white@example.com')
    logger.info(`    Password: ${SEED_PASSWORD}`)
    logger.info('═══════════════════════════════════════════════')

    await databaseHelper.close()
    process.exit(0)
  } catch (err) {
    logger.error('seed:dev — Error during seeding:', err)
    try {
      await databaseHelper.close()
    } catch {
      // ignore
    }
    process.exit(1)
  }
}

const isMain = process.argv[1] && (
  process.argv[1].endsWith('seedDev.js') ||
  process.argv[1].endsWith('seedDev.ts') ||
  process.argv[1].endsWith('seedDev')
)

if (isMain) {
  runSeedCli()
}
