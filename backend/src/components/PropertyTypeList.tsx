import React, { useState, useEffect } from 'react'
import { InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material'
import { strings } from '../lang/properties'
import * as movininTypes from 'movinin-types'

const PropertyTypeList = (
  {
    value: propertyTypeValue,
    required,
    label,
    variant,
    onChange
  }:
    {
      value?: string,
      required?: boolean,
      label?: string
      variant?: 'filled' | 'standard' | 'outlined'
      onChange?: (value: string) => void
    }
) => {
  const [value, setValue] = useState(propertyTypeValue || '')
  useEffect(() => {
    setValue(propertyTypeValue || '')
  }, [propertyTypeValue])

  const handleChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value || ''
    setValue(value)

    if (onChange) {
      onChange(value)
    }
  }

  return (
    <div>
      <InputLabel className={required ? 'required' : ''}>{label}</InputLabel>
      <Select
        label={label}
        value={value}
        onChange={handleChange}
        variant={variant || 'standard'}
        required={required}
        fullWidth
      >
        <MenuItem value={movininTypes.PropertyType.House}>{strings.HOUSE}</MenuItem>
        <MenuItem value={movininTypes.PropertyType.Apartment}>{strings.APARTMENT}</MenuItem>
        <MenuItem value={movininTypes.PropertyType.Plot}>{strings.PLOT}</MenuItem>
        <MenuItem value={movininTypes.PropertyType.Farm}>{strings.FARM}</MenuItem>
        <MenuItem value={movininTypes.PropertyType.Commercial}>{strings.COMMERCIAL}</MenuItem>
        <MenuItem value={movininTypes.PropertyType.Industrial}>{strings.INDUSTRIAL}</MenuItem>
        <MenuItem value={movininTypes.PropertyType.Townhouse}>{strings.TOWN_HOUSE}</MenuItem>
      </Select>
    </div>
  )
}

export default PropertyTypeList
