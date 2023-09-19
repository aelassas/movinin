import { Platform } from 'react-native'
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import Constants from 'expo-constants'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RouteProp } from '@react-navigation/native'

import i18n from '../lang/i18n'
import * as UserService from '../services/UserService'
import * as mime from 'mime'
import * as movininTypes from '../miscellaneous/movininTypes'
import * as movininHelper from '../miscellaneous/movininHelper'
import * as ToasHelper from './ToastHelper'

const ANDROID = Platform.OS === 'android'

export const android = () => ANDROID

export const toast = (message: string) => {
  ToasHelper.toast(message)
}

export const error = (err?: unknown, __toast__ = true) => {
  ToasHelper.error(err, __toast__)
}


export const getFileName = (path: string) => path.replace(/^.*[\\/]/, '')

export const getMimeType = (fileName: string) => mime.getType(fileName)

export const registerPushToken = async (userId: string) => {
  async function registerForPushNotificationsAsync() {
    let token

    try {
      if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync()
        let finalStatus = existingStatus
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync()
          finalStatus = status
        }
        if (finalStatus !== 'granted') {
          alert('Failed to get push token for push notification!')
          return
        }
        token = (
          await Notifications.getExpoPushTokenAsync({
            projectId: Constants.expoConfig?.extra?.eas?.projectId,
          })
        ).data
      } else {
        alert('Must use physical device for Push Notifications')
      }

      if (android()) {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        })
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

export const dateTime = (date: Date, time: Date) => {
  const dateTime = new Date(date)
  dateTime.setHours(time.getHours())
  dateTime.setMinutes(time.getMinutes())
  dateTime.setSeconds(time.getSeconds())
  dateTime.setMilliseconds(time.getMilliseconds())
  return dateTime
}

export const getCancellation = (cancellation: number, fr: boolean) => {
  if (cancellation === -1) {
    return `${i18n.t('CANCELLATION')}${fr ? ' : ' : ': '}${i18n.t('UNAVAILABLE')}`
  } else if (cancellation === 0) {
    return `${i18n.t('CANCELLATION')}${fr ? ' : ' : ': '}${i18n.t('INCLUDED')}${fr ? 'e' : ''}`
  } else {
    return `${i18n.t('CANCELLATION')}${fr ? ' : ' : ': '}${movininHelper.formatNumber(cancellation)} ${i18n.t('CURRENCY')}`
  }
}

export const getDays = (days: number) => {
  return `${i18n.t('PRICE_DAYS_PART_1')} ${days} ${i18n.t('PRICE_DAYS_PART_2')}${days > 1 ? 's' : ''}`
}

export const getDaysShort = (days: number) => {
  return `${days} ${i18n.t('PRICE_DAYS_PART_2')}${days > 1 ? 's' : ''}`
}


export const price = (property: movininTypes.Property, from: Date, to: Date, options?: movininTypes.PropertyOptions) => {
  const now = new Date()
  const days = movininHelper.days(from, to)

  let price = 0

  if (property.rentalTerm === movininTypes.RentalTerm.Monthly) {
    price = property.price * days / movininHelper.daysInMonth(now.getMonth(), now.getFullYear())
  } else if (property.rentalTerm === movininTypes.RentalTerm.Weekly) {
    price = property.price * days / 7
  } else if (property.rentalTerm === movininTypes.RentalTerm.Daily) {
    price = property.price * days
  } else if (property.rentalTerm === movininTypes.RentalTerm.Yearly) {
    price = property.price * days / movininHelper.daysInYear(now.getFullYear())
  }

  if (options) {
    if (options.cancellation && property.cancellation > 0) {
      price += property.cancellation
    }
  }

  return price
}

export const getCancellationOption = (cancellation: number, fr: boolean, hidePlus?: boolean) => {
  if (cancellation === -1) {
    return i18n.t('UNAVAILABLE')
  } else if (cancellation === 0) {
    return `${i18n.t('INCLUDED')}${fr ? 'e' : ''}`
  } else {
    return `${hidePlus ? '' : '+ '}${movininHelper.formatNumber(cancellation)} ${i18n.t('CURRENCY')}`
  }
}
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

export const getBookingStatus = (status: string) => {
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

export const getBirthDateError = (minimumAge: number) =>
  `${i18n.t('BIRTH_DATE_NOT_VALID_PART1')} ${minimumAge} ${i18n.t('BIRTH_DATE_NOT_VALID_PART2')} `

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

export const priceLabel = (property: movininTypes.Property): string =>
  `${movininHelper.formatNumber(property.price)} ${i18n.t('CURRENCY')}/${rentalTermUnit(property.rentalTerm)}`


export const propertyOptionAvailable = (property: movininTypes.Property | undefined, option: string) =>
  property && option in property && (property[option] as number) > -1

export const getPropertyType = (type: string) => {
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
      navigation.navigate(route.name,
        {
          d: new Date().getTime(),
          id: (route.params && 'id' in route.params && route.params.id as string) || '',
        })
      break
    case 'Properties':
      navigation.navigate(route.name,
        {
          d: new Date().getTime(),
          location: (route.params && 'location' in route.params && route.params.location as string) || '',
          from: (route.params && 'from' in route.params && route.params.from as number) || 0,
          to: (route.params && 'to' in route.params && route.params.to as number) || 0,
        })
      break
    case 'Checkout':
      navigation.navigate(route.name,
        {
          d: new Date().getTime(),
          property: (route.params && 'property' in route.params && route.params.property as string) || '',
          location: (route.params && 'location' in route.params && route.params.location as string) || '',
          from: (route.params && 'from' in route.params && route.params.from as number) || 0,
          to: (route.params && 'to' in route.params && route.params.to as number) || 0,
        })
      break
  }
}
