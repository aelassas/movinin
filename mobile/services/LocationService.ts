import axiosInstance from './axiosInstance'
import * as UserService from './UserService'
import * as axiosHelper from '@/common/axiosHelper'
import * as movininTypes from ':movinin-types'

axiosHelper.init(axiosInstance)

/**
 * Get locations.
 *
 * @async
 * @param {string} keyword
 * @param {number} page
 * @param {number} size
 * @returns {Promise<movininTypes.Result<movininTypes.Location>>}
 */
export const getLocations = async (keyword: string, page: number, size: number): Promise<movininTypes.Result<movininTypes.Location>> => {
  const language = await UserService.getLanguage()
  return axiosInstance
    .get(
      `/api/locations/${page}/${size}/${language}/?s=${encodeURIComponent(keyword)}`
    )
    .then((res) => res.data)
}

/**
 * Get a location.
 *
 * @async
 * @param {string} id
 * @returns {Promise<movininTypes.Location>}
 */
export const getLocation = async (id: string): Promise<movininTypes.Location> => {
  const language = await UserService.getLanguage()
  return axiosInstance
    .get(
      `/api/location/${encodeURIComponent(id)}/${language}`
    )
    .then((res) => res.data)
}
