import axiosInstance from './axiosInstance'
import * as axiosHelper from '@/common/axiosHelper'
import * as movininTypes from ':movinin-types'

axiosHelper.init(axiosInstance)

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
