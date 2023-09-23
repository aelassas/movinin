import React, { useState, useCallback } from 'react'
import { strings as commonStrings } from '../lang/common'
import { strings as blStrings } from '../lang/booking-list'
import { strings as bfStrings } from '../lang/booking-filter'
import { strings as csStrings } from '../lang/properties'
import { strings } from '../lang/booking'
import * as Helper from '../common/Helper'
import Master from '../components/Master'
import * as UserService from '../services/UserService'
import * as BookingService from '../services/BookingService'
import * as PropertyService from '../services/PropertyService'
import Backdrop from '../components/SimpleBackdrop'
import NoMatch from './NoMatch'
import Error from './Error'
import PropertyList from '../components/PropertyList'
import AgencySelectList from '../components/AgencySelectList'
import UserSelectList from '../components/UserSelectList'
import LocationSelectList from '../components/LocationSelectList'
import PropertySelectList from '../components/PropertySelectList'
import StatusList from '../components/StatusList'
import DatePicker from '../components/DatePicker'
import {
  FormControl,
  FormControlLabel,
  Switch,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'
import {
  Info as InfoIcon,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import * as movininTypes from 'movinin-types'
import * as movininHelper from 'movinin-helper'
import Env from '../config/env.config'

import '../assets/css/booking.css'

const UpdateBooking = () => {
  const navigate = useNavigate()

  const [user, setUser] = useState<movininTypes.User>()
  const [loading, setLoading] = useState(false)
  const [noMatch, setNoMatch] = useState(false)
  const [error, setError] = useState(false)
  const [booking, setBooking] = useState<movininTypes.Booking>()
  const [visible, setVisible] = useState(false)
  const [isAgency, setIsAgency] = useState(false)
  const [agency, setAgency] = useState<movininTypes.Option>()
  const [property, setProperty] = useState<movininTypes.Property>()
  const [price, setPrice] = useState<number>()
  const [renter, setRenter] = useState<movininTypes.Option>()
  const [location, setLocation] = useState<movininTypes.Option>()
  const [from, setFrom] = useState<Date>()
  const [to, setTo] = useState<Date>()
  const [status, setStatus] = useState<movininTypes.BookingStatus>()
  const [cancellation, setCancellation] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [minDate, setMinDate] = useState<Date>()

  const handleAgencyChange = (values: movininTypes.Option[]) => {
    setAgency(values.length > 0 ? values[0] : undefined)
  }

  const handleRenterChange = (values: movininTypes.Option[]) => {
    setRenter(values.length > 0 ? values[0] : undefined)
  }

  const handleLocationChange = (values: movininTypes.Option[]) => {
    setLocation(values.length > 0 ? values[0] : undefined)
  }

  const handlePropertySelectListChange = useCallback(
    async (values: movininTypes.Property[]) => {
      try {
        const newProperty = values.length > 0 ? values[0] : undefined

        if ((!property && newProperty) || (property && newProperty && property._id !== newProperty._id)) {
          // property changed
          const property = await PropertyService.getProperty(newProperty._id)

          if (property) {
            const _booking = movininHelper.clone(booking)
            _booking.property = property
            Helper.price(
              _booking,
              property,
              (price) => {
                setPrice(price)
              },
              (err) => {
                Helper.error(err)
              },
            )

            setBooking(_booking)
            setProperty(newProperty)
          } else {
            Helper.error()
          }
        } else if (!newProperty) {
          setPrice(0)
          setProperty(newProperty)
        } else {
          setProperty(newProperty)
        }
      } catch (err) {
        Helper.error(err)
      }
    },
    [property, booking],
  )

  const handleStatusChange = (value: movininTypes.BookingStatus) => {
    setStatus(value)
  }

  const handleCancellationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (booking) {
      booking.cancellation = e.target.checked

      Helper.price(
        booking,
        booking.property as movininTypes.Property,
        (price) => {
          setBooking(booking)
          setPrice(price)
          setCancellation(booking.cancellation || false)
        },
        (err) => {
          Helper.error(err)
        },
      )
    }
  }

  const toastErr = (err?: unknown, hideLoading?: boolean): void => {
    Helper.error(err)
    if (hideLoading) {
      setLoading(false)
    }
  }

  const handleDelete = () => {
    setOpenDeleteDialog(true)
  }

  const handleCancelDelete = () => {
    setOpenDeleteDialog(false)
  }

  const handleConfirmDelete = async () => {
    if (booking && booking._id) {
      try {
        setOpenDeleteDialog(false)

        const status = await BookingService.deleteBookings([booking._id])

        if (status === 200) {
          navigate('/')
        } else {
          toastErr(true)
        }
      } catch (err) {
        Helper.error(err)
      }
    } else {
      Helper.error()
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()


      if (!booking || !agency || !property || !renter || !location || !from || !to || !status) {
        Helper.error()
        return
      }

      const _booking: movininTypes.Booking = {
        _id: booking._id,
        agency: agency._id,
        property: property._id,
        renter: renter._id,
        location: location._id,
        from,
        to,
        status,
        cancellation,
        price,
      }

      const _status = await BookingService.update(_booking)

      if (_status === 200) {
        Helper.info(commonStrings.UPDATED)
      } else {
        toastErr()
      }
    } catch (err) {
      Helper.error(err)
    }
  }

  const onLoad = async (user?: movininTypes.User) => {
    if (user) {
      setUser(user)
      setLoading(true)

      const params = new URLSearchParams(window.location.search)
      if (params.has('b')) {
        const id = params.get('b')
        if (id && id !== '') {
          try {
            const booking = await BookingService.getBooking(id)

            if (booking) {
              if (!Helper.admin(user) && (booking.agency as movininTypes.User)._id !== user._id) {
                setLoading(false)
                setNoMatch(true)
                return
              }

              setBooking(booking)
              setPrice(booking.price)
              setLoading(false)
              setVisible(true)
              setIsAgency(user.type === movininTypes.RecordType.Agency)
              const cmp = booking.agency as movininTypes.User
              setAgency({
                _id: cmp._id as string,
                name: cmp.fullName,
                image: cmp.avatar,
              })
              setProperty(booking.property as movininTypes.Property)
              const rtn = booking.renter as movininTypes.User
              setRenter({
                _id: rtn._id as string,
                name: rtn.fullName,
                image: rtn.avatar,
              })
              const loc = booking.location as movininTypes.Location
              setLocation({
                _id: loc._id,
                name: loc.name || '',
              })
              setFrom(new Date(booking.from))
              const minDate = new Date(booking.from)
              minDate.setDate(minDate.getDate() + 1)
              setMinDate(minDate)
              setTo(new Date(booking.to))
              setStatus(booking.status)
              setCancellation(booking.cancellation || false)
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
    <Master onLoad={onLoad} strict>
      {visible && booking && (
        <div className="booking">
          <div className="col-1">
            <form onSubmit={handleSubmit}>
              {!isAgency && (
                <FormControl fullWidth margin="dense">
                  <AgencySelectList
                    label={blStrings.AGENCY}
                    required
                    variant="standard"
                    onChange={handleAgencyChange}
                    value={agency} />
                </FormControl>
              )}

              <UserSelectList
                label={blStrings.RENTER}
                required
                variant="standard"
                onChange={handleRenterChange}
                value={renter}
              />

              <FormControl fullWidth margin="dense">
                <LocationSelectList
                  label={bfStrings.LOCATION}
                  required
                  variant="standard"
                  onChange={handleLocationChange}
                  value={location} />
              </FormControl>

              <PropertySelectList
                label={blStrings.PROPERTY}
                agency={(agency && agency._id) || ''}
                location={(location && location._id) || ''}
                onChange={handlePropertySelectListChange}
                required
                value={property}
              />

              <FormControl fullWidth margin="dense">
                <DatePicker
                  label={commonStrings.FROM}
                  value={from}
                  required
                  onChange={(date) => {
                    if (date) {
                      booking.from = date

                      Helper.price(
                        booking,
                        booking.property as movininTypes.Property,
                        (price) => {
                          setBooking(booking)
                          setPrice(price)
                          setFrom(date)

                          const minDate = new Date(date)
                          minDate.setDate(minDate.getDate() + 1)
                          setMinDate(minDate)

                          if (to && to.getTime() <= date.getTime()) {
                            setTo(undefined)
                          }
                        },
                        (err) => {
                          toastErr(err)
                        },
                      )
                    } else {
                      setMinDate(undefined)
                      setFrom(undefined)
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
                  onChange={(to) => {
                    if (to) {
                      booking.to = to

                      Helper.price(
                        booking,
                        booking.property as movininTypes.Property,
                        (price) => {
                          setBooking(booking)
                          setPrice(price)
                          setTo(to)
                        },
                        (err) => {
                          toastErr(err)
                        },
                      )
                    }
                  }}
                  language={UserService.getLanguage()}
                />
              </FormControl>

              <FormControl fullWidth margin="dense">
                <StatusList label={blStrings.STATUS} onChange={handleStatusChange} required value={status} />
              </FormControl>

              <div className="info">
                <InfoIcon />
                <label>{commonStrings.OPTIONAL}</label>
              </div>

              <FormControl fullWidth margin="dense" className="checkbox-fc">
                <FormControlLabel
                  control={<Switch checked={cancellation} onChange={handleCancellationChange} color="primary" />}
                  label={csStrings.CANCELLATION}
                  className="checkbox-fcl"
                  disabled={!Helper.propertyOptionAvailable(property, 'cancellation')}
                />
              </FormControl>

              <div>
                <div className="buttons">
                  <Button variant="contained" className="btn-primary btn-margin-bottom" size="small" type="submit">
                    {commonStrings.SAVE}
                  </Button>
                  <Button variant="contained" className="btn-margin-bottom" color="error" size="small" onClick={handleDelete}>
                    {commonStrings.DELETE}
                  </Button>
                  <Button variant="contained" className="btn-secondary btn-margin-bottom" size="small" href="/">
                    {commonStrings.CANCEL}
                  </Button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-2">
            <div className="col-2-header">
              <div className="price">
                <label className="price-days">{Helper.getDays(days)}</label>
                <label className="price-main">{`${movininHelper.formatNumber(price ?? 0)} ${commonStrings.CURRENCY}`}</label>
                <label className="price-day">{`${csStrings.PRICE_PER_DAY} ${Math.floor((price ?? 0) / days)} ${commonStrings.CURRENCY}`}</label>
              </div>
            </div>
            <PropertyList
              className="property"
              user={user}
              booking={booking}
              properties={((property && [booking.property]) as movininTypes.Property[]) || []}
              language={user?.language || Env.DEFAULT_LANGUAGE}
              hidePrice />
          </div>

          <Dialog disableEscapeKeyDown maxWidth="xs" open={openDeleteDialog}>
            <DialogTitle className="dialog-header">{commonStrings.CONFIRM_TITLE}</DialogTitle>
            <DialogContent>{strings.DELETE_BOOKING}</DialogContent>
            <DialogActions className="dialog-actions">
              <Button onClick={handleCancelDelete} variant="contained" className="btn-secondary">
                {commonStrings.CANCEL}
              </Button>
              <Button onClick={handleConfirmDelete} variant="contained" color="error">
                {commonStrings.DELETE}
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}

      {loading && <Backdrop text={commonStrings.PLEASE_WAIT} />}
      {noMatch && <NoMatch hideHeader />}
      {error && <Error />}
    </Master>
  )
}

export default UpdateBooking
