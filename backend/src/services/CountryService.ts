import * as movininTypes from ':movinin-types'
import axiosInstance from './axiosInstance'
import * as UserService from './UserService'

/**
 * Validate a Country name.
 *
 * @param {movininTypes.ValidateCountryPayload} data
 * @returns {Promise<number>}
 */
export const validate = (data: movininTypes.ValidateCountryPayload): Promise<number> =>
  axiosInstance
    .post(
      '/api/validate-country',
      data,
      { withCredentials: true }
    )
    .then((res) => res.status)

/**
 * Create a Country.
 *
 * @param {movininTypes.CountryName[]} data
 * @returns {Promise<number>}
 */
export const create = (data: movininTypes.CountryName[]): Promise<number> =>
  axiosInstance
    .post(
      '/api/create-country',
      data,
      { withCredentials: true }
    )
    .then((res) => res.status)

/**
 * Update a Country.
 *
 * @param {string} id
 * @param {movininTypes.CountryName[]} data
 * @returns {Promise<number>}
 */
export const update = (id: string, data: movininTypes.CountryName[]): Promise<number> =>
  axiosInstance
    .put(
      `/api/update-country/${id}`,
      data,
      { withCredentials: true }
    )
    .then((res) => res.status)

/**
 * Delete a Country.
 *
 * @param {string} id
 * @returns {Promise<number>}
 */
export const deleteCountry = (id: string): Promise<number> =>
  axiosInstance
    .delete(
      `/api/delete-country/${encodeURIComponent(id)}`,
      { withCredentials: true }
    )
    .then((res) => res.status)

/**
 * Get a Country by ID.
 *
 * @param {string} id
 * @returns {Promise<movininTypes.Country>}
 */
export const getCountry = (id: string): Promise<movininTypes.Country> =>
  axiosInstance
    .get(
      `/api/country/${encodeURIComponent(id)}/${UserService.getLanguage()}`,
      { withCredentials: true }
    )
    .then((res) => res.data)

/**
 * Get Countries.
 *
 * @param {string} keyword
 * @param {number} page
 * @param {number} size
 * @returns {Promise<movininTypes.Result<movininTypes.Country>>}
 */
export const getCountries = (keyword: string, page: number, size: number): Promise<movininTypes.Result<movininTypes.Country>> =>
  axiosInstance
    .get(
      `/api/countries/${page}/${size}/${UserService.getLanguage()}/?s=${encodeURIComponent(keyword)}`,
      { withCredentials: true }
    )
    .then((res) => res.data)

/**
 * Check if a Country is related to a Car.
 *
 * @param {string} id
 * @returns {Promise<number>}
 */
export const check = (id: string): Promise<number> =>
  axiosInstance
    .get(
      `/api/check-country/${encodeURIComponent(id)}`,
      { withCredentials: true }
    )
    .then((res) => res.status)
