// Metro does not support symlinks

import * as movininTypes from './movininTypes'

export const formatNumber = (x?: number): string => {
    if (typeof x === 'number') {
        const parts: string[] = String(x % 1 !== 0 ? x.toFixed(2) : x).split('.')
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
        return parts.join('.')
    }
    return ''
}

export const formatDatePart = (n: number): string => (n > 9 ? String(n) : `0${n}`)

export const capitalize = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1)

export const isDate = (date?: Date): boolean => date instanceof Date && !Number.isNaN(date.valueOf())

export const joinURL = (part1?: string, part2?: string) => {
    if (!part1 || !part2) {
        const msg = '[joinURL] part undefined'
        console.log(msg)
        throw new Error(msg)
    }

    if (part1.charAt(part1.length - 1) === '/') {
        part1 = part1.substring(0, part1.length - 1)
    }
    if (part2.charAt(0) === '/') {
        part2 = part2.substring(1)
    }
    return `${part1}/${part2}`
}

export const isInteger = (val: string) => /^\d+$/.test(val)

export const isYear = (val: string) => /^\d{2}$/.test(val)

export const isCvv = (val: string) => /^\d{3,4}$/.test(val)

export const arrayEqual = (a: any, b: any) => {
    if (a === b) {
        return true
    }
    if (a == null || b == null) {
        return false
    }
    if (a.length !== b.length) {
        return false
    }

    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.

    for (let i = 0; i < a.length; i += 1) {
        if (a[i] !== b[i]) {
            return false
        }
    }
    return true
}

export const clone = (obj: any) => (Array.isArray(obj) ? Array.from(obj) : ({ ...obj }))

export const cloneArray = <T>(arr: T[]): T[] | undefined | null => {
    if (typeof arr === 'undefined') {
        return undefined
    }
    if (arr == null) {
        return null
    }
    return [...arr]
}

export const filterEqual = (a?: movininTypes.Filter | null, b?: movininTypes.Filter | null) => {
    if (a === b) {
        return true
    }
    if (a == null || b == null) {
        return false
    }

    if (a.from !== b.from) {
        return false
    }
    if (a.to !== b.to) {
        return false
    }
    if (a.keyword !== b.keyword) {
        return false
    }

    return true
}

export const flattenAgencies = (agencies: movininTypes.User[]): string[] =>
    agencies.map((agency) => agency._id ?? '')

export const days = (from?: Date, to?: Date) =>
    (from && to && Math.ceil((to.getTime() - from.getTime()) / (1000 * 3600 * 24))) || 0

export const fr = (user?: movininTypes.User) =>
    (user && user.language === 'fr') || false

export const extraToNumber = (extra: string) => (extra === '' ? -1 : Number(extra))

export const extraToString = (extra: number) => (extra === -1 ? '' : String(extra))

export const trimCarriageReturn = (str: string) => str.replace(/[\n\r]+/g, '')

export const totalDays = (date1: Date, date2: Date) =>
    Math.ceil((date2.getTime() - date1.getTime()) / (1000 * 3600 * 24))

export const daysInMonth = (month: number, year: number) =>
    new Date(year, month, 0).getDate()

export const daysInYear = (year: number) =>
    (((year % 4 === 0 && year % 100 > 0) || year % 400 === 0) ? 366 : 365)

export const getAllPropertyTypes = () =>
    [
        movininTypes.PropertyType.Apartment,
        movininTypes.PropertyType.Commercial,
        movininTypes.PropertyType.Farm,
        movininTypes.PropertyType.House,
        movininTypes.PropertyType.Industrial,
        movininTypes.PropertyType.Plot,
        movininTypes.PropertyType.Townhouse
    ]

export const getAllRentalTerms = () =>
    [
        movininTypes.RentalTerm.Monthly,
        movininTypes.RentalTerm.Weekly,
        movininTypes.RentalTerm.Daily,
        movininTypes.RentalTerm.Yearly,
    ]
