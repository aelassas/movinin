import axios from 'axios'
import * as Env from '../config/env.config'
import * as UserService from './UserService'
import * as AxiosHelper from '../common/AxiosHelper'
import * as movininTypes from  '../miscellaneous/movininTypes'

AxiosHelper.init(axios)

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
  return axios
    .get(
      `${Env.API_HOST}/api/locations/${page}/${size}/${language}/?s=${encodeURIComponent(keyword)}`
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
  return axios
    .get(
      `${Env.API_HOST}/api/location/${encodeURIComponent(id)}/${language}`
    )
    .then((res) => res.data)
}
