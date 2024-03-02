import React, { useState } from 'react'
import {
  Input,
  InputLabel,
  FormControl,
  FormHelperText,
  Button,
  Paper
} from '@mui/material'
import * as movininTypes from 'movinin-types'
import * as movininHelper from 'movinin-helper'
import Master from '../components/Master'
import { strings as commonStrings } from '../lang/common'
import { strings } from '../lang/create-location'
import * as LocationService from '../services/LocationService'
import * as helper from '../common/helper'
import env from '../config/env.config'

import '../assets/css/create-location.css'

const CreateLocation = () => {
  const [visible, setVisible] = useState(false)
  const [names, setNames] = useState<movininTypes.LocationName[]>([])
  const [nameErrors, setNameErrors] = useState<boolean[]>([])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      let isValid = true

      for (let i = 0; i < nameErrors.length; i += 1) {
        nameErrors[i] = false
      }

      for (let i = 0; i < names.length; i += 1) {
        const name = names[i]
        const _isValid = (await LocationService.validate(name)) === 200
        isValid = isValid && _isValid
        if (!_isValid) {
          nameErrors[i] = true
        }
      }

      setNameErrors(movininHelper.cloneArray(nameErrors) as boolean[])

      if (isValid) {
        const status = await LocationService.create(names)

        if (status === 200) {
          for (let i = 0; i < names.length; i += 1) {
            names[i].name = ''
          }
          setNames(movininHelper.cloneArray(names) as movininTypes.LocationName[])
          helper.info(strings.LOCATION_CREATED)
        } else {
          helper.error()
        }
      }
    } catch (err) {
      helper.error(err)
    }
  }

  const onLoad = () => {
    setVisible(true)
  }

  return (
    <Master onLoad={onLoad} strict>
      <div className="create-location">
        <Paper className="location-form location-form-wrapper" elevation={10} style={visible ? {} : { display: 'none' }}>
          <h1 className="location-form-title">
            {' '}
            {strings.NEW_LOCATION_HEADING}
            {' '}
          </h1>
          <form onSubmit={handleSubmit}>
            {env._LANGUAGES.map((language, index) => (
              <FormControl key={language.code} fullWidth margin="dense">
                <InputLabel className="required">{language.label}</InputLabel>
                <Input
                  type="text"
                  value={(names[index] && names[index].name) || ''}
                  error={nameErrors[index]}
                  required
                  onChange={(e) => {
                    names[index] = {
                      language: language.code,
                      name: e.target.value,
                    }
                    setNames(movininHelper.cloneArray(names) as movininTypes.LocationName[])

                    nameErrors[index] = false
                    setNameErrors(movininHelper.cloneArray(nameErrors) as boolean[])
                  }}
                  autoComplete="off"
                />
                <FormHelperText error={nameErrors[index]}>{(nameErrors[index] && strings.INVALID_LOCATION) || ''}</FormHelperText>
              </FormControl>
            ))}

            <div className="buttons">
              <Button type="submit" variant="contained" className="btn-primary btn-margin-bottom" size="small">
                {commonStrings.CREATE}
              </Button>
              <Button variant="contained" className="btn-secondary btn-margin-bottom" size="small" href="/locations">
                {commonStrings.CANCEL}
              </Button>
            </div>
          </form>
        </Paper>
      </div>
    </Master>
  )
}

export default CreateLocation
