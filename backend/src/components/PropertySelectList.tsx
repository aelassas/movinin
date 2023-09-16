import React, { useState, useEffect } from 'react'
import Env from '../config/env.config'
import { strings as commonStrings } from '../lang/common'
import { strings as bfStrings } from '../lang/booking-filter'
import { strings as blStrings } from '../lang/booking-list'
import { strings } from '../lang/booking-property-list'
import * as PropertyService from '../services/PropertyService'
import MultipleSelect from './MultipleSelect'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextFieldVariants } from '@mui/material'
import * as Helper from '../common/Helper'
import * as movininTypes from 'movinin-types'

const PropertySelectList = (
  {
    label,
    required,
    multiple,
    variant,
    value,
    agency,
    location,
    onChange
  }:
    {
      label?: string
      required?: boolean
      multiple?: boolean
      variant?: TextFieldVariants
      value?: movininTypes.Property
      agency: string
      location: string
      onChange?: (values: movininTypes.Property[]) => void
    }
) => {
  const [init, setInit] = useState(false)
  const [loading, setLoading] = useState(false)
  const [fetch, setFetch] = useState(true)
  const [_agency, set_Agency] = useState('-1')
  const [_location, set_Location] = useState('-1')
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
    if (agency && _agency !== agency) {
      set_Agency(agency || '-1')

      if (_agency !== '-1' && _location !== '-1') {
        setReload(true)
        setSelectedOptions([])
        setPage(1)
        setKeyword('')

        if (onChange) {
          onChange([])
        }
      }
    }
  }, [_agency, agency, _location, onChange])

  useEffect(() => {
    if (location && _location !== location) {
      set_Location(location || '-1')

      if (_agency !== '-1' && _location !== '-1') {
        setReload(true)
        setSelectedOptions([])
        setPage(1)
        setKeyword('')

        if (onChange) {
          onChange([])
        }
      }
    }
  }, [_location, _agency, location, onChange])

  useEffect(() => {
    if (_location !== location) {
      set_Location(location)
    }
  }, [_location, location])

  const handleChange = (values: movininTypes.Property[]) => {
    if (onChange) {
      onChange(values)
    }
  }

  const _fetch = async (page: number, keyword: string, agency: string, location: string) => {
    try {
      const payload: movininTypes.GetBookingPropertiesPayload = { agency, location }
      
      if (closeDialog) {
        setCloseDialog(false)
      }

      if (agency === '-1' || location === '-1') {
        setOpenDialog(true)
        return
      }

      setLoading(true)

      const data = await PropertyService.getBookingProperties(keyword, payload, page, Env.PAGE_SIZE)
      const _properties = page === 1 ? data : [...properties, ...data]

      setProperties(_properties)
      setFetch(data.length > 0)
      setReload(false)
      setInit(true)
      setLoading(false)
    } catch (err) {
      Helper.error(err)
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
        ListboxProps={{
          onScroll: (event) => {
            const listboxNode = event.currentTarget
            if (fetch && !loading && listboxNode.scrollTop + listboxNode.clientHeight >= listboxNode.scrollHeight - Env.PAGE_OFFSET) {
              const p = page + 1
              setPage(p)
              _fetch(p, keyword, _agency, _location)
            }
          },
        }}
        onOpen={() => {
          if (!init || reload) {
            const p = 1
            setProperties([])
            setPage(p)
            _fetch(p, keyword, _agency, _location)
          }
        }}
        onInputChange={(event: React.SyntheticEvent<Element, Event>) => {
          const value = (event && event.target && 'value' in event.target && event.target.value as string) || ''

          if (value !== keyword) {
            setProperties([])
            setPage(1)
            setKeyword(value)
            _fetch(1, value, _agency, _location)
          }
        }}
        onClear={() => {
          setProperties([])
          setPage(1)
          setKeyword('')
          setFetch(true)
          _fetch(1, '', _agency, _location)
        }}
      />

      <Dialog disableEscapeKeyDown maxWidth="xs" open={openDialog}>
        <DialogTitle className="dialog-header">{commonStrings.INFO}</DialogTitle>
        <DialogContent className="dialog-content">
          {_agency === '-1' && _location === '-1' ? (
            `${strings.REQUIRED_FIELDS}${blStrings.AGENCY} ${commonStrings.AND} ${bfStrings.LOCATION}`
          ) : _agency === '-1' ? (
            `${strings.REQUIRED_FIELD}${blStrings.AGENCY}`
          ) : _location === '-1' ? (
            `${strings.REQUIRED_FIELD}${bfStrings.LOCATION}`
          ) : (
            <></>
          )}
        </DialogContent>
        <DialogActions className="dialog-actions">
          <Button onClick={handleCloseDialog} variant="contained" className="btn-secondary">
            {commonStrings.CLOSE}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default PropertySelectList
