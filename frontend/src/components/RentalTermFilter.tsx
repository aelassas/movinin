import React, { useState, useEffect, useRef } from 'react'
import * as movininTypes from ':movinin-types'
import * as movininHelper from ':movinin-helper'
import { strings as commonStrings } from '@/lang/common'
import { strings as propertyStrings } from '@/lang/property'
import { strings } from '@/lang/rental-term'
import Accordion from './Accordion'

import '@/assets/css/rental-term-filter.css'

interface RentalTermFilterProps {
  className?: string
  onChange?: (values: movininTypes.RentalTerm[]) => void
}

const allRentalTerms = movininHelper.getAllRentalTerms()

const RentalTermFilter = ({
  className,
  onChange
}: RentalTermFilterProps) => {
  const [allChecked, setAllChecked] = useState(false)
  const [values, setValues] = useState<movininTypes.RentalTerm[]>([])

  const monthlyRef = useRef<HTMLInputElement>(null)
  const weeklyRef = useRef<HTMLInputElement>(null)
  const dailyRef = useRef<HTMLInputElement>(null)
  const yearlyRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (allChecked
      && monthlyRef.current
      && weeklyRef.current
      && dailyRef.current
      && yearlyRef.current
    ) {
      monthlyRef.current.checked = true
      weeklyRef.current.checked = true
      dailyRef.current.checked = true
      yearlyRef.current.checked = true
    }
  }, [allChecked])

  const handleChange = (_values: movininTypes.RentalTerm[]) => {
    if (onChange) {
      onChange(_values.length === 0 ? allRentalTerms : movininHelper.clone(_values))
    }
  }

  const handleCheckMonthlyChange = (e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement>) => {
    if ('checked' in e.currentTarget && e.currentTarget.checked) {
      values.push(movininTypes.RentalTerm.Monthly)

      if (values.length === 7) {
        setAllChecked(true)
      }
    } else {
      values.splice(
        values.findIndex((v) => v === movininTypes.RentalTerm.Monthly),
        1,
      )

      if (values.length === 0) {
        setAllChecked(false)
      }
    }

    setValues(values)

    handleChange(values)
  }

  const handleMonthlyClick = (e: React.MouseEvent<HTMLElement>) => {
    const checkbox = e.currentTarget.previousSibling as HTMLInputElement
    checkbox.checked = !checkbox.checked
    const event = e
    event.currentTarget = checkbox
    handleCheckMonthlyChange(event)
  }

  const handleCheckWeeklyChange = (e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement>) => {
    if ('checked' in e.currentTarget && e.currentTarget.checked) {
      values.push(movininTypes.RentalTerm.Weekly)

      if (values.length === 7) {
        setAllChecked(true)
      }
    } else {
      values.splice(
        values.findIndex((v) => v === movininTypes.RentalTerm.Weekly),
        1,
      )

      if (values.length === 0) {
        setAllChecked(false)
      }
    }

    setValues(values)

    handleChange(values)
  }

  const handleWeeklyClick = (e: React.MouseEvent<HTMLElement>) => {
    const checkbox = e.currentTarget.previousSibling as HTMLInputElement
    checkbox.checked = !checkbox.checked
    const event = e
    event.currentTarget = checkbox
    handleCheckWeeklyChange(event)
  }

  const handleCheckDailyChange = (e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement>) => {
    if ('checked' in e.currentTarget && e.currentTarget.checked) {
      values.push(movininTypes.RentalTerm.Daily)

      if (values.length === 7) {
        setAllChecked(true)
      }
    } else {
      values.splice(
        values.findIndex((v) => v === movininTypes.RentalTerm.Daily),
        1,
      )

      if (values.length === 0) {
        setAllChecked(false)
      }
    }

    setValues(values)

    handleChange(values)
  }

  const handleDailyClick = (e: React.MouseEvent<HTMLElement>) => {
    const checkbox = e.currentTarget.previousSibling as HTMLInputElement
    checkbox.checked = !checkbox.checked
    const event = e
    event.currentTarget = checkbox
    handleCheckDailyChange(event)
  }

  const handleCheckYearlyChange = (e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement>) => {
    if ('checked' in e.currentTarget && e.currentTarget.checked) {
      values.push(movininTypes.RentalTerm.Yearly)

      if (values.length === 7) {
        setAllChecked(true)
      }
    } else {
      values.splice(
        values.findIndex((v) => v === movininTypes.RentalTerm.Yearly),
        1,
      )

      if (values.length === 0) {
        setAllChecked(false)
      }
    }

    setValues(values)

    handleChange(values)
  }

  const handleYearlyClick = (e: React.MouseEvent<HTMLElement>) => {
    const checkbox = e.currentTarget.previousSibling as HTMLInputElement
    checkbox.checked = !checkbox.checked
    const event = e
    event.currentTarget = checkbox
    handleCheckYearlyChange(event)
  }

  const handleUncheckAllChange = () => {
    if (allChecked) {
      // uncheck all
      if (monthlyRef.current) {
        monthlyRef.current.checked = false
      }
      if (weeklyRef.current) {
        weeklyRef.current.checked = false
      }
      if (dailyRef.current) {
        dailyRef.current.checked = false
      }
      if (yearlyRef.current) {
        yearlyRef.current.checked = false
      }

      setAllChecked(false)
      setValues([])
    } else {
      // check all
      if (monthlyRef.current) {
        monthlyRef.current.checked = true
      }
      if (weeklyRef.current) {
        weeklyRef.current.checked = true
      }
      if (dailyRef.current) {
        dailyRef.current.checked = true
      }
      if (yearlyRef.current) {
        yearlyRef.current.checked = true
      }

      setAllChecked(true)
      setValues(allRentalTerms)

      if (onChange) {
        onChange(allRentalTerms)
      }
    }
  }

  return (
    <Accordion title={propertyStrings.RENTAL_TERM} className={`${className ? `${className} ` : ''}property-type-filter`}>
      <div className="filter-elements">
        <div className="filter-element">
          <input ref={monthlyRef} type="checkbox" className="property-type-checkbox" onChange={handleCheckMonthlyChange} />
          <span role="button" tabIndex={0} onClick={handleMonthlyClick}>{strings.MONTHLY}</span>
        </div>
        <div className="filter-element">
          <input ref={weeklyRef} type="checkbox" className="property-type-checkbox" onChange={handleCheckWeeklyChange} />
          <span role="button" tabIndex={0} onClick={handleWeeklyClick}>{strings.WEEKLY}</span>
        </div>
        <div className="filter-element">
          <input ref={dailyRef} type="checkbox" className="property-type-checkbox" onChange={handleCheckDailyChange} />
          <span role="button" tabIndex={0} onClick={handleDailyClick}>{strings.DAILY}</span>
        </div>
        <div className="filter-element">
          <input ref={yearlyRef} type="checkbox" className="property-type-checkbox" onChange={handleCheckYearlyChange} />
          <span role="button" tabIndex={0} onClick={handleYearlyClick}>{strings.YEARLY}</span>
        </div>
      </div>
      <div className="filter-actions">
        <span role="button" tabIndex={0} onClick={handleUncheckAllChange} className="uncheckall">
          {allChecked ? commonStrings.UNCHECK_ALL : commonStrings.CHECK_ALL}
        </span>
      </div>
    </Accordion>
  )
}

export default RentalTermFilter
