import process from 'node:process'
import { Document, Types } from 'mongoose'
import * as movininTypes from 'movinin-types'
import * as Helper from '../common/Helper'

const __env__ = (name: string, required?: boolean, defaultValue?: string): string => {
    const value = process.env[name]
    if (required && !value) {
        throw new Error(`'${name} not found`)
    }
    if (!value) {
        return defaultValue || ''
    }
    return String(value)
}

export const PORT = Number.parseInt(__env__('MI_PORT', false, '4003'), 10)
export const HTTPS = Helper.StringToBoolean(__env__('MI_HTTPS'))
export const PRIVATE_KEY = __env__('MI_PRIVATE_KEY', HTTPS)
export const CERTIFICATE = __env__('MI_CERTIFICATE', HTTPS)

export const DB_URI = __env__('MI_DB_URI', false, 'mongodb://127.0.0.1:27017/movinin?authSource=admin&appName=movinin')
export const DB_SSL = Helper.StringToBoolean(__env__('MI_DB_SSL', false, 'false'))
export const DB_SSL_CERT = __env__('MI_DB_SSL_CERT', DB_SSL)
export const DB_SSL_CA = __env__('MI_DB_SSL_CA', DB_SSL)
export const DB_DEBUG = Helper.StringToBoolean(__env__('MI_DB_DEBUG', false, 'false'))

export const JWT_SECRET = __env__('MI_JWT_SECRET', false, 'Movinin')
export const JWT_EXPIRE_AT = Number.parseInt(__env__('MI_JWT_EXPIRE_AT', false, '86400'), 10) // in seconds (default: 1d)
export const TOKEN_EXPIRE_AT = Number.parseInt(__env__('MI_TOKEN_EXPIRE_AT', false, '86400'), 10) // in seconds (default: 1d)

export const SMTP_HOST = __env__('MI_SMTP_HOST', true)
export const SMTP_PORT = Number.parseInt(__env__('MI_SMTP_PORT', true), 10)
export const SMTP_USER = __env__('MI_SMTP_USER', true)
export const SMTP_PASS = __env__('MI_SMTP_PASS', true)
export const SMTP_FROM = __env__('MI_SMTP_FROM', true)

export const CDN_USERS = __env__('MI_CDN_USERS', true)
export const CDN_TEMP_USERS = __env__('MI_CDN_TEMP_USERS', true)
export const CDN_PROPERTIES = __env__('MI_CDN_PROPERTIES', true)
export const CDN_TEMP_PROPERTIES = __env__('MI_CDN_TEMP_PROPERTIES', true)

export const BACKEND_HOST = __env__('MI_BACKEND_HOST', true)
export const FRONTEND_HOST = __env__('MI_FRONTEND_HOST', true)

export const DEFAULT_LANGUAGE = __env__('MI_DEFAULT_LANGUAGE', false, 'en')
export const MINIMUM_AGE = Number.parseInt(__env__('MI_MINIMUM_AGE', false, '21'), 10)
export const EXPO_ACCESS_TOKEN = __env__('MI_EXPO_ACCESS_TOKEN', false)

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


export interface Location extends Document {
    values: Types.ObjectId[]
}

export interface LocationValue extends Document {
    language: string
    value: string
}

export interface LocationInfo extends Document {
    _id?: Types.ObjectId
    name?: string
    values: LocationValue[]
}


export interface Notification extends Document {
    user: Types.ObjectId
    message: string
    booking: Types.ObjectId
    isRead?: boolean
}

export interface NotificationCounter extends Document {
    user: Types.ObjectId
    count?: number
}

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
    soldOut?: boolean
    hidden?: boolean
    cancellation?: number
    aircon?: boolean
    available?: boolean
    rentalTerm: movininTypes.RentalTerm
}

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
    soldOut?: boolean
    hidden?: boolean
    cancellation?: boolean
    rentalTerm: movininTypes.RentalTerm
}

export interface PushNotification extends Document {
    user: Types.ObjectId
    token: string
}

export interface Token extends Document {
    user: Types.ObjectId
    token: string
    expireAt?: Date
}

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
