import axios from 'axios'
import * as movininTypes from 'movinin-types'
import Env from '../config/env.config'
import * as UserService from './UserService'

/**
 * Validate an Agency name.
 *
 * @param {movininTypes.ValidateAgencyPayload} data
 * @returns {Promise<number>}
 */
export const validate = (data: movininTypes.ValidateAgencyPayload): Promise<number> =>
  axios
    .post(
      `${Env.API_HOST}/api/validate-agency`,
      data,
      { headers: UserService.authHeader() }
    )
    .then((res) => res.status)

/**
 * Update an Agency.
 *
 * @param {movininTypes.UpdateAgencyPayload} data
 * @returns {Promise<number>}
 */
export const update = (data: movininTypes.UpdateAgencyPayload): Promise<number> =>
  axios
    .put(
      `${Env.API_HOST}/api/update-agency`,
      data,
      { headers: UserService.authHeader() }
    )
    .then((res) => res.status)

/**
 * Delete an Agency.
 *
 * @param {string} id
 * @returns {Promise<number>}
 */
export const deleteAgency = (id: string): Promise<number> =>
  axios
    .delete(
      `${Env.API_HOST}/api/delete-agency/${encodeURIComponent(id)}`,
      { headers: UserService.authHeader() }
    )
    .then((res) => res.status)

/**
 * Get an Agency by ID.
 *
 * @param {string} id
 * @returns {Promise<movininTypes.User>}
 */
export const getAgency = (id: string): Promise<movininTypes.User> =>
  axios
    .get(
      `${Env.API_HOST}/api/agency/${encodeURIComponent(id)}`,
      { headers: UserService.authHeader() }
    )
    .then((res) => res.data)

/**
 * Get Agencies.
 *
 * @param {string} keyword
 * @param {number} page
 * @param {number} size
 * @returns {Promise<movininTypes.Result<movininTypes.User>>}
 */
export const getAgencies = (keyword: string, page: number, size: number)
  : Promise<movininTypes.Result<movininTypes.User>> =>
  axios
    .get(
      `${Env.API_HOST}/api/agencies/${page}/${size}/?s=${encodeURIComponent(keyword)}`,
      { headers: UserService.authHeader() }
    )
    .then((res) => res.data)

/**
 * Get all Agencies.
 *
 * @returns {Promise<movininTypes.User[]>}
 */
export const getAllAgencies = (): Promise<movininTypes.User[]> =>
  axios
    .get(
      `${Env.API_HOST}/api/all-agencies`,
      { headers: UserService.authHeader() }
)
    .then((res) => res.data)
