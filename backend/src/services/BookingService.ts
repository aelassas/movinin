import axios from 'axios'
import Env from '../config/env.config'
import * as UserService from './UserService'
import * as movininTypes from 'movinin-types'

export const create = (data: movininTypes.Booking): Promise<movininTypes.Booking> =>
  axios
    .post(
      `${Env.API_HOST}/api/create-booking`,
      data,
      { headers: UserService.authHeader() }
    )
    .then((res) => res.data)

export const update = (data: movininTypes.Booking): Promise<number> =>
  axios
    .put(
      `${Env.API_HOST}/api/update-booking`,
      data,
      { headers: UserService.authHeader() }
    )
    .then((res) => res.status)

export const updateStatus = (data: movininTypes.UpdateStatusPayload): Promise<number> =>
  axios
    .post(
      `${Env.API_HOST}/api/update-booking-status`,
      data,
      { headers: UserService.authHeader() }
    )
    .then((res) => res.status)

export const deleteBookings = (ids: string[]): Promise<number> =>
  axios
    .post(
      `${Env.API_HOST}/api/delete-bookings`,
      ids,
      { headers: UserService.authHeader() }
    )
    .then((res) => res.status)

export const getBooking = (id: string): Promise<movininTypes.Booking> =>
  axios
    .get(
      `${Env.API_HOST}/api/booking/${encodeURIComponent(id)}/${UserService.getLanguage()}`,
      { headers: UserService.authHeader() }
    )
    .then((res) => res.data)

export const getBookings = (payload: movininTypes.GetBookingsPayload, page: number, size: number): Promise<movininTypes.Result<movininTypes.Booking>> =>
  axios
    .post(
      `${Env.API_HOST}/api/bookings/${page}/${size}/${UserService.getLanguage()}`,
      payload,
      { headers: UserService.authHeader() }
    )
    .then((res) => res.data)
