import * as helper from '../src/utils/helper'
import { jest } from '@jest/globals'
import * as movininTypes from ':movinin-types'
import * as movininHelper from ':movinin-helper'

describe('Test string to boolean', () => {
  it('should convert a string to boolean', () => {
    // test success (true)
    expect(helper.StringToBoolean('true')).toBeTruthy()
    // test success (false)
    expect(helper.StringToBoolean('false')).toBeFalsy()
    // test success (falsy value)
    expect(helper.StringToBoolean('')).toBeFalsy()
  })
})

describe('Test join url', () => {
  it('should join two url parts', () => {
    // test success (second part starts with slash)
    expect(helper.joinURL('part1/', '/part2')).toBe('part1/part2')
    // test success (first part not ending with slash)
    expect(helper.joinURL('part1', '/part2')).toBe('part1/part2')
    // test success (second part not starting with slash)
    expect(helper.joinURL('part1/', 'part2')).toBe('part1/part2')
  })
})

describe('Test clone', () => {
  it('should clone an object or an array', () => {
    // test success (object)
    expect(helper.clone({ foo: 'bar' })).toStrictEqual({ foo: 'bar' })
    // test success (array)
    expect(helper.clone([1, 2, 3])).toStrictEqual([1, 2, 3])
  })
})

describe('Test trim', () => {
  it('should test trim', () => {
    // test success (begins and ends with spaces)
    expect(helper.trim('   xxxxxxxx   ', ' ')).toBe('xxxxxxxx')
  })
})

describe('Test getStripeLocale', () => {
  it('should test getStripeLocale', () => {
    // test success (value found)
    expect(helper.getStripeLocale('en')).toBe('en')
    // test success (value not found so should return default one)
    expect(helper.getStripeLocale('')).toBe('auto')
  })
})

describe('Test safeStringify', () => {
  it('should safe stringify an object', () => {
    // test success (object)
    expect(helper.safeStringify({ foo: 'bar' })).toStrictEqual('{"foo":"bar"}')
    // test failure
    const obj = {
      get foo() {
        throw new Error('Cannot access foo')
      }
    }
    expect(helper.safeStringify(obj)).toStrictEqual('[Unserializable object]')
  })
})

describe('formatPayPalPrice', () => {
  it('should format PayPal price', () => {
    expect(helper.formatPayPalPrice(11)).toBe('11.00')
    expect(helper.formatPayPalPrice(11.1)).toBe('11.10')
    expect(helper.formatPayPalPrice(11.12)).toBe('11.12')
  })
})

describe('delay', () => {
  it('should delay in ms', async () => {
    let res = true
    try {
      await helper.delay(100)
    } catch {
      res = false
    }
    expect(res).toBeTruthy()
  })
})

describe('calculateTotalPrice (monthly rental term)', () => {
  afterEach(() => {
    jest.useRealTimers()
  })

  it('should divide the monthly price by the number of days of the current month', () => {
    const property = { price: 2800, rentalTerm: movininTypes.RentalTerm.Monthly, cancellation: 0 } as movininTypes.Property
    const from = new Date(2026, 1, 1)
    const to = new Date(2026, 1, 11) // 10 days

    jest.useFakeTimers({ now: new Date(2026, 1, 15) }) // February: 28 days
    expect(movininHelper.calculateTotalPrice(property, from, to)).toBe(1000)

    jest.useFakeTimers({ now: new Date(2026, 2, 15) }) // March: 31 days
    expect(movininHelper.calculateTotalPrice(property, from, to)).toBe(903.23)
  })
})