import * as movininTypes from ':movinin-types'
import axiosInstance from './axiosInstance'
import * as UserService from './UserService'

/**
 * Get locations.
 *
 * @param {string} keyword
 * @param {number} page
 * @param {number} size
 * @returns {Promise<movininTypes.Result<movininTypes.Location>>}
 */
export const getLocations = (keyword: string, page: number, size: number): Promise<movininTypes.Result<movininTypes.Location>> =>
  axiosInstance
    .get(
      `/api/locations/${page}/${size}/${UserService.getLanguage()}/?s=${encodeURIComponent(keyword)}`
    )
    .then((res) => res.data)

/**
 * Get locations with position.
 *
 * @returns {Promise<movininTypes.Result<movininTypes.Location>>}
 */
export const getLocationsWithPosition = (): Promise<movininTypes.Location[]> =>
  axiosInstance
    .get(
      `/api/locations-with-position/${UserService.getLanguage()}`
    )
    .then((res) => res.data)

/**
 * Get a Location by ID.
 *
 * @param {string} id
 * @returns {Promise<movininTypes.Location>}
 */
export const getLocation = (id: string): Promise<movininTypes.Location> =>
  axiosInstance
    .get(
      `/api/location/${encodeURIComponent(id)}/${UserService.getLanguage()}`
    )
    .then((res) => res.data)

/**
 * Get Loaction ID by name (en).
 *
 * @param {string} name
 * @param {string} language
 * @returns {Promise<{ status: number, data: string }>}
 */
export const getLocationId = (name: string, language: string): Promise<{ status: number, data: string }> =>
  axiosInstance
    .get(
      `/api/location-id/${encodeURIComponent(name)}/${language}`
    )
    .then((res) => ({ status: res.status, data: res.data }))
