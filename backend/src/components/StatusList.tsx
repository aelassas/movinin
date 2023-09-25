import React, { useState, useEffect, CSSProperties } from 'react'
import { strings as commonStrings } from '../lang/common'
import { InputLabel, Select, MenuItem, SelectChangeEvent, TextFieldVariants } from '@mui/material'
import * as Helper from '../common/Helper'
import * as movininTypes from 'movinin-types'

import '../assets/css/status-list.css'

const StatusList = ({
  value: statusListValue,
  label,
  required,
  variant,
  disabled,
  style,
  onChange
}: {
  value?: string
  label?: string
  required?: boolean
  variant?: TextFieldVariants
  disabled?: boolean
  style?: CSSProperties
  onChange: (value: movininTypes.BookingStatus) => void
}) => {
  const [value, setValue] = useState('')

  useEffect(() => {
    if (statusListValue && statusListValue !== value) {
      setValue(statusListValue)
    }
  }, [statusListValue, value])

  const handleChange = (e: SelectChangeEvent<string>) => {
    setValue(e.target.value)

    if (onChange) {
      onChange(e.target.value as movininTypes.BookingStatus)
    }
  }

  return (
    <div style={style}>
      {disabled ? (
        <span className={`bs-s-sv bs-s-${value.toLowerCase()}`} style={{ marginTop: 5 }}>
          {Helper.getBookingStatus(value as movininTypes.BookingStatus)}
        </span>
      ) : (
        <>
          <InputLabel className={required ? 'required' : ''}>{label}</InputLabel>
          <Select
            label={label}
            value={value}
            onChange={handleChange}
            variant={variant || 'standard'}
            required={required}
            fullWidth
            renderValue={(value) =>
              <span className={`bs-s-sv bs-s-${value.toLowerCase()}`}>
                {Helper.getBookingStatus(value as movininTypes.BookingStatus)}
              </span>}
          >
            <MenuItem value={movininTypes.BookingStatus.Void} className="bs-s bs-s-void">
              {commonStrings.BOOKING_STATUS_VOID}
            </MenuItem>
            <MenuItem value={movininTypes.BookingStatus.Pending} className="bs-s bs-s-pending">
              {commonStrings.BOOKING_STATUS_PENDING}
            </MenuItem>
            <MenuItem value={movininTypes.BookingStatus.Deposit} className="bs-s bs-s-deposit">
              {commonStrings.BOOKING_STATUS_DEPOSIT}
            </MenuItem>
            <MenuItem value={movininTypes.BookingStatus.Paid} className="bs-s bs-s-paid">
              {commonStrings.BOOKING_STATUS_PAID}
            </MenuItem>
            <MenuItem value={movininTypes.BookingStatus.Reserved} className="bs-s bs-s-reserved">
              {commonStrings.BOOKING_STATUS_RESERVED}
            </MenuItem>
            <MenuItem value={movininTypes.BookingStatus.Cancelled} className="bs-s bs-s-cancelled">
              {commonStrings.BOOKING_STATUS_CANCELLED}
            </MenuItem>
          </Select>
        </>
      )}
    </div>
  )
}

export default StatusList
