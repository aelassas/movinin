import axios from 'axios'
import Env from '../config/env.config'
import * as UserService from './UserService'
import * as movininTypes from 'movinin-types'

export const getLocations = (keyword: string, page: number, size: number): Promise<movininTypes.Result<movininTypes.Location>> =>
  axios
    .get(
      `${Env.API_HOST}/api/locations/${page}/${size}/${UserService.getLanguage()}/?s=${encodeURIComponent(keyword)}`
    )
    .then((res) => res.data)

export const getLocation = (id: string): Promise<movininTypes.Location> =>
  axios
    .get(
      `${Env.API_HOST}/api/location/${encodeURIComponent(id)}/${UserService.getLanguage()}`
    )
    .then((res) => res.data)
