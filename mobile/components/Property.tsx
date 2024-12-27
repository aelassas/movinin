import React, { memo, useEffect, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions
} from 'react-native'
import * as movininTypes from ':movinin-types'
import * as movininHelper from ':movinin-helper'
import AutoHeightWebView from './AutoHeightWebView'
import Button from './Button'
import * as helper from '@/common/helper'
import * as env from '@/config/env.config'
import i18n from '@/lang/i18n'
import * as StripeService from '@/services/StripeService'

interface PropertyProps {
  navigation: NativeStackNavigationProp<StackParams, keyof StackParams>
  language: string
  property: movininTypes.Property
  from?: Date
  to?: Date
  location?: string
  hidePrice?: boolean
}

const iconSize = 24
const iconColor = '#000'

const getExtraIcon = (extra: number) =>
  (extra === -1 ? 'clear' : extra === 0 ? 'check' : 'info')

const Property = ({
  property,
  language,
  from,
  to,
  location,
  navigation,
  hidePrice
}: PropertyProps) => {
  const { width } = useWindowDimensions()

  const [days, setDays] = useState<number>()
  const [loading, setLoading] = useState(true)
  const [currencySymbol, setCurrencySymbol] = useState('')
  const [totalPrice, setTotalPrice] = useState<number>()
  const [cancellation, setCancellation] = useState('')

  useEffect(() => {
    const init = async () => {
      if (property && from && to && language) {
        setCurrencySymbol(await StripeService.getCurrencySymbol())
        setDays(movininHelper.days(from, to))
        setTotalPrice(await StripeService.convertPrice(movininHelper.calculateTotalPrice(property, from as Date, to as Date)))
        setCancellation(await helper.getCancellation(property.cancellation, language))
        setLoading(false)
      }
    }

    init()
  }, [property, from, language, to])

  const styles = StyleSheet.create({
    propertyContainer: {
      marginRight: 7,
      marginLeft: 7,
      marginBottom: 10,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'stretch',
    },
    property: {
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
    name: {
      fontSize: 20,
      fontWeight: '700',
      textAlign: 'center',
      marginBottom: 10,
    },
    imgView: {
      width: '100%',
      height: env.PROPERTY_IMAGE_HEIGHT,
      alignItems: 'center',
    },
    img: {
      width: env.PROPERTY_IMAGE_WIDTH,
      height: env.PROPERTY_IMAGE_HEIGHT,
      flex: 1,
      resizeMode: 'contain',
    },
    infos: {
      flexDirection: 'row',
      // alignItems: 'center',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
      marginTop: 10,
      marginBottom: 10,
    },
    info: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 4,
      minWidth: 60,
      padding: 2,
      marginTop: 5,
      marginLeft: 5,
    },
    infoIcon: {
      marginRight: 4,
    },
    text: {
      color: '#333',
      fontSize: 12,
    },
    extras: {
      alignSelf: 'stretch',
      marginTop: 10,
    },
    extra: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    footer: {
      flexDirection: 'row',
      alignSelf: 'stretch',
      alignItems: 'flex-end',
      marginBottom: 10,
      paddingLeft: 5,
    },
    agency: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      flex: hidePrice ? 1 : 0.5,
    },
    agencyImg: {
      width: env.AGENCY_IMAGE_WIDTH,
      height: env.AGENCY_IMAGE_HEIGHT,
      resizeMode: 'contain',
    },
    agencyText: {
      color: '#a1a1a1',
      fontSize: 12,
      marginLeft: 5,
      width: hidePrice ? 200 : 120,
    },
    description: {
      padding: 2,
    },
    price: {
      flex: 2,
      alignSelf: 'stretch',
      alignItems: 'flex-end',
      marginTop: 20,
    },
    pricePrimary: {
      fontSize: 22,
      fontWeight: '700',
      color: '#383838',
      lineHeight: 28,
    },
    priceSecondary: {
      fontSize: 13,
      color: '#a1a1a1',
    },
    buttonContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      width: '100%',
      marginTop: 10,
    },
  })

  return !loading && days && totalPrice && (
    <View key={property._id} style={styles.propertyContainer}>
      <View style={styles.property}>
        <Text style={styles.name}>{property.name}</Text>

        <View style={styles.imgView}>
          <Image style={styles.img} source={{ uri: movininHelper.joinURL(env.CDN_PROPERTIES, property.image) }} />
        </View>

        <View style={styles.infos}>
          <View style={styles.info}>
            <MaterialIcons name="house" size={iconSize} color={iconColor} style={styles.infoIcon} />
            <Text style={styles.text}>{helper.getPropertyType(property.type)}</Text>
          </View>
          <View style={styles.info}>
            <MaterialIcons name="single-bed" size={iconSize} color={iconColor} style={styles.infoIcon} />
            <Text style={styles.text}>{property.bedrooms}</Text>
          </View>
          <View style={styles.info}>
            <MaterialIcons name="bathtub" size={iconSize} color={iconColor} style={styles.infoIcon} />
            <Text style={styles.text}>{property.bathrooms}</Text>
          </View>
          <View style={styles.info}>
            <MaterialIcons name="countertops" size={iconSize} color={iconColor} style={styles.infoIcon} />
            <Text style={styles.text}>{property.kitchens}</Text>
          </View>
          <View style={styles.info}>
            <MaterialIcons name="directions-car" size={iconSize} color={iconColor} style={styles.infoIcon} />
            <Text style={styles.text}>{property.parkingSpaces}</Text>
          </View>
          {
            property.furnished && (
              <View style={styles.info}>
                <MaterialIcons name="event-seat" size={iconSize} color={iconColor} style={styles.infoIcon} />
                <Text style={styles.text}>{i18n.t('FURNISHED')}</Text>
              </View>
            )
          }
          {
            property.aircon && (
              <View style={styles.info}>
                <MaterialIcons name="ac-unit" size={iconSize} color={iconColor} style={styles.infoIcon} />
                <Text style={styles.text}>{i18n.t('AIRCON')}</Text>
              </View>
            )
          }
          {
            property.petsAllowed && (
              <View style={styles.info}>
                <MaterialIcons name="pets" size={iconSize} color={iconColor} style={styles.infoIcon} />
                <Text style={styles.text}>{i18n.t('PETS_ALLOWED')}</Text>
              </View>
            )
          }
        </View>

        <View style={styles.extras}>
          {
            property.size
            && (
              <View style={styles.extra}>
                <MaterialIcons name="photo-size-select-small" size={iconSize} style={styles.infoIcon} />
                <Text style={styles.text}>{`${movininHelper.formatNumber(property.size, language)} ${env.SIZE_UNIT}`}</Text>
              </View>
            )
          }
          <View style={styles.extra}>
            <MaterialIcons name={getExtraIcon(property.cancellation)} size={iconSize} style={styles.infoIcon} />
            <Text style={styles.text}>{cancellation}</Text>
          </View>
        </View>

        <View style={styles.description}>
          <AutoHeightWebView
            originWhitelist={['*']}
            source={{ html: `<meta id="Viewport" name="viewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"> ${property.description}` }}
            automaticallyAdjustContentInsets={true}
            scalesPageToFit={true}
            startInLoadingState={true}

            width={width}
            defaultHeight={200}
            autoHeight={true}
          />
        </View>

        <View style={styles.footer}>
          <View style={styles.agency}>
            <Image
              style={styles.agencyImg}
              source={{
                uri: movininHelper.joinURL(env.CDN_USERS, property.agency.avatar),
              }}
            />
            <Text style={styles.agencyText} numberOfLines={2} ellipsizeMode="tail">{property.agency.fullName}</Text>
          </View>

          {!hidePrice && (
            <View style={styles.price}>
              <Text style={styles.priceSecondary}>{helper.getDays(days)}</Text>
              <Text style={styles.pricePrimary}>{`${movininHelper.formatPrice(totalPrice, currencySymbol, language)}`}</Text>
              <Text style={styles.priceSecondary}>{`${i18n.t('PRICE_PER_DAY')} ${movininHelper.formatPrice(totalPrice / days, currencySymbol, language)}`}</Text>
            </View>
          )}
        </View>

        {
          !hidePrice && location && from && to && (
            <View style={styles.buttonContainer}>
              <Button
                style={styles.button}
                label={i18n.t('BOOK')}
                onPress={() => {
                  const params = {
                    property: property._id,
                    location,
                    from: from.getTime(),
                    to: to.getTime(),
                  }
                  navigation.navigate('Checkout', params)
                }}
              />
            </View>
          )
        }
      </View>
    </View>
  )
}

export default memo(Property)
