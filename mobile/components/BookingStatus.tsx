import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import * as movininTypes from '../miscellaneous/movininTypes'

import * as helper from '../common/helper'

interface BookingStatusProps {
  style: object
  status: movininTypes.BookingStatus
}

const BookingStatus = ({
  style,
  status
}: BookingStatusProps) => (
    <View
      style={{
        ...styles.container,
        ...style,
        backgroundColor:
          status === movininTypes.BookingStatus.Void
            ? '#999'
            : status === movininTypes.BookingStatus.Pending
              ? '#e98003'
              : status === movininTypes.BookingStatus.Deposit
                ? '#22bba7'
                : status === movininTypes.BookingStatus.Paid
                  ? '#77bc23'
                  : status === movininTypes.BookingStatus.Reserved
                    ? '#188ace'
                    : status === movininTypes.BookingStatus.Cancelled
                      ? '#bc2143'
                      : 'transparent',
      }}
    >
      <Text style={styles.text}>{helper.getBookingStatus(status)}</Text>
    </View>
  )

const styles = StyleSheet.create({
  container: {
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '400',
  },
})

export default BookingStatus
