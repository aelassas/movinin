import axiosInstance from './axiosInstance'
import * as AxiosHelper from '../common/AxiosHelper'
import * as movininTypes from '../miscellaneous/movininTypes'

AxiosHelper.init(axiosInstance)

/**
 * Get all agencies.
 *
 * @returns {Promise<movininTypes.User[]>}
 */
export const getAllAgencies = (): Promise<movininTypes.User[]> =>
  axiosInstance
    .get(
      '/api/all-agencies'
    )
    .then((res) => res.data)
