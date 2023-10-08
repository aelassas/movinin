import axios from 'axios'
import * as movininTypes from 'movinin-types'
import Env from '../config/env.config'
import * as UserService from './UserService'

/**
 * Get properties.
 *
 * @param {movininTypes.GetPropertiesPayload} data
 * @param {number} page
 * @param {number} size
 * @returns {Promise<movininTypes.Result<movininTypes.Property>>}
 */
export const getProperties = (data: movininTypes.GetPropertiesPayload, page: number, size: number): Promise<movininTypes.Result<movininTypes.Property>> =>
  axios
    .post(
      `${Env.API_HOST}/api/frontend-properties/${page}/${size}}`,
      data
    ).then((res) => res.data)

/**
 * Get a Property by ID.
 *
 * @param {string} id
 * @returns {Promise<movininTypes.Property>}
 */
export const getProperty = (id: string): Promise<movininTypes.Property> =>
  axios
    .get(
      `${Env.API_HOST}/api/property/${encodeURIComponent(id)}/${UserService.getLanguage()}`
    )
    .then((res) => res.data)

/**
 * Get properties by agency and location.
 *
 * @param {string} keyword
 * @param {movininTypes.GetBookingPropertiesPayload} data
 * @param {number} page
 * @param {number} size
 * @returns {Promise<movininTypes.Property[]>}
 */
export const getBookingProperties = (keyword: string, data: movininTypes.GetBookingPropertiesPayload, page: number, size: number): Promise<movininTypes.Property[]> =>
  axios
    .post(
      `${Env.API_HOST}/api/booking-properties/${page}/${size}/?s=${encodeURIComponent(keyword)}`,
      data,
      { withCredentials: true }
    )
    .then((res) => res.data)
