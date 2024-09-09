import * as movininTypes from ':movinin-types'
import axiosInstance from './axiosInstance'
import env from '@/config/env.config'

/**
 * Get a NotificationCounter by UserID.
 *
 * @param {string} userId
 * @returns {Promise<movininTypes.NotificationCounter>}
 */
export const getNotificationCounter = (userId: string): Promise<movininTypes.NotificationCounter> => (
  axiosInstance
    .get(
      `/api/notification-counter/${encodeURIComponent(userId)}`,
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
  axiosInstance
    .post(
      `/api/mark-notifications-as-read/${encodeURIComponent(userId)}`,
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
  axiosInstance
    .post(
`/api/mark-notifications-as-unread/${encodeURIComponent(userId)}`,
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
  axiosInstance
    .post(
      `/api/delete-notifications/${encodeURIComponent(userId)}`,
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
  axiosInstance
    .get(
      `/api/notifications/${encodeURIComponent(userId)}/${page}/${env.PAGE_SIZE}`,
      { withCredentials: true }
    )
    .then((res) => res.data)
)
