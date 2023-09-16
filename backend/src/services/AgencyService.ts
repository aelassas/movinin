import axios from 'axios'
import Env from '../config/env.config'
import * as UserService from './UserService'
import * as movininTypes from 'movinin-types'

export const validate = (data: movininTypes.ValidateAgencyPayload): Promise<number> =>
  axios
    .post(
      `${Env.API_HOST}/api/validate-agency`,
      data,
      { headers: UserService.authHeader() }
    )
    .then((res) => res.status)

export const update = (data: movininTypes.UpdateAgencyPayload): Promise<number> =>
  axios
    .put(
      `${Env.API_HOST}/api/update-agency`,
      data,
      { headers: UserService.authHeader() }
    )
    .then((res) => res.status)

export const deleteAgency = (id: string): Promise<number> =>
  axios
    .delete(
      `${Env.API_HOST}/api/delete-agency/${encodeURIComponent(id)}`,
      { headers: UserService.authHeader() }
    )
    .then((res) => res.status)

export const getAgency = (id: string): Promise<movininTypes.User> =>
  axios
    .get(
      `${Env.API_HOST}/api/agency/${encodeURIComponent(id)}`,
      { headers: UserService.authHeader() }
    )
    .then((res) => res.data)

export const getAgencies = (keyword: string, page: number, size: number): Promise<movininTypes.Result<movininTypes.User>> =>
  axios
    .get(
      `${Env.API_HOST}/api/agencies/${page}/${size}/?s=${encodeURIComponent(keyword)}`,
      { headers: UserService.authHeader() }
    )
    .then((res) => res.data)

export const getAllAgencies = (): Promise<movininTypes.User[]> =>
  axios
    .get(
      `${Env.API_HOST}/api/all-agencies`,
      { headers: UserService.authHeader() })
    .then((res) => res.data)
