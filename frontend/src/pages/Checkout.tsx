import React, { useCallback, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  OutlinedInput, InputLabel,
  FormControl,
  FormHelperText,
  Button,
  Paper,
  Checkbox,
  Link,
  FormControlLabel,
  Switch,
  RadioGroup,
  Radio,
  CircularProgress
} from '@mui/material'
import {
  Home as PropertyIcon,
  Person as RenterIcon,
  EventSeat as BookingIcon,
  Settings as PaymentOptionsIcon
} from '@mui/icons-material'
import validator from 'validator'
import { format, intervalToDuration } from 'date-fns'
import { fr, enUS } from 'date-fns/locale'
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { GoogleReCaptcha } from 'react-google-recaptcha-v3'
import * as movininTypes from ':movinin-types'
import * as movininHelper from ':movinin-helper'
import env from '../config/env.config'
import * as BookingService from '../services/BookingService'
import { strings as commonStrings } from '../lang/common'
import { strings as csStrings } from '../lang/properties'
import { strings } from '../lang/checkout'
import * as helper from '../common/helper'
import * as UserService from '../services/UserService'
import * as PropertyService from '../services/PropertyService'
import * as LocationService from '../services/LocationService'
import * as StripeService from '../services/StripeService'
import PropertyList from '../components/PropertyList'
import Layout from '../components/Layout'
import Error from '../components/Error'
import DatePicker from '../components/DatePicker'
import ReCaptchaProvider from '../components/ReCaptchaProvider'
import NoMatch from './NoMatch'
import Info from './Info'

import '../assets/css/checkout.css'

//
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
//
const stripePromise = loadStripe(env.STRIPE_PUBLISHABLE_KEY)

const Checkout = () => {
  const reactLocation = useLocation()
  const navigate = useNavigate()

  const [user, setUser] = useState<movininTypes.User>()
  const [property, setProperty] = useState<movininTypes.Property>()
  const [location, setLocation] = useState<movininTypes.Location>()
  const [from, setFrom] = useState<Date>()
  const [to, setTo] = useState<Date>()
  const [visible, setVisible] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)
  const [language, setLanguage] = useState(env.DEFAULT_LANGUAGE)
  const [noMatch, setNoMatch] = useState(false)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [birthDate, setBirthDate] = useState<Date>()
  const [birthDateValid, setBirthDateValid] = useState(true)
  const [emailValid, setEmailValid] = useState(true)
  const [emailRegitered, setEmailRegitered] = useState(false)
  const [phoneValid, setPhoneValid] = useState(true)
  const [tosChecked, setTosChecked] = useState(false)
  const [tosError, setTosError] = useState(false)
  const [error, setError] = useState(false)
  const [price, setPrice] = useState(0)
  const [emailInfo, setEmailInfo] = useState(true)
  const [phoneInfo, setPhoneInfo] = useState(true)
  const [cancellation, setCancellation] = useState(false)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [payLater, setPayLater] = useState(false)
  const [recaptchaError, setRecaptchaError] = useState(false)

  const [paymentFailed, setPaymentFailed] = useState(false)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [bookingId, setBookingId] = useState<string>()
  const [sessionId, setSessionId] = useState<string>()

  const _fr = language === 'fr'
  const _locale = _fr ? fr : enUS
  const _format = _fr ? 'eee d LLL yyyy kk:mm' : 'eee, d LLL yyyy, p'
  const bookingDetailHeight = env.AGENCY_IMAGE_HEIGHT + 10
  const days = movininHelper.days(from, to)
  const daysLabel = from && to && `
  ${helper.getDaysShort(days)} (${movininHelper.capitalize(
    format(from, _format, { locale: _locale }),
  )} 
  - ${movininHelper.capitalize(format(to, _format, { locale: _locale }))})`

  const handleCancellationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (property && from && to) {
      const _cancellation = e.target.checked
      const options: movininTypes.PropertyOptions = {
        cancellation: _cancellation
      }
      const _price = helper.price(property, from, to, options)

      setCancellation(_cancellation)
      setPrice(_price)
    }
  }

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)

    if (!e.target.value) {
      setEmailRegitered(false)
      setEmailValid(true)
    }
  }

  const validateEmail = async (_email?: string) => {
    if (_email) {
      if (validator.isEmail(_email)) {
        try {
          const status = await UserService.validateEmail({ email: _email })
          if (status === 200) {
            setEmailRegitered(false)
            setEmailValid(true)
            setEmailInfo(true)
            return true
          }
          setEmailRegitered(true)
          setEmailValid(true)
          setError(false)
          setEmailInfo(false)
          return false
        } catch (err) {
          helper.error(err)
          setEmailRegitered(false)
          setEmailValid(true)
          setEmailInfo(true)
          return false
        }
      } else {
        setEmailRegitered(false)
        setEmailValid(false)
        setEmailInfo(true)
        return false
      }
    } else {
      setEmailRegitered(false)
      setEmailValid(true)
      setEmailInfo(true)
      return false
    }
  }

  const handleEmailBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    await validateEmail(e.target.value)
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value)

    if (!e.target.value) {
      setPhoneValid(true)
    }
  }

  const validatePhone = (_phone?: string) => {
    if (_phone) {
      const _phoneValid = validator.isMobilePhone(_phone)
      setPhoneValid(_phoneValid)
      setPhoneInfo(_phoneValid)

      return _phoneValid
    }
    setPhoneValid(true)
    setPhoneInfo(true)

    return true
  }

  const handlePhoneBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    validatePhone(e.target.value)
  }

  const validateBirthDate = (date?: Date) => {
    if (property && date && movininHelper.isDate(date)) {
      const now = new Date()
      const sub = intervalToDuration({ start: date, end: now }).years ?? 0
      const _birthDateValid = sub >= property.minimumAge

      setBirthDateValid(_birthDateValid)
      return _birthDateValid
    }
    setBirthDateValid(true)
    return true
  }

  const handleTosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTosChecked(e.target.checked)

    if (e.target.checked) {
      setTosError(false)
    }
  }

  const handleRecaptchaVerify = useCallback(async (token: string) => {
    try {
      const ip = await UserService.getIP()
      const status = await UserService.verifyRecaptcha(token, ip)
      const valid = status === 200
      setRecaptchaError(!valid)
    } catch (err) {
      helper.error(err)
      setRecaptchaError(true)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()

      if (!property || !location || !from || !to) {
        helper.error()
        return
      }

      if (!authenticated) {
        const _emailValid = await validateEmail(email)
        if (!_emailValid) {
          return
        }

        const _phoneValid = validatePhone(phone)
        if (!_phoneValid) {
          return
        }

        const _birthDateValid = validateBirthDate(birthDate)
        if (!_birthDateValid) {
          return
        }

        if (env.RECAPTCHA_ENABLED && recaptchaError) {
          return
        }

        if (!tosChecked) {
          setTosError(true)
          return
        }
      }

      setLoading(true)
      setPaymentFailed(false)

      let renter: movininTypes.User | undefined

      if (!authenticated) {
        renter = {
          email,
          phone,
          fullName,
          birthDate,
          language: UserService.getLanguage(),
        }
      }

      const booking: movininTypes.Booking = {
        agency: property.agency._id as string,
        property: property._id,
        renter: authenticated ? user?._id : undefined,
        location: location._id,
        from,
        to,
        status: movininTypes.BookingStatus.Pending,
        cancellation,
        price,
      }

      //
      // Stripe Payment Gateway
      //
      let _customerId: string | undefined
      let _sessionId: string | undefined
      if (!payLater) {
        const payload: movininTypes.CreatePaymentPayload = {
          amount: price,
          currency: env.STRIPE_CURRENCY_CODE,
          locale: language,
          receiptEmail: (!authenticated ? renter?.email : user?.email) as string,
          name: `${property.name} 
          - ${daysLabel} 
          - ${location.name}`,
          description: "Movin' In Web Service",
          customerName: (!authenticated ? renter?.fullName : user?.fullName) as string,
        }
        const res = await StripeService.createCheckoutSession(payload)
        setClientSecret(res.clientSecret)
        _sessionId = res.sessionId
        _customerId = res.customerId
      }

      const payload: movininTypes.CheckoutPayload = {
        renter,
        booking,
        payLater,
        sessionId: _sessionId,
        customerId: _customerId
      }

      const { status, bookingId: _bookingId } = await BookingService.checkout(payload)
      setLoading(false)

      if (status === 200) {
        if (payLater) {
          setVisible(false)
          setSuccess(true)
        }
        setBookingId(_bookingId)
        setSessionId(_sessionId)
      } else {
        helper.error()
      }
    } catch (err) {
      helper.error(err)
    } finally {
      setLoading(false)
    }
  }

  const onLoad = async (_user?: movininTypes.User) => {
    setUser(_user)
    setAuthenticated(_user !== undefined)
    setLanguage(UserService.getLanguage())

    const { state } = reactLocation
    if (!state) {
      setNoMatch(true)
      return
    }

    const { propertyId } = state
    const { locationId } = state
    const { from: _from } = state
    const { to: _to } = state

    if (!propertyId || !locationId || !_from || !_to) {
      setNoMatch(true)
      return
    }

    let _property: movininTypes.Property | null = null
    let _location: movininTypes.Location | null = null
    try {
      _property = await PropertyService.getProperty(propertyId)
      if (!_property) {
        setNoMatch(true)
        return
      }

      _location = await LocationService.getLocation(locationId)

      if (!_location) {
        setNoMatch(true)
        return
      }

      const _price = helper.price(_property, _from, _to)

      const included = (val: number) => val === 0

      setProperty(_property)
      setPrice(_price)
      setLocation(_location)
      setFrom(_from)
      setTo(_to)
      setCancellation(included(_property.cancellation))
      setVisible(true)
    } catch (err) {
      helper.error(err)
    }
  }

  return (
    <ReCaptchaProvider>
      <Layout onLoad={onLoad} strict={false}>
        {visible && property && from && to && location && (
          <div className="booking">
            <Paper className="booking-form" elevation={10}>
              <h1 className="booking-form-title">
                {' '}
                {strings.BOOKING_HEADING}
                {' '}
              </h1>
              <form onSubmit={handleSubmit}>
                <div>

                  <PropertyList
                    properties={[property]}
                    hideActions
                    hidePrice
                    sizeAuto
                    language={language}
                  />

                  <div className="booking-options-container">
                    <div className="booking-info">
                      <BookingIcon />
                      <span>{strings.BOOKING_OPTIONS}</span>
                    </div>
                    <div className="booking-options">
                      <FormControl fullWidth margin="dense">
                        <FormControlLabel
                          disabled={property.cancellation === -1 || property.cancellation === 0 || !!clientSecret}
                          control={<Switch checked={cancellation} onChange={handleCancellationChange} color="primary" />}
                          label={(
                            <span>
                              <span className="booking-option-label">{csStrings.CANCELLATION}</span>
                              <span className="booking-option-value">{helper.getCancellationOption(property.cancellation, language)}</span>
                            </span>
                          )}
                        />
                      </FormControl>

                    </div>
                  </div>

                  <div className="booking-details-container">
                    <div className="booking-info">
                      <PropertyIcon />
                      <span>{strings.BOOKING_DETAILS}</span>
                    </div>
                    <div className="booking-details">
                      <div className="booking-detail" style={{ height: bookingDetailHeight }}>
                        <span className="booking-detail-title">{strings.DAYS}</span>
                        <div className="booking-detail-value">
                          {daysLabel}
                        </div>
                      </div>
                      <div className="booking-detail" style={{ height: bookingDetailHeight }}>
                        <span className="booking-detail-title">{commonStrings.LOCATION}</span>
                        <div className="booking-detail-value">{location.name}</div>
                      </div>

                      <div className="booking-detail" style={{ height: bookingDetailHeight }}>
                        <span className="booking-detail-title">{strings.PROPERTY}</span>
                        <div className="booking-detail-value">{`${property.name} (${helper.priceLabel(property, language)})`}</div>
                      </div>
                      <div className="booking-detail" style={{ height: bookingDetailHeight }}>
                        <span className="booking-detail-title">{commonStrings.AGENCY}</span>
                        <div className="booking-detail-value">
                          <div className="property-agency">
                            <img src={movininHelper.joinURL(env.CDN_USERS, property.agency.avatar)} alt={property.agency.fullName} style={{ height: env.AGENCY_IMAGE_HEIGHT }} />
                            <span className="property-agency-name">{property.agency.fullName}</span>
                          </div>
                        </div>
                      </div>
                      <div className="booking-detail" style={{ height: bookingDetailHeight }}>
                        <span className="booking-detail-title">{strings.COST}</span>
                        <div className="booking-detail-value booking-price">{movininHelper.formatPrice(price, commonStrings.CURRENCY, language)}</div>
                      </div>
                    </div>
                  </div>
                  {!authenticated && (
                    <div className="renter-details">
                      <div className="booking-info">
                        <RenterIcon />
                        <span>{strings.RENTER_DETAILS}</span>
                      </div>
                      <div className="renter-details-form">
                        <FormControl fullWidth margin="dense">
                          <InputLabel className="required">{commonStrings.FULL_NAME}</InputLabel>
                          <OutlinedInput type="text" label={commonStrings.FULL_NAME} required onChange={handleFullNameChange} autoComplete="off" />
                        </FormControl>
                        <FormControl fullWidth margin="dense">
                          <InputLabel className="required">{commonStrings.EMAIL}</InputLabel>
                          <OutlinedInput
                            type="text"
                            label={commonStrings.EMAIL}
                            error={!emailValid || emailRegitered}
                            onBlur={handleEmailBlur}
                            onChange={handleEmailChange}
                            required
                            autoComplete="off"
                          />
                          <FormHelperText error={!emailValid || emailRegitered}>
                            {(!emailValid && commonStrings.EMAIL_NOT_VALID) || ''}
                            {(emailRegitered && (
                              <span>
                                <span>{commonStrings.EMAIL_ALREADY_REGISTERED}</span>
                                <span> </span>
                                <a href={`/sign-in?p=${property._id}&l=${location._id}&f=${from.getTime()}&t=${to.getTime()}&from=checkout`}>{strings.SIGN_IN}</a>
                              </span>
                            ))
                              || ''}
                            {(emailInfo && strings.EMAIL_INFO) || ''}
                          </FormHelperText>
                        </FormControl>
                        <FormControl fullWidth margin="dense">
                          <InputLabel className="required">{commonStrings.PHONE}</InputLabel>
                          <OutlinedInput type="text" label={commonStrings.PHONE} error={!phoneValid} onBlur={handlePhoneBlur} onChange={handlePhoneChange} required autoComplete="off" />
                          <FormHelperText error={!phoneValid}>
                            {(!phoneValid && commonStrings.PHONE_NOT_VALID) || ''}
                            {(phoneInfo && strings.PHONE_INFO) || ''}
                          </FormHelperText>
                        </FormControl>
                        <FormControl fullWidth margin="dense">
                          <DatePicker
                            label={commonStrings.BIRTH_DATE}
                            variant="outlined"
                            required
                            onChange={(_birthDate) => {
                              if (_birthDate) {
                                const _birthDateValid = validateBirthDate(_birthDate)

                                setBirthDate(_birthDate)
                                setBirthDateValid(_birthDateValid)
                              }
                            }}
                            language={language}
                          />
                          <FormHelperText error={!birthDateValid}>{(!birthDateValid && helper.getBirthDateError(property.minimumAge)) || ''}</FormHelperText>
                        </FormControl>

                        {env.RECAPTCHA_ENABLED && (
                          <div className="recaptcha">
                            <GoogleReCaptcha onVerify={handleRecaptchaVerify} />
                          </div>
                        )}

                        <div className="booking-tos">
                          <table>
                            <tbody>
                              <tr>
                                <td aria-label="tos">
                                  <Checkbox checked={tosChecked} onChange={handleTosChange} color="primary" />
                                </td>
                                <td>
                                  <Link href="/tos" target="_blank" rel="noreferrer">
                                    {commonStrings.TOS}
                                  </Link>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}

                  {property.agency.payLater && (
                    <div className="payment-options-container">
                      <div className="booking-info">
                        <PaymentOptionsIcon />
                        <span>{strings.PAYMENT_OPTIONS}</span>
                      </div>
                      <div className="payment-options">
                        <FormControl>
                          <RadioGroup
                            defaultValue="payOnline"
                            onChange={(event) => {
                              setPayLater(event.target.value === 'payLater')
                            }}
                          >
                            <FormControlLabel
                              value="payLater"
                              control={<Radio />}
                              label={(
                                <span className="payment-button">
                                  <span>{strings.PAY_LATER}</span>
                                  <span className="payment-info">{`(${strings.PAY_LATER_INFO})`}</span>
                                </span>
                              )}
                            />
                            <FormControlLabel
                              value="payOnline"
                              control={<Radio />}
                              label={(
                                <span className="payment-button">
                                  <span>{strings.PAY_ONLINE}</span>
                                  <span className="payment-info">{`(${strings.PAY_ONLINE_INFO})`}</span>
                                </span>
                              )}
                            />
                          </RadioGroup>
                        </FormControl>
                      </div>
                    </div>
                  )}

                  {(!property.agency.payLater || !payLater) && (
                    clientSecret && (
                      <div className="payment-options-container">

                        <EmbeddedCheckoutProvider
                          stripe={stripePromise}
                          options={{ clientSecret }}
                        >
                          <EmbeddedCheckout />
                        </EmbeddedCheckoutProvider>
                      </div>
                    )
                  )}
                  <div className="booking-buttons">
                    {(!clientSecret || payLater) && (
                      <Button type="submit" variant="contained" className="btn-checkout btn-margin-bottom" size="small" disabled={loading}>
                        {
                          loading
                            ? <CircularProgress color="inherit" size={24} />
                            : strings.BOOK
                        }
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      className="btn-cancel btn-margin-bottom"
                      size="small"
                      onClick={async () => {
                        try {
                          if (bookingId && sessionId) {
                            //
                            // Delete temporary booking on cancel.
                            // Otherwise, temporary bookings are
                            // automatically deleted through a TTL index.
                            //
                            await BookingService.deleteTempBooking(bookingId, sessionId)
                          }
                        } catch (err) {
                          helper.error(err)
                        } finally {
                          navigate('/')
                        }
                      }}
                    >
                      {commonStrings.CANCEL}
                    </Button>
                  </div>
                </div>
                <div className="form-error">
                  {tosError && <Error message={commonStrings.TOS_ERROR} />}
                  {error && <Error message={commonStrings.GENERIC_ERROR} />}
                  {paymentFailed && <Error message={strings.PAYMENT_FAILED} />}
                  {recaptchaError && <Error message={commonStrings.RECAPTCHA_ERROR} />}
                </div>
              </form>
            </Paper>
          </div>
        )}
        {noMatch && <NoMatch hideHeader />}
        {success && <Info message={payLater ? strings.PAY_LATER_SUCCESS : strings.SUCCESS} />}
      </Layout>
    </ReCaptchaProvider>
  )
}

export default Checkout
