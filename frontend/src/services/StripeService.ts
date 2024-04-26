import * as movininTypes from ':movinin-types'
import axiosInstance from './axiosInstance'

/**
 * Create Payment Intent
 *
 * @param {movininTypes.CreatePaymentIntentPayload} payload
 * @returns {Promise<movininTypes.CreatePaymentIntentResult>}
 */
export const createPaymentIntent = (payload: movininTypes.CreatePaymentIntentPayload): Promise<movininTypes.PaymentIntentResult> =>
  axiosInstance
    .post(
      '/api/create-payment-intent',
      payload
    )
    .then((res) => res.data)
