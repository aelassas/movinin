import * as movininTypes from 'movinin-types'
import axiosInstance from './axiosInstance'
import * as UserService from './UserService'

/**
 * Validate a Location name.
 *
 * @param {movininTypes.ValidateLocationPayload} data
 * @returns {Promise<number>}
 */
export const validate = (data: movininTypes.ValidateLocationPayload): Promise<number> =>
  axiosInstance
    .post(
'/api/validate-location',
      data,
      { withCredentials: true }
    )
    .then((res) => res.status)

/**
 * Create a Location.
 *
 * @param {movininTypes.LocationName[]} data
 * @returns {Promise<number>}
 */
export const create = (data: movininTypes.LocationName[]): Promise<number> =>
  axiosInstance
    .post(
'/api/create-location',
      data,
      { withCredentials: true }
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
  axiosInstance
    .put(
`/api/update-location/${id}`,
      data,
      { withCredentials: true }
    )
    .then((res) => res.status)

/**
 * Delete a Location.
 *
 * @param {string} id
 * @returns {Promise<number>}
 */
export const deleteLocation = (id: string): Promise<number> =>
  axiosInstance
    .delete(
`/api/delete-location/${encodeURIComponent(id)}`,
      { withCredentials: true }
    )
    .then((res) => res.status)

/**
 * Get a Location by ID.
 *
 * @param {string} id
 * @returns {Promise<movininTypes.Location>}
 */
export const getLocation = (id: string): Promise<movininTypes.Location> =>
  axiosInstance
    .get(
      `/api/location/${encodeURIComponent(id)}/${UserService.getLanguage()}`,
      { withCredentials: true }
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
  axiosInstance
    .get(
      `/api/locations/${page}/${size}/${UserService.getLanguage()}/?s=${encodeURIComponent(keyword)}`,
      { withCredentials: true }
    )
    .then((res) => res.data)

/**
 * Check if a location is related to a Property.
 *
 * @param {string} id
 * @returns {Promise<number>}
 */
export const check = (id: string): Promise<number> =>
  axiosInstance
    .get(
      `/api/check-location/${encodeURIComponent(id)}`,
      { withCredentials: true }
    )
    .then((res) => res.status)
