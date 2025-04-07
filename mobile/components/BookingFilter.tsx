import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, View, TextInput as ReactTextInput } from 'react-native'
import * as movininTypes from ':movinin-types'

import i18n from '@/lang/i18n'
import Accordion from './Accordion'
import Button from './Button'
import DateTimePicker from './DateTimePicker'
import LocationSelectList from './LocationSelectList'
import TextInput from './TextInput'

interface BookingFilterProps {
  visible?: boolean
  style?: object
  backgroundColor?: string
  language?: string
  onSubmit: (filter: movininTypes.Filter) => void
}

const BookingFilter = ({
  visible,
  style,
  backgroundColor = '#F5F5F5',
  language,
  onSubmit
}: BookingFilterProps) => {
  const [init, setInit] = useState(false)
  const [from, setFrom] = useState<Date | undefined>(undefined)
  const [to, setTo] = useState<Date | undefined>(undefined)
  const [blur, setBlur] = useState(false)
  const [closeLocation, setCloseLocation] = useState(false)
  const [location, setLocation] = useState<string>()
  const [keyword, setKeyword] = useState('')
  const [minDate, setMinDate] = useState<Date>()
  const searchRef = useRef<ReactTextInput>(null)

  const _init = async () => {
    setInit(false)
    setKeyword('')
    setLocation(undefined)

    if (searchRef.current) {
      searchRef.current.clear()
    }
    setInit(true)
  }

  useEffect(() => {
    _init()
  }, [])  

  const blurLocations = () => {
    setBlur(true)
    setCloseLocation(true)
  }

  const handleLocationSelect = (_location: string) => {
    setLocation(_location)
  }

  const onPressSearch = () => {
    const filter: movininTypes.Filter = {
      from,
      to,
      location,
      keyword
    }

    if (onSubmit) {
      onSubmit(filter)
    }
  }

  return (
    init
    && visible && (
      <View style={{ ...styles.container, ...style }}>
        <Accordion style={styles.accordion} title={i18n.t('SEARCH')}>
          <DateTimePicker
            mode="date"
            backgroundColor={backgroundColor}
            locale={language}
            style={styles.component}
            size="small"
            label={i18n.t('FROM')}
            value={from}
            onChange={(date) => {
              if (date) {
                date.setHours(12, 0, 0, 0)

                if (to && to.getTime() <= date.getTime()) {
                  setTo(undefined)
                }

                const _minDate = new Date(date)
                _minDate.setDate(date.getDate() + 1)
                setMinDate(_minDate)
              } else {
                setMinDate(undefined)
              }
              setFrom(date)
            }}
            onPress={blurLocations}
          />

          <DateTimePicker
            mode="date"
            backgroundColor={backgroundColor}
            locale={language}
            style={styles.component}
            size="small"
            label={i18n.t('TO')}
            value={to}
            minDate={minDate}
            onChange={(date) => {
              if (date) {
                date.setHours(12, 0, 0, 0)
              }
              setTo(date)
            }}
            onPress={blurLocations}
          />

          <LocationSelectList
            backgroundColor={backgroundColor}
            label={i18n.t('LOCATION')}
            style={styles.component}
            size="small"
            onSelectItem={handleLocationSelect}
            selectedItem={location}
            onFetch={() => {
              setCloseLocation(false)
            }}
            onFocus={() => {
              setBlur(false)
            }}
            close={closeLocation}
            blur={blur}
          />

          <TextInput ref={searchRef} backgroundColor="#fff" style={styles.component} size="small" hideLabel label={i18n.t('SEARCH_PLACEHOLDER')} value={keyword} onChangeText={setKeyword} />

          <Button style={styles.component} size="small" label={i18n.t('SEARCH')} onPress={onPressSearch} />
        </Accordion>
      </View>
    )
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  accordion: {
    width: '100%',
    maxWidth: 480,
  },
  component: {
    alignSelf: 'stretch',
    margin: 10,
  },
})

export default BookingFilter
