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
  MI_STRIPE_PUBLISHABLE_KEY,
  MI_STRIPE_MERCHANT_IDENTIFIER,
  MI_STRIPE_COUNTRY_CODE,
  MI_BASE_CURRENCY,
  MI_WEBSITE_NAME,
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

type Currency = { code: string, symbol: string }

/**
 * The three-letter ISO 4217 alphabetic currency codes, e.g. "USD" or "EUR" and their symbols.
 * https://docs.stripe.com/currencies
 *
 * @type {Currency[]}
 */
export const CURRENCIES: Currency[] = [
  {
    code: 'USD',
    symbol: '$',
  },
  {
    code: 'EUR',
    symbol: '€',
  },
  {
    code: 'GBP',
    symbol: '£',
  },
  {
    code: 'AUD',
    symbol: '$',
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
export const WEBSITE_NAME: string = String(MI_WEBSITE_NAME || "Movin' In")

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

/**
 * Stripe Publishable Key.
 *
 * @type {string}
 */
export const STRIPE_PUBLISHABLE_KEY: string = MI_STRIPE_PUBLISHABLE_KEY

/**
 * The merchant identifier you registered with Apple for use with Apple Pay.
 *
 * @type {string}
 */
export const STRIPE_MERCHANT_IDENTIFIER: string = MI_STRIPE_MERCHANT_IDENTIFIER

/**
 * The two-letter ISO 3166 code of the country of your business, e.g. "US". Required for Stripe payments.
 *
 * @type {string}
 */
export const STRIPE_COUNTRY_CODE: string = MI_STRIPE_COUNTRY_CODE

/**
 * The three-letter ISO 4217 alphabetic currency code, e.g. "USD" or "EUR" base currency. Default is USD.
 *
 * @type {string}
 */
export const BASE_CURRENCY: string = MI_BASE_CURRENCY || 'USD'
