import { toast } from 'react-toastify'
import * as movininTypes from 'movinin-types'
import * as movininHelper from 'movinin-helper'
import { strings as commonStrings } from '../lang/common'
import { strings as rtStrings } from '../lang/rental-term'
import { strings } from '../lang/properties'
import * as PropertyService from '../services/PropertyService'
import env from '../config/env.config'

/**
 * Get language.
 *
 * @param {string} code
 * @returns {*}
 */
export const getLanguage = (code: string) => env._LANGUAGES.find((l) => l.code === code)

/**
 * Toast info message.
 *
 * @param {string} message
 */
export const info = (message: string) => {
  toast(message, { type: 'info' })
}

/**
 * Toast error message.
 *
 * @param {?unknown} [err]
 * @param {?string} [message]
 */
export const error = (err?: unknown, message?: string) => {
  if (err && console && console.error) {
    console.error(err)
  }
  if (message) {
    toast(message, { type: 'error' })
  } else {
    toast(commonStrings.GENERIC_ERROR, { type: 'error' })
  }
}

/**
 * Get property type label.
 *
 * @param {string} type
 * @returns {string}
 */
export const getPropertyType = (type: string) => {
  switch (type) {
    case movininTypes.PropertyType.Apartment:
      return strings.APARTMENT

    case movininTypes.PropertyType.Commercial:
      return strings.COMMERCIAL

    case movininTypes.PropertyType.Farm:
      return strings.FARM

    case movininTypes.PropertyType.House:
      return strings.HOUSE

    case movininTypes.PropertyType.Industrial:
      return strings.INDUSTRIAL

    case movininTypes.PropertyType.Plot:
      return strings.PLOT

    case movininTypes.PropertyType.Townhouse:
      return strings.TOWN_HOUSE
    default:
      return ''
  }
}

/**
 * Check whether a user is an administrator or not.
 *
 * @param {?movininTypes.User} [user]
 * @returns {boolean}
 */
export const admin = (user?: movininTypes.User): boolean =>
  (user && user.type === movininTypes.RecordType.Admin) ?? false

/**
 * Get booking status label.
 *
 * @param {string} status
 * @returns {string}
 */
export const getBookingStatus = (status?: movininTypes.BookingStatus) => {
  switch (status) {
    case movininTypes.BookingStatus.Void:
      return commonStrings.BOOKING_STATUS_VOID

    case movininTypes.BookingStatus.Pending:
      return commonStrings.BOOKING_STATUS_PENDING

    case movininTypes.BookingStatus.Deposit:
      return commonStrings.BOOKING_STATUS_DEPOSIT

    case movininTypes.BookingStatus.Paid:
      return commonStrings.BOOKING_STATUS_PAID

    case movininTypes.BookingStatus.Reserved:
      return commonStrings.BOOKING_STATUS_RESERVED

    case movininTypes.BookingStatus.Cancelled:
      return commonStrings.BOOKING_STATUS_CANCELLED

    default:
      return ''
  }
}

/**
 * Get all booking statuses.
 *
 * @returns {movininTypes.StatusFilterItem[]}
 */
export const getBookingStatuses = (): movininTypes.StatusFilterItem[] => [
  {
    value: movininTypes.BookingStatus.Void,
    label: commonStrings.BOOKING_STATUS_VOID,
  },
  {
    value: movininTypes.BookingStatus.Pending,
    label: commonStrings.BOOKING_STATUS_PENDING,
  },
  {
    value: movininTypes.BookingStatus.Deposit,
    label: commonStrings.BOOKING_STATUS_DEPOSIT,
  },
  {
    value: movininTypes.BookingStatus.Paid,
    label: commonStrings.BOOKING_STATUS_PAID,
  },
  {
    value: movininTypes.BookingStatus.Reserved,
    label: commonStrings.BOOKING_STATUS_RESERVED,
  },
  {
    value: movininTypes.BookingStatus.Cancelled,
    label: commonStrings.BOOKING_STATUS_CANCELLED,
  },
]

/**
 * Get bedrooms tooltip.
 *
 * @param {number} bedrooms
 * @param {?boolean} [fr]
 * @returns {string}
 */
export const getBedroomsTooltip = (bedrooms: number, fr?: boolean) =>
  `${strings.TOOLTIP_1}${bedrooms} ${fr
    ? bedrooms > 1 ? strings.BEDROOMS_TOOLTIP_2 : strings.BEDROOMS_TOOLTIP_1
    : strings.BEDROOMS_TOOLTIP_1 + (bedrooms > 1 ? 's' : '')}`

/**
 * Get bathrooms tooltip.
 *
 * @param {number} bathrooms
 * @param {?boolean} [fr]
 * @returns {string}
 */
export const getBathroomsTooltip = (bathrooms: number, fr?: boolean) =>
  `${strings.TOOLTIP_1}${bathrooms} ${fr
    ? bathrooms > 1 ? strings.BATHROOMS_TOOLTIP_2 : strings.BATHROOMS_TOOLTIP_1
    : strings.BATHROOMS_TOOLTIP_1 + (bathrooms > 1 ? 's' : '')}`

/**
 * Get kitchens tooltip.
 *
 * @param {number} bathrooms
 * @returns {string}
 */
export const getKitchensTooltip = (bathrooms: number) =>
  `${strings.TOOLTIP_1}${bathrooms} ${strings.KITCHENS_TOOLTIP_1 + (bathrooms > 1 ? 's' : '')}`

/**
 * Get parking spaces tooltip.
 *
 * @param {number} parkingSpaces
 * @param {?boolean} [fr]
 * @returns {string}
 */
export const getKParkingSpacesTooltip = (parkingSpaces: number, fr?: boolean) =>
  `${strings.TOOLTIP_1}${parkingSpaces} ${fr
    ? parkingSpaces > 1 ? strings.PARKING_SPACES_TOOLTIP_2 : strings.PARKING_SPACES_TOOLTIP_1
    : strings.PARKING_SPACES_TOOLTIP_1 + (parkingSpaces > 1 ? 's' : '')}`

/**
 * Get price.
 *
 * @async
 * @param {movininTypes.Booking} booking
 * @param {(movininTypes.Property | undefined | null)} property
 * @param {(price: number) => void} onSucess
 * @param {(err: unknown) => void} onError
 * @returns {void, onError: (err: unknown) => void) => any}
 */
export const price = async (
  booking: movininTypes.Booking,
  property: movininTypes.Property | undefined | null,
  onSucess: (_price: number) => void,
  onError: (err: unknown) => void
) => {
  try {
    if (!property) {
      property = await PropertyService.getProperty(booking.property as string)
    }

    if (property) {
      const from = new Date(booking.from)
      const to = new Date(booking.to)
      const days = movininHelper.totalDays(from, to)

      const now = new Date()
      let _price = 0

      if (property.rentalTerm === movininTypes.RentalTerm.Monthly) {
        _price = (property.price * days) / movininHelper.daysInMonth(now.getMonth(), now.getFullYear())
      } else if (property.rentalTerm === movininTypes.RentalTerm.Weekly) {
        _price = (property.price * days) / 7
      } else if (property.rentalTerm === movininTypes.RentalTerm.Daily) {
        _price = property.price * days
      } else if (property.rentalTerm === movininTypes.RentalTerm.Yearly) {
        _price = (property.price * days) / movininHelper.daysInYear(now.getFullYear())
      }

      if (booking.cancellation && property.cancellation > 0) {
        _price += property.cancellation
      }

      if (onSucess) {
        onSucess(_price)
      }
    } else if (onError) {
      onError(`Property ${booking.property} not found.`)
    }
  } catch (err) {
    if (onError) {
      onError(err)
    }
  }
}

/**
 * Get all user types.
 *
 * @returns {{}}
 */
export const getUserTypes = () => [
  {
    value: movininTypes.UserType.Admin,
    label: commonStrings.RECORD_TYPE_ADMIN
  },
  {
    value: movininTypes.UserType.Agency,
    label: commonStrings.RECORD_TYPE_AGENCY,
  },
  {
    value: movininTypes.UserType.User,
    label: commonStrings.RECORD_TYPE_USER
  },
]

/**
 * Get user type label.
 *
 * @param {string} type
 * @returns {string}
 */
export const getUserType = (type?: movininTypes.UserType) => {
  switch (type) {
    case movininTypes.UserType.Admin:
      return commonStrings.RECORD_TYPE_ADMIN

    case movininTypes.UserType.Agency:
      return commonStrings.RECORD_TYPE_AGENCY

    case movininTypes.UserType.User:
      return commonStrings.RECORD_TYPE_USER

    default:
      return ''
  }
}

/**
 * Get days label.
 *
 * @param {number} days
 * @returns {string}
 */
export const getDays = (days: number) =>
  `${strings.PRICE_DAYS_PART_1} ${days} ${strings.PRICE_DAYS_PART_2}${days > 1 ? 's' : ''}`

/**
 * Get short days label.
 *
 * @param {number} days
 * @returns {string}
 */
export const getDaysShort = (days: number) => `${days} ${strings.PRICE_DAYS_PART_2}${days > 1 ? 's' : ''}`

/**
 * Get cancellation label.
 *
 * @param {number} cancellation
 * @param {boolean} fr
 * @returns {string}
 */
export const getCancellation = (cancellation: number, fr: boolean) => {
  if (cancellation === -1) {
    return `${strings.CANCELLATION}${fr ? ' : ' : ': '}${strings.UNAVAILABLE}`
  } if (cancellation === 0) {
    return `${strings.CANCELLATION}${fr ? ' : ' : ': '}${strings.INCLUDED}${fr ? 'e' : ''}`
  }
  return `${strings.CANCELLATION}${fr ? ' : ' : ': '}${movininHelper.formatNumber(cancellation)} ${commonStrings.CURRENCY}`
}

/**
 * Get cancellation option label.
 *
 * @param {number} cancellation
 * @param {boolean} fr
 * @param {boolean} hidePlus
 * @returns {string}
 */
export const getCancellationOption = (cancellation: number, fr: boolean, hidePlus: boolean) => {
  if (cancellation === -1) {
    return strings.UNAVAILABLE
  } if (cancellation === 0) {
    return `${strings.INCLUDED}${fr ? 'e' : ''}`
  }
  return `${hidePlus ? '' : '+ '}${cancellation} ${commonStrings.CURRENCY}`
}

/**
 * Get birthdate error message.
 *
 * @param {number} minimumAge
 * @returns {string}
 */
export const getBirthDateError = (minimumAge: number) =>
  `${commonStrings.BIRTH_DATE_NOT_VALID_PART1} ${minimumAge} ${commonStrings.BIRTH_DATE_NOT_VALID_PART2}`

/**
 * Check whether a property option is available or not.
 *
 * @param {(movininTypes.Property | undefined)} property
 * @param {string} option
 * @returns {boolean}
 */
export const propertyOptionAvailable = (property: movininTypes.Property | undefined, option: string) =>
  property && option in property && (property[option] as number) > -1

/**
 * Get all property types.
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
 * Get all rental terms.
 *
 * @returns {movininTypes.RentalTerm[]}
 */
export const getAllRentalTerms = () =>
  [
    movininTypes.RentalTerm.Monthly,
    movininTypes.RentalTerm.Weekly,
    movininTypes.RentalTerm.Daily,
    movininTypes.RentalTerm.Yearly,
  ]

/**
 * Get rental term label.
 *
 * @param {movininTypes.RentalTerm} term
 * @returns {string}
 */
export const rentalTerm = (term: movininTypes.RentalTerm): string => {
  switch (term) {
    case movininTypes.RentalTerm.Monthly:
      return rtStrings.MONTHLY
    case movininTypes.RentalTerm.Weekly:
      return rtStrings.WEEKLY
    case movininTypes.RentalTerm.Daily:
      return rtStrings.DAILY
    case movininTypes.RentalTerm.Yearly:
      return rtStrings.YEARLY
    default:
      return ''
  }
}

/**
 * Get rental term unit.
 *
 * @param {movininTypes.RentalTerm} term
 * @returns {string}
 */
export const rentalTermUnit = (term: movininTypes.RentalTerm): string => {
  switch (term) {
    case movininTypes.RentalTerm.Monthly:
      return rtStrings.MONTH
    case movininTypes.RentalTerm.Weekly:
      return rtStrings.WEEK
    case movininTypes.RentalTerm.Daily:
      return rtStrings.DAY
    case movininTypes.RentalTerm.Yearly:
      return rtStrings.YEAR
    default:
      return ''
  }
}

/**
 * Get price label.
 *
 * @param {movininTypes.Property} property
 * @returns {string}
 */
export const priceLabel = (property: movininTypes.Property): string =>
  `${movininHelper.formatNumber(property.price)} ${commonStrings.CURRENCY}/${rentalTermUnit(property.rentalTerm)}`
