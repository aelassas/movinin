import React, { useEffect, useRef, useState } from 'react'
import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput as ReactTextInput
} from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { MaterialIcons } from '@expo/vector-icons'
import validator from 'validator'
import { format, intervalToDuration } from 'date-fns'
import { enUS, fr } from 'date-fns/locale'
import { PaymentSheetError, initPaymentSheet, useStripe } from '@stripe/stripe-react-native'
import * as movininTypes from ':movinin-types'
import * as movininHelper from ':movinin-helper'

import Layout from '@/components/Layout'
import i18n from '@/lang/i18n'
import * as UserService from '@/services/UserService'
import PropertyList from '@/components/PropertyList'
import TextInput from '@/components/TextInput'
import DateTimePicker from '@/components/DateTimePicker'
import Switch from '@/components/Switch'
import Link from '@/components/Link'
import * as helper from '@/common/helper'
import Error from '@/components/Error'
import Button from '@/components/Button'
import RadioButton from '@/components/RadioButton'
import * as PropertyService from '@/services/PropertyService'
import * as LocationService from '@/services/LocationService'
import * as BookingService from '@/services/BookingService'
import * as StripeService from '@/services/StripeService'
import * as env from '@/config/env.config'
import Backdrop from '@/components/Backdrop'
import Indicator from '@/components/Indicator'

const CheckoutScreen = ({ navigation, route }: NativeStackScreenProps<StackParams, 'Checkout'>) => {
  const isFocused = useIsFocused()
  const [reload, setReload] = useState(false)
  const [visible, setVisible] = useState(false)
  const [formVisible, setFormVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)
  const [user, setUser] = useState<movininTypes.User | null>()
  const [language, setLanguage] = useState(env.DEFAULT_LANGUAGE)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [birthDate, setBirthDate] = useState<Date>()
  const [tosChecked, setTosChecked] = useState(false)
  const [property, setProperty] = useState<movininTypes.Property | null>(null)
  const [location, setLocation] = useState<movininTypes.Location | null>(null)
  const [from, setFrom] = useState<Date>()
  const [to, setTo] = useState<Date>()
  const [price, setPrice] = useState(0)
  const [cancellation, setCancellation] = useState(false)

  const [payLater, setPayLater] = useState(false)

  const [fullNameRequired, setFullNameRequired] = useState(false)
  const [emailInfo, setEmailInfo] = useState(true)
  const [emailError, setEmailError] = useState(false)
  const [emailValid, setEmailValid] = useState(true)
  const [emailRequired, setEmailRequired] = useState(false)
  const [phoneInfo, setPhoneInfo] = useState(true)
  const [phoneValid, setPhoneValid] = useState(true)
  const [phoneRequired, setPhoneRequired] = useState(false)
  const [birthDateRequired, setBirthDateRequired] = useState(false)
  const [birthDateValid, setBirthDateValid] = useState(true)
  const [tosError, setTosError] = useState(false)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(true)
  const [locale, setLoacle] = useState(fr)

  const [currencySymbol, setCurrencySymbol] = useState('')
  const [cancellationText, setCancellationText] = useState('')
  const [priceLabel, setPriceLabel] = useState('')

  const fullNameRef = useRef<ReactTextInput>(null)
  const emailRef = useRef<ReactTextInput>(null)
  const phoneRef = useRef<ReactTextInput>(null)
  const cardNameRef = useRef<ReactTextInput>(null)
  const cardNumberRef = useRef<ReactTextInput>(null)
  const cardMonthRef = useRef<ReactTextInput>(null)
  const cardYearRef = useRef<ReactTextInput>(null)
  const cvvRef = useRef<ReactTextInput>(null)

  const { presentPaymentSheet } = useStripe()

  const _init = async () => {
    try {
      setVisible(false)
      setFormVisible(false)

      const _language = await UserService.getLanguage()
      i18n.locale = _language
      setLanguage(_language)
      setLoacle(_language === 'fr' ? fr : enUS)

      setAuthenticated(false)
      setUser(null)

      let _authenticated = false
      let _user = null
      const currentUser = await UserService.getCurrentUser()

      if (currentUser?._id) {
        let status
        try {
          status = await UserService.validateAccessToken()
        } catch {
          status = 403
        }

        if (status === 200) {
          const __user = await UserService.getUser(currentUser._id)

          if (__user) {
            _authenticated = true
            _user = __user
          }
        }
      }

      setAuthenticated(_authenticated)
      setUser(_user)

      if (!_authenticated) {
        setFullName('')
        setEmail('')
        setPhone('')
        setBirthDate(undefined)
        setTosChecked(false)

        if (fullNameRef.current) {
          fullNameRef.current.clear()
        }
        if (emailRef.current) {
          emailRef.current.clear()
        }
        if (phoneRef.current) {
          phoneRef.current.clear()
        }
      }

      setFullNameRequired(false)
      setEmailRequired(false)
      setEmailValid(true)
      setEmailError(false)
      setPhoneRequired(false)
      setPhoneValid(true)
      setBirthDateRequired(false)
      setBirthDateValid(true)
      setBirthDateRequired(false)
      setTosError(false)
      setError(false)
      setPayLater(false)
      setSuccess(false)

      if (cardNameRef.current) {
        cardNameRef.current.clear()
      }
      if (cardNumberRef.current) {
        cardNumberRef.current.clear()
      }
      if (cardMonthRef.current) {
        cardMonthRef.current.clear()
      }
      if (cardYearRef.current) {
        cardYearRef.current.clear()
      }
      if (cvvRef.current) {
        cvvRef.current.clear()
      }

      if (!route.params
        || !route.params.property
        || !route.params.location
        || !route.params.from
        || !route.params.to) {
        await UserService.signout(navigation)
        return
      }

      const _property = await PropertyService.getProperty(route.params.property)
      setProperty(_property)

      const _location = await LocationService.getLocation(route.params.location)
      setLocation(_location)

      const _from = new Date(route.params.from)
      setFrom(_from)

      const _to = new Date(route.params.to)
      setTo(_to)

      const _price = await StripeService.convertPrice(movininHelper.calculateTotalPrice(_property, _from, _to))
      setPrice(_price)

      const included = (val: number) => val === 0

      setCurrencySymbol(await StripeService.getCurrencySymbol())
      setCancellation(included(_property.cancellation))
      setCancellationText(await helper.getCancellationOption(_property.cancellation, _language))
      setPriceLabel(await helper.priceLabel(_property, _language))

      setVisible(true)
      setFormVisible(true)
    } catch {
      await UserService.signout(navigation)
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

  const validateFullName = () => {
    const valid = fullName !== ''
    setFullNameRequired(!valid)
    setError(!valid)
    return valid
  }

  const onChangeFullName = (text: string) => {
    setFullName(text)
    setFullNameRequired(false)
    setError(false)
  }

  const validateEmail = async () => {
    if (email) {
      setEmailRequired(false)

      if (validator.isEmail(email)) {
        try {
          const status = await UserService.validateEmail({ email })
          if (status === 200) {
            setEmailInfo(true)
            setEmailError(false)
            setEmailValid(true)
            setError(false)
            return true
          }
          setEmailInfo(false)
          setEmailError(true)
          setEmailValid(true)
          setError(true)
          return false
        } catch (err) {
          helper.error(err)
          setEmailInfo(true)
          setEmailError(false)
          setEmailValid(true)
          setError(false)
          return false
        }
      } else {
        setEmailError(false)
        setEmailValid(false)
        setError(true)
        return false
      }
    } else {
      setEmailInfo(false)
      setEmailRequired(true)
      setEmailError(false)
      setEmailValid(true)
      setError(true)
      return false
    }
  }

  const onChangeEmail = (text: string) => {
    setEmail(text)
    setEmailInfo(true)
    setEmailRequired(false)
    setEmailValid(true)
    setEmailError(false)
    setError(false)
  }

  const validatePhone = () => {
    if (phone) {
      const _phoneValid = validator.isMobilePhone(phone)
      setPhoneInfo(_phoneValid)
      setPhoneRequired(false)
      setPhoneValid(_phoneValid)
      setError(!_phoneValid)

      return _phoneValid
    }
    setPhoneInfo(false)
    setPhoneRequired(true)
    setPhoneValid(true)
    setError(true)

    return false
  }

  const onChangePhone = (text: string) => {
    setPhone(text)
    setPhoneInfo(true)
    setPhoneRequired(false)
    setPhoneValid(true)
    setError(false)
  }

  const validateBirthDate = () => {
    if (birthDate) {
      setBirthDateRequired(false)

      const sub = intervalToDuration({
        start: birthDate,
        end: new Date(),
      }).years ?? 0
      const _birthDateValid = sub >= env.MINIMUM_AGE

      setBirthDateValid(_birthDateValid)
      setError(!_birthDateValid)
      return _birthDateValid
    }
    setBirthDateRequired(true)
    setBirthDateValid(true)
    setError(true)

    return false
  }

  const onChangeBirthDate = (date: Date | undefined) => {
    setBirthDate(date)
    setBirthDateRequired(false)
    setBirthDateValid(true)
    setError(false)
  }

  const onChangeToS = (checked: boolean) => {
    setTosChecked(checked)
    if (checked) {
      setTosError(false)
    }
  }

  const onCancellationChange = async (checked: boolean) => {
    const options = {
      cancellation: checked
    }
    const _price = await StripeService.convertPrice(movininHelper.calculateTotalPrice(property as movininTypes.Property, from as Date, to as Date, options))
    setCancellation(checked)
    setPrice(_price)
  }

  const _error = (err?: unknown) => {
    helper.error(err)
    setLoading(false)
  }

  const handleCheckout = async () => {
    try {
      if (!property || !location || !from || !to) {
        helper.error()
        return
      }

      if (!authenticated) {
        fullNameRef?.current?.blur()
        emailRef?.current?.blur()
        phoneRef?.current?.blur()

        const fullNameValid = validateFullName()
        if (!fullNameValid) {
          return
        }

        const _emailValid = await validateEmail()
        if (!_emailValid) {
          return
        }

        const _phoneValid = validatePhone()
        if (!_phoneValid) {
          return
        }

        const _birthDateValid = validateBirthDate()
        if (!_birthDateValid) {
          return
        }

        if (!tosChecked) {
          setTosError(true)
          return
        }
      }

      setLoading(true)

      let renter: movininTypes.User | undefined

      if (!authenticated) {
        renter = {
          email,
          phone,
          fullName,
          birthDate,
          language: await UserService.getLanguage(),
        }
      }

      const currency = await StripeService.getCurrency()
      let paid = payLater
      let canceled = false
      let paymentIntentId: string | undefined
      let customerId: string | undefined
      try {
        if (!payLater) {
          const name = movininHelper.truncateString(`${env.WEBSITE_NAME} - ${property.name}`, StripeService.ORDER_NAME_MAX_LENGTH)
          const _locale = _fr ? fr : enUS
          const days = movininHelper.days(from, to)
          const daysLabel = from && to && `${helper.getDaysShort(days)} (${movininHelper.capitalize(format(from, _format, { locale: _locale }),)} - ${movininHelper.capitalize(format(to, _format, { locale: _locale }))})`
          const _description = `${env.WEBSITE_NAME} - ${property.name} - ${daysLabel} - ${location.name}`
          const description = movininHelper.truncateString(_description, StripeService.ORDER_DESCRIPTION_MAX_LENGTH)

          const createPaymentIntentPayload: movininTypes.CreatePaymentPayload = {
            amount: price,
            currency,
            locale: language,
            receiptEmail: (!authenticated ? renter?.email : user?.email) as string,
            name,
            description,
            customerName: (!authenticated ? renter?.fullName : user?.fullName) as string,
          }

          // Create payment intent
          const {
            paymentIntentId: stripePaymentIntentId,
            clientSecret,
            customerId: stripeCustomerId,
          } = await StripeService.createPaymentIntent(createPaymentIntentPayload)
          paymentIntentId = stripePaymentIntentId || undefined
          customerId = stripeCustomerId || undefined

          if (clientSecret) {
            const { error: initPaymentSheetError } = await initPaymentSheet({
              customerId,
              paymentIntentClientSecret: clientSecret,
              merchantDisplayName: "Movin' In",
              googlePay: {
                merchantCountryCode: env.STRIPE_COUNTRY_CODE.toUpperCase(),
                testEnv: env.STRIPE_PUBLISHABLE_KEY.includes('_test_'),
                currencyCode: currency,
              },
              applePay: {
                merchantCountryCode: env.STRIPE_COUNTRY_CODE.toUpperCase(),
              },
            })
            if (initPaymentSheetError) {
              console.log(initPaymentSheetError)
              paid = false
            } else {
              const { error: presentPaymentSheetError } = await presentPaymentSheet()
              if (presentPaymentSheetError) {
                canceled = presentPaymentSheetError.code === PaymentSheetError.Canceled
                if (!canceled) {
                  console.log(`${presentPaymentSheetError.code} - ${presentPaymentSheetError.message}`)
                  paid = false
                }
              } else {
                paid = true
              }
            }
          }
        }
      } catch (err) {
        console.log(err)
        paid = false
      }

      if (canceled) {
        setLoading(false)
        return
      }

      if (!paid) {
        setLoading(false)
        alert(i18n.t('PAYMENT_FAILED'))
        return
      }

      const basePrice = await movininHelper.convertPrice(price, currency, env.BASE_CURRENCY)

      const booking: movininTypes.Booking = {
        agency: property.agency._id as string,
        property: property._id as string,
        renter: authenticated ? user?._id : undefined,
        location: location._id as string,
        from,
        to,
        status: payLater ? movininTypes.BookingStatus.Pending : movininTypes.BookingStatus.Paid,
        cancellation,
        price: basePrice,
      }

      const payload: movininTypes.CheckoutPayload = {
        renter,
        booking,
        payLater,
        paymentIntentId,
        customerId
      }

      const status = await BookingService.checkout(payload)

      if (status === 200) {
        setLoading(false)
        setFormVisible(false)
        setSuccess(true)
      } else {
        _error()
      }
    } catch (err) {
      _error(err)
    }
  }

  const iconSize = 18
  const iconColor = '#000'
  const _fr = movininHelper.isFrench(language)
  const _format = _fr ? 'eee d LLL yyyy kk:mm' : 'eee, d LLL yyyy, p'

  return (
    <Layout style={styles.master} navigation={navigation} onLoad={onLoad} reload={reload} route={route}>
      {!visible && <Indicator style={{ marginVertical: 10 }} />}
      {visible && property && from && to && location && (
        <>
          {formVisible && (
            <PropertyList
              navigation={navigation}
              properties={[property]}
              location={location._id}
              from={from}
              to={to}
              hidePrice
              route={route}
              routeName="Checkout"
              // header={<Text style={styles.header}>{i18n.t('CREATE_BOOKING')}</Text>}
              footerComponent={<View style={styles.contentContainer}>
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <MaterialIcons name="event-seat" size={iconSize} color={iconColor} />
                    <Text style={styles.sectionHeaderText}>{i18n.t('BOOKING_OPTIONS')}</Text>
                  </View>

                  <View style={styles.extra}>
                    <Switch
                      disabled={property.cancellation === -1 || property.cancellation === 0}
                      textStyle={styles.extraSwitch}
                      label={i18n.t('CANCELLATION')}
                      value={cancellation}
                      onValueChange={onCancellationChange}
                    />
                    <Text style={styles.extraText}>{cancellationText}</Text>
                  </View>
                </View>

                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <MaterialIcons name="home" size={iconSize} color={iconColor} />
                    <Text style={styles.sectionHeaderText}>{i18n.t('BOOKING_DETAILS')}</Text>
                  </View>

                  <Text style={styles.detailTitle}>{i18n.t('DAYS')}</Text>
                  <Text style={styles.detailText}>
                    {`${helper.getDaysShort(movininHelper.days(from, to))} (${movininHelper.capitalize(format(from, _format, { locale }))} - ${movininHelper.capitalize(
                      format(to, _format, { locale }),
                    )})`}
                  </Text>

                  <Text style={styles.detailTitle}>{i18n.t('LOCATION')}</Text>
                  <Text style={styles.detailText}>{location.name}</Text>

                  <Text style={styles.detailTitle}>{i18n.t('PROPERTY')}</Text>
                  <Text style={styles.detailText}>{`${property.name} (${priceLabel})`}</Text>

                  <Text style={styles.detailTitle}>{i18n.t('AGENCY')}</Text>
                  <View style={styles.agency}>
                    <Image
                      style={styles.agencyImg}
                      source={{
                        uri: movininHelper.joinURL(env.CDN_USERS, property.agency.avatar),
                      }}
                    />
                    <Text style={styles.agencyText} numberOfLines={2} ellipsizeMode="tail">{property.agency.fullName}</Text>
                  </View>

                  <Text style={styles.detailTitle}>{i18n.t('COST')}</Text>
                  <Text style={styles.detailTextBold}>{movininHelper.formatPrice(price, currencySymbol, language)}</Text>
                </View>

                {!authenticated && (
                  <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                      <MaterialIcons name="person" size={iconSize} color={iconColor} />
                      <Text style={styles.sectionHeaderText}>{i18n.t('RENTER_DETAILS')}</Text>
                    </View>

                    <TextInput
                      ref={fullNameRef}
                      style={styles.component}
                      label={i18n.t('FULL_NAME')}
                      value={fullName}
                      error={fullNameRequired}
                      helperText={(fullNameRequired && i18n.t('REQUIRED')) || ''}
                      onChangeText={onChangeFullName}
                      backgroundColor="#fbfbfb"
                    />

                    <TextInput
                      ref={emailRef}
                      style={styles.component}
                      label={i18n.t('EMAIL')}
                      value={email}
                      error={emailRequired || !emailValid || emailError}
                      helperText={
                        (emailInfo && i18n.t('EMAIL_INFO'))
                        || (emailRequired && i18n.t('REQUIRED'))
                        || (!emailValid && i18n.t('EMAIL_NOT_VALID'))
                        || (emailError && i18n.t('BOOKING_EMAIL_ALREADY_REGISTERED'))
                        || ''
                      }
                      onChangeText={onChangeEmail}
                      backgroundColor="#fbfbfb"
                    />

                    <TextInput
                      ref={phoneRef}
                      style={styles.component}
                      label={i18n.t('PHONE')}
                      value={phone}
                      error={phoneRequired || !phoneValid}
                      helperText={(phoneInfo && i18n.t('PHONE_INFO')) || (phoneRequired && i18n.t('REQUIRED')) || (!phoneValid && i18n.t('PHONE_NOT_VALID')) || ''}
                      onChangeText={onChangePhone}
                      backgroundColor="#fbfbfb"
                    />

                    <DateTimePicker
                      mode="date"
                      locale={language}
                      style={styles.date}
                      label={i18n.t('BIRTH_DATE')}
                      value={birthDate}
                      error={birthDateRequired || !birthDateValid}
                      helperText={(birthDateRequired && i18n.t('REQUIRED')) || (!birthDateValid && helper.getBirthDateError(property.minimumAge)) || ''}
                      onChange={onChangeBirthDate}
                      backgroundColor="#fbfbfb"
                    />

                    <Switch style={styles.component} textStyle={styles.tosText} label={i18n.t('ACCEPT_TOS')} value={tosChecked} onValueChange={onChangeToS} />
                  </View>
                )}

                {property.agency.payLater && (
                  <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                      <MaterialIcons name="settings" size={iconSize} color={iconColor} />
                      <Text style={styles.sectionHeaderText}>{i18n.t('PAYMENT_OPTIONS')}</Text>
                    </View>

                    <RadioButton
                      label={i18n.t('PAY_LATER')}
                      checked={payLater}
                      onValueChange={(checked: boolean) => {
                        setPayLater(checked)
                      }}
                    />
                    <Text style={styles.paymentInfo}>{i18n.t('PAY_LATER_INFO')}</Text>

                    <RadioButton
                      label={i18n.t('PAY_ONLINE')}
                      checked={!payLater}
                      onValueChange={(checked: boolean) => {
                        setPayLater(!checked)
                      }}
                    />
                    <Text style={styles.paymentInfo}>{i18n.t('PAY_ONLINE_INFO')}</Text>
                  </View>
                )}

                <View style={styles.footer}>
                  <Button style={styles.component} label={i18n.t('BOOK_NOW')} onPress={handleCheckout} />

                  <View style={styles.error}>
                    {error && <Error message={i18n.t('FIX_ERRORS')} />}
                    {tosError && <Error message={i18n.t('TOS_ERROR')} />}
                  </View>
                </View>
              </View>
              }
            />
          )}
          {success && (
            <View style={styles.sucess}>
              <Text style={styles.sucessText}>{payLater ? i18n.t('PAY_LATER_SUCCESS') : i18n.t('BOOKING_SUCCESS')}</Text>
              <Link
                style={styles.sucessLink}
                label={i18n.t('GO_TO_HOME')}
                onPress={() => {
                  navigation.navigate('Home', { d: new Date().getTime() })
                }}
              />
            </View>
          )}
          {loading && <Backdrop message={i18n.t('PLEASE_WAIT')} />}
        </>
      )}
    </Layout>
  )
}

const styles = StyleSheet.create({
  master: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  header: {
    flex: 1,
    textAlign: 'center',
    textTransform: 'capitalize',
    fontSize: 27,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
    marginRight: 7,
    marginLeft: 7,
    padding: 5,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d9d8d9',
    borderRadius: 5,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  contentContainer: {
    width: '100%',
    maxWidth: 480,
    alignItems: 'center',
  },
  section: {
    alignSelf: 'stretch',
    backgroundColor: '#fbfbfb',
    borderWidth: 1,
    borderColor: '#d9d8d9',
    borderRadius: 5,
    marginTop: 15,
    marginRight: 10,
    marginLeft: 10,
    padding: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionHeaderText: {
    color: '#444',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 5,
  },
  extra: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  extraSwitch: {
    fontWeight: '600',
    fontSize: 13,
  },
  extraText: {
    color: 'rgba(0, 0, 0, 0.35)',
    fontSize: 12,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 13,
  },
  detailTitle: {
    alignSelf: 'stretch',
    alignItems: 'center',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  detailText: {
    color: 'rgba(0, 0, 0, 0.35)',
    fontSize: 12,
    marginBottom: 10,
  },
  detailTextBold: {
    fontSize: 15,
    fontWeight: '700',
  },
  agency: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'flex-start',
    flex: 1,
  },
  agencyImg: {
    width: env.AGENCY_IMAGE_WIDTH,
    height: env.AGENCY_IMAGE_HEIGHT,
    resizeMode: 'contain',
  },
  agencyText: {
    color: '#a1a1a1',
    fontSize: 10,
    marginLeft: 5,
    width: 200,
  },
  component: {
    alignSelf: 'stretch',
    marginBottom: 10,
  },
  tosText: {
    fontSize: 12,
  },
  date: {
    alignSelf: 'stretch',
    marginBottom: 25,
  },
  paymentInfo: {
    color: 'rgba(0, 0, 0, 0.35)',
    fontSize: 12,
    marginLeft: 25,
  },
  payment: {
    alignSelf: 'stretch',
    backgroundColor: '#e5efe5',
    borderWidth: 1,
    borderColor: '#d9d8d9',
    borderRadius: 5,
    marginTop: 45,
    marginRight: 10,
    marginLeft: 10,
    padding: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentHeader: {
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#1c8901',
    borderRadius: 5,
    marginTop: -58,
    marginBottom: 15,
    padding: 5,
  },
  paymentImage: {
    marginBottom: 15,
  },
  securePaymentInfo: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 3,
  },
  securePaymentInfoText: {
    fontSize: 13,
    color: '#1c8901',
    marginLeft: 5,
  },
  totalText: {
    color: '#1c8901',
    fontSize: 22,
    fontWeight: '700',
    marginRight: 7,
  },
  costText: {
    color: '#1c8901',
    fontSize: 22,
    fontWeight: '700',
  },
  footer: {
    alignSelf: 'stretch',
    marginTop: 15,
    marginRight: 10,
    marginBottom: 40,
    marginLeft: 10,
    alignItems: 'center',
  },
  sucess: {
    margin: 10,
  },
  sucessText: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.8)',
    marginBottom: 10,
  },
  sucessLink: {
    fontSize: 14,
  },
  error: {
    marginTop: 10,
  },
})

export default CheckoutScreen
