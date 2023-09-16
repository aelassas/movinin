import axios from 'axios'
import Env from '../config/env.config'
import * as UserService from './UserService'
import * as movininTypes from 'movinin-types'

export const validate = (data: movininTypes.ValidateLocationPayload): Promise<number> =>
  axios
    .post(`${Env.API_HOST}/api/validate-location`,
      data,
      { headers: UserService.authHeader() }
    )
    .then((res) => res.status)

export const create = (data: movininTypes.LocationName[]): Promise<number> =>
  axios
    .post(`${Env.API_HOST}/api/create-location`,
      data,
      { headers: UserService.authHeader() }
    )
    .then((res) => res.status)

export const update = (id: string, data: movininTypes.LocationName[]): Promise<number> =>
  axios
    .put(`${Env.API_HOST}/api/update-location/${id}`,
      data,
      { headers: UserService.authHeader() }
    )
    .then((res) => res.status)

export const deleteLocation = (id: string): Promise<number> =>
  axios
    .delete(`${Env.API_HOST}/api/delete-location/${encodeURIComponent(id)}`,
      { headers: UserService.authHeader() }
    )
    .then((res) => res.status)

export const getLocation = (id: string): Promise<movininTypes.Location> =>
  axios
    .get(
      `${Env.API_HOST}/api/location/${encodeURIComponent(id)}/${UserService.getLanguage()}`,
      { headers: UserService.authHeader() }
    )
    .then((res) => res.data)

export const getLocations = (keyword: string, page: number, size: number): Promise<movininTypes.Result<movininTypes.Location>> =>
  axios
    .get(
      `${Env.API_HOST}/api/locations/${page}/${size}/${UserService.getLanguage()}/?s=${encodeURIComponent(keyword)}`,
      { headers: UserService.authHeader() }
    )
    .then((res) => res.data)

export const check = (id: string): Promise<number> =>
  axios
    .get(
      `${Env.API_HOST}/api/check-location/${encodeURIComponent(id)}`,
      { headers: UserService.authHeader() }
    )
    .then((res) => res.status)
