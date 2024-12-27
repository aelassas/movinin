import React, { memo, useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { Locale, format } from 'date-fns'
import * as movininTypes from ':movinin-types'
import * as movininHelper from ':movinin-helper'

import BookingStatus from './BookingStatus'
import Button from './Button'
import * as helper from '@/common/helper'
import * as env from '@/config/env.config'
import i18n from '@/lang/i18n'
import * as StripeService from '@/services/StripeService'

interface BookingProps {
  booking: movininTypes.Booking
  locale: Locale
  language: string
  onCancel: () => void
}

const iconSize = 24
const iconColor = '#000'
const extraIconColor = '#1f9201'
const extraIconSize = 16

const Booking = ({
  booking,
  locale,
  language,
  onCancel
}: BookingProps) => {
  const from = new Date(booking.from)
  const to = new Date(booking.to)
  const property = booking.property as movininTypes.Property
  const agency = booking.agency as movininTypes.User

  const today = new Date()
  today.setHours(0)
  today.setMinutes(0)
  today.setSeconds(0)
  today.setMilliseconds(0)

  const _fr = movininHelper.isFrench(language)
  const _format = _fr ? 'eee d LLL yyyy kk:mm' : 'eee, d LLL yyyy, p'

  const [currencySymbol, setCurrencySymbol] = useState('')
  const [price, setPrice] = useState(0)
  const [priceLabel, setPriceLabel] = useState('')
  const [cancellationOption, setCancellationOption] = useState('')

  useEffect(() => {
    const init = async () => {
      if (booking && language) {
        const _property = booking.property as movininTypes.Property
        setCurrencySymbol(await StripeService.getCurrencySymbol())
        setPrice(await StripeService.convertPrice(booking.price!))
        setPriceLabel(await helper.priceLabel(_property, language))
        if (booking.cancellation) {
          setCancellationOption(await helper.getCancellationOption(_property.cancellation, language, true))
        }
      }
    }

    init()
  }, [booking, language])

  return (
    <View key={booking._id} style={styles.bookingContainer}>
      <View style={styles.booking}>
        <View style={styles.header}>
          <MaterialIcons name="home" size={iconSize} color={iconColor} />
          <Text style={styles.headerText}>{property.name}</Text>
        </View>

        <BookingStatus style={styles.status} status={booking.status} />

        <Text style={styles.detailTitle}>{i18n.t('DAYS')}</Text>
        <Text style={styles.detailText}>
          {`${helper.getDaysShort(movininHelper.days(from, to))} (${movininHelper.capitalize(format(from, _format, { locale }))} - ${movininHelper.capitalize(
            format(to, _format, { locale }),
          )})`}
        </Text>

        <Text style={styles.detailTitle}>{i18n.t('LOCATION')}</Text>
        <Text style={styles.detailText}>{(booking.location as movininTypes.Location).name}</Text>

        <Text style={styles.detailTitle}>{i18n.t('PROPERTY')}</Text>
        <Text style={styles.detailText}>{`${property.name} (${priceLabel})`}</Text>

        <Text style={styles.detailTitle}>{i18n.t('AGENCY')}</Text>
        <View style={styles.agency}>
          <Image
            style={styles.agencyImg}
            source={{
              uri: movininHelper.joinURL(env.CDN_USERS, agency.avatar),
            }}
          />
          <Text style={styles.agencyText}>{agency.fullName}</Text>
        </View>

        {booking.cancellation && (
          <>
            <Text style={styles.detailTitle}>{i18n.t('OPTIONS')}</Text>
            <View style={styles.extras}>
              {booking.cancellation && (
                <View style={styles.extra}>
                  <MaterialIcons style={styles.extraIcon} name="check" size={extraIconSize} color={extraIconColor} />
                  <Text style={styles.extraTitle}>{i18n.t('CANCELLATION')}</Text>
                  <Text style={styles.extraText}>{cancellationOption}</Text>
                </View>
              )}
            </View>
          </>
        )}

        <Text style={styles.detailTitle}>{i18n.t('COST')}</Text>
        <Text style={styles.detailTextBold}>{movininHelper.formatPrice(price, currencySymbol, language)}</Text>

        {booking.cancellation
          && !booking.cancelRequest
          && booking.status !== movininTypes.BookingStatus.Cancelled
          && new Date(booking.from) >= today
          && (
            <Button
              size="small"
              color="secondary"
              style={styles.button}
              label={i18n.t('CANCEL_BOOKING_BTN')}
              onPress={() => {
                if (onCancel) {
                  onCancel()
                }
              }}
            />
          )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  bookingContainer: {
    marginRight: 7,
    marginLeft: 7,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  booking: {
    width: '100%',
    maxWidth: 480,
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingRight: 10,
    paddingBottom: 20,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: '#d9d8d9',
    borderRadius: 5,
  },
  header: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerText: {
    color: '#444',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 5,
  },
  detailTitle: {
    alignSelf: 'stretch',
    alignItems: 'center',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 3,
  },
  detailText: {
    color: 'rgba(0, 0, 0, 0.35)',
    fontSize: 12,
    marginBottom: 10,
    flex: 1,
    flexWrap: 'wrap',
  },
  detailTextBold: {
    fontSize: 15,
    fontWeight: '700',
  },
  status: {
    marginBottom: 10,
  },
  extras: {
    marginBottom: 10,
  },
  extra: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 3,
  },
  extraIcon: {
    marginRight: 4,
  },
  extraTitle: {
    fontWeight: '600',
    fontSize: 12,
    marginRight: 5,
  },
  extraText: {
    color: 'rgba(0, 0, 0, 0.35)',
    fontSize: 11,
    flex: 1,
    flexWrap: 'wrap',
  },
  agency: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  agencyImg: {
    width: env.AGENCY_IMAGE_WIDTH,
    height: env.AGENCY_IMAGE_HEIGHT,
  },
  agencyText: {
    color: '#a1a1a1',
    fontSize: 10,
    marginLeft: 5,
  },
  button: {
    marginTop: 15,
  },
})

export default memo(Booking)
