import { Platform } from 'react-native'
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import Constants from 'expo-constants'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RouteProp } from '@react-navigation/native'

import mime from 'mime'
import i18n from '../lang/i18n'
import * as UserService from '../services/UserService'
import * as movininTypes from '../miscellaneous/movininTypes'
import * as movininHelper from '../miscellaneous/movininHelper'
import * as toastHelper from './toastHelper'

/**
 * Indicate whether Platform OS is Android or not.
 *
 * @returns {boolean}
 */
export const android = () => Platform.OS === 'android'

/**
 * Toast message.
 *
 * @param {string} message
 */
export const toast = (message: string) => {
  toastHelper.toast(message)
}

/**
 * Toast error message.
 *
 * @param {?unknown} [err]
 * @param {boolean} [__toast__=true]
 */
export const error = (err?: unknown, __toast__ = true) => {
  toastHelper.error(err, __toast__)
}

/**
 * Get filename.
 *
 * @param {string} path
 * @returns {string}
 */
export const getFileName = (path: string) => path.replace(/^.*[\\/]/, '')

/**
 * Get MIME type.
 *
 * @param {string} fileName
 * @returns {string|null}
 */
export const getMimeType = (fileName: string) => mime.getType(fileName)

/**
 * Register push token.
 *
 * @async
 * @param {string} userId
 * @returns {void}
 */
export const registerPushToken = async (userId: string) => {
  const registerForPushNotificationsAsync = async () => {
    let token: string | undefined

    try {
      if (android()) {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
          enableVibrate: true,
          showBadge: true
        })
      }

      if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync()
        let finalStatus = existingStatus
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync()
          finalStatus = status
        }
        if (finalStatus !== 'granted') {
          alert('Failed to get push token for push notification!')
          return ''
        }
        token = (
          await Notifications.getExpoPushTokenAsync({
            projectId: Constants.expoConfig?.extra?.eas?.projectId,
          })
        ).data
      } else {
        alert('Must use physical device for Push Notifications')
      }
    } catch (err) {
      error(err, false)
    }

    return token
  }

  try {
    await UserService.deletePushToken(userId)
    const token = await registerForPushNotificationsAsync()

    if (token) {
      const status = await UserService.createPushToken(userId, token)
      if (status !== 200) {
        error()
      }
    } else {
      error()
    }
  } catch (err) {
    error(err, false)
  }
}

/**
 * Add time to date.
 *
 * @param {Date} date
 * @param {Date} time
 * @returns {Date}
 */
export const dateTime = (date: Date, time: Date) => {
  const _dateTime = new Date(date)
  _dateTime.setHours(time.getHours())
  _dateTime.setMinutes(time.getMinutes())
  _dateTime.setSeconds(time.getSeconds())
  _dateTime.setMilliseconds(time.getMilliseconds())
  return _dateTime
}

/**
 * Get cancellation label.
 *
 * @param {number} cancellation
 * @param {boolean} fr
 * @returns {string}
 */
export const getCancellation = (cancellation: number, fr: boolean) => {
  if (cancellation === -1) {
    return `${i18n.t('CANCELLATION')}${fr ? ' : ' : ': '}${i18n.t('UNAVAILABLE')}`
  } if (cancellation === 0) {
    return `${i18n.t('CANCELLATION')}${fr ? ' : ' : ': '}${i18n.t('INCLUDED')}${fr ? 'e' : ''}`
  }
  return `${i18n.t('CANCELLATION')}${fr ? ' : ' : ': '}${movininHelper.formatNumber(cancellation)} ${i18n.t('CURRENCY')}`
}

/**
 * Get days label.
 *
 * @param {number} days
 * @returns {string}
 */
export const getDays = (days: number) => `${i18n.t('PRICE_DAYS_PART_1')} ${days} ${i18n.t('PRICE_DAYS_PART_2')}${days > 1 ? 's' : ''}`

/**
 * Get short days label.
 *
 * @param {number} days
 * @returns {string}
 */
export const getDaysShort = (days: number) => `${days} ${i18n.t('PRICE_DAYS_PART_2')}${days > 1 ? 's' : ''}`

/**
 * Get price.
 *
 * @param {movininTypes.Property} property
 * @param {Date} from
 * @param {Date} to
 * @param {?movininTypes.PropertyOptions} [options]
 * @returns {number}
 */
export const price = (property: movininTypes.Property, from: Date, to: Date, options?: movininTypes.PropertyOptions) => {
  const now = new Date()
  const days = movininHelper.days(from, to)

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

  if (options) {
    if (options.cancellation && property.cancellation > 0) {
      _price += property.cancellation
    }
  }

  return _price
}

/**
 * Get cancellation option label.
 *
 * @param {number} cancellation
 * @param {boolean} fr
 * @param {?boolean} [hidePlus]
 * @returns {string}
 */
export const getCancellationOption = (cancellation: number, fr: boolean, hidePlus?: boolean) => {
  if (cancellation === -1) {
    return i18n.t('UNAVAILABLE')
  } if (cancellation === 0) {
    return `${i18n.t('INCLUDED')}${fr ? 'e' : ''}`
  }
  return `${hidePlus ? '' : '+ '}${movininHelper.formatNumber(cancellation)} ${i18n.t('CURRENCY')}`
}

/**
 * Get all booking statuses.
 *
 * @returns {movininTypes.StatusFilterItem[]}
 */
export const getBookingStatuses = (): movininTypes.StatusFilterItem[] => [
  {
    value: movininTypes.BookingStatus.Void,
    label: i18n.t('BOOKING_STATUS_VOID')
  },
  {
    value: movininTypes.BookingStatus.Pending,
    label: i18n.t('BOOKING_STATUS_PENDING'),
  },
  {
    value: movininTypes.BookingStatus.Deposit,
    label: i18n.t('BOOKING_STATUS_DEPOSIT'),
  },
  {
    value: movininTypes.BookingStatus.Paid,
    label: i18n.t('BOOKING_STATUS_PAID')
  },
  {
    value: movininTypes.BookingStatus.Reserved,
    label: i18n.t('BOOKING_STATUS_RESERVED'),
  },
  {
    value: movininTypes.BookingStatus.Cancelled,
    label: i18n.t('BOOKING_STATUS_CANCELLED'),
  },
]

/**
 * Get booking status label.
 *
 * @param {string} status
 * @returns {string}
 */
export const getBookingStatus = (status: movininTypes.BookingStatus) => {
  switch (status) {
    case movininTypes.BookingStatus.Void:
      return i18n.t('BOOKING_STATUS_VOID')

    case movininTypes.BookingStatus.Pending:
      return i18n.t('BOOKING_STATUS_PENDING')

    case movininTypes.BookingStatus.Deposit:
      return i18n.t('BOOKING_STATUS_DEPOSIT')

    case movininTypes.BookingStatus.Paid:
      return i18n.t('BOOKING_STATUS_PAID')

    case movininTypes.BookingStatus.Reserved:
      return i18n.t('BOOKING_STATUS_RESERVED')

    case movininTypes.BookingStatus.Cancelled:
      return i18n.t('BOOKING_STATUS_CANCELLED')

    default:
      return ''
  }
}

/**
 * Get birthdate error message.
 *
 * @param {number} minimumAge
 * @returns {string}
 */
export const getBirthDateError = (minimumAge: number) =>
  `${i18n.t('BIRTH_DATE_NOT_VALID_PART1')} ${minimumAge} ${i18n.t('BIRTH_DATE_NOT_VALID_PART2')} `

/**
 * Get rental term label.
 *
 * @param {movininTypes.RentalTerm} term
 * @returns {string}
 */
export const rentalTerm = (term: movininTypes.RentalTerm): string => {
  switch (term) {
    case movininTypes.RentalTerm.Monthly:
      return i18n.t('MONTHLY')
    case movininTypes.RentalTerm.Weekly:
      return i18n.t('WEEKLY')
    case movininTypes.RentalTerm.Daily:
      return i18n.t('DAILY')
    case movininTypes.RentalTerm.Yearly:
      return i18n.t('YEARLY')
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
      return i18n.t('MONTH')
    case movininTypes.RentalTerm.Weekly:
      return i18n.t('WEEK')
    case movininTypes.RentalTerm.Daily:
      return i18n.t('DAY')
    case movininTypes.RentalTerm.Yearly:
      return i18n.t('YEAR')
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
  `${movininHelper.formatNumber(property.price)} ${i18n.t('CURRENCY')}/${rentalTermUnit(property.rentalTerm)}`

/**
 * Check whether property option is available or not.
 *
 * @param {(movininTypes.Property | undefined)} property
 * @param {string} option
 * @returns {boolean}
 */
export const propertyOptionAvailable = (property: movininTypes.Property | undefined, option: string) =>
  property && option in property && (property[option] as number) > -1

/**
 * Get property type label.
 *
 * @param {movininTypes.PropertyType} type
 * @returns {string}
 */
export const getPropertyType = (type: movininTypes.PropertyType) => {
  switch (type) {
    case movininTypes.PropertyType.Apartment:
      return i18n.t('APARTMENT')

    case movininTypes.PropertyType.Commercial:
      return i18n.t('COMMERCIAL')

    case movininTypes.PropertyType.Farm:
      return i18n.t('FARM')

    case movininTypes.PropertyType.House:
      return i18n.t('HOUSE')

    case movininTypes.PropertyType.Industrial:
      return i18n.t('INDUSTRIAL')

    case movininTypes.PropertyType.Plot:
      return i18n.t('PLOT')

    case movininTypes.PropertyType.Townhouse:
      return i18n.t('TOWN_HOUSE')
    default:
      return ''
  }
}

/**
 * Navigate to a screen.
 *
 * @param {RouteProp<StackParams, keyof StackParams>} route
 * @param {NativeStackNavigationProp<StackParams, keyof StackParams>} navigation
 */
export const navigate = (
  route: RouteProp<StackParams, keyof StackParams>,
  navigation: NativeStackNavigationProp<StackParams, keyof StackParams>
): void => {
  switch (route.name) {
    case 'About':
    case 'Bookings':
    case 'ChangePassword':
    case 'Contact':
    case 'ForgotPassword':
    case 'Home':
    case 'Notifications':
    case 'Settings':
    case 'SignIn':
    case 'SignUp':
    case 'ToS':
      navigation.navigate(route.name, { d: new Date().getTime() })
      break
    case 'Booking':
      navigation.navigate(
        route.name,
        {
          d: new Date().getTime(),
          id: (route.params && 'id' in route.params && route.params.id as string) || '',
        }
      )
      break
    case 'Properties':
      navigation.navigate(
        route.name,
        {
          d: new Date().getTime(),
          location: (route.params && 'location' in route.params && route.params.location as string) || '',
          from: (route.params && 'from' in route.params && route.params.from as number) || 0,
          to: (route.params && 'to' in route.params && route.params.to as number) || 0,
        }
      )
      break
    case 'Checkout':
      navigation.navigate(
        route.name,
        {
          d: new Date().getTime(),
          property: (route.params && 'property' in route.params && route.params.property as string) || '',
          location: (route.params && 'location' in route.params && route.params.location as string) || '',
          from: (route.params && 'from' in route.params && route.params.from as number) || 0,
          to: (route.params && 'to' in route.params && route.params.to as number) || 0,
        }
      )
      break
    default:
      break
  }
}
