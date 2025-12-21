import 'dotenv/config'
import * as movininTypes from ':movinin-types'
import * as env from '../src/config/env.config'
import * as logger from '../src/utils/logger'
import * as databaseHelper from '../src/utils/databaseHelper'
import User from '../src/models/User'
import * as authHelper from '../src/utils/authHelper'

export default async function globalSetup() {
  try {
    // env admin
    if (env.ADMIN_EMAIL) {
      await databaseHelper.connect(env.DB_URI, false, false)
      const adminFromEnv = await User.findOne({ email: env.ADMIN_EMAIL })
      if (!adminFromEnv) {
        const passwordHash = await authHelper.hashPassword('Un1tTest5')
        const admin = new User({
          fullName: 'admin',
          email: env.ADMIN_EMAIL,
          language: 'en',
          password: passwordHash,
          type: movininTypes.UserType.Admin,
        })
        await admin.save()
        logger.info('globalSetup: Admin user created:', admin._id.toString())
      }
      await databaseHelper.close()
    }
  } catch (err) {
    logger.error('Error while running global setup', err)
  }
}
