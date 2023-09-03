export const enum UserType {
    Admin = 'ADMIN',
    Agency = 'AGENCY',
    User = 'USER',
}

export const enum AppType {
    Backend = 'BACKEND',
    Frontend = 'FRONTEND',
}

export const enum PropertyType {
    House = 'HOUSE',
    Apartment = 'APPARTMENT',
    Townhouse = 'TOWNHOUSE',
    Plot = 'PLOT',
    Farm = 'FARM',
    Commercial = 'COMMERCIAL',
    Industrial = 'INDUSTRIAL',
}

export const enum BookingStatus {
    Void = 'VOID',
    Pending = 'PENDING',
    Deposit = 'DEPOSIT',
    Paid = 'PAID',
    Reserved = 'RESERVED',
    Cancelled = 'CANCELLED'
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
}

export interface CreateUserPayload {
    email: string
    phone: string
    location: string
    bio: string
    fullName: string
    type: string
    avatar: string
    birthDate: number | Date
    language: string
    agency: string
    password?: string
    verified?: boolean
    blacklisted?: boolean
}

export interface UpdateUserPayload extends CreateUserPayload {
    _id: string
    enableEmailNotifications: boolean
    payLater: boolean
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

export interface UpsertBookingPayload {
    _id?: string
    agency: string
    property: string
    renter: string
    from: Date
    to: Date
    status: string
    cancellation: boolean
    price: number
}

export interface Renter {
    email: string
    phone: string
    fullName: string
    birthDate: string
    language: string
    verified: boolean
    blacklisted: boolean
}

export interface Booking {
    agency: string
    property: string
    renter: string
    from: Date
    to: Date
    status: string
    cancellation: boolean
    price: number
}

export interface BookPayload {
    renter: Renter
    booking: Booking
}

export interface Filter {
    from: Date
    to: Date
    keyword?: string
}

export interface GetBookingsPayload {
    agencies: string[]
    statuses: string[]
    user?: string
    property?: string
    filter?: Filter
}

export interface CreatePropertyPayload {
    name: string
    type: string
    agency: string
    description: string
    image: string
    images: string[]
    bedrooms: number
    bathrooms: number
    kitchens: number
    parkingSpaces: number,
    size: number
    petsAllowed: boolean
    furnished: boolean
    minimumAge: number
    location: string
    address?: string
    price: number
    soldOut: boolean
    hidden: boolean
    cancellation: boolean
}

export interface UpdatePropertyPayload extends CreatePropertyPayload {
    tempImages: string[]
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
}

export interface ResendLinkPayload {
    email?: string
}

export interface UpdateEmailNotifications {
    _id: string
    enableEmailNotifications: boolean
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
