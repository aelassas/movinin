import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator
} from 'react-native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import * as movininTypes from '../miscellaneous/movininTypes'

import * as helper from '../common/helper'
import * as env from '../config/env.config'
import i18n from '../lang/i18n'
import * as UserService from '../services/UserService'
import * as PropertyService from '../services/PropertyService'
import Property from './Property'

interface PropertyListProps {
  navigation: NativeStackNavigationProp<StackParams, keyof StackParams>
  from?: Date
  to?: Date
  location: string
  agencies: string[]
  types: movininTypes.PropertyType[]
  rentalTerms: movininTypes.RentalTerm[]
  header?: React.ReactElement
  onLoad?: movininTypes.DataEvent<movininTypes.Property>
}

const PropertyList = ({
  navigation,
  from,
  to,
  location,
  agencies,
  types,
  rentalTerms,
  header,
  onLoad
}: PropertyListProps) => {
  const [language, setLanguage] = useState(env.DEFAULT_LANGUAGE)
  const [onScrollEnd, setOnScrollEnd] = useState(false)
  const [loading, setLoading] = useState(true)
  const [fetch, setFetch] = useState(false)
  const [rows, setRows] = useState<movininTypes.Property[]>([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    const init = async () => {
      try {
        const _language = await UserService.getLanguage()
        i18n.locale = _language
        setLanguage(_language)
      } catch (err) {
        helper.error(err)
      }
    }

    init()
  }, [])

  const fetchData = async (
    _page: number,
    _location: string,
    _agencies: string[],
    _types: movininTypes.PropertyType[],
    _rentalTerms: movininTypes.RentalTerm[]
  ) => {
    try {
      if (_agencies && _agencies.length > 0) {
        setLoading(true)
        setFetch(true)

        const payload: movininTypes.GetPropertiesPayload = {
          location: _location,
          agencies: _agencies,
          types: _types,
          rentalTerms: _rentalTerms,
        }

        const data = await PropertyService.getProperties(payload, _page, env.PROPERTIES_PAGE_SIZE)
        const _data = data && data.length > 0 ? data[0] : { pageInfo: { totalRecord: 0 }, resultData: [] }
        if (!_data) {
          helper.error()
          return
        }
        const totalRecords = Array.isArray(_data.pageInfo) && _data.pageInfo.length > 0 ? _data.pageInfo[0].totalRecords : 0
        const _rows = _page === 1 ? _data.resultData : [...rows, ..._data.resultData]

        setRows(_rows)
        setFetch(_data.resultData.length > 0)
        if (onLoad) {
          onLoad({ rows: _data.resultData, rowCount: totalRecords })
        }
      } else {
        setRows([])
        setFetch(false)
      }
    } catch (err) {
      helper.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (agencies) {
      if (agencies.length > 0) {
        fetchData(page, location, agencies, types, rentalTerms)
      } else {
        setRows([])
        setFetch(false)
        if (onLoad) {
          onLoad({ rows: [], rowCount: 0 })
        }
      }
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, location, agencies, types, rentalTerms])

  useEffect(() => {
    setPage(1)
  }, [location, agencies, types, rentalTerms])

  const fr = language === 'fr'
  const numToRender = Math.floor(env.PROPERTIES_PAGE_SIZE / 2)

  return (
    <View style={styles.container}>
      {from && to && location && (
        <FlatList
          keyboardShouldPersistTaps="handled"
          initialNumToRender={numToRender}
          maxToRenderPerBatch={numToRender}
          removeClippedSubviews
          nestedScrollEnabled
          contentContainerStyle={styles.contentContainer}
          style={styles.flatList}
          data={rows}
          renderItem={({ item: property }) => (
            <Property
              property={property}
              fr={fr}
              from={from}
              to={to}
              location={location}
              navigation={navigation}
            />
          )}
          keyExtractor={(item) => item._id}
          onEndReached={() => setOnScrollEnd(true)}
          onMomentumScrollEnd={() => {
            if (onScrollEnd && fetch) {
              setPage(page + 1)
            }
            setOnScrollEnd(false)
          }}
          ListHeaderComponent={header}
          ListFooterComponent={
            fetch
              ? <ActivityIndicator size="large" color="#0D63C9" style={styles.indicator} />
              : <></>
          }
          ListEmptyComponent={
            !loading ? (
              <View style={styles.container}>
                <Text>{i18n.t('EMPTY_PROPERTY_LIST')}</Text>
              </View>
            )
              : <></>
          }
          refreshing={loading}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    alignSelf: 'stretch',
    paddingTop: 10,
    paddingBottom: 10,
  },
  flatList: {
    alignSelf: 'stretch',
  },
  indicator: {
    margin: 10,
  },
})

export default PropertyList
