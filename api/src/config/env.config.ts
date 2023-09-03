import process from 'node:process'
import { Document, Types } from 'mongoose'
import * as movininTypes from 'movinin-types'

export const DEFAULT_LANGUAGE = String(process.env.MI_DEFAULT_LANGUAGE)

export interface Booking extends Document {
    agency: Types.ObjectId
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
