import { Types } from "mongoose"

export const DEFAULT_LANGUAGE = 'en'

export enum UserType {
    Admin = 'ADMIN',
    Agency = 'AGENCY',
    User = 'USER',
}

export enum AppType {
    Backend = 'BACKEND',
    Frontend = 'FRONTEND',
}

export enum PropertyType {
    House = 'HOUSE',
    Apartment = 'APPARTMENT',
    Townhouse = 'TOWNHOUSE',
    Plot = 'PLOT',
    Farm = 'FARM',
    Commercial = 'COMMERCIAL',
    Industrial = 'INDUSTRIAL',
}

export enum BookingStatus {
    Void = 'VOID',
    Pending = 'PENDING',
    Deposit = 'Deposit',
    Paid = 'PAID',
    Reserved = 'RESERVED',
    Cancelled = 'CANCELLED'
}

export interface Booking {
    _id?: Types.ObjectId
    agency: Types.ObjectId
    property: Types.ObjectId
    renter: Types.ObjectId
    from: Date
    to: Date
    status: BookingStatus
    cancellation?: boolean
    cancelRequest?: boolean
    price: number
}

export interface Location {
    _id?: Types.ObjectId
    values: Types.ObjectId[]
}

export interface LocationValue {
    _id?: Types.ObjectId
    language: string
    value: string
}

export interface Notification {
    _id?: Types.ObjectId
    user: Types.ObjectId
    message: string
    booking: Types.ObjectId
    isRead?: boolean
}

export interface NotificationCounter {
    _id?: Types.ObjectId
    user: Types.ObjectId
    count?: number
}

export interface Property {
    _id?: Types.ObjectId
    name: string
    type: PropertyType
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

export interface PushNotification {
    _id?: Types.ObjectId
    user: Types.ObjectId
    token: string
}

export interface Token {
    _id?: Types.ObjectId
    user: Types.ObjectId
    token: string
    expireAt?: Date
}

export interface User {
    _id?: Types.ObjectId
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
    avatar?: string | null
    bio?: string
    location?: string
    type?: string
    blacklisted?: boolean
    payLater?: boolean
}
