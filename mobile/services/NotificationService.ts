import axiosInstance from './axiosInstance'
import * as env from '@/config/env.config'
import * as UserService from './UserService'
import * as axiosHelper from '@/common/axiosHelper'
import * as movininTypes from ':movinin-types'

axiosHelper.init(axiosInstance)

/**
 * Get a NotificationCounter by UserID.
 *
 * @async
 * @param {string} userId
 * @returns {Promise<movininTypes.NotificationCounter>}
 */
export const getNotificationCounter = async (userId: string): Promise<movininTypes.NotificationCounter> => {
  const headers = await UserService.authHeader()
  return axiosInstance
    .get(
      `/api/notification-counter/${encodeURIComponent(userId)}`,
      { headers }
    )
    .then((res) => res.data)
}

/**
 * Mark notifications as read.
 *
 * @async
 * @param {string} userId
 * @param {string[]} ids
 * @returns {Promise<number>}
 */
export const markAsRead = async (userId: string, ids: string[]): Promise<number> => {
  const headers = await UserService.authHeader()
  return axiosInstance
    .post(
      `/api/mark-notifications-as-read/${encodeURIComponent(userId)}`,
      { ids },
      { headers }
    )
    .then((res) => res.status)
}

/**
 * Mark notifications as unread.
 *
 * @async
 * @param {string} userId
 * @param {string[]} ids
 * @returns {Promise<number>}
 */
export const markAsUnread = async (userId: string, ids: string[]): Promise<number> => {
  const headers = await UserService.authHeader()
  return axiosInstance
    .post(
`/api/mark-notifications-as-unread/${encodeURIComponent(userId)}`,
      { ids },
      { headers }
    )
    .then((res) => res.status)
}

/**
 * Delete notifications.
 *
 * @async
 * @param {string} userId
 * @param {string[]} ids
 * @returns {Promise<number>}
 */
export const deleteNotifications = async (userId: string, ids: string[]): Promise<number> => {
  const headers = await UserService.authHeader()
  return axiosInstance
    .post(
      `/api/delete-notifications/${encodeURIComponent(userId)}`,
      { ids },
      { headers }
    )
    .then((res) => res.status)
}

/**
 * Get Notifications.
 *
 * @async
 * @param {string} userId
 * @param {number} page
 * @returns {Promise<movininTypes.Result<movininTypes.Notification>>}
 */
export const getNotifications = async (userId: string, page: number): Promise<movininTypes.Result<movininTypes.Notification>> => {
  const headers = await UserService.authHeader()
  return axiosInstance
    .get(
      `/api/notifications/${encodeURIComponent(userId)}/${page}/${env.PAGE_SIZE}`,
      { headers }
    )
    .then((res) => res.data)
}
