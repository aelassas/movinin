import * as movininTypes from ':movinin-types'
import axiosInstance from './axiosInstance'
import * as UserService from './UserService'

/**
 * Get Countries.
 *
 * @param {string} keyword
 * @param {number} page
 * @param {number} size
 * @returns {Promise<movininTypes.Result<movininTypes.Country>>}
 */
export const getCountriesWithLocations = (keyword: string, imageRequired: boolean, minLocations: number): Promise<movininTypes.CountryInfo[]> =>
  axiosInstance
    .get(
      `/api/countries-with-locations/${UserService.getLanguage()}/${imageRequired}/${minLocations}/?s=${encodeURIComponent(keyword)}`
    )
    .then((res) => res.data)
