import * as movininTypes from ':movinin-types'
import axiosInstance from './axiosInstance'

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
