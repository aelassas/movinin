import React, { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FormControl,
  Button,
  Paper,
  FormControlLabel,
  Switch
} from '@mui/material'
import {
  Info as InfoIcon
} from '@mui/icons-material'
import { DateTimeValidationError } from '@mui/x-date-pickers'
import * as movininTypes from ':movinin-types'
import * as movininHelper from ':movinin-helper'
import Layout from '@/components/Layout'
import { strings as commonStrings } from '@/lang/common'
import { strings as blStrings } from '@/lang/booking-list'
import { strings as bfStrings } from '@/lang/booking-filter'
import { strings as csStrings } from '@/lang/properties'
import { strings } from '@/lang/create-booking'
import * as UserService from '@/services/UserService'
import * as BookingService from '@/services/BookingService'
import * as helper from '@/common/helper'
import AgencySelectList from '@/components/AgencySelectList'
import UserSelectList from '@/components/UserSelectList'
import LocationSelectList from '@/components/LocationSelectList'
import PropertySelectList from '@/components/PropertySelectList'
import StatusList from '@/components/StatusList'
import DatePicker from '@/components/DatePicker'
import Backdrop from '@/components/SimpleBackdrop'

import '@/assets/css/create-booking.css'

const CreateBooking = () => {
  const navigate = useNavigate()

  const [isAgency, setIsAgency] = useState(false)
  const [visible, setVisible] = useState(false)
  const [agency, setAgency] = useState('')
  const [property, setProperty] = useState<movininTypes.Property>()
  const [renter, setRenter] = useState('')
  const [location, setLocation] = useState('')
  const [from, setFrom] = useState<Date>()
  const [to, setTo] = useState<Date>()
  const [minDate, setMinDate] = useState<Date>()
  const [maxDate, setMaxDate] = useState<Date>()
  const [status, setStatus] = useState<movininTypes.BookingStatus>()
  const [cancellation, setCancellation] = useState(false)
  const [loading, setLoading] = useState(false)
  const [fromError, setFromError] = useState(false)
  const [toError, setToError] = useState(false)

  const handleAgencyChange = (values: movininTypes.Option[]) => {
    setAgency(values.length > 0 ? values[0]._id : '')
  }

  const handleRenterChange = (values: movininTypes.Option[]) => {
    setRenter(values.length > 0 ? values[0]._id : '')
  }

  const handleLocationChange = (values: movininTypes.Option[]) => {
    setLocation(values.length > 0 ? values[0]._id : '-1')
  }

  const handlePropertySelectListChange = useCallback((values: movininTypes.Property[]) => {
    if (Array.isArray(values) && values.length > 0) {
      const _property = values[0]
      if (_property) {
        setProperty(_property)
      } else {
        helper.error()
      }
    }
  }, [])

  const handleStatusChange = (value: movininTypes.BookingStatus) => {
    setStatus(value)
  }

  const handleCancellationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCancellation(e.target.checked)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!property || !from || !to || !status) {
      helper.error()
      return
    }

    if (fromError || toError) {
      return
    }

    setLoading(true)

    const booking: movininTypes.Booking = {
      agency,
      property: property._id,
      renter,
      location,
      from,
      to,
      status,
      cancellation
    }

    const options: movininTypes.PropertyOptions = {
      cancellation
    }

    try {
      const price = await movininHelper.calculateTotalPrice(property, from, to, options)
      booking.price = price

      const _booking = await BookingService.create(booking)
      if (_booking && _booking._id) {
        navigate('/')
      } else {
        helper.error()
      }
    } catch (err) {
      helper.error(err)
    } finally {
      setLoading(false)
    }

  }

  const onLoad = (user?: movininTypes.User) => {
    if (user) {
      setVisible(true)

      if (user.type === movininTypes.RecordType.Agency) {
        setAgency(user._id as string)
        setIsAgency(true)
      }
    }
  }

  return (
    <Layout onLoad={onLoad} strict>
      <div className="create-booking">
        <Paper className="booking-form booking-form-wrapper" elevation={10} style={visible ? {} : { display: 'none' }}>
          <h1 className="booking-form-title">
            {' '}
            {strings.NEW_BOOKING_HEADING}
            {' '}
          </h1>
          <form onSubmit={handleSubmit}>
            {!isAgency && (
              <FormControl fullWidth margin="dense">
                <AgencySelectList
                  label={blStrings.AGENCY}
                  required
                  variant="standard"
                  onChange={handleAgencyChange}
                />
              </FormControl>
            )}

            <UserSelectList
              label={blStrings.RENTER}
              required
              variant="standard"
              onChange={handleRenterChange}
            />

            <FormControl fullWidth margin="dense">
              <LocationSelectList
                label={bfStrings.LOCATION}
                required
                variant="standard"
                onChange={handleLocationChange}
              />
            </FormControl>

            <PropertySelectList
              label={blStrings.PROPERTY}
              agency={agency}
              location={location}
              onChange={handlePropertySelectListChange}
              required
            />

            <FormControl fullWidth margin="dense">
              <DatePicker
                label={commonStrings.FROM}
                value={from}
                maxDate={maxDate}
                required
                onChange={(date) => {
                  if (date) {
                    const _minDate = new Date(date)
                    _minDate.setDate(_minDate.getDate() + 1)
                    setFrom(date)
                    setMinDate(_minDate)
                    setFromError(false)
                  } else {
                    setFrom(undefined)
                    setMinDate(undefined)
                  }
                }}
                onError={(err: DateTimeValidationError) => {
                  if (err) {
                    setFromError(true)
                  } else {
                    setFromError(false)
                  }
                }}
                language={UserService.getLanguage()}
              />
            </FormControl>

            <FormControl fullWidth margin="dense">
              <DatePicker
                label={commonStrings.TO}
                value={to}
                minDate={minDate}
                required
                onChange={(date) => {
                  if (date) {
                    const _maxDate = new Date(date)
                    _maxDate.setDate(_maxDate.getDate() - 1)
                    setTo(date)
                    setMaxDate(_maxDate)
                    setToError(false)
                  } else {
                    setTo(undefined)
                    setMaxDate(undefined)
                  }
                }}
                onError={(err: DateTimeValidationError) => {
                  if (err) {
                    setToError(true)
                  } else {
                    setToError(false)
                  }
                }}
                language={UserService.getLanguage()}
              />
            </FormControl>

            <FormControl fullWidth margin="dense">
              <StatusList
                label={blStrings.STATUS}
                onChange={handleStatusChange}
                required
              />
            </FormControl>

            <div className="info">
              <InfoIcon />
              <span>{commonStrings.OPTIONAL}</span>
            </div>

            <FormControl fullWidth margin="dense" className="checkbox-fc">
              <FormControlLabel
                control={<Switch checked={cancellation} onChange={handleCancellationChange} color="primary" />}
                label={csStrings.CANCELLATION}
                className="checkbox-fcl"
                disabled={!helper.propertyOptionAvailable(property, 'cancellation')}
              />
            </FormControl>

            <div>
              <div className="buttons">
                <Button type="submit" variant="contained" className="btn-primary btn-margin-bottom" size="small">
                  {commonStrings.CREATE}
                </Button>
                <Button variant="contained" className="btn-secondary btn-margin-bottom" size="small" onClick={() => navigate('/')}>
                  {commonStrings.CANCEL}
                </Button>
              </div>
            </div>
          </form>
        </Paper>
      </div>
      {loading && <Backdrop text={commonStrings.PLEASE_WAIT} />}
    </Layout>
  )
}

export default CreateBooking
