import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import {
  Input,
  InputLabel,
  FormControl,
  FormHelperText,
  Button,
  Paper
} from '@mui/material'
import * as movininTypes from ':movinin-types'
import * as movininHelper from ':movinin-helper'
import Layout from '@/components/Layout'
import { strings as commonStrings } from '@/lang/common'
import { strings } from '@/lang/create-location'
import * as LocationService from '@/services/LocationService'
import * as helper from '@/common/helper'
import env from '@/config/env.config'
import CountrySelectList from '@/components/CountrySelectList'
import Avatar from '@/components/Avatar'
import Backdrop from '@/components/SimpleBackdrop'
import PositionInput from '@/components/PositionInput'

import '@/assets/css/create-location.css'

const CreateLocation = () => {
  // const navigate = useNavigate()

  const [visible, setVisible] = useState(false)
  const [names, setNames] = useState<movininTypes.LocationName[]>([])
  const [nameErrors, setNameErrors] = useState<boolean[]>([])
  const [country, setCountry] = useState<movininTypes.Country | null>()
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState<string>()
  const [longitude, setLongitude] = useState('')
  const [latitude, setLatitude] = useState('')

  const handleBeforeUpload = () => {
    setLoading(true)
  }

  const handleImageChange = (_image: movininTypes.Location | string | null) => {
    setLoading(false)
    setImage(_image as string)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      if (!country) {
        helper.error()
        return
      }

      let isValid = true

      const _nameErrors = movininHelper.clone(nameErrors) as boolean[]
      for (let i = 0; i < nameErrors.length; i += 1) {
        _nameErrors[i] = false
      }

      for (let i = 0; i < names.length; i += 1) {
        const name = names[i]
        const _isValid = (await LocationService.validate({ language: name.language, name: name.name })) === 200
        isValid = isValid && _isValid
        if (!_isValid) {
          _nameErrors[i] = true
        }
      }

      setNameErrors(_nameErrors)

      if (isValid) {
        const payload: movininTypes.UpsertLocationPayload = {
          country: country?._id,
          latitude: latitude ? Number(latitude) : undefined,
          longitude: longitude ? Number(longitude) : undefined,
          names,
          image,
        }
        const status = await LocationService.create(payload)

        if (status === 200) {
          const _names = movininHelper.clone(names) as movininTypes.LocationName[]
          for (let i = 0; i < names.length; i += 1) {
            _names[i].name = ''
          }
          setNames(_names)
          setImage(undefined)
          setCountry(null)
          setLongitude('')
          setLatitude('')
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
    <Layout onLoad={onLoad} strict>
      <div className="create-location">
        <Paper className="location-form location-form-wrapper" elevation={10} style={visible ? {} : { display: 'none' }}>
          <h1 className="location-form-title">
            {' '}
            {strings.NEW_LOCATION_HEADING}
            {' '}
          </h1>
          <form onSubmit={handleSubmit}>
            <Avatar
              type={movininTypes.RecordType.Location}
              avatar={image}
              mode="create"
              record={null}
              size="large"
              readonly={false}
              onBeforeUpload={handleBeforeUpload}
              onChange={handleImageChange}
              color="disabled"
              className="avatar-ctn"
            />

            <FormControl fullWidth margin="dense">
              <CountrySelectList
                label={strings.COUNTRY}
                variant="standard"
                onChange={(countries: movininTypes.Option[]) => {
                  setCountry(countries.length > 0 ? countries[0] as movininTypes.Country : null)
                }}
                value={country}
                required
              />
            </FormControl>

            {env._LANGUAGES.map((language, index) => (
              <FormControl key={language.code} fullWidth margin="dense">
                <InputLabel className="required">{`${commonStrings.NAME} (${language.label})`}</InputLabel>
                <Input
                  type="text"
                  value={(names[index] && names[index].name) || ''}
                  error={nameErrors[index]}
                  required
                  onChange={(e) => {
                    const _names = movininHelper.clone(names) as movininTypes.LocationName[]
                    _names[index] = {
                      language: language.code,
                      name: e.target.value,
                    }
                    setNames(_names)

                    const _nameErrors = movininHelper.clone(nameErrors) as boolean[]
                    _nameErrors[index] = false
                    setNameErrors(_nameErrors)
                  }}
                  autoComplete="off"
                />
                <FormHelperText error={nameErrors[index]}>{(nameErrors[index] && strings.INVALID_LOCATION) || ''}</FormHelperText>
              </FormControl>
            ))}

            <FormControl fullWidth margin="dense">
              <InputLabel>{commonStrings.LATITUDE}</InputLabel>
              <PositionInput
                value={latitude}
                onChange={(e) => {
                  setLatitude(e.target.value)
                }}
              />
            </FormControl>

            <FormControl fullWidth margin="dense">
              <InputLabel>{commonStrings.LONGITUDE}</InputLabel>
              <PositionInput
                value={longitude}
                onChange={(e) => {
                  setLongitude(e.target.value)
                }}
              />
            </FormControl>

            <div className="buttons">
              <Button type="submit" variant="contained" className="btn-primary btn-margin-bottom" size="small">
                {commonStrings.CREATE}
              </Button>
              <Button
                variant="contained"
                className="btn-secondary btn-margin-bottom"
                size="small"
                onClick={async () => {
                  if (image) {
                    await LocationService.deleteTempImage(image)
                  }
                  // navigate('/locations')
                  window.location.href = '/locations'
                }}
              >
                {commonStrings.CANCEL}
              </Button>
            </div>
          </form>
        </Paper>
      </div>

      {loading && <Backdrop text={commonStrings.PLEASE_WAIT} />}
    </Layout>
  )
}

export default CreateLocation
