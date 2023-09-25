import axios from 'axios'
import Env from '../config/env.config'
import * as UserService from './UserService'
import * as movininTypes from 'movinin-types'

/**
 * Validate a Location name.
 *
 * @param {movininTypes.ValidateLocationPayload} data
 * @returns {Promise<number>}
 */
export const validate = (data: movininTypes.ValidateLocationPayload): Promise<number> =>
  axios
    .post(`${Env.API_HOST}/api/validate-location`,
      data,
      { headers: UserService.authHeader() }
    )
    .then((res) => res.status)

/**
 * Create a Location.
 *
 * @param {movininTypes.LocationName[]} data
 * @returns {Promise<number>}
 */
export const create = (data: movininTypes.LocationName[]): Promise<number> =>
  axios
    .post(`${Env.API_HOST}/api/create-location`,
      data,
      { headers: UserService.authHeader() }
    )
    .then((res) => res.status)

/**
 * Update a Location.
 *
 * @param {string} id
 * @param {movininTypes.LocationName[]} data
 * @returns {Promise<number>}
 */
export const update = (id: string, data: movininTypes.LocationName[]): Promise<number> =>
  axios
    .put(`${Env.API_HOST}/api/update-location/${id}`,
      data,
      { headers: UserService.authHeader() }
    )
    .then((res) => res.status)

/**
 * Delete a Location.
 *
 * @param {string} id
 * @returns {Promise<number>}
 */
export const deleteLocation = (id: string): Promise<number> =>
  axios
    .delete(`${Env.API_HOST}/api/delete-location/${encodeURIComponent(id)}`,
      { headers: UserService.authHeader() }
    )
    .then((res) => res.status)

/**
 * Get a Location by ID.
 *
 * @param {string} id
 * @returns {Promise<movininTypes.Location>}
 */
export const getLocation = (id: string): Promise<movininTypes.Location> =>
  axios
    .get(
      `${Env.API_HOST}/api/location/${encodeURIComponent(id)}/${UserService.getLanguage()}`,
      { headers: UserService.authHeader() }
    )
    .then((res) => res.data)

/**
 * Get Locations.
 *
 * @param {string} keyword
 * @param {number} page
 * @param {number} size
 * @returns {Promise<movininTypes.Result<movininTypes.Location>>}
 */
export const getLocations = (keyword: string, page: number, size: number): Promise<movininTypes.Result<movininTypes.Location>> =>
  axios
    .get(
      `${Env.API_HOST}/api/locations/${page}/${size}/${UserService.getLanguage()}/?s=${encodeURIComponent(keyword)}`,
      { headers: UserService.authHeader() }
    )
    .then((res) => res.data)

/**
 * Check if a location is related to a Property.
 *
 * @param {string} id
 * @returns {Promise<number>}
 */
export const check = (id: string): Promise<number> =>
  axios
    .get(
      `${Env.API_HOST}/api/check-location/${encodeURIComponent(id)}`,
      { headers: UserService.authHeader() }
    )
    .then((res) => res.status)
