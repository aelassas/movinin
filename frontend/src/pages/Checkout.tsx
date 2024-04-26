import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
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
  Lock as LockIcon,
  Person as RenterIcon,
  EventSeat as BookingIcon,
  Settings as PaymentOptionsIcon
} from '@mui/icons-material'
import validator from 'validator'
import { format, intervalToDuration } from 'date-fns'
import { fr, enUS } from 'date-fns/locale'
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import {
  StripeCardNumberElement,
  StripeCardNumberElementOptions
} from '@stripe/stripe-js'
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
import Master from '../components/Master'
import Error from '../components/Error'
import DatePicker from '../components/DatePicker'
import NoMatch from './NoMatch'
import Info from './Info'

import SecurePayment from '../assets/img/secure-payment.png'
import '../assets/css/checkout.css'

const Checkout = () => {
  const reactLocation = useLocation()

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
  const [cardNumberValid, setCardNumberValid] = useState(true)
  const [cardExpiryValid, setCardExpiryValid] = useState(true)
  const [cvvValid, setCvvValid] = useState(true)
  const [price, setPrice] = useState(0)
  const [emailInfo, setEmailInfo] = useState(true)
  const [phoneInfo, setPhoneInfo] = useState(true)
  const [cancellation, setCancellation] = useState(false)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [payLater, setPayLater] = useState(false)

  const stripe = useStripe()
  const elements = useElements()
  const [paymentFailed, setPaymentFailed] = useState(false)

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

        if (!tosChecked) {
          setTosError(true)
          return
        }
      }

      let card: StripeCardNumberElement | null = null
      if (!payLater) {
        if (!cardNumberValid) {
          return
        }

        if (!cardExpiryValid) {
          return
        }

        if (!cvvValid) {
          return
        }

        if (!stripe || !elements) {
          // Stripe.js hasn't yet loaded.
          return
        }

        card = elements.getElement(CardNumberElement)

        if (!card) {
          // CardNumberElement hasn't yet loaded.
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
      let paid = payLater
      let validationError = false
      let paymentIntentId: string | undefined
      let customerId: string | undefined

      if (!payLater) {
        const createPaymentIntentPayload: movininTypes.CreatePaymentIntentPayload = {
          amount: price,
          // Supported currencies for the moment: usd, eur
          // Must be a supported currency: https://docs.stripe.com/currencies
          currency: commonStrings.CURRENCY === '$' ? 'usd' : commonStrings.CURRENCY === '€' ? 'eur' : '',
          receiptEmail: (!authenticated ? renter?.email : user?.email) as string,
          description: "Movin' In Web Service",
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
          const paymentPayload = await stripe?.confirmCardPayment(clientSecret, {
            payment_method: {
              card: card as StripeCardNumberElement,
            }
          })

          validationError = paymentPayload?.error?.type === 'validation_error'
          paid = !paymentPayload?.error
        } else {
          paid = false
        }
      }

      if (validationError) {
        // Card Validation Error
        setLoading(false)
        return
      }

      if (!paid) {
        // Payment failed
        setLoading(false)
        setPaymentFailed(true)
        return
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
        setVisible(false)
        setSuccess(true)
      } else {
        setLoading(false)
        helper.error()
      }
    } catch (err) {
      helper.error(err)
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

  const _fr = language === 'fr'
  const _locale = _fr ? fr : enUS
  const _format = _fr ? 'eee d LLL yyyy kk:mm' : 'eee, d LLL yyyy, p'
  const bookingDetailHeight = env.AGENCY_IMAGE_HEIGHT + 10

  const cardStyle: StripeCardNumberElementOptions = {
    style: {
      base: {
        color: 'rgba(0, 0, 0, 0.87)',
        fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol'",
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#606060',
        },
      },
      invalid: {
        color: '#d32f2f',
        iconColor: '#d32f2f'
      }
    }
  }

  return (
    <Master onLoad={onLoad} strict={false}>
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
                <div className="booking-options-container">
                  <div className="booking-info">
                    <BookingIcon />
                    <span>{strings.BOOKING_OPTIONS}</span>
                  </div>
                  <div className="booking-options">
                    <FormControl fullWidth margin="dense">
                      <FormControlLabel
                        disabled={property.cancellation === -1 || property.cancellation === 0}
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
                        {`${helper.getDaysShort(movininHelper.days(from, to))} (${movininHelper.capitalize(
                          format(from, _format, { locale: _locale }),
                        )} - ${movininHelper.capitalize(format(to, _format, { locale: _locale }))})`}
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
                  <div className="payment">
                    <div className="cost">
                      <div className="secure-payment-label">
                        <LockIcon className="secure-payment-lock" />
                        <span>{strings.PAYMENT}</span>
                      </div>
                      <div className="secure-payment-cost">
                        <span className="cost-title">{strings.COST}</span>
                        <span className="cost-value">{movininHelper.formatPrice(price, commonStrings.CURRENCY, language)}</span>
                      </div>
                    </div>

                    <div className="card">
                      <FormControl margin="dense" className="card-number" fullWidth>
                        <div className="stripe-card">
                          <CardNumberElement
                            className="card-element"
                            options={{ ...cardStyle, placeholder: strings.CARD_NUMBER }}
                            onChange={(e) => {
                              setCardNumberValid(!e.error)
                            }}
                          />
                        </div>
                        <FormHelperText error={!cardNumberValid}>{(!cardNumberValid && strings.CARD_NUMBER_NOT_VALID) || ''}</FormHelperText>
                      </FormControl>
                      <FormControl margin="dense" className="card-month" fullWidth>
                        <div className="stripe-card">
                          <CardExpiryElement
                            className="card-element"
                            options={{ ...cardStyle, placeholder: movininHelper.isFrench(language) ? 'MM / AA' : 'MM / YY' }}
                            onChange={(e) => {
                              setCardExpiryValid(!e.error)
                            }}
                          />
                        </div>
                        <FormHelperText error={!cardExpiryValid}>{(!cardExpiryValid && strings.CARD_EXPIRY_NOT_VALID) || ''}</FormHelperText>
                      </FormControl>
                      <FormControl margin="dense" className="cvv" fullWidth>
                        <div className="stripe-card">
                          <CardCvcElement
                            className="card-element"
                            options={cardStyle}
                            onChange={(e) => {
                              setCvvValid(!e.error)
                            }}
                          />
                        </div>
                        <FormHelperText error={!cvvValid}>{(!cvvValid && strings.CVV_NOT_VALID) || ''}</FormHelperText>
                      </FormControl>
                    </div>

                    <div className="secure-payment-info">
                      <LockIcon className="secure-payment-lock" />
                      <span>{strings.SECURE_PAYMENT_INFO}</span>
                    </div>

                    <div className="secure-payment-logo">
                      <img src={SecurePayment} alt="" />
                    </div>

                  </div>
                )}
                <div className="booking-buttons">
                  <Button type="submit" variant="contained" className="btn-checkout btn-margin-bottom" size="small" disabled={loading}>
                    {
                      loading
                        ? <CircularProgress color="inherit" size={24} />
                        : strings.BOOK
                    }
                  </Button>
                  <Button variant="contained" className="btn-cancel btn-margin-bottom" size="small" href="/">
                    {commonStrings.CANCEL}
                  </Button>
                </div>
              </div>
              <div className="form-error">
                {tosError && <Error message={commonStrings.TOS_ERROR} />}
                {error && <Error message={commonStrings.GENERIC_ERROR} />}
                {paymentFailed && <Error message={strings.PAYMENT_FAILED} />}
              </div>
            </form>
          </Paper>
        </div>
      )}
      {noMatch && <NoMatch hideHeader />}
      {success && <Info message={payLater ? strings.PAY_LATER_SUCCESS : strings.SUCCESS} />}
    </Master>
  )
}

export default Checkout
