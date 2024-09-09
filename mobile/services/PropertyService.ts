import axiosInstance from './axiosInstance'
import * as UserService from './UserService'
import * as axiosHelper from '@/common/axiosHelper'
import * as movininTypes from ':movinin-types'

axiosHelper.init(axiosInstance)

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
  axiosInstance
    .post(
      `/api/frontend-properties/${page}/${size}`,
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
  return axiosInstance
    .get(
      `/api/property/${encodeURIComponent(id)}/${language}`
    )
    .then((res) => res.data)
}
