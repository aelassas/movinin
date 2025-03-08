import 'dotenv/config'
import * as movininTypes from ':movinin-types'
import * as env from '../src/config/env.config'
import * as databaseHelper from '../src/common/databaseHelper'
import * as mailHelper from '../src/common/mailHelper'
import * as testHelper from './testHelper'
import User from '../src/models/User'

//
// Connecting and initializing the database before running the test suite
//
beforeAll(async () => {
  testHelper.initializeLogger()

  await databaseHelper.connect(env.DB_URI, false, false)
  
  testHelper.initializeLogger()
})

//
// Closing and cleaning the database connection after running the test suite
//
afterAll(async () => {
  await databaseHelper.close()
})

describe('Test User phone validation', () => {
  it('should test User phone validation', async () => {
    await databaseHelper.connect(env.DB_URI, false, false)
    let res = true
    const USER: movininTypes.User = {
      email: testHelper.GetRandomEmail(),
      fullName: 'Renter 1',
      birthDate: new Date(1990, 5, 20),
      phone: '',
    }

    let userId = ''
    try {
      const user = new User(USER)
      await user.save()
      userId = user.id
      user.phone = 'unknown'
      await user.save()
    } catch {
      res = false
    } finally {
      if (userId) {
        await User.deleteOne({ _id: userId })
      }
    }
    await databaseHelper.close()
    expect(res).toBeFalsy()
  })
})

describe('Test email sending error', () => {
  it('should test email sending error', async () => {
    await databaseHelper.connect(env.DB_URI, false, false)
    let res = true
    try {
      await mailHelper.sendMail({
        from: testHelper.GetRandomEmail(),
        to: 'wrong-email',
        subject: 'dummy subject',
        html: 'dummy body',
      })
    } catch {
      res = false
    }
    await databaseHelper.close()
    expect(res).toBeFalsy()
  })
})
