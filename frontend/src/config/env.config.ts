import * as movininTypes from ':movinin-types'
import Const from './const'

//
// ISO 639-1 language codes and their labels
// https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
//
const LANGUAGES = [
  {
    code: 'en',
    countryCode: 'us',
    label: 'English',
  },
  {
    code: 'fr',
    countryCode: 'fr',
    label: 'Français',
  },
]

type Currency = { code: string, symbol: string }

/**
 * The three-letter ISO 4217 alphabetic currency codes, e.g. "USD" or "EUR" and their symbols.
 * https://docs.stripe.com/currencies
 *
 * @type {Currency[]}
 */
const CURRENCIES: Currency[] = [
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

const getPaymentGateway = () => {
  const paymentGateway = String(import.meta.env.VITE_MI_PAYMENT_GATEWAY || 'stripe').toUpperCase()

  if (paymentGateway === 'PAYPAL') {
    return movininTypes.PaymentGateway.PayPal
  }

  // Default is Stripe
  return movininTypes.PaymentGateway.Stripe
}

const PAYMENT_GATEWAY = getPaymentGateway()

const env = {
  isMobile: window.innerWidth <= 960,
  isProduction: import.meta.env.VITE_NODE_ENV === 'production',
  isSafari: /^((?!chrome|android).)*safari/i.test(navigator.userAgent),

  WEBSITE_NAME: String(import.meta.env.VITE_MI_WEBSITE_NAME || "Movin' In"),

  APP_TYPE: movininTypes.AppType.Frontend,
  API_HOST: String(import.meta.env.VITE_MI_API_HOST),
  LANGUAGES: LANGUAGES.map((l) => l.code),
  _LANGUAGES: LANGUAGES,
  DEFAULT_LANGUAGE: String(import.meta.env.VITE_MI_DEFAULT_LANGUAGE || 'en'),
  BASE_CURRENCY: String(import.meta.env.VITE_MI_BASE_CURRENCY || 'USD'),
  CURRENCIES,
  PAGE_SIZE: Number.parseInt(String(import.meta.env.VITE_MI_PAGE_SIZE), 10) || 30,
  PROPERTIES_PAGE_SIZE: Number.parseInt(String(import.meta.env.VITE_MI_PROPERTIES_PAGE_SIZE), 10) || 15,
  BOOKINGS_PAGE_SIZE: Number.parseInt(String(import.meta.env.VITE_MI_BOOKINGS_PAGE_SIZE), 10) || 20,
  BOOKINGS_MOBILE_PAGE_SIZE: Number.parseInt(String(import.meta.env.VITE_MI_BOOKINGS_MOBILE_PAGE_SIZE), 10) || 10,
  CDN_USERS: String(import.meta.env.VITE_MI_CDN_USERS),
  CDN_PROPERTIES: String(import.meta.env.VITE_MI_CDN_PROPERTIES),
  CDN_LOCATIONS: String(import.meta.env.VITE_MI_CDN_LOCATIONS),
  PAGE_OFFSET: 200,
  INFINITE_SCROLL_OFFSET: 40,
  AGENCY_IMAGE_WIDTH: Number.parseInt(String(import.meta.env.VITE_MI_AGENCY_IMAGE_WIDTH), 10) || 60,
  AGENCY_IMAGE_HEIGHT: Number.parseInt(String(import.meta.env.VITE_MI_AGENCY_IMAGE_HEIGHT), 10) || 30,
  PROPERTY_IMAGE_WIDTH: Number.parseInt(String(import.meta.env.VITE_MI_PROPERTY_IMAGE_WIDTH), 10) || 300,
  PROPERTY_IMAGE_HEIGHT: Number.parseInt(String(import.meta.env.VITE_MI_PROPERTY_IMAGE_HEIGHT), 10) || 200,
  PROPERTY_OPTION_IMAGE_HEIGHT: 85,
  SELECTED_PROPERTY_OPTION_IMAGE_HEIGHT: 30,
  RECAPTCHA_ENABLED: (import.meta.env.VITE_MI_RECAPTCHA_ENABLED && import.meta.env.VITE_MI_RECAPTCHA_ENABLED.toLowerCase()) === 'true',
  RECAPTCHA_SITE_KEY: String(import.meta.env.VITE_MI_RECAPTCHA_SITE_KEY),
  MINIMUM_AGE: Number.parseInt(String(import.meta.env.VITE_MI_MINIMUM_AGE), 10) || 21,
  /**
  * PAGINATION_MODE: CLASSIC or INFINITE_SCROLL
  * If you choose CLASSIC, you will get a classic pagination with next and previous buttons on desktop and infinite scroll on mobile.
  * If you choose INFINITE_SCROLL, you will get infinite scroll on desktop and mobile.
  * Default is CLASSIC
  */
  PAGINATION_MODE:
    (import.meta.env.VITE_MI_PAGINATION_MODE && import.meta.env.VITE_MI_PAGINATION_MODE.toUpperCase()) === Const.PAGINATION_MODE.INFINITE_SCROLL
      ? Const.PAGINATION_MODE.INFINITE_SCROLL
      : Const.PAGINATION_MODE.CLASSIC,
  SIZE_UNIT: 'm²',
  PAYMENT_GATEWAY,
  STRIPE_PUBLISHABLE_KEY: String(import.meta.env.VITE_MI_STRIPE_PUBLISHABLE_KEY),
  PAYPAL_CLIENT_ID: String(import.meta.env.VITE_MI_PAYPAL_CLIENT_ID),
  SET_LANGUAGE_FROM_IP: (import.meta.env.VITE_MI_SET_LANGUAGE_FROM_IP && import.meta.env.VITE_MI_SET_LANGUAGE_FROM_IP.toLowerCase()) === 'true',
  GOOGLE_ANALYTICS_ENABLED: (import.meta.env.VITE_MI_GOOGLE_ANALYTICS_ENABLED && import.meta.env.VITE_MI_GOOGLE_ANALYTICS_ENABLED.toLowerCase()) === 'true',
  GOOGLE_ANALYTICS_ID: String(import.meta.env.VITE_MI_GOOGLE_ANALYTICS_ID),
  FB_APP_ID: String(import.meta.env.VITE_MI_FB_APP_ID),
  APPLE_ID: String(import.meta.env.VITE_MI_APPLE_ID),
  GG_APP_ID: String(import.meta.env.VITE_MI_GG_APP_ID),
  MIN_LOCATIONS: Number.parseInt(String(import.meta.env.VITE_MI_MIN_LOCATIONS), 10) || 4,
  CONTACT_EMAIL: import.meta.env.VITE_MI_CONTACT_EMAIL,
  HIDE_AGENCIES: (import.meta.env.VITE_MI_HIDE_AGENCIES && import.meta.env.VITE_MI_HIDE_AGENCIES.toLowerCase()) === 'true',
}

export default env
