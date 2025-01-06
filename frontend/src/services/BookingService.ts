import * as movininTypes from ':movinin-types'
import axiosInstance from './axiosInstance'
import * as UserService from './UserService'

/**
 * Complete the checkout process and create the booking.
 *
 * @param {movininTypes.CheckoutPayload} data
 * @returns {Promise<number>}
 */
export const checkout = (data: movininTypes.CheckoutPayload): Promise<{ status: number, bookingId: string }> =>
  axiosInstance
    .post(
      '/api/checkout',
      data
    )
    .then((res) => ({ status: res.status, bookingId: res.data.bookingId }))
/**
 * Get bookings.
 *
 * @param {movininTypes.GetBookingsPayload} payload
 * @param {number} page
 * @param {number} size
 * @returns {Promise<movininTypes.Result<movininTypes.Booking>>}
 */
export const getBookings = (payload: movininTypes.GetBookingsPayload, page: number, size: number): Promise<movininTypes.Result<movininTypes.Booking>> =>
  axiosInstance
    .post(
      `/api/bookings/${page}/${size}/${UserService.getLanguage()}`,
      payload,
      { withCredentials: true }
    )
    .then((res) => res.data)

/**
 * Get a Booking by ID.
 *
 * @param {string} id
 * @returns {Promise<movininTypes.Booking>}
 */
export const getBooking = (id: string): Promise<movininTypes.Booking> =>
  axiosInstance
    .get(
      `/api/booking/${encodeURIComponent(id)}/${UserService.getLanguage()}`,
      { withCredentials: true }
    )
    .then((res) => res.data)

/**
 * Cancel a Booking.
 *
 * @param {string} id
 * @returns {Promise<number>}
 */
export const cancel = (id: string): Promise<number> =>
  axiosInstance
    .post(
      `/api/cancel-booking/${encodeURIComponent(id)}`,
      null,
      { withCredentials: true }
    ).then((res) => res.status)

/**
* Delete temporary Booking created from checkout session.
*
* @param {string} bookingId
* @param {string} sessionId
* @returns {Promise<number>}
*/
export const deleteTempBooking = (bookingId: string, sessionId: string): Promise<number> =>
  axiosInstance
    .delete(
      `/api/delete-temp-booking/${bookingId}/${sessionId}`,
    ).then((res) => res.status)

/**
* Get a Booking by sessionId.
*
* @param {string} id
* @returns {Promise<ohmjetTypes.Booking>}
*/
export const getBookingId = (sessionId: string): Promise<string> =>
  axiosInstance
    .get(
      `/api/booking-id/${encodeURIComponent(sessionId)}`,
      { withCredentials: true }
    )
    .then((res) => res.data)
