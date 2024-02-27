import * as movininTypes from 'movinin-types'

/**
 * Format a number.
 *
 * @export
 * @param {?number} [x]
 * @returns {string}
 */
export const formatNumber = (x?: number): string => {
    if (typeof x === 'number') {
        const parts: string[] = String(x % 1 !== 0 ? x.toFixed(2) : x).split('.')
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
        return parts.join('.')
    }
    return ''
}

/**
 * Format a Date number to two digits.
 *
 * @export
 * @param {number} n
 * @returns {string}
 */
export const formatDatePart = (n: number): string => {
    return n > 9 ? String(n) : '0' + n
}

/**
 * Capitalize a string.
 *
 * @export
 * @param {string} str
 * @returns {string}
 */
export const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Check if a value is a Date.
 *
 * @export
 * @param {?*} [value]
 * @returns {boolean}
 */
export const isDate = (value?: any): boolean => {
    return value instanceof Date && !Number.isNaN(value.valueOf())
}

/**
 * Join two url parts.
 *
 * @param {?string} [part1]
 * @param {?string} [part2]
 * @returns {string}
 */
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
    return part1 + '/' + part2
}

/**
 * Check if a string is an integer.
 *
 * @param {string} val
 * @returns {boolean}
 */
export const isInteger = (val: string) => {
    return /^\d+$/.test(val)
}

/**
 * Check if a string is a year.
 *
 * @param {string} val
 * @returns {boolean}
 */
export const isYear = (val: string) => {
    return /^\d{2}$/.test(val)
}

/**
 * Check if a string is a CVV.
 *
 * @param {string} val
 * @returns {boolean}
 */
export const isCvv = (val: string) => {
    return /^\d{3,4}$/.test(val)
}

/**
 * Check if two arrays are equal.
 *
 * @param {*} a
 * @param {*} b
 * @returns {boolean}
 */
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

/**
 * Clone an object or array.
 *
 * @param {*} obj
 * @returns {*}
 */
export const clone = (obj: any) => {
    return Array.isArray(obj) ? Array.from(obj) : Object.assign({}, obj)
}

/**
 * Clone an array.
 *
 * @export
 * @template T
 * @param {T[]} arr
 * @returns {(T[] | undefined | null)}
 */
export const cloneArray = <T>(arr: T[]): T[] | undefined | null => {
    if (typeof arr === 'undefined') {
        return undefined
    }
    if (arr == null) {
        return null
    }
    return [...arr]
}

/**
 * Check if two filters are equal.
 *
 * @param {?(movininTypes.Filter | null)} [a]
 * @param {?(movininTypes.Filter | null)} [b]
 * @returns {boolean}
 */
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

/**
 * Flatten Agency array.
 *
 * @param {movininTypes.User[]} companies
 * @returns {string[]}
 */
export const flattenAgencies = (companies: movininTypes.User[]): string[] =>
    companies.map((agency) => agency._id ?? '')

/**
 * Get number of days between two dates.
 *
 * @param {?Date} [from]
 * @param {?Date} [to]
 * @returns {number}
 */
export const days = (from?: Date, to?: Date) =>
    (from && to && Math.ceil((to.getTime() - from.getTime()) / (1000 * 3600 * 24))) || 0

/**
 * Check if User's language is French.
 *
 * @param {?movininTypes.User} [user]
 * @returns {boolean}
 */
export const fr = (user?: movininTypes.User) =>
    (user && user.language === 'fr') || false

/**
 * Convert Extra string to number.
 *
 * @param {string} extra
 * @returns {number}
 */
export const extraToNumber = (extra: string) => (extra === '' ? -1 : Number(extra))

/**
 * Convert Extra number to string.
 *
 * @param {number} extra
 * @returns {string}
 */
export const extraToString = (extra: number) => (extra === -1 ? '' : String(extra))

/**
 * Trim carriage return.
 *
 * @param {string} str
 * @returns {string}
 */
export const trimCarriageReturn = (str: string) => str.replace(/[\n\r]+/g, '')

/**
 * Get total days between two dates.
 *
 * @param {Date} date1
 * @param {Date} date2
 * @returns {number}
 */
export const totalDays = (date1: Date, date2: Date) =>
    Math.ceil((date2.getTime() - date1.getTime()) / (1000 * 3600 * 24))

/**
 * Get number of days in a month.
 *
 * @param {number} month
 * @param {number} year
 * @returns {number}
 */
export const daysInMonth = (month: number, year: number) =>
    new Date(year, month, 0).getDate()

/**
 * Get number of days in a year.
 *
 * @param {number} year
 * @returns {(366 | 365)}
 */
export const daysInYear = (year: number) =>
    ((year % 4 === 0 && year % 100 > 0) || year % 400 == 0) ? 366 : 365

/**
 * Get all PropertyTypes.
 *
 * @returns {movininTypes.PropertyType[]}
 */
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

/**
 * Get all RentalTerms.
 *
 * @returns {movininTypes.RentalTerm}
 */
export const getAllRentalTerms = () =>
    [
        movininTypes.RentalTerm.Monthly,
        movininTypes.RentalTerm.Weekly,
        movininTypes.RentalTerm.Daily,
        movininTypes.RentalTerm.Yearly,
    ]
