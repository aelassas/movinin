import React, { useState, useEffect, useRef } from 'react'
import * as movininTypes from ':movinin-types'
import * as movininHelper from ':movinin-helper'
import { strings as commonStrings } from '@/lang/common'
import { strings } from '@/lang/properties'
import Accordion from './Accordion'
import * as helper from '@/common/helper'

import '@/assets/css/availability-filter.css'

interface AvailabilityFilterProps {
  className?: string
  onChange?: (values: movininTypes.Availablity[]) => void
}

const allValues = [
  movininTypes.Availablity.Available,
  movininTypes.Availablity.Unavailable
]

const AvailabilityFilter = ({
  className,
  onChange
}: AvailabilityFilterProps) => {
  const [allChecked, setAllChecked] = useState(false)
  const [values, setValues] = useState<movininTypes.Availablity[]>([])

  const availableRef = useRef<HTMLInputElement>(null)
  const unavailableRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (allChecked && availableRef.current && unavailableRef.current) {
      availableRef.current.checked = true
      unavailableRef.current.checked = true
    }
  }, [allChecked])

  const handleChange = (_values: movininTypes.Availablity[]) => {
    if (onChange) {
      onChange(_values.length === 0 ? allValues : movininHelper.clone(_values))
    }
  }

  const handleAvailableChange = (e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement>) => {
    if (e.currentTarget instanceof HTMLInputElement) {
      if (e.currentTarget.checked) {
        values.push(movininTypes.Availablity.Available)

        if (values.length === 2) {
          setAllChecked(true)
        }
      } else {
        values.splice(
          values.findIndex((v) => v === movininTypes.Availablity.Available),
          1,
        )

        if (values.length === 0) {
          setAllChecked(false)
        }
      }

      setValues(values)

      handleChange(values)
    } else {
      helper.error()
    }
  }

  const handleAvailableClick = (e: React.MouseEvent<HTMLElement>) => {
    const checkbox = e.currentTarget.previousSibling as HTMLInputElement
    checkbox.checked = !checkbox.checked
    const event = e
    event.currentTarget = checkbox
    handleAvailableChange(event)
  }

  const handleUnavailableChange = (e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement>) => {
    if (e.currentTarget instanceof HTMLInputElement) {
      if (e.currentTarget.checked) {
        values.push(movininTypes.Availablity.Unavailable)

        if (values.length === 2) {
          setAllChecked(true)
        }
      } else {
        values.splice(
          values.findIndex((v) => v === movininTypes.Availablity.Unavailable),
          1,
        )

        if (values.length === 0) {
          setAllChecked(false)
        }
      }

      setValues(values)

      handleChange(values)
    } else {
      helper.error()
    }
  }

  const handleUnavailableClick = (e: React.MouseEvent<HTMLElement>) => {
    const checkbox = e.currentTarget.previousSibling as HTMLInputElement
    checkbox.checked = !checkbox.checked
    const event = e
    event.currentTarget = checkbox
    handleUnavailableChange(event)
  }

  const handleUncheckAllChange = () => {
    if (availableRef.current && unavailableRef.current) {
      if (allChecked) {
        // uncheck all
        availableRef.current.checked = false
        unavailableRef.current.checked = false

        setAllChecked(false)
        setValues([])
      } else {
        // check all
        availableRef.current.checked = true
        unavailableRef.current.checked = true

        const _values = [movininTypes.Availablity.Available, movininTypes.Availablity.Unavailable]

        setAllChecked(true)
        setValues(_values)

        if (onChange) {
          onChange(movininHelper.clone(_values))
        }
      }
    } else {
      helper.error()
    }
  }

  return (
    <Accordion title={strings.AVAILABILITY} className={`${className ? `${className} ` : ''}availability-filter`}>
      <div className="filter-elements">
        <div className="filter-element">
          <input ref={availableRef} type="checkbox" className="availability-checkbox" onChange={handleAvailableChange} />
          <span role="button" tabIndex={0} onClick={handleAvailableClick}>{strings.AVAILABLE}</span>
        </div>
        <div className="filter-element">
          <input ref={unavailableRef} type="checkbox" className="availability-checkbox" onChange={handleUnavailableChange} />
          <span role="button" tabIndex={0} onClick={handleUnavailableClick}>{strings.UNAVAILABLE}</span>
        </div>
        <div className="filter-actions">
          <span role="button" tabIndex={0} onClick={handleUncheckAllChange} className="uncheckall">
            {allChecked ? commonStrings.UNCHECK_ALL : commonStrings.CHECK_ALL}
          </span>
        </div>
      </div>
    </Accordion>
  )
}

export default AvailabilityFilter
