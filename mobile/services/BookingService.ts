import axiosInstance from './axiosInstance'
import * as UserService from './UserService'
import * as axiosHelper from '@/common/axiosHelper'
import * as movininTypes from ':movinin-types'

axiosHelper.init(axiosInstance)

/**
 * Complete the checkout process and create the booking.
 *
 * @param {movininTypes.CheckoutPayload} data
 * @returns {Promise<number>}
 */
export const checkout = (data: movininTypes.CheckoutPayload): Promise<number> =>
  axiosInstance
    .post(
      '/api/checkout',
      data
    )
    .then((res) => res.status)

/**
 * Get bookings.
 *
 * @async
 * @param {movininTypes.GetBookingsPayload} payload
 * @param {number} page
 * @param {number} size
 * @returns {Promise<movininTypes.Result<movininTypes.Booking>>}
 */
export const getBookings = async (payload: movininTypes.GetBookingsPayload, page: number, size: number): Promise<movininTypes.Result<movininTypes.Booking>> => {
  const headers = await UserService.authHeader()
  const language = await UserService.getLanguage()
  return axiosInstance
    .post(
      `/api/bookings/${page}/${size}/${language}`,
      payload,
      { headers }
    )
    .then((res) => res.data)
}

/**
 * Get a Booking by ID.
 *
 * @async
 * @param {string} id
 * @returns {Promise<movininTypes.Booking>}
 */
export const getBooking = async (id: string): Promise<movininTypes.Booking> => {
  const headers = await UserService.authHeader()
  const language = await UserService.getLanguage()
  return axiosInstance
    .get(
`/api/booking/${encodeURIComponent(id)}/${language}`,
      { headers }
    )
    .then((res) => res.data)
}

/**
 * Check whether a customer has bookings or not.
 *
 * @async
 * @param {string} renter
 * @returns {Promise<number>}
 */
export const hasBookings = async (renter: string): Promise<number> => {
  const headers = await UserService.authHeader()
  return axiosInstance
    .get(
      `/api/has-bookings/${encodeURIComponent(renter)}`,
      { headers }
    )
    .then((res) => res.status)
}

/**
 * Cancel a booking.
 *
 * @async
 * @param {string} id
 * @returns {Promise<number>}
 */
export const cancel = async (id: string): Promise<number> => {
  const headers = await UserService.authHeader()
  return axiosInstance
    .post(
      `/api/cancel-booking/${encodeURIComponent(id)}`,
      null,
      { headers }
    ).then((res) => res.status)
}
