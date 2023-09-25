import axios from 'axios'
import * as Env from '../config/env.config'
import * as UserService from './UserService'
import * as AxiosHelper from '../common/AxiosHelper'
import * as movininTypes from '../miscellaneous/movininTypes'

AxiosHelper.init(axios)

/**
 * Get Properties.
 *
 * @async
 * @param {movininTypes.GetPropertiesPayload} data
 * @param {number} page
 * @param {number} size
 * @returns {Promise<movininTypes.Result<movininTypes.Property>>}
 */
export const getProperties = async (data: movininTypes.GetPropertiesPayload, page: number, size: number): Promise<movininTypes.Result<movininTypes.Property>> =>
  axios
    .post(
      `${Env.API_HOST}/api/frontend-properties/${page}/${size}}`,
      data
    )
    .then((res) => res.data)

/**
 * Get a Property by ID.
 *
 * @async
 * @param {string} id
 * @returns {Promise<movininTypes.Property>}
 */
export const getProperty = async (id: string): Promise<movininTypes.Property> => {
  const language = await UserService.getLanguage()
  return axios
    .get(
      `${Env.API_HOST}/api/property/${encodeURIComponent(id)}/${language}`
    )
    .then((res) => res.data)
}
