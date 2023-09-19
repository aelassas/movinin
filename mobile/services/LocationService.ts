import axios from 'axios'
import * as Env from '../config/env.config'
import * as UserService from './UserService'
import * as AxiosHelper from '../common/AxiosHelper'
import * as movininTypes from  '../miscellaneous/movininTypes'

AxiosHelper.init(axios)

export const getLocations = async (keyword: string, page: number, size: number): Promise<movininTypes.Result<movininTypes.Location>> => {
  const language = await UserService.getLanguage()
  return axios
    .get(
      `${Env.API_HOST}/api/locations/${page}/${size}/${language}/?s=${encodeURIComponent(keyword)}`
    )
    .then((res) => res.data)
}

export const getLocation = async (id: string): Promise<movininTypes.Location> => {
  const language = await UserService.getLanguage()
  return axios
    .get(
      `${Env.API_HOST}/api/location/${encodeURIComponent(id)}/${language}`
    )
    .then((res) => res.data)
}
