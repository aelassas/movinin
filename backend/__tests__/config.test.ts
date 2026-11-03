import 'dotenv/config'
import * as env from '../src/config/env.config'

describe('Test configuration options', () => {
  it('should test configuration options', async () => {
    const SMTP_HOST = env.__env__('MI_SMTP_HOST', true)
    expect(!!SMTP_HOST).toBeTruthy()

    let res = true
    try {
      const UNKNOWN = env.__env__('MI_UNKNOWN', true)
      expect(!!UNKNOWN).toBeFalsy()
    } catch {
      res = false
    }
    expect(res).toBeFalsy()

    const PORT = env.__env__('MI_PORT', false, '4002')
    expect(!!PORT).toBeTruthy()

    const UNKNOWN = env.__env__('MI_UNKNOWN', false)
    expect(!!UNKNOWN).toBeFalsy()

    expect(env.REDIS_URL).toBeDefined()
    expect(env.RATE_LIMIT_CAPACITY).toBeGreaterThan(0)
    expect(env.RATE_LIMIT_REFILL_RATE_MS).toBeGreaterThan(0)
  })
})
