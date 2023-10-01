import axios from 'axios'
import * as movininTypes from 'movinin-types'
import Env from '../config/env.config'
import * as UserService from './UserService'

/**
 * Create a Booking.
 *
 * @param {movininTypes.Booking} data
 * @returns {Promise<movininTypes.Booking>}
 */
export const create = (data: movininTypes.Booking): Promise<movininTypes.Booking> =>
  axios
    .post(
      `${Env.API_HOST}/api/create-booking`,
      data,
      { headers: UserService.authHeader() }
    )
    .then((res) => res.data)

/**
 * Update a Booking.
 *
 * @param {movininTypes.Booking} data
 * @returns {Promise<number>}
 */
export const update = (data: movininTypes.Booking): Promise<number> =>
  axios
    .put(
      `${Env.API_HOST}/api/update-booking`,
      data,
      { headers: UserService.authHeader() }
    )
    .then((res) => res.status)

/**
 * Update a Booking status.
 *
 * @param {movininTypes.UpdateStatusPayload} data
 * @returns {Promise<number>}
 */
export const updateStatus = (data: movininTypes.UpdateStatusPayload): Promise<number> =>
  axios
    .post(
      `${Env.API_HOST}/api/update-booking-status`,
      data,
      { headers: UserService.authHeader() }
    )
    .then((res) => res.status)

/**
 * Delete Bookings.
 *
 * @param {string[]} ids
 * @returns {Promise<number>}
 */
export const deleteBookings = (ids: string[]): Promise<number> =>
  axios
    .post(
      `${Env.API_HOST}/api/delete-bookings`,
      ids,
      { headers: UserService.authHeader() }
    )
    .then((res) => res.status)

/**
 * Get a Booking by ID.
 *
 * @param {string} id
 * @returns {Promise<movininTypes.Booking>}
 */
export const getBooking = (id: string): Promise<movininTypes.Booking> =>
  axios
    .get(
      `${Env.API_HOST}/api/booking/${encodeURIComponent(id)}/${UserService.getLanguage()}`,
      { headers: UserService.authHeader() }
    )
    .then((res) => res.data)

/**
 * Get Bookings.
 *
 * @param {movininTypes.GetBookingsPayload} payload
 * @param {number} page
 * @param {number} size
 * @returns {Promise<movininTypes.Result<movininTypes.Booking>>}
 */
export const getBookings = (payload: movininTypes.GetBookingsPayload, page: number, size: number): Promise<movininTypes.Result<movininTypes.Booking>> =>
  axios
    .post(
      `${Env.API_HOST}/api/bookings/${page}/${size}/${UserService.getLanguage()}`,
      payload,
      { headers: UserService.authHeader() }
    )
    .then((res) => res.data)
