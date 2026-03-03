import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import { useLocalSearchParams } from 'expo-router'
import * as movininTypes from ':movinin-types'
import * as movininHelper from ':movinin-helper'

import Layout from '@/components/Layout'
import i18n from '@/lang/i18n'
import * as UserService from '@/services/UserService'
import PropertyList from '@/components/PropertyList'
import AgencyFilter from '@/components/AgencyFilter'
import RentalTermFilter from '@/components/RentalTermFilter'
import PropertyTypeFilter from '@/components/PropertyTypeFilter'
import Indicator from '@/components/Indicator'

const SearchScreen = () => {
  const isFocused = useIsFocused()
  const { d, from, to, location } = useLocalSearchParams<{
    d: string
    from: string
    to: string
    location: string
  }>()

  const [reload, setReload] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [visible, setVisible] = useState(false)
  const [agencies, setCompanies] = useState<string[]>([])
  const [rentalTerms, setRentalTerm] = useState(movininHelper.getAllRentalTerms())
  const [propertyTypes, setPropertyTypes] = useState(movininHelper.getAllPropertyTypes())

  const _init = async () => {
    const language = await UserService.getLanguage()
    i18n.locale = language
    setVisible(true)
  }

  useEffect(() => {
    if (isFocused) {
      _init()
      setReload(true)
    } else {
      setVisible(false)
    }
  }, [d, isFocused])

  const onLoad = () => {
    setReload(false)
  }

  const onLoadCompanies = (_agencies: string[]) => {
    setCompanies(_agencies)
    setLoaded(true)
  }

  const onChangeCompanies = (_agencies: string[]) => {
    setCompanies(_agencies)
  }

  const onChangeRentalTerm = (_rentalTerms: movininTypes.RentalTerm[]) => {
    setRentalTerm(_rentalTerms)
  }

  const onChangePropertyType = (_propertyTypes: movininTypes.PropertyType[]) => {
    setPropertyTypes(_propertyTypes)
  }

  return (
    <Layout style={styles.master} onLoad={onLoad} reload={reload}>
      {!visible && <Indicator style={{ marginVertical: 10 }} />}
      {visible && (
        <PropertyList
          agencies={agencies}
          types={propertyTypes}
          rentalTerms={rentalTerms}
          location={location}
          from={new Date(Number(from))}
          to={new Date(Number(to))}
          routeName="Properties"
          header={(
            <View>
              <AgencyFilter style={styles.filter} visible onLoad={onLoadCompanies} onChange={onChangeCompanies} />
              <PropertyTypeFilter style={styles.filter} visible={loaded} onChange={onChangePropertyType} />
              <RentalTermFilter style={styles.filter} visible={loaded} onChange={onChangeRentalTerm} />
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

export default SearchScreen
