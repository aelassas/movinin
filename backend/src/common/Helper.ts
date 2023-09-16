import { strings as commonStrings } from '../lang/common'
import { strings as rtStrings } from '../lang/rental-term'
import { strings } from '../lang/properties'
import * as PropertyService from '../services/PropertyService'
import { toast } from 'react-toastify'
import * as movininTypes from 'movinin-types'
import * as movininHelper from 'movinin-helper'

export const info = (message: string) => {
  toast(message, { type: 'info' })
}

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

export const admin = (user?: movininTypes.User): boolean =>
  (user && user.type === movininTypes.RecordType.Admin) ?? false

export const getBookingStatus = (status: string) => {
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

export const getBookingStatuses = (): movininTypes.StatusFilterItem[] => {
  return [
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
}

export const getBedroomsTooltip = (bedrooms: number, fr?: boolean) =>
  `${strings.TOOLTIP_1}${bedrooms} ${fr
    ? bedrooms > 1 ? strings.BEDROOMS_TOOLTIP_2 : strings.BEDROOMS_TOOLTIP_1
    : strings.BEDROOMS_TOOLTIP_1 + (bedrooms > 1 ? 's' : '')}`

export const getBathroomsTooltip = (bathrooms: number, fr?: boolean) =>
  `${strings.TOOLTIP_1}${bathrooms} ${fr
    ? bathrooms > 1 ? strings.BATHROOMS_TOOLTIP_2 : strings.BATHROOMS_TOOLTIP_1
    : strings.BATHROOMS_TOOLTIP_1 + (bathrooms > 1 ? 's' : '')}`

export const getKitchensTooltip = (bathrooms: number) =>
  `${strings.TOOLTIP_1}${bathrooms} ${strings.KITCHENS_TOOLTIP_1 + (bathrooms > 1 ? 's' : '')}`

export const getKParkingSpacesTooltip = (parkingSpaces: number, fr?: boolean) =>
  `${strings.TOOLTIP_1}${parkingSpaces} ${fr
    ? parkingSpaces > 1 ? strings.PARKING_SPACES_TOOLTIP_2 : strings.PARKING_SPACES_TOOLTIP_1
    : strings.PARKING_SPACES_TOOLTIP_1 + (parkingSpaces > 1 ? 's' : '')}`

export const price = async (
  booking: movininTypes.Booking,
  property: movininTypes.Property | undefined | null,
  onSucess: (price: number) => void,
  onError: (err: unknown) => void
) => {
  const totalDays = (date1: Date, date2: Date) =>
    Math.ceil((date2.getTime() - date1.getTime()) / (1000 * 3600 * 24))

  const daysInMonth = (month: number, year: number) =>
    new Date(year, month, 0).getDate()

  const daysInYear = (year: number) =>
    ((year % 4 === 0 && year % 100 > 0) || year % 400 == 0) ? 366 : 365

  try {
    if (!property) {
      property = await PropertyService.getProperty(booking.property as string)
    }

    if (property) {
      const from = new Date(booking.from)
      const to = new Date(booking.to)
      const days = totalDays(from, to)

      const now = new Date()
      let price = 0

      if (property.rentalTerm === movininTypes.RentalTerm.Monthly) {
        price = property.price * days / daysInMonth(now.getMonth(), now.getFullYear())
      } else if (property.rentalTerm === movininTypes.RentalTerm.Weekly) {
        price = property.price * days / 7
      } else if (property.rentalTerm === movininTypes.RentalTerm.Daily) {
        price = property.price * days
      } else if (property.rentalTerm === movininTypes.RentalTerm.Yearly) {
        price = property.price * days / daysInYear(now.getFullYear())
      }

      if (booking.cancellation && property.cancellation > 0) {
        price += property.cancellation
      }

      if (onSucess) {
        onSucess(price)
      }
    } else {
      if (onError) {
        onError(`Property ${booking.property} not found.`)
      }
    }
  } catch (err) {
    if (onError) {
      onError(err)
    }
  }
}

export const getUserTypes = () => {
  return [
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
}

export const getUserType = (status: string) => {
  switch (status) {
    case movininTypes.RecordType.Admin:
      return commonStrings.RECORD_TYPE_ADMIN

    case movininTypes.RecordType.Agency:
      return commonStrings.RECORD_TYPE_AGENCY

    case movininTypes.RecordType.User:
      return commonStrings.RECORD_TYPE_USER

    default:
      return ''
  }
}

export const getDays = (days: number) => `${strings.PRICE_DAYS_PART_1} ${days} ${strings.PRICE_DAYS_PART_2}${days > 1 ? 's' : ''}`

export const getDaysShort = (days: number) => `${days} ${strings.PRICE_DAYS_PART_2}${days > 1 ? 's' : ''}`

export const getCancellation = (cancellation: number, fr: boolean) => {
  if (cancellation === -1) {
    return `${strings.CANCELLATION}${fr ? ' : ' : ': '}${strings.UNAVAILABLE}`
  } else if (cancellation === 0) {
    return `${strings.CANCELLATION}${fr ? ' : ' : ': '}${strings.INCLUDED}${fr ? 'e' : ''}`
  } else {
    return `${strings.CANCELLATION}${fr ? ' : ' : ': '}${movininHelper.formatNumber(cancellation)} ${commonStrings.CURRENCY}`
  }
}

export const getCancellationOption = (cancellation: number, fr: boolean, hidePlus: boolean) => {
  if (cancellation === -1) {
    return strings.UNAVAILABLE
  } else if (cancellation === 0) {
    return `${strings.INCLUDED}${fr ? 'e' : ''}`
  } else {
    return `${hidePlus ? '' : '+ '}${cancellation} ${commonStrings.CURRENCY}`
  }
}

export const getBirthDateError = (minimumAge: number) =>
  `${commonStrings.BIRTH_DATE_NOT_VALID_PART1} ${minimumAge} ${commonStrings.BIRTH_DATE_NOT_VALID_PART2}`

export const propertyOptionAvailable = (property: movininTypes.Property | undefined, option: string) =>
  property && option in property && (property[option] as number) > -1

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

export const priceLabel = (property: movininTypes.Property): string =>
  `${movininHelper.formatNumber(property.price)} ${commonStrings.CURRENCY}/${rentalTermUnit(property.rentalTerm)}`
