import React, { useState, useEffect } from 'react'
import { FormControl, Button } from '@mui/material'
import * as movininTypes from 'movinin-types'
import { strings as commonStrings } from '../lang/common'
import * as UserService from '../services/UserService'
import LocationSelectList from './LocationSelectList'
import DatePicker from './DatePicker'

import '../assets/css/property-filter.css'

interface PropertyFilterProps {
  from: Date
  to: Date
  location: movininTypes.Location
  className?: string
  onSubmit: movininTypes.PropertyFilterSubmitEvent
}

const PropertyFilter = ({
  from: filterFrom,
  to: filterTo,
  location: filterLocation,
  className,
  onSubmit
}: PropertyFilterProps) => {
  const _minDate = new Date()
  _minDate.setDate(_minDate.getDate() + 1)

  const [from, setFrom] = useState<Date | undefined>(filterFrom)
  const [to, setTo] = useState<Date | undefined>(filterTo)
  const [minDate, setMinDate] = useState<Date>()
  const [location, setLocation] = useState<movininTypes.Location | null | undefined>(filterLocation)

  useEffect(() => {
    if (filterFrom) {
      const __minDate = new Date(filterFrom)
      __minDate.setDate(filterFrom.getDate() + 1)
      setMinDate(__minDate)
    }
  }, [filterFrom])

  const handleLocationChange = (values: movininTypes.Option[]) => {
    const _location = (values.length > 0 && values[0]) || null

    setLocation(_location)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!location || !from || !to) {
      return
    }

    if (onSubmit) {
      const filter: movininTypes.PropertyFilter = { location, from, to }
      onSubmit(filter)
    }
  }

  return (
    <div className={`${className ? `${className} ` : ''}property-filter`}>
      <form onSubmit={handleSubmit} className="home-search-form">
        <FormControl fullWidth className="pickup-location">
          <LocationSelectList
            label={commonStrings.LOCATION}
            hidePopupIcon
            customOpen
            required
            variant="standard"
            value={location as movininTypes.Location}
            onChange={handleLocationChange}
          />
        </FormControl>

        <FormControl fullWidth className="from">
          <DatePicker
            label={commonStrings.FROM}
            value={from}
            minDate={new Date()}
            variant="standard"
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
        <FormControl fullWidth className="to">
          <DatePicker
            label={commonStrings.TO}
            value={to}
            minDate={minDate}
            variant="standard"
            required
            onChange={(date) => {
              setTo(date || undefined)
            }}
            language={UserService.getLanguage()}
          />
        </FormControl>
        <FormControl fullWidth className="search">
          <Button type="submit" variant="contained" className="btn-search">
            {commonStrings.SEARCH}
          </Button>
        </FormControl>
      </form>
    </div>
  )
}

export default PropertyFilter
