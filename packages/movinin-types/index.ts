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

export interface CreateBookingPayload {
    agency: string
    property: string
    renter: string
    from: Date
    to: Date
    status: string
    cancellation: boolean
    price: number
}

export interface UpdateBookingPayload extends CreateBookingPayload {
    _id: string
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
