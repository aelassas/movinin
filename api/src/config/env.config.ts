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
