import {
  MI_API_HOST,
  MI_DEFAULT_LANGUAGE,
  MI_PAGE_SIZE,
  MI_PROPERTIES_PAGE_SIZE,
  MI_BOOKINGS_PAGE_SIZE,
  MI_CDN_USERS,
  MI_CDN_PROPERTIES,
  MI_AGENCY_IMAGE_WIDTH,
  MI_AGENCY_IMAGE_HEIGHT,
  MI_PROPERTY_IMAGE_WIDTH,
  MI_PROPERTY_IMAGE_HEIGHT,
  MI_MINIMUM_AGE,
} from '@env'

/**
 * ISO 639-1 languages and their labels.
 * https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
 *
 * @type {{}}
 */
export const LANGUAGES = [
  {
    code: 'fr',
    label: 'Français',
  },
  {
    code: 'en',
    label: 'English',
  },
]
/**
 * Application type.
 *
 * @type {string}
 */
export const APP_TYPE: string = 'frontend'

/**
 * API host.
 *
 * @type {string}
 */
export const API_HOST: string = MI_API_HOST

/**
 * Axios timeout in milliseconds.
 *
 * @type {number}
 */
export const AXIOS_TIMEOUT: number = 5000

/**
 * Number of maximum axiosInstance retries.
 *
 * @type {number}
 */
export const AXIOS_RETRIES: number = 3

/**
 * Axios retries interval in milliseconds.
 *
 * @type {number}
 */
export const AXIOS_RETRIES_INTERVAL: number = 500

/**
 * Default language. Default is English.
 *
 * @type {string}
 */
export const DEFAULT_LANGUAGE: string = MI_DEFAULT_LANGUAGE || 'en'

/**
 * Page size. Default is 20.
 *
 * @type {number}
 */
export const PAGE_SIZE: number = Number.parseInt(MI_PAGE_SIZE, 10) || 20

/**
 * Properties page size. Default is 8.
 *
 * @type {number}
 */
export const PROPERTIES_PAGE_SIZE: number = Number.parseInt(MI_PROPERTIES_PAGE_SIZE, 10) || 8

/**
 * Bookings page size. Default is 8.
 *
 * @type {number}
 */
export const BOOKINGS_PAGE_SIZE: number = Number.parseInt(MI_BOOKINGS_PAGE_SIZE, 10) || 8

/**
 * User images CDN.
 *
 * @type {string}
 */
export const CDN_USERS: string = MI_CDN_USERS

/**
 * Property images CDN.
 *
 * @type {string}
 */
export const CDN_PROPERTIES: string = MI_CDN_PROPERTIES

/**
 * Page offset.
 *
 * @type {number}
 */
export const PAGE_OFFSET: number = 200

/**
 * Agency image width. Default is 60.
 *
 * @type {number}
 */
export const AGENCY_IMAGE_WIDTH: number = Number.parseInt(MI_AGENCY_IMAGE_WIDTH, 10) || 60

/**
 * Agency image height. Default is 30.
 *
 * @type {number}
 */
export const AGENCY_IMAGE_HEIGHT: number = Number.parseInt(MI_AGENCY_IMAGE_HEIGHT, 10) || 30

/**
 * Property image width. Default is 300.
 *
 * @type {number}
 */
export const PROPERTY_IMAGE_WIDTH: number = Number.parseInt(MI_PROPERTY_IMAGE_WIDTH, 10) || 300

/**
 * Property image height. Default is 200.
 *
 * @type {number}
 */
export const PROPERTY_IMAGE_HEIGHT: number = Number.parseInt(MI_PROPERTY_IMAGE_HEIGHT, 10) || 200

/**
 * Minimum age. Default is 21.
 *
 * @type {number}
 */
export const MINIMUM_AGE: number = Number.parseInt(MI_MINIMUM_AGE, 10) || 21

/**
 * Size unit.
 *
 * @type {'m²'}
 */
export const SIZE_UNIT = 'm²'
