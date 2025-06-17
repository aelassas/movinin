import * as movininTypes from ':movinin-types'
import axiosInstance from './axiosInstance'

/**
 * Validate an Agency name.
 *
 * @param {movininTypes.ValidateAgencyPayload} data
 * @returns {Promise<number>}
 */
export const validate = (data: movininTypes.ValidateAgencyPayload): Promise<number> =>
  axiosInstance
    .post(
      '/api/validate-agency',
      data,
      { withCredentials: true }
    )
    .then((res) => res.status)

/**
 * Update an Agency.
 *
 * @param {movininTypes.UpdateAgencyPayload} data
 * @returns {Promise<number>}
 */
export const update = (data: movininTypes.UpdateAgencyPayload): Promise<number> =>
  axiosInstance
    .put(
      '/api/update-agency',
      data,
      { withCredentials: true }
    )
    .then((res) => res.status)

/**
 * Delete an Agency.
 *
 * @param {string} id
 * @returns {Promise<number>}
 */
export const deleteAgency = (id: string): Promise<number> =>
  axiosInstance
    .delete(
      `/api/delete-agency/${encodeURIComponent(id)}`,
      { withCredentials: true }
    )
    .then((res) => res.status)

/**
 * Get an Agency by ID.
 *
 * @param {string} id
 * @returns {Promise<movininTypes.User>}
 */
export const getAgency = (id: string): Promise<movininTypes.User> =>
  axiosInstance
    .get(
      `/api/agency/${encodeURIComponent(id)}`,
      { withCredentials: true }
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
  axiosInstance
    .get(
      `/api/agencies/${page}/${size}/?s=${encodeURIComponent(keyword)}`,
      { withCredentials: true }
    )
    .then((res) => res.data)

/**
 * Get all Agencies.
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
