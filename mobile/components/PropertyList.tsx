import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { CommonActions, NavigationRoute, RouteProp } from '@react-navigation/native'
import * as movininTypes from ':movinin-types'
import * as movininHelper from ':movinin-helper'

import * as helper from '@/common/helper'
import * as env from '@/config/env.config'
import i18n from '@/lang/i18n'
import * as UserService from '@/services/UserService'
import * as PropertyService from '@/services/PropertyService'
import Property from './Property'

interface PropertyListProps {
  navigation: NativeStackNavigationProp<StackParams, keyof StackParams>
  from?: Date
  to?: Date
  location?: string
  agencies?: string[]
  types?: movininTypes.PropertyType[]
  rentalTerms?: movininTypes.RentalTerm[]
  header?: React.ReactElement
  properties?: movininTypes.Property[]
  hidePrice?: boolean
  footerComponent?: React.ReactElement
  route: RouteProp<StackParams, keyof StackParams>
  routeName?: 'Properties' | 'Checkout'
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
  properties,
  hidePrice,
  footerComponent,
  // route,
  routeName,
  onLoad
}: PropertyListProps) => {
  const [language, setLanguage] = useState(env.DEFAULT_LANGUAGE)
  const [onScrollEnd, setOnScrollEnd] = useState(false)
  const [loading, setLoading] = useState(true)
  const [fetch, setFetch] = useState(false)
  const [rows, setRows] = useState<movininTypes.Property[]>([])
  const [page, setPage] = useState(1)
  const [refreshing, setRefreshing] = useState(false)

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
      if (agencies.length > 0 && location && types && rentalTerms) {
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
    if (location && agencies && types && rentalTerms) {
      setPage(1)
    }
  }, [location, agencies, types, rentalTerms])

  useEffect(() => {
    if (properties) {
      setRows(properties)
      setFetch(false)
      if (onLoad) {
        onLoad({ rows: properties, rowCount: properties.length })
      }
      setLoading(false)
    }
  }, [properties]) // eslint-disable-line react-hooks/exhaustive-deps

  const numToRender = Math.floor(env.PROPERTIES_PAGE_SIZE / 2)

  return (
    <View style={styles.container}>
      {((from && to && location) || hidePrice) && (
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
              language={language}
              from={from}
              to={to}
              location={location}
              navigation={navigation}
              hidePrice={hidePrice}
            />
          )}
          keyExtractor={(item) => item._id}
          onEndReachedThreshold={0.8}
          onEndReached={() => {
            if (fetch && !onScrollEnd) {
              setOnScrollEnd(true)
            }
          }}
          onMomentumScrollEnd={() => {
            if (onScrollEnd && fetch) {
              setPage(page + 1)
            }
            setOnScrollEnd(false)
          }}
          ListHeaderComponent={header}
          ListFooterComponent={
            footerComponent || (fetch
              ? <ActivityIndicator size="large" color="#0D63C9" style={styles.indicator} />
              : <></>)
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
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={() => {
              setRefreshing(true)

              if ((routeName && location && from && to) && ((routeName === 'Checkout' && properties && properties.length > 0) || routeName === 'Properties')) {
                // helper.navigate(route, navigation, true)

                navigation.dispatch((state) => {
                  const { routes } = state
                  const _routes = movininHelper.cloneArray(routes) as NavigationRoute<StackParams, keyof StackParams>[]
                  let index = 0
                  if (routeName === 'Properties') {
                    index = routes.findIndex((r) => r.name === 'Properties')
                    // routes.splice(index, 1)
                    const now = Date.now()
                    _routes[index] = {
                      name: routeName,
                      key: `${routeName}-${now}`,
                      params: {
                        location: location!,
                        from: from!.getTime(),
                        to: to!.getTime(),
                        d: now,
                      },
                    }
                    // routes.push({
                    //   name: 'Properties',
                    //   key: `Properties-${now}`,
                    //   params: {
                    //     location: location!,
                    //     from: from!.getTime(),
                    //     to: to!.getTime(),
                    //     d: now,
                    //   },
                    // })
                  } else {
                    index = routes.findIndex((r) => r.name === 'Checkout')
                    // routes.splice(index, 1)
                    const now = Date.now()
                    _routes[index] = {
                      name: routeName,
                      key: `${routeName}-${now}`,
                      params: {
                        property: properties![0]._id,
                        location: location!,
                        from: from!.getTime(),
                        to: to!.getTime(),
                        d: now,
                      },
                    }
                    // routes.push({
                    //   name: 'Checkout',
                    //   key: `Checkout-${now}`,
                    //   params: {
                    //     property: properties![0]._id,
                    //     location: location!,
                    //     from: from!.getTime(),
                    //     to: to!.getTime(),
                    //     d: now,
                    //   },
                    // })
                  }

                  return CommonActions.reset({
                    ...state,
                    routes: _routes,
                    index,
                  })
                })
              } else {
                setRefreshing(false)
              }
            }}
            />
          }
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
