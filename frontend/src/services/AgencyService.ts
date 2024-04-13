import * as movininTypes from ':movinin-types'
import axiosInstance from './axiosInstance'

/**
 * Get all agencies.
 *
 * @returns {Promise<movininTypes.User[]>}
 */
export const getAllAgencies = (): Promise<movininTypes.User[]> =>
  axiosInstance
    .get(
      '/api/all-agencies',
      { withCredentials: true }
)
    .then((res) => res.data)

/**
 * Get agencies.
 *
 * @param {string} keyword
 * @param {number} page
 * @param {number} size
 * @returns {Promise<movininTypes.Result<movininTypes.User>>}
 */
export const getAgencies = (keyword: string, page: number, size: number): Promise<movininTypes.Result<movininTypes.User>> =>
  axiosInstance
    .get(
      `/api/agencies/${page}/${size}/?s=${encodeURIComponent(keyword)}`,
      { withCredentials: true }
    )
    .then((res) => res.data)
