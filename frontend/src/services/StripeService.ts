import * as movininTypes from ':movinin-types'
import * as movininHelper from ':movinin-helper'
import env from '@/config/env.config'
import axiosInstance from './axiosInstance'

/**
 * Create Checkout Session.
 *
 * @param {movininTypes.CreatePaymentPayload} payload
 * @returns {Promise<movininTypes.PaymentResult>}
 */
export const createCheckoutSession = (payload: movininTypes.CreatePaymentPayload): Promise<movininTypes.PaymentResult> =>
  axiosInstance
    .post(
      '/api/create-checkout-session',
      payload
    )
    .then((res) => res.data)

/**
 * Check Checkout Session.
 *
 * @param {string} sessionId
 * @returns {Promise<number>}
 */
export const checkCheckoutSession = (sessionId: string): Promise<number> =>
  axiosInstance
    .post(
      `/api/check-checkout-session/${sessionId}`,
      null
    )
    .then((res) => res.status)

/**
 * Create Payment Intent
 *
 * @param {movininTypes.CreatePaymentPayload} payload
 * @returns {Promise<movininTypes.CreatePaymentResult>}
 */
export const createPaymentIntent = (payload: movininTypes.CreatePaymentPayload): Promise<movininTypes.PaymentResult> =>
  axiosInstance
    .post(
      '/api/create-payment-intent',
      payload
    )
    .then((res) => res.data)

    /**
* Set currency.
*
* @param {string} currency
*/
export const setCurrency = (currency: string) => {
  if (currency && movininHelper.checkCurrency(currency.toUpperCase())) {
    localStorage.setItem('mi-fe-currency', currency.toUpperCase())
  }
}

/**
 * Get currency.
 *
 * @returns {string}
 */
export const getCurrency = () => {
  const currency = localStorage.getItem('mi-fe-currency')
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
