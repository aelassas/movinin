import React, { useState, useEffect } from 'react'
import {
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material'
import * as movininTypes from ':movinin-types'
import { strings } from '@/lang/properties'

interface PropertyTypeListProps {
  value?: string
  required?: boolean
  label?: string
  variant?: 'filled' | 'standard' | 'outlined'
  onChange?: (value: string) => void
}

const PropertyTypeList = ({
  value: propertyTypeValue,
  required,
  label,
  variant,
  onChange
}: PropertyTypeListProps) => {
  const [value, setValue] = useState(propertyTypeValue || '')
  useEffect(() => {
    setValue(propertyTypeValue || '')
  }, [propertyTypeValue])

  const handleChange = (e: SelectChangeEvent<string>) => {
    const _value = e.target.value || ''
    setValue(_value)

    if (onChange) {
      onChange(_value)
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
