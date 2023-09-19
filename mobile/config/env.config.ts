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

const EN = 'en' // English ISO 639-1 language code
const FR = 'fr' // French ISO 639-1 language code

export const APP_TYPE: string = 'frontend'
export const API_HOST: string = MI_API_HOST
export const AXIOS_RETRIES: number = 3
export const AXIOS_RETRIES_INTERVAL: number = 500  // in milliseconds
export const LANGUAGES: string[] = [EN, FR]
export const DEFAULT_LANGUAGE: string = MI_DEFAULT_LANGUAGE || EN
export const LANGUAGE: { EN: 'en', FR: 'fr' } = { EN, FR }
export const AXIOS_TIMEOUT: number = 5000 // in milliseconds
export const PAGE_SIZE: number = Number.parseInt(MI_PAGE_SIZE) || 20
export const PROPERTIES_PAGE_SIZE: number = Number.parseInt(MI_PROPERTIES_PAGE_SIZE) || 8
export const BOOKINGS_PAGE_SIZE: number = Number.parseInt(MI_BOOKINGS_PAGE_SIZE) || 8
export const CDN_USERS: string = MI_CDN_USERS
export const CDN_PROPERTIES: string = MI_CDN_PROPERTIES
export const PAGE_OFFSET: number = 200
export const AGENCY_IMAGE_WIDTH: number = Number.parseInt(MI_AGENCY_IMAGE_WIDTH) || 60
export const AGENCY_IMAGE_HEIGHT: number = Number.parseInt(MI_AGENCY_IMAGE_HEIGHT) || 30
export const PROPERTY_IMAGE_WIDTH: number = Number.parseInt(MI_PROPERTY_IMAGE_WIDTH) || 300
export const PROPERTY_IMAGE_HEIGHT: number = Number.parseInt(MI_PROPERTY_IMAGE_HEIGHT) || 200
export const PROPERTY_OPTION_IMAGE_HEIGHT: number = 85
export const SELECTED_PROPERTY_OPTION_IMAGE_HEIGHT: number = 30
export const MINIMUM_AGE: number = Number.parseInt(MI_MINIMUM_AGE) || 21
