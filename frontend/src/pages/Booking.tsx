import React, { useState } from 'react'
import {
  FormControl,
  FormControlLabel,
  Switch,
} from '@mui/material'
import { Info as InfoIcon } from '@mui/icons-material'
import * as movininTypes from ':movinin-types'
import * as movininHelper from ':movinin-helper'
import { strings as commonStrings } from '@/lang/common'
import { strings as blStrings } from '@/lang/booking-list'
import { strings as bfStrings } from '@/lang/booking-filter'
import { strings as csStrings } from '@/lang/properties'
import env from '@/config/env.config'
import * as helper from '@/common/helper'
import Layout from '@/components/Layout'
import * as UserService from '@/services/UserService'
import * as BookingService from '@/services/BookingService'
import * as PaymentService from '@/services/PaymentService'
import Backdrop from '@/components/SimpleBackdrop'
import NoMatch from './NoMatch'
import Error from './Error'
import PropertyList from '@/components/PropertyList'
import AgencySelectList from '@/components/AgencySelectList'
import LocationSelectList from '@/components/LocationSelectList'
import PropertySelectList from '@/components/PropertySelectList'
import StatusList from '@/components/StatusList'
import DatePicker from '@/components/DatePicker'

import '@/assets/css/booking.css'

const Booking = () => {
  const [loading, setLoading] = useState(false)
  const [noMatch, setNoMatch] = useState(false)
  const [error, setError] = useState(false)
  const [booking, setBooking] = useState<movininTypes.Booking>()
  const [visible, setVisible] = useState(false)
  const [isAgency, setIsAgency] = useState(false)
  const [agency, setAgency] = useState<movininTypes.Option>()
  const [property, setProperty] = useState<movininTypes.Property>()
  const [price, setPrice] = useState<number>()
  const [location, setLocation] = useState<movininTypes.Option>()
  const [from, setFrom] = useState<Date>()
  const [to, setTo] = useState<Date>()
  const [status, setStatus] = useState<movininTypes.BookingStatus>()
  const [cancellation, setCancellation] = useState(false)
  const [language, setLanguage] = useState(env.DEFAULT_LANGUAGE)

  const onLoad = async (user?: movininTypes.User) => {
    if (user) {
      setLoading(true)
      setLanguage(user.language as string)

      const params = new URLSearchParams(window.location.search)
      if (params.has('b')) {
        const id = params.get('b')
        if (id && id !== '') {
          try {
            const _booking = await BookingService.getBooking(id)

            if (_booking) {
              setBooking(_booking)
              setPrice(await PaymentService.convertPrice(_booking.price!))
              setLoading(false)
              setVisible(true)
              setIsAgency(user.type === movininTypes.RecordType.Agency)
              const cmp = _booking.agency as movininTypes.User
              setAgency({
                _id: cmp._id as string,
                name: cmp.fullName,
                image: cmp.avatar,
              })
              setProperty(_booking.property as movininTypes.Property)
              const loc = _booking.location as movininTypes.Location
              setLocation({
                _id: loc._id,
                name: loc.name || '',
              })
              setFrom(new Date(_booking.from))
              setTo(new Date(_booking.to))
              setStatus(_booking.status)
              setCancellation(_booking.cancellation || false)
            } else {
              setLoading(false)
              setNoMatch(true)
            }
          } catch (err) {
            console.log(err)
            setLoading(false)
            setError(true)
            setVisible(false)
          }
        } else {
          setLoading(false)
          setNoMatch(true)
        }
      } else {
        setLoading(false)
        setNoMatch(true)
      }
    }
  }

  const days = movininHelper.days(from, to)

  return (
    <Layout onLoad={onLoad} strict>
      {visible && booking && (
        <div className="booking">
          <div className="col-1">
            <form>
              {!isAgency && !env.HIDE_AGENCIES && (
                <FormControl fullWidth margin="dense">
                  <AgencySelectList
                    label={blStrings.AGENCY}
                    required
                    variant="standard"
                    value={agency}
                    readOnly
                  />
                </FormControl>
              )}

              <FormControl fullWidth margin="dense">
                <LocationSelectList
                  label={bfStrings.LOCATION}
                  required
                  variant="standard"
                  value={location}
                  readOnly
                />
              </FormControl>

              <PropertySelectList
                label={blStrings.PROPERTY}
                agency={(agency && agency._id) || ''}
                location={(location && location._id) || ''}
                required
                value={property}
                readOnly
              />

              <FormControl fullWidth margin="dense">
                <DatePicker
                  label={commonStrings.FROM}
                  value={from}
                  required
                  language={UserService.getLanguage()}
                  readOnly
                />
              </FormControl>
              <FormControl fullWidth margin="dense">
                <DatePicker
                  label={commonStrings.TO}
                  value={to}
                  required
                  language={UserService.getLanguage()}
                  readOnly
                />
              </FormControl>

              <FormControl fullWidth margin="dense">
                <StatusList
                  label={blStrings.STATUS}
                  value={status}
                  required
                  readOnly
                />
              </FormControl>

              <div className="info">
                <InfoIcon />
                <span>{commonStrings.OPTIONAL}</span>
              </div>

              <FormControl fullWidth margin="dense" className="checkbox-fc">
                <FormControlLabel
                  control={<Switch checked={cancellation} color="primary" readOnly />}
                  label={csStrings.CANCELLATION}
                  className="checkbox-fcl"
                  disabled={!helper.propertyOptionAvailable(property, 'cancellation')}
                />
              </FormControl>
            </form>
          </div>
          <div className="col-2">
            <div className="col-2-header">
              <div className="price">
                <span className="price-days">{helper.getDays(days)}</span>
                <span className="price-main">{`${movininHelper.formatPrice(price as number, commonStrings.CURRENCY, language)}`}</span>
                <span className="price-day">{`${csStrings.PRICE_PER_DAY} ${movininHelper.formatPrice((price as number) / days, commonStrings.CURRENCY, language)}`}</span>
              </div>
            </div>
            <PropertyList
              className="property"
              properties={((property && [booking.property]) as movininTypes.Property[]) || []}
              hidePrice
              hideAgency={env.HIDE_AGENCIES}
            />
          </div>
        </div>
      )}

      {loading && <Backdrop text={commonStrings.PLEASE_WAIT} />}
      {noMatch && <NoMatch hideHeader />}
      {error && <Error />}
    </Layout>
  )
}

export default Booking
