import * as movininHelper from ':movinin-helper'
import env from '@/config/env.config'

/**
* Set currency.
*
* @param {string} currency
*/
export const setCurrency = (currency: string) => {
  if (currency && movininHelper.checkCurrency(currency.toUpperCase())) {
    localStorage.setItem('bc-fe-currency', currency.toUpperCase())
  }
}

/**
 * Get currency.
 *
 * @returns {string}
 */
export const getCurrency = () => {
  const currency = localStorage.getItem('bc-fe-currency')
  if (currency && movininHelper.checkCurrency(currency.toUpperCase())) {
    return currency.toUpperCase()
  }
  return env.BASE_CURRENCY
}

/**
 * Return currency symbol.
 *
 * @param {string} code
 * @returns {string|undefined}
 */
export const getCurrencySymbol = () => env.CURRENCIES.find((c) => c.code === getCurrency())?.symbol || '$'

/**
 * Convert a price to a given currency.
 *
 * @async
 * @param {number} amount
 * @param {string} to
 * @returns {Promise<number>}
 */
export const convertPrice = async (amount: number) => {
  const to = getCurrency()

  if (to !== env.BASE_CURRENCY) {
    const res = await movininHelper.convertPrice(amount, env.BASE_CURRENCY, to)
    return res
  }

  return amount
}

/**
 * Check if currency is written from right to left.
 *
 * @returns {*}
 */
export const currencyRTL = () => {
  const currencySymbol = getCurrencySymbol()
  const isRTL = movininHelper.currencyRTL(currencySymbol)
  return isRTL
}
