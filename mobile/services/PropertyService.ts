import axios from 'axios'
import * as Env from '../config/env.config'
import * as UserService from './UserService'
import * as AxiosHelper from '../common/AxiosHelper'
import * as movininTypes from  '../miscellaneous/movininTypes'

AxiosHelper.init(axios)

export const getProperties = async (data: movininTypes.GetPropertiesPayload, page: number, size: number): Promise<movininTypes.Result<movininTypes.Property>> =>
  axios
    .post(
      `${Env.API_HOST}/api/frontend-properties/${page}/${size}}`,
      data
    )
    .then((res) => res.data)

export const getProperty = async (id: string): Promise<movininTypes.Property> => {
  const language = await UserService.getLanguage()
  return axios
    .get(
      `${Env.API_HOST}/api/property/${encodeURIComponent(id)}/${language}`
    )
    .then((res) => res.data)
}

export const getBookingProperties = async (keyword: string, data: movininTypes.GetBookingPropertiesPayload, page: number, size: number): Promise<movininTypes.Result<movininTypes.Property>> => {
  const authHeader = await UserService.authHeader()
  return axios
    .post(
      `${Env.API_HOST}/api/booking-properties/${page}/${size}/?s=${encodeURIComponent(keyword)}`,
      data,
      { headers: authHeader }
    )
    .then((res) => res.data)
}
