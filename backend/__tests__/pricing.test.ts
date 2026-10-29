import { jest } from '@jest/globals'
import * as movininTypes from ':movinin-types'
import * as movininHelper from ':movinin-helper'

describe('calculateTotalPrice', () => {
  afterEach(() => {
    jest.useRealTimers()
  })

  // ---------------------------------------------------------------------------
  // 1. Daily Rental Term
  // ---------------------------------------------------------------------------
  describe('RentalTerm.Daily', () => {
    it('should calculate price based on daily rate and duration', () => {
      const property = {
        price: 150,
        rentalTerm: movininTypes.RentalTerm.Daily,
        cancellation: 0,
      } as movininTypes.Property

      const from = new Date('2026-10-01T12:00:00.000Z')
      const to = new Date('2026-10-05T12:00:00.000Z') // 4 days

      expect(movininHelper.calculateTotalPrice(property, from, to)).toBe(600) // 150 * 4
    })

    it('should return 0 when stay duration is 0 days', () => {
      const property = {
        price: 200,
        rentalTerm: movininTypes.RentalTerm.Daily,
        cancellation: 0,
      } as movininTypes.Property

      const from = new Date('2026-10-01T12:00:00.000Z')
      const to = new Date('2026-10-01T12:00:00.000Z')

      expect(movininHelper.calculateTotalPrice(property, from, to)).toBe(0)
    })
  })

  // ---------------------------------------------------------------------------
  // 2. Weekly Rental Term
  // ---------------------------------------------------------------------------
  describe('RentalTerm.Weekly', () => {
    it('should calculate price proportionally for exact and partial weeks', () => {
      const property = {
        price: 700,
        rentalTerm: movininTypes.RentalTerm.Weekly,
        cancellation: 0,
      } as movininTypes.Property

      // Exact week (7 days)
      const from1 = new Date('2026-10-01T12:00:00.000Z')
      const to1 = new Date('2026-10-08T12:00:00.000Z')
      expect(movininHelper.calculateTotalPrice(property, from1, to1)).toBe(700) // (700 * 7) / 7

      // Partial week (10 days)
      const to2 = new Date('2026-10-11T12:00:00.000Z')
      expect(movininHelper.calculateTotalPrice(property, from1, to2)).toBe(1000) // (700 * 10) / 7
    })
  })

  // ---------------------------------------------------------------------------
  // 3. Monthly Rental Term (Divisor & Days-in-Month Validation)
  // ---------------------------------------------------------------------------
  describe('RentalTerm.Monthly', () => {
    it('should divide the monthly price by the number of days in the active system month', () => {
      const property = {
        price: 3100,
        rentalTerm: movininTypes.RentalTerm.Monthly,
        cancellation: 0,
      } as movininTypes.Property

      const from = new Date(2026, 1, 1)
      const to = new Date(2026, 1, 11) // 10 days

      // Standard February (2026): 28 days -> 3100 * 10 / 28 = 1107.14
      jest.useFakeTimers({ now: new Date(2026, 1, 15) })
      expect(movininHelper.calculateTotalPrice(property, from, to)).toBe(1107.14)

      // March (2026): 31 days -> 3100 * 10 / 31 = 1000.00
      jest.useFakeTimers({ now: new Date(2026, 2, 15) })
      expect(movininHelper.calculateTotalPrice(property, from, to)).toBe(1000)

      // April (2026): 30 days -> 3100 * 10 / 30 = 1033.33
      jest.useFakeTimers({ now: new Date(2026, 3, 15) })
      expect(movininHelper.calculateTotalPrice(property, from, to)).toBe(1033.33)
    })

    it('should accurately handle leap year February (29 days)', () => {
      const property = {
        price: 2900,
        rentalTerm: movininTypes.RentalTerm.Monthly,
        cancellation: 0,
      } as movininTypes.Property

      const from = new Date(2028, 1, 1)
      const to = new Date(2028, 1, 11) // 10 days

      // Leap Year February (2028): 29 days -> 2900 * 10 / 29 = 1000.00
      jest.useFakeTimers({ now: new Date(2028, 1, 15) })
      expect(movininHelper.calculateTotalPrice(property, from, to)).toBe(1000)
    })
  })

  // ---------------------------------------------------------------------------
  // 4. Yearly Rental Term (Leap vs Non-Leap Year Divisors)
  // ---------------------------------------------------------------------------
  describe('RentalTerm.Yearly', () => {
    it('should divide yearly price by 365 in standard years', () => {
      const property = {
        price: 36500,
        rentalTerm: movininTypes.RentalTerm.Yearly,
        cancellation: 0,
      } as movininTypes.Property

      const from = new Date(2026, 5, 1)
      const to = new Date(2026, 5, 11) // 10 days

      jest.useFakeTimers({ now: new Date(2026, 5, 1) }) // Standard year 2026
      expect(movininHelper.calculateTotalPrice(property, from, to)).toBe(1000) // (36500 * 10) / 365
    })

    it('should divide yearly price by 366 in leap years', () => {
      const property = {
        price: 36600,
        rentalTerm: movininTypes.RentalTerm.Yearly,
        cancellation: 0,
      } as movininTypes.Property

      const from = new Date(2028, 5, 1)
      const to = new Date(2028, 5, 11) // 10 days

      jest.useFakeTimers({ now: new Date(2028, 5, 1) }) // Leap year 2028
      expect(movininHelper.calculateTotalPrice(property, from, to)).toBe(1000) // (36600 * 10) / 366
    })
  })

  // ---------------------------------------------------------------------------
  // 5. Options & Add-ons (Cancellation Fees & Precision)
  // ---------------------------------------------------------------------------
  describe('Options & Cancellation Fee Handling', () => {
    it('should add cancellation fee when option is true and property.cancellation > 0', () => {
      const property = {
        price: 100,
        rentalTerm: movininTypes.RentalTerm.Daily,
        cancellation: 50,
      } as movininTypes.Property

      const from = new Date('2026-10-01T12:00:00.000Z')
      const to = new Date('2026-10-03T12:00:00.000Z') // 2 days -> 200

      // With cancellation option enabled
      expect(
        movininHelper.calculateTotalPrice(property, from, to, { cancellation: true }),
      ).toBe(250)

      // With cancellation option disabled
      expect(
        movininHelper.calculateTotalPrice(property, from, to, { cancellation: false }),
      ).toBe(200)
    })

    it('should ignore cancellation option if property.cancellation is 0', () => {
      const property = {
        price: 100,
        rentalTerm: movininTypes.RentalTerm.Daily,
        cancellation: 0,
      } as movininTypes.Property

      const from = new Date('2026-10-01T12:00:00.000Z')
      const to = new Date('2026-10-03T12:00:00.000Z') // 2 days

      expect(
        movininHelper.calculateTotalPrice(property, from, to, { cancellation: true }),
      ).toBe(200)
    })

    it('should format output correctly to two decimal places', () => {
      const property = {
        price: 100,
        rentalTerm: movininTypes.RentalTerm.Weekly,
        cancellation: 0,
      } as movininTypes.Property

      const from = new Date('2026-10-01T12:00:00.000Z')
      const to = new Date('2026-10-04T12:00:00.000Z') // 3 days -> (100 * 3) / 7 = 42.85714...

      expect(movininHelper.calculateTotalPrice(property, from, to)).toBe(42.86)
    })
  })
})
