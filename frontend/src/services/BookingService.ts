import axios from 'axios'
import Env from '../config/env.config'
import * as UserService from './UserService'
import * as movininTypes from 'movinin-types'

export const book = (data: movininTypes.BookPayload): Promise<number> =>
  axios
    .post(
      `${Env.API_HOST}/api/book`,
      data
    )
    .then((res) => res.status)

export const getBookings = (payload: movininTypes.GetBookingsPayload, page: number, size: number): Promise<movininTypes.Result<movininTypes.Booking>> =>
  axios
    .post(
      `${Env.API_HOST}/api/bookings/${page}/${size}/${UserService.getLanguage()}`,
      payload,
      { headers: UserService.authHeader() }
    )
    .then((res) => res.data)

export const getBooking = (id: string): Promise<movininTypes.Booking> =>
  axios
    .get(
      `${Env.API_HOST}/api/booking/${encodeURIComponent(id)}/${UserService.getLanguage()}`,
      { headers: UserService.authHeader() }
    )
    .then((res) => res.data)

export const cancel = (id: string): Promise<number> =>
  axios
    .post(
      `${Env.API_HOST}/api/cancel-booking/${encodeURIComponent(id)}`,
      null,
      { headers: UserService.authHeader() }
    ).then((res) => res.status)
