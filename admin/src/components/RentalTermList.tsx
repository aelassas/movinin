import React, { useState, useEffect } from 'react'
import {
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material'
import * as movininTypes from ':movinin-types'
import { strings } from '@/lang/rental-term'

interface RentalTermListProps {
  value?: string
  required?: boolean
  label?: string
  variant?: 'filled' | 'standard' | 'outlined'
  onChange?: (value: string) => void
}

const RentalTermList = ({
  value: rentalTermValue,
  required,
  label,
  variant,
  onChange
}: RentalTermListProps) => {
  const [value, setValue] = useState(rentalTermValue || '')
  useEffect(() => {
    setValue(rentalTermValue || '')
  }, [rentalTermValue])

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
        <MenuItem value={movininTypes.RentalTerm.Monthly}>{strings.MONTHLY}</MenuItem>
        <MenuItem value={movininTypes.RentalTerm.Weekly}>{strings.WEEKLY}</MenuItem>
        <MenuItem value={movininTypes.RentalTerm.Daily}>{strings.DAILY}</MenuItem>
        <MenuItem value={movininTypes.RentalTerm.Yearly}>{strings.YEARLY}</MenuItem>
      </Select>
    </div>
  )
}

export default RentalTermList
