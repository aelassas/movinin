import * as movininTypes from ':movinin-types'
import axiosInstance from './axiosInstance'

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
