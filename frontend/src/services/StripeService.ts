import * as movininTypes from ':movinin-types'
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
