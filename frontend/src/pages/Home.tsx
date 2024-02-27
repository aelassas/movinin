import React, { useState, useEffect } from 'react'
import { FormControl, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import * as movininTypes from 'movinin-types'
import { strings as commonStrings } from '../lang/common'
import { strings } from '../lang/home'
import * as UserService from '../services/UserService'
import Master from '../components/Master'
import LocationSelectList from '../components/LocationSelectList'
import DatePicker from '../components/DatePicker'

import SecurePayment from '../assets/img/secure-payment.png'
import '../assets/css/home.css'

const Home = () => {
  const navigate = useNavigate()

  const _minDate = new Date()
  _minDate.setDate(_minDate.getDate() + 1)

  const [location, setLocation] = useState('')
  const [from, setFrom] = useState<Date>()
  const [to, setTo] = useState<Date>()
  const [minDate, setMinDate] = useState<Date>(_minDate)

  useEffect(() => {
    if (from) {
      const __minDate = new Date(from)
      __minDate.setDate(from.getDate() + 1)
      setMinDate(__minDate)
    }
  }, [from])

  const handleLocationChange = (values: movininTypes.Option[]) => {
    const _location = (values.length > 0 && values[0]._id) || ''
    setLocation(_location)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!location || !from || !to) {
      return
    }

    navigate(`/properties?l=${location}&f=${from.getTime()}&t=${to.getTime()}`)
  }

  const onLoad = () => { }

  return (
    <Master onLoad={onLoad} strict={false}>
      <div className="home">
        <div className="home-content">
          <div className="home-logo">
            <span className="home-logo-main" />
            <span className="home-logo-registered" />
          </div>
          <div className="home-search">
            <form onSubmit={handleSubmit} className="home-search-form">
              <FormControl className="pickup-location">
                <LocationSelectList
                  label={commonStrings.LOCATION}
                  variant="outlined"
                  hidePopupIcon
                  customOpen
                  required
                  onChange={handleLocationChange}
                />
              </FormControl>
              <FormControl className="from">
                <DatePicker
                  label={commonStrings.FROM}
                  value={from}
                  minDate={new Date()}
                  variant="outlined"
                  required
                  onChange={(date) => {
                    if (date) {
                      if (to && to.getTime() <= date.getTime()) {
                        setTo(undefined)
                      }

                      const __minDate = new Date(date)
                      __minDate.setDate(date.getDate() + 1)
                      setMinDate(__minDate)
                    } else {
                      setMinDate(_minDate)
                    }

                    setFrom(date || undefined)
                  }}
                  language={UserService.getLanguage()}
                />
              </FormControl>
              <FormControl className="to">
                <DatePicker
                  label={commonStrings.TO}
                  value={to}
                  minDate={minDate}
                  variant="outlined"
                  required
                  onChange={(date) => {
                    setTo(date || undefined)
                  }}
                  language={UserService.getLanguage()}
                />
              </FormControl>
              <Button type="submit" variant="contained" className="btn-search">
                {commonStrings.SEARCH}
              </Button>
            </form>
          </div>
        </div>
        <footer>
          <div className="copyright">
            <span className="part1">{strings.COPYRIGHT_PART1}</span>
            <span className="part2">{strings.COPYRIGHT_PART2}</span>
            <span className="part3">{strings.COPYRIGHT_PART3}</span>
          </div>
          <div className="secure-payment">
            <img src={SecurePayment} alt="" />
          </div>
        </footer>
      </div>
    </Master>
  )
}

export default Home
