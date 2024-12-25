import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextFieldVariants
} from '@mui/material'
import * as movininTypes from ':movinin-types'
import env from '@/config/env.config'
import { strings as commonStrings } from '@/lang/common'
import { strings as bfStrings } from '@/lang/booking-filter'
import { strings as blStrings } from '@/lang/booking-list'
import { strings } from '@/lang/booking-property-list'
import * as PropertyService from '@/services/PropertyService'
import MultipleSelect from './MultipleSelect'
import * as helper from '@/common/helper'

interface PropertySelectListProps {
  label?: string
  required?: boolean
  multiple?: boolean
  variant?: TextFieldVariants
  value?: movininTypes.Property
  agency: string
  location: string
  readOnly?: boolean
  onChange?: (values: movininTypes.Property[]) => void
}

const PropertySelectList = ({
  label,
  required,
  multiple,
  variant,
  value,
  agency,
  location,
  readOnly,
  onChange
}: PropertySelectListProps) => {
  const [init, setInit] = useState(false)
  const [loading, setLoading] = useState(false)
  const [fetch, setFetch] = useState(true)
  const [currentAgency, setCurrentAgency] = useState('-1')
  const [currentLocation, setCurrentLocation] = useState('-1')
  const [keyword, setKeyword] = useState('')
  const [page, setPage] = useState(1)
  const [properties, setProperties] = useState<movininTypes.Property[]>([])
  const [openDialog, setOpenDialog] = useState(false)
  const [closeDialog, setCloseDialog] = useState(false)
  const [reload, setReload] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<movininTypes.Property[]>([])

  useEffect(() => {
    if (value) {
      setSelectedOptions([value])
    } else {
      setSelectedOptions([])
    }
  }, [value])

  useEffect(() => {
    if (agency && currentAgency !== agency) {
      setCurrentAgency(agency || '-1')

      if (currentAgency !== '-1' && currentLocation !== '-1') {
        setReload(true)
        setSelectedOptions([])
        setPage(1)
        setKeyword('')

        if (onChange) {
          onChange([])
        }
      }
    }
  }, [currentAgency, agency, currentLocation, onChange])

  useEffect(() => {
    if (location && currentLocation !== location) {
      setCurrentLocation(location || '-1')

      if (currentAgency !== '-1' && currentLocation !== '-1') {
        setReload(true)
        setSelectedOptions([])
        setPage(1)
        setKeyword('')

        if (onChange) {
          onChange([])
        }
      }
    }
  }, [currentLocation, currentAgency, location, onChange])

  useEffect(() => {
    if (currentLocation !== location) {
      setCurrentLocation(location)
    }
  }, [currentLocation, location])

  const handleChange = (values: movininTypes.Property[]) => {
    if (onChange) {
      onChange(values)
    }
  }

  const fetchData = async (_page: number, _keyword: string, _agency: string, _location: string) => {
    try {
      const payload: movininTypes.GetBookingPropertiesPayload = { agency: _agency, location: _location }

      if (closeDialog) {
        setCloseDialog(false)
      }

      if (_agency === '-1' || _location === '-1') {
        setOpenDialog(true)
        return
      }

      setLoading(true)

      const data = await PropertyService.getBookingProperties(_keyword, payload, _page, env.PAGE_SIZE)
      const _properties = _page === 1 ? data : [...properties, ...data]

      setProperties(_properties)
      setFetch(data.length > 0)
      setReload(false)
      setInit(true)
      setLoading(false)
    } catch (err) {
      helper.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setCloseDialog(true)
  }

  return (
    <div>
      <MultipleSelect
        label={label}
        callbackFromMultipleSelect={handleChange}
        options={properties}
        selectedOptions={selectedOptions}
        loading={loading}
        required={required}
        multiple={multiple}
        type={movininTypes.RecordType.Property}
        variant={variant || 'standard'}
        readOnly={readOnly}
        ListboxProps={{
          onScroll: (event) => {
            const listboxNode = event.currentTarget
            if (fetch && !loading && listboxNode.scrollTop + listboxNode.clientHeight >= listboxNode.scrollHeight - env.PAGE_OFFSET) {
              const p = page + 1
              setPage(p)
              fetchData(p, keyword, currentAgency, currentLocation)
            }
          },
        }}
        onOpen={() => {
          if (!init || reload) {
            const p = 1
            setProperties([])
            setPage(p)
            fetchData(p, keyword, currentAgency, currentLocation)
          }
        }}
        onInputChange={(event: React.SyntheticEvent<Element, Event>) => {
          const _value = (event && event.target && 'value' in event.target && event.target.value as string) || ''

          if (_value !== keyword) {
            setProperties([])
            setPage(1)
            setKeyword(_value)
            fetchData(1, _value, currentAgency, currentLocation)
          }
        }}
        onClear={() => {
          setProperties([])
          setPage(1)
          setKeyword('')
          setFetch(true)
          fetchData(1, '', currentAgency, currentLocation)
        }}
      />

      <Dialog disableEscapeKeyDown maxWidth="xs" open={openDialog}>
        <DialogTitle className="dialog-header">{commonStrings.INFO}</DialogTitle>
        <DialogContent className="dialog-content">
          {currentAgency === '-1' && currentLocation === '-1' ? (
            `${strings.REQUIRED_FIELDS}${blStrings.AGENCY} ${commonStrings.AND} ${bfStrings.LOCATION}`
          ) : currentAgency === '-1' ? (
            `${strings.REQUIRED_FIELD}${blStrings.AGENCY}`
          ) : currentLocation === '-1' ? (
            `${strings.REQUIRED_FIELD}${bfStrings.LOCATION}`
          ) : (
            <></>
          )}
        </DialogContent>
        <DialogActions className="dialog-actions">
          <Button onClick={handleCloseDialog} variant="outlined">
            {commonStrings.CLOSE}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default PropertySelectList
