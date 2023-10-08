import axios from 'axios'
import * as movininTypes from 'movinin-types'
import Env from '../config/env.config'

/**
 * Get a NotificationCounter by UserID.
 *
 * @param {string} userId
 * @returns {Promise<movininTypes.NotificationCounter>}
 */
export const getNotificationCounter = (userId: string): Promise<movininTypes.NotificationCounter> => (
  axios
    .get(
      `${Env.API_HOST}/api/notification-counter/${encodeURIComponent(userId)}`,
      { withCredentials: true }
    )
    .then((res) => res.data)
)

/**
 * Mark notifications as read.
 *
 * @param {string} userId
 * @param {string[]} ids
 * @returns {Promise<number>}
 */
export const markAsRead = (userId: string, ids: string[]): Promise<number> => (
  axios
    .post(
      `${Env.API_HOST}/api/mark-notifications-as-read/${encodeURIComponent(userId)}`,
      { ids },
      { withCredentials: true }
    )
    .then((res) => res.status)
)

/**
 * Mark notifications as unread.
 *
 * @param {string} userId
 * @param {string[]} ids
 * @returns {Promise<number>}
 */
export const markAsUnread = (userId: string, ids: string[]): Promise<number> => (
  axios
    .post(
`${Env.API_HOST}/api/mark-notifications-as-unread/${encodeURIComponent(userId)}`,
      { ids },
      { withCredentials: true }
    )
    .then((res) => res.status)
)

/**
 * Delete notifications.
 *
 * @param {string} userId
 * @param {string[]} ids
 * @returns {Promise<number>}
 */
export const deleteNotifications = (userId: string, ids: string[]): Promise<number> => (
  axios
    .post(
      `${Env.API_HOST}/api/delete-notifications/${encodeURIComponent(userId)}`,
      { ids },
      { withCredentials: true }
)
    .then((res) => res.status)
)

/**
 * Get notifications.
 *
 * @param {string} userId
 * @param {number} page
 * @returns {Promise<movininTypes.Result<movininTypes.Notification>>}
 */
export const getNotifications = (userId: string, page: number): Promise<movininTypes.Result<movininTypes.Notification>> => (
  axios
    .get(
      `${Env.API_HOST}/api/notifications/${encodeURIComponent(userId)}/${page}/${Env.PAGE_SIZE}`,
      { withCredentials: true }
    )
    .then((res) => res.data)
)
