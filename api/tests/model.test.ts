import 'dotenv/config'
import * as movininTypes from 'movinin-types'
import * as DatabaseHelper from '../src/common/DatabaseHelper'
import * as TestHelper from './TestHelper'
import User from '../src/models/User'

describe('Test User phone validation', () => {
    it('should test User phone validation', async () => {
        await DatabaseHelper.Connect()
        let res = true
        const USER: movininTypes.User = {
            email: TestHelper.GetRandomEmail(),
            fullName: 'Additional Driver 1',
            birthDate: new Date(1990, 5, 20),
            phone: '',
        }

        let userId = ''
        try {
            const user = new User(USER)
            await user.save()
            userId = user._id
            user.phone = 'unknown'
            await user.save()
        } catch (err) {
            console.log(err)
            res = false
        } finally {
            if (userId) {
                await User.deleteOne({ _id: userId })
            }
        }
        await DatabaseHelper.Close()
        expect(res).toBeFalsy()
    })
})
