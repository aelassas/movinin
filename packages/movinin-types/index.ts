
export interface Property {
    id: string
    name: string
}

export interface BackendSignUpBody {
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

export interface FrontendSignUpBody extends BackendSignUpBody {
    birthDate: number | Date
}

export interface CreateUserBody {
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

export interface UpdateUserBody extends CreateUserBody {
    _id: string
    enableEmailNotifications: boolean
    payLater: boolean
}

export interface changePasswordBody {
    _id: string
    password: string
    newPassword: string
    strict: boolean
}

export interface UpdateAgencyBody {
    _id: string
    fullName: string
    phone: string
    location: string
    bio: string
    payLater: boolean
}

export interface UpdateStatusBody {
    ids: string[],
    status: string
}

export interface CreateBookingBody {
    agency: string
    property: string
    renter: string
    from: Date
    to: Date
    status: string
    cancellation: boolean
    price: number
}

export interface UpdateBookingBody extends CreateBookingBody {
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

export interface BookBody {
    renter: Renter
    booking: Booking
}
