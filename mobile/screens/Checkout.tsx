import React, { useEffect, useRef, useState } from 'react'
import {
  Image,
  ScrollView,
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
import * as movininTypes from '../miscellaneous/movininTypes'
import * as movininHelper from '../miscellaneous/movininHelper'

import Master from '../components/Master'
import i18n from '../lang/i18n'
import * as UserService from '../services/UserService'
import TextInput from '../components/TextInput'
import DateTimePicker from '../components/DateTimePicker'
import Switch from '../components/Switch'
import Link from '../components/Link'
import * as helper from '../common/helper'
import Error from '../components/Error'
import Button from '../components/Button'
import RadioButton from '../components/RadioButton'
import * as PropertyService from '../services/PropertyService'
import * as LocationService from '../services/LocationService'
import * as BookingService from '../services/BookingService'
import * as env from '../config/env.config'
import Backdrop from '../components/Backdrop'

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
  const [cardName, setCardName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [cardMonth, setCardMonth] = useState('')
  const [cardYear, setCardYear] = useState('')
  const [cvv, setCardCvv] = useState('')
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
  const [cardNameRequired, setCardNameRequired] = useState(false)
  const [cardNumberRequired, setCardNumberRequired] = useState(false)
  const [cardNumberValid, setCardNumberValid] = useState(true)
  const [cardMonthRequired, setCardMonthRequired] = useState(false)
  const [cardMonthValid, setCardMonthValid] = useState(true)
  const [cardYearRequired, setCardYearRequired] = useState(false)
  const [cardYearValid, setCardYearValid] = useState(true)
  const [cvvRequired, setCardCvvRequired] = useState(false)
  const [cvvValid, setCardCvvValid] = useState(true)
  const [cardDateError, setCardDateError] = useState(false)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(true)
  const [locale, setLoacle] = useState(fr)

  const fullNameRef = useRef<ReactTextInput>(null)
  const emailRef = useRef<ReactTextInput>(null)
  const phoneRef = useRef<ReactTextInput>(null)
  const cardNameRef = useRef<ReactTextInput>(null)
  const cardNumberRef = useRef<ReactTextInput>(null)
  const cardMonthRef = useRef<ReactTextInput>(null)
  const cardYearRef = useRef<ReactTextInput>(null)
  const cvvRef = useRef<ReactTextInput>(null)

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
        } catch (err) {
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

      setCardName('')
      setCardNumber('')
      setCardMonth('')
      setCardYear('')
      setCardCvv('')

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
      setCardNameRequired(false)
      setCardNumberRequired(false)
      setCardNumberValid(true)
      setCardYearRequired(false)
      setCardYearValid(true)
      setCardMonthRequired(false)
      setCardMonthValid(true)
      setCardCvvRequired(false)
      setCardCvvValid(true)
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

      const _price = helper.price(_property, _from, _to)
      setPrice(_price)

      const included = (val: number) => val === 0

      setCancellation(included(_property.cancellation))

      setVisible(true)
      setFormVisible(true)
    } catch (err) {
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

  const validateCardName = () => {
    if (cardName) {
      setCardNameRequired(false)
      return true
    }
    setCardNameRequired(true)
    return false
  }

  const onCardNameChange = (text: string) => {
    setCardName(text)
    setCardNameRequired(false)
  }

  const validateCardNumber = () => {
    if (cardNumber) {
      const _cardNumberValid = validator.isCreditCard(cardNumber)
      setCardNumberRequired(false)
      setCardNumberValid(_cardNumberValid)

      return _cardNumberValid
    }
    setCardNumberRequired(true)
    setCardNumberValid(true)

    return false
  }

  const onCardNumberChange = (text: string) => {
    setCardNumber(text)
    setCardNumberRequired(false)
    setCardNumberValid(true)
  }

  const validateCardMonth = () => {
    if (cardMonth) {
      const month = Number.parseInt(cardMonth, 10)
      const _cardMonthValid = month >= 1 && month <= 12

      setCardMonthRequired(false)
      setCardMonthValid(_cardMonthValid)
      setCardDateError(false)

      return _cardMonthValid
    }
    setCardMonthRequired(true)
    setCardMonthValid(true)
    setCardDateError(false)

    return false
  }

  const onCardMonthChange = (text: string) => {
    setCardMonth(text)
    setCardMonthRequired(false)
    setCardMonthValid(true)
  }

  const validateCardYear = () => {
    if (cardYear) {
      const year = Number.parseInt(cardYear, 10)
      const currentYear = Number.parseInt(String(new Date().getFullYear()).slice(2), 10)
      const _cardYearValid = year >= currentYear

      setCardYearRequired(false)
      setCardYearValid(_cardYearValid)
      setCardDateError(false)

      return _cardYearValid
    }
    setCardYearRequired(true)
    setCardYearValid(true)
    setCardDateError(false)

    return false
  }

  const onCardYearChange = (text: string) => {
    setCardYear(text)
    setCardYearRequired(false)
    setCardYearValid(true)
  }

  const validateCvv = () => {
    if (cvv) {
      const _cvvValid = movininHelper.isCvv(cvv)
      setCardCvvRequired(false)
      setCardCvvValid(_cvvValid)

      return _cvvValid
    }
    setCardCvvRequired(true)
    setCardCvvValid(true)

    return false
  }

  const onCardCvvChange = (text: string) => {
    setCardCvv(text)
    setCardCvvRequired(false)
    setCardCvvValid(true)
  }

  const validateCardDate = (_cardMonth: string, _cardYear: string) => {
    const today = new Date()
    const cardDate = new Date()
    const y = Number.parseInt(String(today.getFullYear()).slice(0, 2), 10) * 100
    const year = y + Number.parseInt(_cardYear, 10)
    const month = Number.parseInt(_cardMonth, 10)
    cardDate.setFullYear(year, month - 1, 1)

    if (cardDate < today) {
      return false
    }

    return true
  }

  const onCancellationChange = (checked: boolean) => {
    const options = {
      cancellation: checked
    }
    const _price = helper.price(property as movininTypes.Property, from as Date, to as Date, options)
    setCancellation(checked)
    setPrice(_price)
  }

  const _error = (err?: unknown) => {
    helper.error(err)
    setLoading(false)
  }

  const onPressBook = async () => {
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

      if (!payLater) {
        const cardNameValid = validateCardName()
        if (!cardNameValid) {
          return
        }

        const _cardNumberValid = validateCardNumber()
        if (!_cardNumberValid) {
          return
        }

        const _cardMonthValid = validateCardMonth()
        if (!_cardMonthValid) {
          return
        }

        const _cardYearValid = validateCardYear()
        if (!_cardYearValid) {
          return
        }

        const _cvvValid = validateCvv()
        if (!_cvvValid) {
          return
        }

        const cardDateValid = validateCardDate(cardMonth, cardYear)
        if (!cardDateValid) {
          setCardDateError(true)
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

      const booking: movininTypes.Booking = {
        agency: property.agency._id as string,
        property: property._id as string,
        renter: authenticated ? user?._id : undefined,
        location: location._id as string,
        from,
        to,
        status: payLater ? movininTypes.BookingStatus.Pending : movininTypes.BookingStatus.Paid,
        cancellation,
        price,
      }

      const payload: movininTypes.CheckoutPayload = {
        renter,
        booking,
        payLater,
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
  const _fr = language === 'fr'
  const _format = `eee d LLLL yyyy ${_fr ? 'kk:mm' : 'p'}`

  return (
    <Master style={styles.master} navigation={navigation} onLoad={onLoad} reload={reload} route={route}>
      {visible && property && from && to && location && (
        <>
          {formVisible && (
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" nestedScrollEnabled>
              <View style={styles.contentContainer}>
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
                    <Text style={styles.extraText}>{helper.getCancellationOption(property.cancellation, _fr)}</Text>
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
                  <Text style={styles.detailText}>{`${property.name} (${helper.priceLabel(property)})`}</Text>

                  <Text style={styles.detailTitle}>{i18n.t('AGENCY')}</Text>
                  <View style={styles.agency}>
                    <Image
                      style={styles.agencyImg}
                      source={{
                        uri: movininHelper.joinURL(env.CDN_USERS, property.agency.avatar),
                      }}
                    />
                    <Text style={styles.agencyText}>{property.agency.fullName}</Text>
                  </View>

                  <Text style={styles.detailTitle}>{i18n.t('COST')}</Text>
                  <Text style={styles.detailTextBold}>{`${movininHelper.formatNumber(price)} ${i18n.t('CURRENCY')}`}</Text>
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

                {(!property.agency.payLater || !payLater) && (
                  <View style={styles.payment}>
                    <View style={styles.paymentHeader}>
                      <View style={styles.securePaymentInfo}>
                        <MaterialIcons name="lock" size={iconSize} color="#1c8901" />
                        <Text style={styles.securePaymentInfoText}>{i18n.t('PAYMENT')}</Text>
                      </View>

                      <View style={styles.securePaymentInfo}>
                        <Text style={styles.totalText}>{i18n.t('COST')}</Text>
                        <Text style={styles.costText}>{`${movininHelper.formatNumber(price)} ${i18n.t('CURRENCY')}`}</Text>
                      </View>
                    </View>

                    <Image source={require('../assets/secure-payment.png')} style={styles.paymentImage} />

                    <TextInput
                      ref={cardNameRef}
                      style={styles.component}
                      label={i18n.t('CARD_NAME')}
                      value={cardName}
                      error={cardNameRequired}
                      helperText={(cardNameRequired && i18n.t('REQUIRED')) || ''}
                      backgroundColor="#e5efe5"
                      onChangeText={onCardNameChange}
                    />

                    <TextInput
                      ref={cardNumberRef}
                      style={styles.component}
                      label={i18n.t('CARD_NUMBER')}
                      keyboardType="numeric"
                      maxLength={16}
                      value={cardNumber}
                      error={cardNumberRequired || !cardNumberValid}
                      helperText={(cardNumberRequired && i18n.t('REQUIRED')) || (!cardNumberValid && i18n.t('CARD_NUMBER_NOT_VALID')) || ''}
                      backgroundColor="#e5efe5"
                      onChangeText={onCardNumberChange}
                    />

                    <TextInput
                      ref={cardMonthRef}
                      style={styles.component}
                      label={i18n.t('CARD_MONTH')}
                      keyboardType="numeric"
                      maxLength={2}
                      value={cardMonth}
                      error={cardMonthRequired || !cardMonthValid}
                      helperText={(cardMonthRequired && i18n.t('REQUIRED')) || (!cardMonthValid && i18n.t('CARD_MONTH_NOT_VALID')) || ''}
                      backgroundColor="#e5efe5"
                      onChangeText={onCardMonthChange}
                    />

                    <TextInput
                      ref={cardYearRef}
                      style={styles.component}
                      label={i18n.t('CARD_YEAR')}
                      keyboardType="numeric"
                      maxLength={2}
                      value={cardYear}
                      error={cardYearRequired || !cardYearValid}
                      helperText={(cardYearRequired && i18n.t('REQUIRED')) || (!cardYearValid && i18n.t('CARD_YEAR_NOT_VALID')) || ''}
                      backgroundColor="#e5efe5"
                      onChangeText={onCardYearChange}
                    />

                    <TextInput
                      ref={cvvRef}
                      style={styles.component}
                      keyboardType="numeric"
                      maxLength={4}
                      label={i18n.t('CVV')}
                      value={cvv}
                      error={cvvRequired || !cvvValid}
                      helperText={(cvvRequired && i18n.t('REQUIRED')) || (!cvvValid && i18n.t('CVV_NOT_VALID')) || ''}
                      backgroundColor="#e5efe5"
                      onChangeText={onCardCvvChange}
                    />

                    <View style={styles.securePaymentInfo}>
                      <MaterialIcons name="lock" size={iconSize} color="#1c8901" />
                      <Text style={styles.securePaymentInfoText}>{i18n.t('SECURE_PAYMENT_INFO')}</Text>
                    </View>
                  </View>
                )}

                <View style={styles.footer}>
                  <Button style={styles.component} label={i18n.t('BOOK_NOW')} onPress={onPressBook} />

                  <View style={styles.error}>
                    {error && <Error message={i18n.t('FIX_ERRORS')} />}
                    {cardDateError && <Error message={i18n.t('CARD_DATE_ERROR')} />}
                    {tosError && <Error message={i18n.t('TOS_ERROR')} />}
                  </View>
                </View>
              </View>
            </ScrollView>
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
    </Master>
  )
}

const styles = StyleSheet.create({
  master: {
    flex: 1,
    backgroundColor: '#fafafa',
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
    flexDirection: 'column',
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
    marginLeft: 53,
    marginTop: -3,
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
