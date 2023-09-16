import axios from 'axios'
import Env from '../config/env.config'
import * as UserService from './UserService'
import * as movininTypes from 'movinin-types'

export const create = (data: movininTypes.CreatePropertyPayload): Promise<movininTypes.Property> =>
  axios
    .post(
      `${Env.API_HOST}/api/create-property`,
      data,
      { headers: UserService.authHeader() }
    )
    .then((res) => res.data)

export const update = (data: movininTypes.UpdatePropertyPayload): Promise<number> =>
  axios
    .put(
      `${Env.API_HOST}/api/update-property`,
      data,
      { headers: UserService.authHeader() }
    )
    .then((res) => res.status)

export const check = (id: string): Promise<number> =>
  axios
    .get(
      `${Env.API_HOST}/api/check-property/${encodeURIComponent(id)}`,
      { headers: UserService.authHeader() }
    )
    .then((res) => res.status)

export const deleteProperty = (id: string): Promise<number> =>
  axios
    .delete(
      `${Env.API_HOST}/api/delete-property/${encodeURIComponent(id)}`,
      { headers: UserService.authHeader() }
    )
    .then((res) => res.status)

export const uploadImage = (file: Blob): Promise<string> => {
  const user = UserService.getCurrentUser()
  const formData = new FormData()
  formData.append('image', file)

  return axios
    .post(
      `${Env.API_HOST}/api/upload-property-image`,
      formData,
      user && user.accessToken
        ? {
          headers: {
            'x-access-token': user.accessToken,
            'Content-Type': 'multipart/form-data',
          },
        }
        : { headers: { 'Content-Type': 'multipart/form-data' } },
    )
    .then((res) => res.data)
}

export const deleteImage = (id: string): Promise<number> =>
  axios
    .post(
      `${Env.API_HOST}/api/delete-property-image/${encodeURIComponent(id)}`,
      null,
      { headers: UserService.authHeader() }
    )
    .then((res) => res.status)

export const deleteTempImage = (image: string): Promise<number> =>
  axios
    .post(
      `${Env.API_HOST}/api/delete-temp-property-image/${encodeURIComponent(image)}`,
      null,
      { headers: UserService.authHeader() }
    )
    .then((res) => res.status)

export const getProperty = (id: string): Promise<movininTypes.Property> =>
  axios
    .get(
      `${Env.API_HOST}/api/property/${encodeURIComponent(id)}/${UserService.getLanguage()}`,
      { headers: UserService.authHeader() }
    )
    .then((res) => res.data)

export const getProperties = (keyword: string, data: movininTypes.GetPropertiesPayload, page: number, size: number): Promise<movininTypes.Result<movininTypes.Property>> =>
  axios
    .post(
      `${Env.API_HOST}/api/properties/${page}/${size}/?s=${encodeURIComponent(keyword)}`,
      data,
      { headers: UserService.authHeader() }
    )
    .then((res) => res.data)

export const getBookingProperties = (keyword: string, data: movininTypes.GetBookingPropertiesPayload, page: number, size: number): Promise<movininTypes.Property[]> =>
  axios
    .post(
      `${Env.API_HOST}/api/booking-properties/${page}/${size}/?s=${encodeURIComponent(keyword)}`,
      data,
      { headers: UserService.authHeader() }
    )
    .then((res) => res.data)
