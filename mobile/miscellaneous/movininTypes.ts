/* eslint-disable no-shadow */

//
// Metro does not support symlinks
//

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
    Apartment = 'APARTMENT',
    Commercial = 'COMMERCIAL',
    Farm = 'FARM',
    House = 'HOUSE',
    Industrial = 'INDUSTRIAL',
    Plot = 'PLOT',
    Townhouse = 'TOWNHOUSE',
}

export enum BookingStatus {
    Void = 'VOID',
    Pending = 'PENDING',
    Deposit = 'DEPOSIT',
    Paid = 'PAID',
    Reserved = 'RESERVED',
    Cancelled = 'CANCELLED'
}

export enum RecordType {
    Admin = 'ADMIN',
    Agency = 'AGENCY',
    User = 'USER',
    Property = 'PROPERTY',
    Location = 'LOCATION'
}

export enum Availablity {
    Available = 'AVAILABLE',
    Unavailable = 'UNAVAILABLE'
}

export enum RentalTerm {
    Monthly = 'MONTHLY',
    Weekly = 'WEEKLY',
    Daily = 'DAILY',
    Yearly = 'YEARLY'
}

export interface BackendSignUpPayload {
    email: string
    password: string
    fullName: string
    language: string
    active?: boolean
    verified?: boolean
    blacklisted?: boolean
    type?: string
    avatar?: string
}

export interface FrontendSignUpPayload extends BackendSignUpPayload {
    birthDate: number | Date
    phone: string
}

export interface CreateUserPayload {
    email?: string
    phone: string
    location: string
    bio: string
    fullName: string
    type?: string
    avatar?: string
    birthDate?: number | Date
    language?: string
    agency?: string
    password?: string
    verified?: boolean
    blacklisted?: boolean
    payLater?: boolean
}

export interface UpdateUserPayload extends CreateUserPayload {
    _id: string
    enableEmailNotifications?: boolean
    payLater?: boolean
}

export interface changePasswordPayload {
    _id: string
    password: string
    newPassword: string
    strict: boolean
}

export interface UpdateAgencyPayload {
    _id: string
    fullName: string
    phone: string
    location: string
    bio: string
    payLater: boolean
}

export interface UpdateStatusPayload {
    ids: string[],
    status: string
}

export interface Renter {
    _id?: string
    email: string
    phone: string
    fullName: string
    birthDate: string
    language: string
    verified: boolean
    blacklisted: boolean
}

export interface Booking {
    _id?: string
    agency: string | User
    property: string | Property
    renter?: string | User
    from: Date
    to: Date
    status: BookingStatus
    cancellation: boolean
    price?: number
    location: string | Location
    cancelRequest?: boolean
}

export interface CheckoutPayload {
    renter?: User
    booking: Booking
    payLater?: boolean
}

export interface Filter {
    from?: Date
    to?: Date
    location?: string
    keyword?: string
}

export interface GetBookingsPayload {
    agencies: string[]
    statuses: string[]
    user?: string
    property?: string
    filter?: Filter
    language: string
}

export interface LocationName {
    language: string
    name: string
}

export interface ActivatePayload {
    userId: string
    token: string
    password: string
}

export interface ValidateEmailPayload {
    email: string
}

export interface SignInPayload {
    email: string
    password?: string
    stayConnected?: boolean
    mobile?: boolean
}

export interface ResendLinkPayload {
    email?: string
}

export interface UpdateLanguage {
    id: string
    language: string
}

export interface ValidateAgencyPayload {
    fullName: string
}

export interface ValidateLocationPayload {
    language: string
    name: string
}

export interface GetBookingPropertiesPayload {
    agency: string
    location: string
}

export interface User {
    _id?: string
    agency?: User | string
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
    accessToken?: string
    checked?: boolean
}

export interface Option {
    _id: string
    name?: string
    image?: string
}

export interface LocationValue {
    language: string
    value?: string
    name?: string
}

export interface Location {
    _id: string
    name?: string
    values?: LocationValue[]
}

export interface Property {
    _id: string
    name: string
    type: PropertyType
    agency: User
    description: string
    available: boolean
    image: string
    images?: string[]
    bedrooms: number
    bathrooms: number
    kitchens: number
    parkingSpaces: number,
    size?: number
    petsAllowed: boolean
    furnished: boolean
    aircon: boolean
    minimumAge: number
    location: Location
    address?: string
    price: number
    hidden: boolean
    cancellation: number
    rentalTerm: RentalTerm
    [propKey: string]: any
}

export interface CreatePropertyPayload {
    name: string
    agency: string
    type: string
    description: string
    image: string
    images?: string[]
    available: boolean
    bedrooms: number
    bathrooms: number
    kitchens: number
    parkingSpaces: number
    size?: number
    petsAllowed: boolean
    furnished: boolean
    aircon: boolean
    minimumAge: number
    location?: string
    address: string
    price: number
    hidden: boolean
    cancellation: number
    rentalTerm: string
}

export interface UpdatePropertyPayload extends CreatePropertyPayload {
    _id: string
}

export interface Notification {
    _id: string
    user: string
    message: string
    booking?: string
    isRead?: boolean
    checked?: boolean
    createdAt?: Date
}

export interface NotificationCounter {
    _id: string
    user: string
    count: number
}

export interface ResultData<T> {
    pageInfo: { totalRecords: number }
    resultData: T[]
}

export type Result<T> = [ResultData<T>] | [] | undefined | null

export interface Data<T> {
    rows: T[]
    rowCount: number
}

export interface ChangePasswordPayload {
    _id: string
    password: string
    newPassword: string
    strict: boolean
}

export interface UpdateEmailNotificationsPayload {
    _id: string
    enableEmailNotifications: boolean
}

export interface GetPropertiesPayload {
    agencies: string[]
    types?: PropertyType[]
    rentalTerms?: RentalTerm[]
    availability?: Availablity[]
    location?: string
    language?: string
}

export interface UpdateLanguagePayload {
    id: string
    language: string
}

export interface GetUsersBody {
    user: string
    types: UserType[]
}

export interface PropertyOptions {
    cancellation?: boolean
}

//
// React types
//
export type DataEvent<T> = (data?: Data<T>) => void

export interface StatusFilterItem {
    label: string
    value: BookingStatus
    checked?: boolean
}

export interface PropertyFilter {
    location: Location
    from: Date
    to: Date
}

export type PropertyFilterSubmitEvent = (filter: PropertyFilter) => void
