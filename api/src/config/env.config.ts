import process from 'node:process'
import { Document, Types } from 'mongoose'
import { CookieOptions } from 'express'
import * as movininTypes from 'movinin-types'
import * as helper from '../common/helper'

/**
 * Get environment variable value.
 *
 * @param {string} name
 * @param {?boolean} [required]
 * @param {?string} [defaultValue]
 * @returns {string}
 */
export const __env__ = (name: string, required?: boolean, defaultValue?: string): string => {
    const value = process.env[name]
    if (required && !value) {
        throw new Error(`'${name} not found`)
    }
    if (!value) {
        return defaultValue || ''
    }
    return String(value)
}

/**
 * Server Port. Default is 4004.
 *
 * @type {number}
 */
export const PORT = Number.parseInt(__env__('MI_PORT', false, '4004'), 10)

/**
 * Indicate whether HTTPS is enabled or not.
 *
 * @type {boolean}
 */
export const HTTPS = helper.StringToBoolean(__env__('MI_HTTPS'))

/**
 * Private SSL key filepath.
 *
 * @type {string}
 */
export const PRIVATE_KEY = __env__('MI_PRIVATE_KEY', HTTPS)

/**
 * Private SSL certificate filepath.
 *
 * @type {string}
 */
export const CERTIFICATE = __env__('MI_CERTIFICATE', HTTPS)

/**
 * MongoDB database URI. Default is: mongodb://127.0.0.1:27017/movinin?authSource=admin&appName=movinin
 *
 * @type {string}
 */
export const DB_URI = __env__('MI_DB_URI', false, 'mongodb://127.0.0.1:27017/movinin?authSource=admin&appName=movinin')

/**
 * Indicate whether MongoDB SSL is enabled or not.
 *
 * @type {boolean}
 */
export const DB_SSL = helper.StringToBoolean(__env__('MI_DB_SSL', false, 'false'))

/**
 * MongoDB SSL certificate filepath.
 *
 * @type {string}
 */
export const DB_SSL_CERT = __env__('MI_DB_SSL_CERT', DB_SSL)

/**
 * MongoDB SSL CA certificate filepath.
 *
 * @type {string}
 */
export const DB_SSL_CA = __env__('MI_DB_SSL_CA', DB_SSL)

/**
 * Indicate whether MongoDB debug is enabled or not.
 *
 * @type {boolean}
 */
export const DB_DEBUG = helper.StringToBoolean(__env__('MI_DB_DEBUG', false, 'false'))

/**
 * Cookie secret. It should at least be 32 characters long, but the longer the better.
 *
 * @type {string}
 */
export const COOKIE_SECRET = __env__('MI_COOKIE_SECRET', false, 'Movinin')

/**
 * Authentication cookie domain.
 * Default is localhost.
 *
 * @type {string}
 */
export const AUTH_COOKIE_DOMAIN = __env__('MI_AUTH_COOKIE_DOMAIN', false, 'localhost')

/**
 * Cookie options.
 *
 * On production, authentication cookies are httpOnly, signed, secure and strict sameSite.
 * This will prevent XSS attacks by not allowing access to the cookie via JavaScript.
 * This will prevent CSRF attacks by not allowing the browser to send the cookie along with cross-site requests.
 * This will prevent MITM attacks by only allowing the cookie to be sent over HTTPS.
 * Authentication cookies are protected against XST attacks as well by disabling TRACE HTTP method via allowedMethods middleware.
 *
 * @type {CookieOptions}
 */
export const COOKIE_OPTIONS: CookieOptions = { httpOnly: true, secure: HTTPS, signed: true, sameSite: 'strict', domain: AUTH_COOKIE_DOMAIN }

/**
 * frontend authentication cookie name.
 *
 * @type {"mi-x-access-token-frontend"}
 */
export const FRONTEND_AUTH_COOKIE_NAME = 'mi-x-access-token-frontend'

/**
 * Backend authentication cookie name.
 *
 * @type {"mi-x-access-token-frontend"}
 */
export const BACKEND_AUTH_COOKIE_NAME = 'mi-x-access-token-backend'

/**
 * Mobile App and unit tests authentication header name.
 *
 * @type {"x-access-token"}
 */
export const X_ACCESS_TOKEN = 'x-access-token'

/**
 * JWT secret. It should at least be 32 characters long, but the longer the better.
 *
 * @type {string}
 */
export const JWT_SECRET = __env__('MI_JWT_SECRET', false, 'Movinin')

/**
 * JWT expiration in seconds. Default is 86400 seconds.
 *
 * @type {number}
 */
export const JWT_EXPIRE_AT = Number.parseInt(__env__('MI_JWT_EXPIRE_AT', false, '86400'), 10) // in seconds (default: 1d)

/**
 * Validation Token expiration in seconds. Default is 86400 seconds.
 *
 * @type {number}
 */
export const TOKEN_EXPIRE_AT = Number.parseInt(__env__('MI_TOKEN_EXPIRE_AT', false, '86400'), 10) // in seconds (default: 1d)

/**
 * SMTP host.
 *
 * @type {string}
 */
export const SMTP_HOST = __env__('MI_SMTP_HOST', true)

/**
 * SMTP port.
 *
 * @type {number}
 */
export const SMTP_PORT = Number.parseInt(__env__('MI_SMTP_PORT', true), 10)

/**
 * SMTP username.
 *
 * @type {string}
 */
export const SMTP_USER = __env__('MI_SMTP_USER', true)

/**
 * SMTP password.
 *
 * @type {string}
 */
export const SMTP_PASS = __env__('MI_SMTP_PASS', true)

/**
 * SMTP from email.
 *
 * @type {string}
 */
export const SMTP_FROM = __env__('MI_SMTP_FROM', true)

/**
 * Users' cdn folder path.
 *
 * @type {string}
 */
export const CDN_USERS = __env__('MI_CDN_USERS', true)

/**
 * Users' temp cdn folder path.
 *
 * @type {string}
 */
export const CDN_TEMP_USERS = __env__('MI_CDN_TEMP_USERS', true)

/**
 * Properties' cdn folder path.
 *
 * @type {string}
 */
export const CDN_PROPERTIES = __env__('MI_CDN_PROPERTIES', true)

/**
 * Properties' temp cdn folder path.
 *
 * @type {string}
 */
export const CDN_TEMP_PROPERTIES = __env__('MI_CDN_TEMP_PROPERTIES', true)

/**
 * Backend host.
 *
 * @type {string}
 */
export const BACKEND_HOST = __env__('MI_BACKEND_HOST', true)

/**
 * Frontend host.
 *
 * @type {string}
 */
export const FRONTEND_HOST = __env__('MI_FRONTEND_HOST', true)

/**
 * Default language. Default is en. Available options: en, fr.
 *
 * @type {string}
 */
export const DEFAULT_LANGUAGE = __env__('MI_DEFAULT_LANGUAGE', false, 'en')

/**
 * Default Minimum age for rental. Default is 21 years.
 *
 * @type {number}
 */
export const MINIMUM_AGE = Number.parseInt(__env__('MI_MINIMUM_AGE', false, '21'), 10)

/**
 * Expo push access token.
 *
 * @type {string}
 */
export const EXPO_ACCESS_TOKEN = __env__('MI_EXPO_ACCESS_TOKEN', false)

/**
 * User Document.
 *
 * @export
 * @interface User
 * @typedef {User}
 * @extends {Document}
 */
export interface User extends Document {
    agency?: Types.ObjectId
    fullName: string
    email: string
    phone?: string
    password?: string
    birthDate?: Date
    verified?: boolean
    verifiedAt?: Date
    active?: boolean
    language: string
    enableEmailNotifications?: boolean
    avatar?: string
    bio?: string
    location?: string
    type?: movininTypes.UserType
    blacklisted?: boolean
    payLater?: boolean
}

/**
 * UserInfo.
 *
 * @export
 * @interface UserInfo
 * @typedef {UserInfo}
 */
export interface UserInfo {
    _id?: Types.ObjectId
    agency?: Types.ObjectId
    fullName: string
    email?: string
    phone?: string
    password?: string
    birthDate?: Date
    verified?: boolean
    verifiedAt?: Date
    active?: boolean
    language?: string
    enableEmailNotifications?: boolean
    avatar?: string
    bio?: string
    location?: string
    type?: string
    blacklisted?: boolean
    payLater?: boolean
}

/**
 * Booking Document.
 *
 * @export
 * @interface Booking
 * @typedef {Booking}
 * @extends {Document}
 */
export interface Booking extends Document {
    agency: Types.ObjectId
    location: Types.ObjectId
    property: Types.ObjectId
    renter: Types.ObjectId
    from: Date
    to: Date
    status: movininTypes.BookingStatus
    cancellation?: boolean
    cancelRequest?: boolean
    price: number
}

/**
 * BookingInfo.
 *
 * @export
 * @interface BookingInfo
 * @typedef {BookingInfo}
 */
export interface BookingInfo {
    _id?: Types.ObjectId
    agency: UserInfo
    property: Types.ObjectId
    renter: UserInfo
    from: Date
    to: Date
    status: movininTypes.BookingStatus
    cancellation?: boolean
    cancelRequest?: boolean
    price: number
}

/**
 * Location Document.
 *
 * @export
 * @interface Location
 * @typedef {Location}
 * @extends {Document}
 */
export interface Location extends Document {
    values: Types.ObjectId[]
}

/**
 * LocationValue Document.
 *
 * @export
 * @interface LocationValue
 * @typedef {LocationValue}
 * @extends {Document}
 */
export interface LocationValue extends Document {
    language: string
    value: string
}

/**
 * LocationInfo.
 *
 * @export
 * @interface LocationInfo
 * @typedef {LocationInfo}
 * @extends {Document}
 */
export interface LocationInfo extends Document {
    _id?: Types.ObjectId
    name?: string
    values: LocationValue[]
}

/**
 * Notification Document.
 *
 * @export
 * @interface Notification
 * @typedef {Notification}
 * @extends {Document}
 */
export interface Notification extends Document {
    user: Types.ObjectId
    message: string
    booking: Types.ObjectId
    isRead?: boolean
}

/**
 * NotificationCounter Document.
 *
 * @export
 * @interface NotificationCounter
 * @typedef {NotificationCounter}
 * @extends {Document}
 */
export interface NotificationCounter extends Document {
    user: Types.ObjectId
    count?: number
}

/**
 * Property Document.
 *
 * @export
 * @interface Property
 * @typedef {Property}
 * @extends {Document}
 */
export interface Property extends Document {
    name: string
    type: movininTypes.PropertyType
    agency: Types.ObjectId
    description: string
    image: string
    images?: string[]
    bedrooms: number
    bathrooms: number
    kitchens?: number
    parkingSpaces?: number,
    size?: number
    petsAllowed: boolean
    furnished: boolean
    minimumAge: number
    location: Types.ObjectId
    address?: string
    price: number
    hidden?: boolean
    cancellation?: number
    aircon?: boolean
    available?: boolean
    rentalTerm: movininTypes.RentalTerm
}

/**
 * PropertyInfo.
 *
 * @export
 * @interface PropertyInfo
 * @typedef {PropertyInfo}
 * @extends {Document}
 */
export interface PropertyInfo extends Document {
    name: string
    type: movininTypes.PropertyType
    agency: UserInfo
    description: string
    image: string
    images?: string[]
    bedrooms: number
    bathrooms: number
    kitchens?: number
    parkingSpaces?: number,
    size: number
    petsAllowed: boolean
    furnished: boolean
    minimumAge: number
    location: Types.ObjectId
    address?: string
    price: number
    hidden?: boolean
    cancellation?: boolean
    rentalTerm: movininTypes.RentalTerm
}

/**
 * PushToken Document.
 *
 * @export
 * @interface PushToken
 * @typedef {PushToken}
 * @extends {Document}
 */
export interface PushToken extends Document {
    user: Types.ObjectId
    token: string
}

/**
 * Token Document.
 *
 * @export
 * @interface Token
 * @typedef {Token}
 * @extends {Document}
 */
export interface Token extends Document {
    user: Types.ObjectId
    token: string
    expireAt?: Date
}
