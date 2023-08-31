
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
