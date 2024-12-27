import * as movininTypes from ':movinin-types'
import axiosInstance from './axiosInstance'
import env from '@/config/env.config'

/**
 * Create a User.
 *
 * @param {movininTypes.CreateUserPayload} data
 * @returns {Promise<number>}
 */
export const create = (data: movininTypes.CreateUserPayload): Promise<number> =>
  axiosInstance
    .post(
      '/api/create-user',
      data,
      { withCredentials: true }
    )
    .then((res) => res.status)

/**
 * Sign up.
 *
 * @param {movininTypes.SignUpPayload} data
 * @returns {Promise<number>}
 */
export const signup = (data: movininTypes.SignUpPayload): Promise<number> =>
  axiosInstance
    .post(
      '/api/admin-sign-up',
      data
    )
    .then((res) => res.status)

/**
 * Check a validation token.
 *
 * @param {string} userId
 * @param {string} email
 * @param {string} token
 * @returns {Promise<number>}
 */
export const checkToken = (userId: string, email: string, token: string): Promise<number> =>
  axiosInstance
    .get(
      `/api/check-token/${env.APP_TYPE}/${encodeURIComponent(userId)}/${encodeURIComponent(email)}/${encodeURIComponent(token)}`
    )
    .then((res) => res.status)

/**
 * Delete validation tokens.
 *
 * @param {string} userId
 * @returns {Promise<number>}
 */
export const deleteTokens = (userId: string): Promise<number> =>
  axiosInstance
    .delete(
      `/api/delete-tokens/${encodeURIComponent(userId)}`
    )
    .then((res) => res.status)

/**
 * Resend a forgotten password or activation email.
 *
 * @param {?string} [email]
 * @param {boolean} [reset=false]
 * @param {string} [appType=movininTypes.AppType.Backend]
 * @returns {Promise<number>}
 */
export const resend = (email?: string, reset = false, appType: string = movininTypes.AppType.Backend): Promise<number> =>
  axiosInstance
    .post(
      `/api/resend/${appType}/${encodeURIComponent(email || '')}/${reset}`
    )
    .then((res) => res.status)

/**
 * Activate an account.
 *
 * @param {movininTypes.ActivatePayload} data
 * @returns {Promise<number>}
 */
export const activate = (data: movininTypes.ActivatePayload): Promise<number> =>
  axiosInstance
    .post(
      '/api/activate',
      data,
      { withCredentials: true }
    )
    .then((res) => res.status)

/**
 * Validate an email.
 *
 * @param {movininTypes.ValidateEmailPayload} data
 * @returns {Promise<number>}
 */
export const validateEmail = (data: movininTypes.ValidateEmailPayload): Promise<number> =>
  axiosInstance
    .post(
      '/api/validate-email',
      data
    )
    .then((exist) => exist.status)

/**
 * Sign in.
 *
 * @param {movininTypes.SignInPayload} data
 * @returns {Promise<{ status: number, data: movininTypes.User }>}
 */
export const signin = (data: movininTypes.SignInPayload): Promise<{ status: number, data: movininTypes.User }> =>
  axiosInstance
    .post(
      `/api/sign-in/${env.APP_TYPE}`,
      data,
      { withCredentials: true }
    )
    .then((res) => {
      localStorage.setItem('mi-be-user', JSON.stringify(res.data))
      return { status: res.status, data: res.data }
    })

/**
 * Sign out.
 *
 * @param {boolean} [redirect=true]
 */
export const signout = async (redirect = true) => {
  const deleteAllCookies = () => {
    const cookies = document.cookie.split('')

    for (const cookie of cookies) {
      const eqPos = cookie.indexOf('=')
      const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie
      document.cookie = `${name}=expires=Thu, 01 Jan 1970 00:00:00 GMT`
    }
  }

  sessionStorage.clear()
  localStorage.removeItem('mi-be-user')
  deleteAllCookies()

  await axiosInstance
    .post(
      '/api/sign-out',
      null,
      { withCredentials: true }
    )

  if (redirect) {
    window.location.href = '/sign-in'
  }
}

/**
 * Validate authentication access token.
 *
 * @returns {Promise<number>}
 */
export const validateAccessToken = (): Promise<number> =>
  axiosInstance
    .post(
      '/api/validate-access-token',
      null,
      { withCredentials: true }
    )
    .then((res) => res.status)

/**
 * Confirm an email.
 *
 * @param {string} email
 * @param {string} token
 * @returns {Promise<number>}
 */
export const confirmEmail = (email: string, token: string): Promise<number> => (
  axiosInstance
    .post(
      `/api/confirm-email/${encodeURIComponent(email)}/${encodeURIComponent(token)}`
    )
    .then((res) => res.status)
)

/**
 * Resend a validation email.
 *
 * @param {movininTypes.ResendLinkPayload} data
 * @returns {Promise<number>}
 */
export const resendLink = (data: movininTypes.ResendLinkPayload): Promise<number> =>
  axiosInstance
    .post(
      '/api/resend-link',
      data,
      { withCredentials: true }
    )
    .then((res) => res.status)

/**
 * Get current language.
 *
 * @returns {string}
 */
export const getLanguage = (): string => {
  const user = JSON.parse(localStorage.getItem('mi-be-user') ?? 'null')

  if (user && user.language) {
    return user.language as string
  }
  const lang = localStorage.getItem('mi-be-language')
  if (lang && lang.length === 2) {
    return lang
  }
  return env.DEFAULT_LANGUAGE
}

/**
 * Get language from query strings.
 *
 * @returns {(string | null)}
 */
export const getQueryLanguage = (): string | null => {
  const params = new URLSearchParams(window.location.search)
  if (params.has('l')) {
    return params.get('l') ?? ''
  }
  return ''
}

/**
 * Update language.
 *
 * @param {movininTypes.UpdateLanguagePayload} data
 * @returns {Promise<number>}
 */
export const updateLanguage = (data: movininTypes.UpdateLanguagePayload) =>
  axiosInstance
    .post(
      '/api/update-language',
      data,
      { withCredentials: true }
    )
    .then((res) => {
      if (res.status === 200) {
        const user = JSON.parse(localStorage.getItem('mi-be-user') ?? 'null')
        user.language = data.language
        localStorage.setItem('mi-be-user', JSON.stringify(user))
      }
      return res.status
    })

/**
 * Set language.
 *
 * @param {string} lang
 */
export const setLanguage = (lang: string) => {
  localStorage.setItem('mi-be-language', lang)
}

/**
 * Get current User.
 *
 * @returns {movininTypes.User|null}
 */
export const getCurrentUser = (): movininTypes.User | null => {
  const user = JSON.parse(localStorage.getItem('mi-be-user') ?? 'null') as movininTypes.User | null
  return user
}

/**
 * Get User by ID.
 *
 * @param {string} id
 * @returns {Promise<movininTypes.User|null>}
 */
export const getUser = (id?: string): Promise<movininTypes.User | null> => {
  if (id) {
    return axiosInstance
      .get(
        `/api/user/${encodeURIComponent(id)}`,
        { withCredentials: true }
      )
      .then((res) => res.data)
  }
  return new Promise((resolve) => {
    resolve(null)
  })
}

/**
 * Get customers.
 *
 * @param {string} keyword
 * @param {number} page
 * @param {number} size
 * @returns {Promise<movininTypes.Result<movininTypes.User>>}
 */
export const getRenters = (keyword: string, page: number, size: number): Promise<movininTypes.Result<movininTypes.User>> =>
  axiosInstance
    .post(
      `/api/users/${page}/${size}/?s=${encodeURIComponent(keyword)}`,
      { types: [movininTypes.RecordType.User] },
      { withCredentials: true }
    )
    .then((res) => res.data)

/**
 * Get Users.
 *
 * @param {movininTypes.GetUsersBody} payload
 * @param {string} keyword
 * @param {number} page
 * @param {number} size
 * @returns {Promise<movininTypes.Result<movininTypes.User>>}
 */
export const getUsers = (
  payload: movininTypes.GetUsersBody,
  keyword: string,
  page: number,
  size: number
): Promise<movininTypes.Result<movininTypes.User>> =>
  axiosInstance
    .post(
      `/api/users/${page}/${size}/?s=${encodeURIComponent(keyword)}`,
      payload,
      { withCredentials: true }
    )
    .then((res) => res.data)

/**
 * Update a User.
 *
 * @param {movininTypes.UpdateUserPayload} data
 * @returns {Promise<number>}
 */
export const updateUser = (data: movininTypes.UpdateUserPayload): Promise<number> =>
  axiosInstance
    .post(
      '/api/update-user',
      data,
      { withCredentials: true }
    )
    .then((res) => res.status)

/**
 * Update email notifications flag.
 *
 * @param {movininTypes.UpdateEmailNotificationsPayload} data
 * @returns {Promise<number>}
 */
export const updateEmailNotifications = (data: movininTypes.UpdateEmailNotificationsPayload): Promise<number> =>
  axiosInstance
    .post(
      '/api/update-email-notifications',
      data,
      { withCredentials: true }
    )
    .then((res) => {
      if (res.status === 200) {
        const user = getCurrentUser()
        if (user) {
          user.enableEmailNotifications = data.enableEmailNotifications
          localStorage.setItem('mi-be-user', JSON.stringify(user))
        }
      }
      return res.status
    })

/**
 * Create an avatar.
 *
 * @param {Blob} file
 * @returns {Promise<string>}
 */
export const createAvatar = (file: Blob): Promise<string> => {
  const formData = new FormData()
  formData.append('image', file)

  return axiosInstance
    .post(
      '/api/create-avatar',
      formData,
      {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    )
    .then((res) => res.data)
}

/**
 * Update an avatar.
 *
 * @param {string} userId
 * @param {Blob} file
 * @returns {Promise<number>}
 */
export const updateAvatar = (userId: string, file: Blob): Promise<number> => {
  const formData = new FormData()
  formData.append('image', file)

  return axiosInstance
    .post(
      `/api/update-avatar/${encodeURIComponent(userId)}`,
      formData,
      {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    )
    .then((res) => res.status)
}

/**
 * Delete an avatar.
 *
 * @param {string} userId
 * @returns {Promise<number>}
 */
export const deleteAvatar = (userId: string): Promise<number> =>
  axiosInstance
    .post(
      `/api/delete-avatar/${encodeURIComponent(userId)}`,
      null,
      { withCredentials: true }
    )
    .then((res) => res.status)

/**
 * Delete a temporary avatar.
 *
 * @param {string} avatar
 * @returns {Promise<number>}
 */
export const deleteTempAvatar = (avatar: string): Promise<number> => (
  axiosInstance
    .post(
      `/api/delete-temp-avatar/${encodeURIComponent(avatar)}`,
      null,
      { withCredentials: true }
    )
    .then((res) => res.status)
)

/**
 * Check a password.
 *
 * @param {string} id
 * @param {string} pass
 * @returns {Promise<number>}
 */
export const checkPassword = (id: string, pass: string): Promise<number> =>
  axiosInstance
    .get(
      `/api/check-password/${encodeURIComponent(id)}/${encodeURIComponent(pass)}`,
      { withCredentials: true }
    )
    .then((res) => res.status)

/**
 * Change a password.
 *
 * @param {movininTypes.ChangePasswordPayload} data
 * @returns {Promise<number>}
 */
export const changePassword = (data: movininTypes.ChangePasswordPayload): Promise<number> =>
  axiosInstance
    .post(
      '/api/change-password',
      data,
      { withCredentials: true }
    )
    .then((res) => res.status)

/**
 * Delete Users.
 *
 * @param {string[]} ids
 * @returns {Promise<number>}
 */
export const deleteUsers = (ids: string[]): Promise<number> => (
  axiosInstance
    .post(
      '/api/delete-users',
      ids,
      { withCredentials: true }
    )
    .then((res) => res.status)
)
