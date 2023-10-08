import axios from 'axios'
import * as movininTypes from 'movinin-types'
import Env from '../config/env.config'

/**
 * Get all agencies.
 *
 * @returns {Promise<movininTypes.User[]>}
 */
export const getAllAgencies = (): Promise<movininTypes.User[]> =>
  axios
    .get(
      `${Env.API_HOST}/api/all-agencies`,
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
  axios
    .get(
      `${Env.API_HOST}/api/agencies/${page}/${size}/?s=${encodeURIComponent(keyword)}`,
      { withCredentials: true }
    )
    .then((res) => res.data)
