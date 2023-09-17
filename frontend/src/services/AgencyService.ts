import axios from 'axios'
import Env from '../config/env.config'
import * as UserService from './UserService'
import * as movininTypes from 'movinin-types'

export const getAllAgencies = (): Promise<movininTypes.User[]> =>
  axios
    .get(
      `${Env.API_HOST}/api/all-agencies`,
      { headers: UserService.authHeader() })
    .then((res) => res.data)


export const getAgencies = (keyword: string, page: number, size: number): Promise<movininTypes.Result<movininTypes.User>> =>
  axios
    .get(
      `${Env.API_HOST}/api/agencies/${page}/${size}/?s=${encodeURIComponent(keyword)}`,
      { headers: UserService.authHeader() }
    )
    .then((res) => res.data)
