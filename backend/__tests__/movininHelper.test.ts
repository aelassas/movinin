import { jest } from '@jest/globals'
import * as movininTypes from ':movinin-types'
import * as movininHelper from ':movinin-helper'
import CurrencyConverter from ':currency-converter'

describe('movininHelper', () => {
  describe('formatNumber', () => {
    it('should group thousands with a comma in English and a space in other languages', () => {
      expect(movininHelper.formatNumber(1234567, 'en')).toBe('1,234,567')
      expect(movininHelper.formatNumber(1234567, 'fr')).toBe('1 234 567')
    })

    it('should not add a separator below 1000', () => {
      expect(movininHelper.formatNumber(0, 'en')).toBe('0')
      expect(movininHelper.formatNumber(999, 'en')).toBe('999')
    })

    it('should format decimals with two digits', () => {
      expect(movininHelper.formatNumber(1234.5, 'en')).toBe('1,234.50')
      expect(movininHelper.formatNumber(0.5, 'en')).toBe('0.50')
    })

    it('should handle negative numbers and large numbers', () => {
      expect(movininHelper.formatNumber(-1234.5, 'en')).toBe('-1,234.50')
      expect(movininHelper.formatNumber(1000000, 'en')).toBe('1,000,000')
      expect(movininHelper.formatNumber(1000, 'fr')).toBe('1 000')
    })

    it('should return an empty string when the value is not a number', () => {
      expect(movininHelper.formatNumber('abc' as unknown as number, 'en')).toBe('')
    })
  })

  describe('formatDatePart', () => {
    it('should pad single digits with a leading zero', () => {
      expect(movininHelper.formatDatePart(0)).toBe('00')
      expect(movininHelper.formatDatePart(5)).toBe('05')
      expect(movininHelper.formatDatePart(9)).toBe('09')
    })

    it('should not pad two-digit numbers', () => {
      expect(movininHelper.formatDatePart(10)).toBe('10')
      expect(movininHelper.formatDatePart(31)).toBe('31')
    })
  })

  describe('capitalize', () => {
    it('should upper-case the first character only', () => {
      expect(movininHelper.capitalize('hello world')).toBe('Hello world')
      expect(movininHelper.capitalize('Hello')).toBe('Hello')
      expect(movininHelper.capitalize('élan')).toBe('Élan')
    })

    it('should return an empty string unchanged', () => {
      expect(movininHelper.capitalize('')).toBe('')
    })
  })

  describe('isDate', () => {
    it('should accept valid dates', () => {
      expect(movininHelper.isDate(new Date())).toBe(true)
      expect(movininHelper.isDate(new Date(2026, 0, 1))).toBe(true)
    })

    it('should reject invalid dates and non-date values', () => {
      expect(movininHelper.isDate(new Date('invalid'))).toBe(false)
      expect(movininHelper.isDate('2026-01-01')).toBe(false)
      expect(movininHelper.isDate(1767225600000)).toBe(false)
      expect(movininHelper.isDate(null)).toBe(false)
      expect(movininHelper.isDate(undefined)).toBe(false)
    })
  })

  describe('joinURL', () => {
    it('should join two parts with a single slash', () => {
      expect(movininHelper.joinURL('http://localhost', 'cdn')).toBe('http://localhost/cdn')
      expect(movininHelper.joinURL('http://localhost/', 'cdn')).toBe('http://localhost/cdn')
      expect(movininHelper.joinURL('http://localhost', '/cdn')).toBe('http://localhost/cdn')
      expect(movininHelper.joinURL('http://localhost/', '/cdn')).toBe('http://localhost/cdn')
    })

    it('should throw when a part is missing', () => {
      const logSpy = jest.spyOn(console, 'log').mockImplementation(() => undefined)

      expect(() => movininHelper.joinURL(undefined, 'cdn')).toThrow('[joinURL] part undefined')
      expect(() => movininHelper.joinURL('http://localhost', undefined)).toThrow('[joinURL] part undefined')
      expect(() => movininHelper.joinURL('', 'cdn')).toThrow('[joinURL] part undefined')

      logSpy.mockRestore()
    })
  })

  describe('isInteger, isYear and isCvv', () => {
    it('isInteger should only accept strings of digits', () => {
      expect(movininHelper.isInteger('0')).toBe(true)
      expect(movininHelper.isInteger('123')).toBe(true)
      expect(movininHelper.isInteger('')).toBe(false)
      expect(movininHelper.isInteger('12.5')).toBe(false)
      expect(movininHelper.isInteger('-1')).toBe(false)
      expect(movininHelper.isInteger('1 2')).toBe(false)
      expect(movininHelper.isInteger('abc')).toBe(false)
    })

    it('isYear should only accept two digits', () => {
      expect(movininHelper.isYear('26')).toBe(true)
      expect(movininHelper.isYear('00')).toBe(true)
      expect(movininHelper.isYear('6')).toBe(false)
      expect(movininHelper.isYear('2026')).toBe(false)
      expect(movininHelper.isYear('ab')).toBe(false)
    })

    it('isCvv should only accept three or four digits', () => {
      expect(movininHelper.isCvv('123')).toBe(true)
      expect(movininHelper.isCvv('1234')).toBe(true)
      expect(movininHelper.isCvv('12')).toBe(false)
      expect(movininHelper.isCvv('12345')).toBe(false)
      expect(movininHelper.isCvv('12a')).toBe(false)
    })
  })

  describe('arrayEqual', () => {
    it('should return true for the same reference and for equal arrays', () => {
      const a = [1, 2, 3]
      expect(movininHelper.arrayEqual(a, a)).toBe(true)
      expect(movininHelper.arrayEqual([1, 2, 3], [1, 2, 3])).toBe(true)
      expect(movininHelper.arrayEqual([], [])).toBe(true)
    })

    it('should return false when order, length or content differ', () => {
      expect(movininHelper.arrayEqual([1, 2, 3], [3, 2, 1])).toBe(false)
      expect(movininHelper.arrayEqual([1, 2], [1, 2, 3])).toBe(false)
      expect(movininHelper.arrayEqual(['a'], ['b'])).toBe(false)
    })

    it('should handle null and undefined', () => {
      expect(movininHelper.arrayEqual(null, null)).toBe(true)
      expect(movininHelper.arrayEqual(null, [])).toBe(false)
      expect(movininHelper.arrayEqual([], undefined)).toBe(false)
    })
  })

  describe('clone and cloneArray', () => {
    it('clone should make a shallow copy of an object', () => {
      const obj = { a: 1, b: 'x' }
      const copy = movininHelper.clone(obj)
      expect(copy).toEqual(obj)
      expect(copy).not.toBe(obj)

      copy.a = 2
      expect(obj.a).toBe(1)
    })

    it('clone should make a shallow copy of an array', () => {
      const arr = [1, 2, 3]
      const copy = movininHelper.clone(arr)
      expect(copy).toEqual(arr)
      expect(copy).not.toBe(arr)
    })

    it('cloneArray should copy arrays and keep undefined and null', () => {
      const arr = ['a', 'b']
      const copy = movininHelper.cloneArray(arr)
      expect(copy).toEqual(arr)
      expect(copy).not.toBe(arr)
      expect(movininHelper.cloneArray(undefined as unknown as string[])).toBeUndefined()
      expect(movininHelper.cloneArray(null as unknown as string[])).toBeNull()
    })
  })

  describe('filterEqual', () => {
    const from = new Date('2026-06-01T12:00:00.000Z')
    const to = new Date('2026-06-05T12:00:00.000Z')

    it('should return true for the same reference and for two missing filters', () => {
      const filter: movininTypes.Filter = { from, to, keyword: 'villa' }
      expect(movininHelper.filterEqual(filter, filter)).toBe(true)
      expect(movininHelper.filterEqual(null, null)).toBe(true)
      expect(movininHelper.filterEqual(undefined, undefined)).toBe(true)
    })

    it('should return false when only one of the filters is missing', () => {
      const filter: movininTypes.Filter = { from, to, keyword: 'villa' }
      expect(movininHelper.filterEqual(filter, null)).toBe(false)
      expect(movininHelper.filterEqual(undefined, filter)).toBe(false)
      expect(movininHelper.filterEqual(null, undefined)).toBe(false)
    })

    it('should return true when from, to and keyword are equal', () => {
      expect(movininHelper.filterEqual({ from, to, keyword: 'villa' }, { from, to, keyword: 'villa' })).toBe(true)
      expect(movininHelper.filterEqual({}, {})).toBe(true)
    })

    it('should return false when from, to or keyword differ', () => {
      const other = new Date('2026-07-01T12:00:00.000Z')
      expect(movininHelper.filterEqual({ from, to, keyword: 'villa' }, { from: other, to, keyword: 'villa' })).toBe(false)
      expect(movininHelper.filterEqual({ from, to, keyword: 'villa' }, { from, to: other, keyword: 'villa' })).toBe(false)
      expect(movininHelper.filterEqual({ from, to, keyword: 'villa' }, { from, to, keyword: 'house' })).toBe(false)
    })
  })

  describe('flattenAgencies', () => {
    it('should return the ids of the agencies and an empty string when the id is missing', () => {
      const agencies = [{ _id: 'a' }, { _id: 'b' }, {}] as movininTypes.User[]
      expect(movininHelper.flattenAgencies(agencies)).toEqual(['a', 'b', ''])
      expect(movininHelper.flattenAgencies([])).toEqual([])
    })
  })

  describe('days and totalDays', () => {
    const from = new Date('2026-06-01T12:00:00.000Z')

    it('should return the number of days between two dates', () => {
      expect(movininHelper.days(from, new Date('2026-06-05T12:00:00.000Z'))).toBe(4)
      expect(movininHelper.totalDays(from, new Date('2026-06-05T12:00:00.000Z'))).toBe(4)
    })

    it('should return 0 for the same date and for missing dates', () => {
      expect(movininHelper.days(from, new Date(from))).toBe(0)
      expect(movininHelper.days(undefined, from)).toBe(0)
      expect(movininHelper.days(from, undefined)).toBe(0)
      expect(movininHelper.days()).toBe(0)
    })
  })

  describe('fr and isFrench', () => {
    it('fr should detect French users', () => {
      expect(movininHelper.fr({ language: 'fr' } as movininTypes.User)).toBe(true)
      expect(movininHelper.fr({ language: 'en' } as movininTypes.User)).toBe(false)
      expect(movininHelper.fr(undefined)).toBe(false)
    })

    it('isFrench should detect the French language code', () => {
      expect(movininHelper.isFrench('fr')).toBe(true)
      expect(movininHelper.isFrench('en')).toBe(false)
      expect(movininHelper.isFrench(undefined)).toBe(false)
    })
  })

  describe('extraToNumber and extraToString', () => {
    it('should convert an empty string to -1 and back', () => {
      expect(movininHelper.extraToNumber('')).toBe(-1)
      expect(movininHelper.extraToString(-1)).toBe('')
    })

    it('should convert numeric values both ways, including 0', () => {
      expect(movininHelper.extraToNumber('10')).toBe(10)
      expect(movininHelper.extraToNumber('0')).toBe(0)
      expect(movininHelper.extraToString(10)).toBe('10')
      expect(movininHelper.extraToString(0)).toBe('0')
    })
  })

  describe('trimCarriageReturn', () => {
    it('should remove line breaks', () => {
      expect(movininHelper.trimCarriageReturn('a\r\nb\nc\r')).toBe('abc')
      expect(movininHelper.trimCarriageReturn('no breaks')).toBe('no breaks')
    })
  })

  describe('daysInMonth and daysInYear', () => {
    it('daysInMonth should take a 1-based month number', () => {
      expect(movininHelper.daysInMonth(1, 2026)).toBe(31) // January
      expect(movininHelper.daysInMonth(2, 2026)).toBe(28) // February
      expect(movininHelper.daysInMonth(4, 2026)).toBe(30) // April
      expect(movininHelper.daysInMonth(12, 2026)).toBe(31) // December
    })

    it('daysInMonth should handle leap years', () => {
      expect(movininHelper.daysInMonth(2, 2028)).toBe(29)
      expect(movininHelper.daysInMonth(2, 2100)).toBe(28)
      expect(movininHelper.daysInMonth(2, 2000)).toBe(29)
    })

    it('daysInYear should handle leap years', () => {
      expect(movininHelper.daysInYear(2026)).toBe(365)
      expect(movininHelper.daysInYear(2028)).toBe(366)
      expect(movininHelper.daysInYear(1900)).toBe(365)
      expect(movininHelper.daysInYear(2000)).toBe(366)
      expect(movininHelper.daysInYear(2100)).toBe(365)
    })
  })

  describe('getAllPropertyTypes and getAllRentalTerms', () => {
    it('should return every property type', () => {
      const types = movininHelper.getAllPropertyTypes()
      expect(types.length).toBe(Object.values(movininTypes.PropertyType).length)
      Object.values(movininTypes.PropertyType).forEach((type) => {
        expect(types.includes(type)).toBe(true)
      })
    })

    it('should return every rental term', () => {
      const terms = movininHelper.getAllRentalTerms()
      expect(terms.length).toBe(Object.values(movininTypes.RentalTerm).length)
      Object.values(movininTypes.RentalTerm).forEach((term) => {
        expect(terms.includes(term)).toBe(true)
      })
    })
  })

  describe('currencies', () => {
    afterEach(() => {
      jest.restoreAllMocks()
    })

    it('checkCurrency should accept supported currencies only', () => {
      expect(movininHelper.checkCurrency('USD')).toBe(true)
      expect(movininHelper.checkCurrency('AED')).toBe(true)
      expect(movininHelper.checkCurrency('XXX')).toBe(false)
      expect(movininHelper.checkCurrency('')).toBe(false)
    })

    it('currencyRTL should be true for symbols displayed before the amount', () => {
      expect(movininHelper.currencyRTL('$')).toBe(true)
      expect(movininHelper.currencyRTL('£')).toBe(true)
      expect(movininHelper.currencyRTL('€')).toBe(false)
      expect(movininHelper.currencyRTL('MAD')).toBe(false)
    })

    it('formatPrice should place the currency before or after the amount', () => {
      expect(movininHelper.formatPrice(1234.5, '$', 'en')).toBe('$1,234.50')
      expect(movininHelper.formatPrice(1234.5, '€', 'fr')).toBe('1 234.50 €')
      expect(movininHelper.formatPrice(1000, 'MAD', 'en')).toBe('1,000 MAD')
    })

    it('convertPrice should return the amount when both currencies are the same', async () => {
      expect(await movininHelper.convertPrice(100, 'USD', 'USD')).toBe(100)
    })

    it('convertPrice should convert between different currencies and round to two decimals', async () => {
      const convertSpy = jest.spyOn(CurrencyConverter.prototype, 'convert').mockResolvedValue(92.3456)

      expect(await movininHelper.convertPrice(100, 'USD', 'EUR')).toBe(92.35)
      expect(convertSpy).toHaveBeenCalledTimes(1)
    })

    it('convertPrice should reject unsupported currencies', async () => {
      await expect(movininHelper.convertPrice(100, 'XXX', 'USD')).rejects.toThrow('Currency XXX not supported')
      await expect(movininHelper.convertPrice(100, 'USD', 'XXX')).rejects.toThrow('Currency XXX not supported')
    })
  })

  describe('truncateString', () => {
    it('should not change strings that fit', () => {
      expect(movininHelper.truncateString('hello', 10)).toBe('hello')
      expect(movininHelper.truncateString('abc', 3)).toBe('abc')
    })

    it('should add an ellipsis when maxLength is at least 6', () => {
      expect(movininHelper.truncateString('abcdefghij', 8)).toBe('abcde...')
      expect(movininHelper.truncateString('abcdefghij', 6)).toBe('abc...')
    })

    it('should simply cut the string when maxLength is below 6', () => {
      expect(movininHelper.truncateString('abcdefghij', 5)).toBe('abcde')
      expect(movininHelper.truncateString('abcdefghij', 2)).toBe('ab')
    })
  })
})