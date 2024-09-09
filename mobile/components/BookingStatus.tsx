import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import * as movininTypes from ':movinin-types'

import * as helper from '@/common/helper'

interface BookingStatusProps {
  style: object
  status: movininTypes.BookingStatus
}

const BookingStatus = ({
  style,
  status
}: BookingStatusProps) => {
  const styles = StyleSheet.create({
    container: {
      height: 28,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 18,
    },
    text: {
      color: status === movininTypes.BookingStatus.Void
        ? '#6E7C86'
        : status === movininTypes.BookingStatus.Pending
          ? '#EF6C00'
          : status === movininTypes.BookingStatus.Deposit
            ? '#3CB371'
            : status === movininTypes.BookingStatus.Paid
              ? '#77BC23'
              : status === movininTypes.BookingStatus.Reserved
                ? '#1E88E5'
                : status === movininTypes.BookingStatus.Cancelled
                  ? '#E53935'
                  : 'transparent',
      fontSize: 13,
      fontWeight: '400',
    },
  })

  return (
    <View
      style={{
        ...styles.container,
        ...style,
        backgroundColor:
          status === movininTypes.BookingStatus.Void
            ? '#D9D9D9'
            : status === movininTypes.BookingStatus.Pending
              ? '#FBDCC2'
              : status === movininTypes.BookingStatus.Deposit
                ? '#CDECDA'
                : status === movininTypes.BookingStatus.Paid
                  ? '#D1F9D1'
                  : status === movininTypes.BookingStatus.Reserved
                    ? '#D9E7F4'
                    : status === movininTypes.BookingStatus.Cancelled
                      ? '#FBDFDE'
                      : 'transparent',
      }}
    >
      <Text style={styles.text}>{helper.getBookingStatus(status)}</Text>
    </View>
  )
}

export default BookingStatus
