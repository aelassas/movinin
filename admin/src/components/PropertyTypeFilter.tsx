import React, { useState, useEffect, useRef } from 'react'
import * as movininTypes from ':movinin-types'
import * as movininHelper from ':movinin-helper'
import { strings as commonStrings } from '@/lang/common'
import { strings as cpStrings } from '@/lang/create-property'
import { strings } from '@/lang/properties'
import Accordion from './Accordion'

import '@/assets/css/property-type-filter.css'

interface PropertyTypeFilterProps {
  className?: string
  onChange?: (values: movininTypes.PropertyType[]) => void
}

const allPropertyTypes = movininHelper.getAllPropertyTypes()

const PropertyTypeFilter = ({
  className,
  onChange
}: PropertyTypeFilterProps) => {
  const [allChecked, setAllChecked] = useState(false)
  const [values, setValues] = useState<movininTypes.PropertyType[]>([])

  const apartmentRef = useRef<HTMLInputElement>(null)
  const commercialRef = useRef<HTMLInputElement>(null)
  const farmRef = useRef<HTMLInputElement>(null)
  const houseRef = useRef<HTMLInputElement>(null)
  const industrialRef = useRef<HTMLInputElement>(null)
  const plotRef = useRef<HTMLInputElement>(null)
  const townhouseRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (allChecked
      && apartmentRef.current
      && commercialRef.current
      && farmRef.current
      && houseRef.current
      && industrialRef.current
      && plotRef.current
      && townhouseRef.current
    ) {
      apartmentRef.current.checked = true
      commercialRef.current.checked = true
      farmRef.current.checked = true
      houseRef.current.checked = true
      industrialRef.current.checked = true
      plotRef.current.checked = true
      townhouseRef.current.checked = true
    }
  }, [allChecked])

  const handleChange = (_values: movininTypes.PropertyType[]) => {
    if (onChange) {
      onChange(_values.length === 0 ? allPropertyTypes : movininHelper.clone(_values))
    }
  }

  const handleCheckApartmentChange = (e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement>) => {
    if ('checked' in e.currentTarget && e.currentTarget.checked) {
      values.push(movininTypes.PropertyType.Apartment)

      if (values.length === 7) {
        setAllChecked(true)
      }
    } else {
      values.splice(
        values.findIndex((v) => v === movininTypes.PropertyType.Apartment),
        1,
      )

      if (values.length === 0) {
        setAllChecked(false)
      }
    }

    setValues(values)

    handleChange(values)
  }

  const handleApartmentClick = (e: React.MouseEvent<HTMLElement>) => {
    const checkbox = e.currentTarget.previousSibling as HTMLInputElement
    checkbox.checked = !checkbox.checked
    const event = e
    event.currentTarget = checkbox
    handleCheckApartmentChange(event)
  }

  const handleCheckCommercialChange = (e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement>) => {
    if ('checked' in e.currentTarget && e.currentTarget.checked) {
      values.push(movininTypes.PropertyType.Commercial)

      if (values.length === 7) {
        setAllChecked(true)
      }
    } else {
      values.splice(
        values.findIndex((v) => v === movininTypes.PropertyType.Commercial),
        1,
      )

      if (values.length === 0) {
        setAllChecked(false)
      }
    }

    setValues(values)

    handleChange(values)
  }

  const handleCommercialClick = (e: React.MouseEvent<HTMLElement>) => {
    const checkbox = e.currentTarget.previousSibling as HTMLInputElement
    checkbox.checked = !checkbox.checked
    const event = e
    event.currentTarget = checkbox
    handleCheckCommercialChange(event)
  }

  const handleCheckFarmChange = (e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement>) => {
    if ('checked' in e.currentTarget && e.currentTarget.checked) {
      values.push(movininTypes.PropertyType.Farm)

      if (values.length === 7) {
        setAllChecked(true)
      }
    } else {
      values.splice(
        values.findIndex((v) => v === movininTypes.PropertyType.Farm),
        1,
      )

      if (values.length === 0) {
        setAllChecked(false)
      }
    }

    setValues(values)

    handleChange(values)
  }

  const handleFarmClick = (e: React.MouseEvent<HTMLElement>) => {
    const checkbox = e.currentTarget.previousSibling as HTMLInputElement
    checkbox.checked = !checkbox.checked
    const event = e
    event.currentTarget = checkbox
    handleCheckFarmChange(event)
  }

  const handleCheckHouseChange = (e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement>) => {
    if ('checked' in e.currentTarget && e.currentTarget.checked) {
      values.push(movininTypes.PropertyType.House)

      if (values.length === 7) {
        setAllChecked(true)
      }
    } else {
      values.splice(
        values.findIndex((v) => v === movininTypes.PropertyType.House),
        1,
      )

      if (values.length === 0) {
        setAllChecked(false)
      }
    }

    setValues(values)

    handleChange(values)
  }

  const handleHouseClick = (e: React.MouseEvent<HTMLElement>) => {
    const checkbox = e.currentTarget.previousSibling as HTMLInputElement
    checkbox.checked = !checkbox.checked
    const event = e
    event.currentTarget = checkbox
    handleCheckHouseChange(event)
  }

  const handleCheckIndustrialChange = (e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement>) => {
    if ('checked' in e.currentTarget && e.currentTarget.checked) {
      values.push(movininTypes.PropertyType.Industrial)

      if (values.length === 7) {
        setAllChecked(true)
      }
    } else {
      values.splice(
        values.findIndex((v) => v === movininTypes.PropertyType.Industrial),
        1,
      )

      if (values.length === 0) {
        setAllChecked(false)
      }
    }

    setValues(values)

    handleChange(values)
  }

  const handleIndustrialClick = (e: React.MouseEvent<HTMLElement>) => {
    const checkbox = e.currentTarget.previousSibling as HTMLInputElement
    checkbox.checked = !checkbox.checked
    const event = e
    event.currentTarget = checkbox
    handleCheckIndustrialChange(event)
  }

  const handleCheckPlotChange = (e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement>) => {
    if ('checked' in e.currentTarget && e.currentTarget.checked) {
      values.push(movininTypes.PropertyType.Plot)

      if (values.length === 7) {
        setAllChecked(true)
      }
    } else {
      values.splice(
        values.findIndex((v) => v === movininTypes.PropertyType.Plot),
        1,
      )

      if (values.length === 0) {
        setAllChecked(false)
      }
    }

    setValues(values)

    handleChange(values)
  }

  const handlePlotClick = (e: React.MouseEvent<HTMLElement>) => {
    const checkbox = e.currentTarget.previousSibling as HTMLInputElement
    checkbox.checked = !checkbox.checked
    const event = e
    event.currentTarget = checkbox
    handleCheckPlotChange(event)
  }

  const handleCheckTownhouseChange = (e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement>) => {
    if ('checked' in e.currentTarget && e.currentTarget.checked) {
      values.push(movininTypes.PropertyType.Townhouse)

      if (values.length === 7) {
        setAllChecked(true)
      }
    } else {
      values.splice(
        values.findIndex((v) => v === movininTypes.PropertyType.Townhouse),
        1,
      )

      if (values.length === 0) {
        setAllChecked(false)
      }
    }

    setValues(values)

    handleChange(values)
  }

  const handleTownhouseClick = (e: React.MouseEvent<HTMLElement>) => {
    const checkbox = e.currentTarget.previousSibling as HTMLInputElement
    checkbox.checked = !checkbox.checked
    const event = e
    event.currentTarget = checkbox
    handleCheckTownhouseChange(event)
  }

  const handleUncheckAllChange = () => {
    if (allChecked) {
      // uncheck all
      if (apartmentRef.current) {
        apartmentRef.current.checked = false
      }
      if (commercialRef.current) {
        commercialRef.current.checked = false
      }
      if (farmRef.current) {
        farmRef.current.checked = false
      }
      if (houseRef.current) {
        houseRef.current.checked = false
      }
      if (industrialRef.current) {
        industrialRef.current.checked = false
      }
      if (plotRef.current) {
        plotRef.current.checked = false
      }
      if (townhouseRef.current) {
        townhouseRef.current.checked = false
      }
      setAllChecked(false)
      setValues([])
    } else {
      // check all
      if (apartmentRef.current) {
        apartmentRef.current.checked = true
      }
      if (commercialRef.current) {
        commercialRef.current.checked = true
      }
      if (farmRef.current) {
        farmRef.current.checked = true
      }
      if (houseRef.current) {
        houseRef.current.checked = true
      }
      if (industrialRef.current) {
        industrialRef.current.checked = true
      }
      if (plotRef.current) {
        plotRef.current.checked = true
      }
      if (townhouseRef.current) {
        townhouseRef.current.checked = true
      }

      setAllChecked(true)
      setValues(allPropertyTypes)

      if (onChange) {
        onChange(allPropertyTypes)
      }
    }
  }

  return (
    <Accordion title={cpStrings.PROPERTY_TYPE} className={`${className ? `${className} ` : ''}property-type-filter`}>
      <div className="filter-elements">
        <div className="filter-element">
          <input ref={apartmentRef} type="checkbox" className="property-type-checkbox" onChange={handleCheckApartmentChange} />
          <span role="button" tabIndex={0} onClick={handleApartmentClick}>{strings.APARTMENT}</span>
        </div>
        <div className="filter-element">
          <input ref={commercialRef} type="checkbox" className="property-type-checkbox" onChange={handleCheckCommercialChange} />
          <span role="button" tabIndex={0} onClick={handleCommercialClick}>{strings.COMMERCIAL}</span>
        </div>
        <div className="filter-element">
          <input ref={farmRef} type="checkbox" className="property-type-checkbox" onChange={handleCheckFarmChange} />
          <span role="button" tabIndex={0} onClick={handleFarmClick}>{strings.FARM}</span>
        </div>
        <div className="filter-element">
          <input ref={houseRef} type="checkbox" className="property-type-checkbox" onChange={handleCheckHouseChange} />
          <span role="button" tabIndex={0} onClick={handleHouseClick}>{strings.HOUSE}</span>
        </div>
        <div className="filter-element">
          <input ref={industrialRef} type="checkbox" className="property-type-checkbox" onChange={handleCheckIndustrialChange} />
          <span role="button" tabIndex={0} onClick={handleIndustrialClick}>{strings.INDUSTRIAL}</span>
        </div>
        <div className="filter-element">
          <input ref={plotRef} type="checkbox" className="property-type-checkbox" onChange={handleCheckPlotChange} />
          <span role="button" tabIndex={0} onClick={handlePlotClick}>{strings.PLOT}</span>
        </div>
        <div className="filter-element">
          <input ref={townhouseRef} type="checkbox" className="property-type-checkbox" onChange={handleCheckTownhouseChange} />
          <span role="button" tabIndex={0} onClick={handleTownhouseClick}>{strings.TOWN_HOUSE}</span>
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

export default PropertyTypeFilter
