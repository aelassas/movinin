import 'dotenv/config'
import * as env from '@/config/env.config'
import * as databaseHelper from '@/common/databaseHelper'
import * as testHelper from './testHelper'
import LocationValue from '@/models/LocationValue'
import Location from '@/models/Location'

beforeAll(() => {
  testHelper.initializeLogger()
})

describe('Test database connection', () => {
  it('should connect to database', async () => {
    const res = await databaseHelper.connect(env.DB_URI, false, false)
    expect(res).toBeTruthy()
    await databaseHelper.close()
  })
})

describe('Test database connection failure', () => {
  it('should fail connecting to database', async () => {
    const res = await databaseHelper.connect('wrong-uri', true, false)
    expect(res).toBeFalsy()
  })
})

describe('Test locations initialization', () => {
  it('should initialize locations', async () => {
    let res = await databaseHelper.connect(env.DB_URI, false, false)
    expect(res).toBeTruthy()

    const lv1 = new LocationValue({ language: 'en', value: 'location' })
    await lv1.save()
    const lv2 = new LocationValue({ language: 'es', value: 'localización' })
    await lv2.save()
    const l1 = new Location({ values: [lv1.id, lv2.id] })
    await l1.save()
    const l2 = new Location({ values: [lv2.id] })
    await l2.save()

    res = await databaseHelper.InitializeLocations()
    expect(res).toBeTruthy()

    const location1 = await Location.findById(l1.id)
    const location2 = await Location.findById(l2.id)
    await LocationValue.deleteMany({ _id: { $in: [...location1!.values, ...location2!.values] } })
    await location1?.deleteOne()
    await location2?.deleteOne()

    await databaseHelper.close()
  })
})
