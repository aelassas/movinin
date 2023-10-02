import axios from 'axios'
import * as Env from '../config/env.config'
import * as AxiosHelper from '../common/AxiosHelper'
import * as movininTypes from '../miscellaneous/movininTypes'

AxiosHelper.init(axios)

/**
 * Get all agencies.
 *
 * @returns {Promise<movininTypes.User[]>}
 */
export const getAllAgencies = (): Promise<movininTypes.User[]> =>
  axios
    .get(
      `${Env.API_HOST}/api/all-agencies`
    )
    .then((res) => res.data)
