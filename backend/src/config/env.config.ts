import * as movininTypes from ':movinin-types'
import Const from './const'

//
// ISO 639-1 language codes and their labels
// https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
//
const LANGUAGES = [
  {
    code: 'fr',
    label: 'Français',
  },
  {
    code: 'en',
    label: 'English',
  },
]

const env = {
  isMobile: window.innerWidth <= 960,

  WEBSITE_NAME: String(import.meta.env.VITE_MI_WEBSITE_NAME),

  APP_TYPE: movininTypes.AppType.Backend,
  API_HOST: String(import.meta.env.VITE_MI_API_HOST),
  LANGUAGES: LANGUAGES.map((l) => l.code),
  _LANGUAGES: LANGUAGES,
  DEFAULT_LANGUAGE: String(import.meta.env.VITE_MI_DEFAULT_LANGUAGE || 'en'),
  PAGE_SIZE: Number.parseInt(String(import.meta.env.VITE_MI_PAGE_SIZE), 10) || 30,
  PROPERTIES_PAGE_SIZE: Number.parseInt(String(import.meta.env.VITE_MI_PROPERTIES_PAGE_SIZE), 10) || 15,
  BOOKINGS_PAGE_SIZE: Number.parseInt(String(import.meta.env.VITE_MI_BOOKINGS_PAGE_SIZE), 10) || 20,
  BOOKINGS_MOBILE_PAGE_SIZE: Number.parseInt(String(import.meta.env.VITE_MI_BOOKINGS_MOBILE_PAGE_SIZE), 10) || 10,
  CDN_USERS: String(import.meta.env.VITE_MI_CDN_USERS),
  CDN_TEMP_USERS: String(import.meta.env.VITE_MI_CDN_TEMP_USERS),
  CDN_PROPERTIES: String(import.meta.env.VITE_MI_CDN_PROPERTIES),
  CDN_TEMP_PROPERTIES: String(import.meta.env.VITE_MI_CDN_TEMP_PROPERTIES),
  CDN_LOCATIONS: String(import.meta.env.VITE_MI_CDN_LOCATIONS),
  CDN_TEMP_LOCATIONS: String(import.meta.env.VITE_MI_CDN_TEMP_LOCATIONS),
  PAGE_OFFSET: 200,
  INFINITE_SCROLL_OFFSET: 40,
  AGENCY_IMAGE_WIDTH: Number.parseInt(String(import.meta.env.VITE_MI_AGENCY_IMAGE_WIDTH), 10) || 60,
  AGENCY_IMAGE_HEIGHT: Number.parseInt(String(import.meta.env.VITE_MI_AGENCY_IMAGE_HEIGHT), 10) || 30,
  PROPERTY_IMAGE_WIDTH: Number.parseInt(String(import.meta.env.VITE_MI_PROPERTY_IMAGE_WIDTH), 10) || 300,
  PROPERTY_IMAGE_HEIGHT: Number.parseInt(String(import.meta.env.VITE_MI_PROPERTY_IMAGE_HEIGHT), 10) || 200,
  PROPERTY_OPTION_IMAGE_HEIGHT: 85,
  SELECTED_PROPERTY_OPTION_IMAGE_HEIGHT: 30,
  MINIMUM_AGE: Number.parseInt(String(import.meta.env.VITE_MI_MINIMUM_AGE), 10) || 21,
  // PAGINATION_MODE: CLASSIC or INFINITE_SCROLL
  // If you choose CLASSIC, you will get a classic pagination with next and previous buttons on desktop and infinite scroll on mobile.
  // If you choose INFINITE_SCROLL, you will get infinite scroll on desktop and mobile.
  // Defaults to CLASSIC
  PAGINATION_MODE:
    (import.meta.env.VITE_MI_PAGINATION_MODE && import.meta.env.VITE_MI_PAGINATION_MODE.toUpperCase()) === Const.PAGINATION_MODE.INFINITE_SCROLL
      ? Const.PAGINATION_MODE.INFINITE_SCROLL
      : Const.PAGINATION_MODE.CLASSIC,
  SIZE_UNIT: 'm²',
  CURRENCY: import.meta.env.VITE_MI_CURRENCY || '$',
}

export default env
