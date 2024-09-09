import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import * as movininTypes from ':movinin-types'

import Layout from '@/components/Layout'
import i18n from '@/lang/i18n'
import * as UserService from '@/services/UserService'
import BookingList from '@/components/BookingList'
import AgencyFilter from '@/components/AgencyFilter'
import * as env from '@/config/env.config'
import StatusFilter from '@/components/StatusFilter'
import * as BookingService from '@/services/BookingService'
import BookingFilter from '@/components/BookingFilter'
import Indicator from '@/components/Indicator'

const BookingsScreen = ({ navigation, route }: NativeStackScreenProps<StackParams, 'Bookings'>) => {
  const isFocused = useIsFocused()
  const [language, setLanguage] = useState(env.DEFAULT_LANGUAGE)
  const [reload, setReload] = useState(false)
  const [visible, setVisible] = useState(false)
  const [user, setUser] = useState<movininTypes.User>()
  const [hasBookings, setHasBookings] = useState(false)
  const [agencies, setCompanies] = useState<string[]>([])
  const [statuses, setStatuses] = useState<string[]>([])
  const [filter, setFilter] = useState<movininTypes.Filter>()

  const _init = async () => {
    try {
      setVisible(false)
      setUser(undefined)
      setCompanies([])
      setFilter(undefined)

      const _language = await UserService.getLanguage()
      i18n.locale = _language
      setLanguage(_language)

      const currentUser = await UserService.getCurrentUser()

      if (!currentUser || !currentUser._id) {
        await UserService.signout(navigation, false, true)
        return
      }

      const _user = await UserService.getUser(currentUser._id)

      if (!_user?._id) {
        await UserService.signout(navigation, false, true)
        return
      }

      setUser(_user)

      const hasBookingsStatus = await BookingService.hasBookings(_user._id)
      const _hasBookings = hasBookingsStatus === 200
      setHasBookings(_hasBookings)

      setVisible(true)
    } catch {
      await UserService.signout(navigation, false, true)
    }
  }

  useEffect(() => {
    if (isFocused) {
      _init()
      setReload(true)
    } else {
      setVisible(false)
    }
  }, [route.params, isFocused]) // eslint-disable-line react-hooks/exhaustive-deps

  const onLoad = () => {
    setReload(false)
  }

  const onLoadCompanies = (_agencies: string[]) => {
    setCompanies(_agencies)
  }

  const onChangeCompanies = (_agencies: string[]) => {
    setCompanies(_agencies)
  }

  const onLoadStatuses = (_statuses: string[]) => {
    setStatuses(_statuses)
  }

  const onChangeStatuses = (_statuses: string[]) => {
    setStatuses(_statuses)
  }

  const onSubmitBookingFilter = (_filter: movininTypes.Filter) => {
    setFilter(_filter)
  }

  return (
    <Layout style={styles.master} navigation={navigation} route={route} onLoad={onLoad} reload={reload} strict>
      {!visible && <Indicator style={{ marginVertical: 10 }} />}
      {visible && user?._id && (
        <BookingList
          navigation={navigation}
          user={user._id}
          language={language}
          agencies={agencies}
          statuses={statuses}
          filter={filter}
          header={(
            <View>
              <AgencyFilter
                style={styles.filter}
                visible={hasBookings}
                onLoad={onLoadCompanies}
                onChange={onChangeCompanies}
              />
              <StatusFilter
                style={styles.filter}
                visible={hasBookings}
                onLoad={onLoadStatuses}
                onChange={onChangeStatuses}
              />
              <BookingFilter
                style={styles.filter}
                visible={hasBookings}
                backgroundColor="#fff"
                onSubmit={onSubmitBookingFilter}
              />
            </View>
          )}
        />
      )}
    </Layout>
  )
}

const styles = StyleSheet.create({
  master: {
    flex: 1,
  },
  filter: {
    marginRight: 7,
    marginBottom: 10,
    marginLeft: 7,
  },
})

export default BookingsScreen
