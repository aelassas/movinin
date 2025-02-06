import * as movininTypes from ':movinin-types'
import * as movininHelper from ':movinin-helper'
import axiosInstance from './axiosInstance'
import * as env from '@/config/env.config'
import * as AsyncStorage from '@/common/AsyncStorage'

/**
 * Order item name max length 250 characters
 * https://docs.stripe.com/upgrades
 *
 * @type {250}
 */
export const ORDER_NAME_MAX_LENGTH = 250

/**
 * Order item description max length 500 characters
 * https://docs.stripe.com/api/metadata
 *
 * @type {500}
 */
export const ORDER_DESCRIPTION_MAX_LENGTH = 500

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
export const setCurrency = async (currency: string) => {
  if (currency && movininHelper.checkCurrency(currency.toUpperCase())) {
    await AsyncStorage.storeString('bc-currency', currency.toUpperCase())
  }
}

/**
 * Get currency.
 *
 * @returns {string}
 */
export const getCurrency = async () => {
  const currency = await AsyncStorage.getString('bc-currency')
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
export const getCurrencySymbol = async () => {
  const currency = await getCurrency()
  const currencySymbol = env.CURRENCIES.find((c) => c.code === currency)?.symbol || '$'
  return currencySymbol
}

/**
 * Convert a price to a given currency.
 *
 * @async
 * @param {number} amount
 * @param {string} to
 * @returns {Promise<number>}
 */
export const convertPrice = async (amount: number) => {
  const to = await getCurrency()

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
export const currencyRTL = async () => {
  const currencySymbol = await getCurrencySymbol()
  const isRTL = movininHelper.currencyRTL(currencySymbol)
  return isRTL
}
