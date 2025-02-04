import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Input,
  InputLabel,
  FormControl,
  FormHelperText,
  Button,
  Paper,
  FormControlLabel,
  Switch
} from '@mui/material'
import { Info as InfoIcon } from '@mui/icons-material'
import validator from 'validator'
import * as movininTypes from ':movinin-types'
import * as movininHelper from ':movinin-helper'
import Layout from '@/components/Layout'
import env from '@/config/env.config'
import { strings as commonStrings } from '@/lang/common'
import { strings as ccStrings } from '@/lang/create-agency'
import * as AgencyService from '@/services/AgencyService'
import * as UserService from '@/services/UserService'
import * as helper from '@/common/helper'
import Error from '@/components/Error'
import Backdrop from '@/components/SimpleBackdrop'
import NoMatch from './NoMatch'
import Avatar from '@/components/Avatar'

import '@/assets/css/update-agency.css'

const UpdateAgency = () => {
  const navigate = useNavigate()

  const [user, setUser] = useState<movininTypes.User>()
  const [agency, setAgency] = useState<movininTypes.User>()
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [location, setLocation] = useState('')
  const [bio, setBio] = useState('')
  const [error, setError] = useState(false)
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [fullNameError, setFullNameError] = useState(false)
  const [noMatch, setNoMatch] = useState(false)
  const [avatar, setAvatar] = useState('')
  const [avatarError, setAvatarError] = useState(false)
  const [email, setEmail] = useState('')
  const [phoneValid, setPhoneValid] = useState(true)
  const [payLater, setPayLater] = useState(true)

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value)

    if (!e.target.value) {
      setFullNameError(false)
    }
  }

  const validateFullName = async (_fullName: string) => {
    if (agency && _fullName) {
      if (agency.fullName !== _fullName) {
        try {
          const status = await AgencyService.validate({ fullName: _fullName })

          if (status === 200) {
            setFullNameError(false)
            return true
          }
          setFullNameError(true)
          setAvatarError(false)
          setError(false)
          return false
        } catch (err) {
          helper.error(err)
          return false
        }
      } else {
        setFullNameError(false)
        setAvatarError(false)
        setError(false)
        return true
      }
    } else {
      setFullNameError(true)
      setAvatarError(false)
      setError(false)
      return false
    }
  }

  const handleFullNameBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    await validateFullName(e.target.value)
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value)

    if (!e.target.value) {
      setPhoneValid(true)
    }
  }

  const validatePhone = (_phone?: string) => {
    if (_phone) {
      const _phoneValid = validator.isMobilePhone(_phone)
      setPhoneValid(_phoneValid)

      return _phoneValid
    }
    setPhoneValid(true)

    return true
  }

  const handlePhoneBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    validatePhone(e.target.value)
  }

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value)
  }

  const handleBioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBio(e.target.value)
  }

  const onBeforeUpload = () => {
    setLoading(true)
  }

  const onAvatarChange = (_avatar: string) => {
    if (agency && user) {
      const _agency = movininHelper.clone(agency)
      _agency.avatar = _avatar

      if (user._id === agency._id) {
        const _user = movininHelper.clone(user)
        _user.avatar = _avatar
        setUser(_user)
      }

      setLoading(false)
      setAgency(_agency)

      if (_avatar) {
        setAvatarError(false)
      }
    } else {
      helper.error()
    }
  }

  const handleResendActivationLink = async () => {
    if (agency) {
      try {
        const status = await UserService.resend(agency.email, false, env.APP_TYPE)

        if (status === 200) {
          helper.info(commonStrings.ACTIVATION_EMAIL_SENT)
        } else {
          helper.error()
        }
      } catch (err) {
        helper.error(err)
      }
    }
  }

  const onLoad = async (_user?: movininTypes.User) => {
    if (_user && _user.verified) {
      setLoading(true)
      setUser(_user)

      const params = new URLSearchParams(window.location.search)
      if (params.has('c')) {
        const id = params.get('c')
        if (id && id !== '') {
          try {
            const _agency = await AgencyService.getAgency(id)

            if (_agency) {
              setAgency(_agency)
              setEmail(_agency.email || '')
              setAvatar(_agency.avatar || '')
              setFullName(_agency.fullName || '')
              setPhone(_agency.phone || '')
              setLocation(_agency.location || '')
              setBio(_agency.bio || '')
              setPayLater(_agency.payLater || false)
              setVisible(true)
              setLoading(false)
            } else {
              setLoading(false)
              setNoMatch(true)
            }
          } catch (err) {
            helper.error(err)
            setLoading(false)
            setError(true)
            setVisible(false)
          }
        } else {
          setLoading(false)
          setNoMatch(true)
        }
      } else {
        setLoading(false)
        setNoMatch(true)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()

      const fullNameValid = await validateFullName(fullName)
      if (!fullNameValid) {
        return
      }

      const _phoneValid = validatePhone(phone)
      if (!_phoneValid) {
        return
      }

      if (!avatar) {
        setAvatarError(true)
        setError(false)
        return
      }

      if (!agency) {
        helper.error()
        return
      }

      const data: movininTypes.UpdateAgencyPayload = {
        _id: agency._id as string,
        fullName,
        phone,
        location,
        bio,
        payLater,
      }

      const status = await AgencyService.update(data)

      if (status === 200) {
        const _agency = movininHelper.clone(agency) as movininTypes.User
        _agency.fullName = fullName
        setAgency(_agency)
        helper.info(commonStrings.UPDATED)
      } else {
        helper.error()
      }
    } catch (err) {
      helper.error(err)
    }
  }

  const admin = helper.admin(user)

  return (
    <Layout onLoad={onLoad} strict>
      {visible && (
        <div className="update-agency">
          <Paper className="agency-form-update agency-form-wrapper" elevation={10}>
            <form onSubmit={handleSubmit}>
              <Avatar
                type={movininTypes.RecordType.Agency}
                mode="update"
                record={agency}
                size="large"
                readonly={false}
                hideDelete
                onBeforeUpload={onBeforeUpload}
                onChange={onAvatarChange}
                color="disabled"
                className="avatar-ctn"
              />

              <div className="info">
                <InfoIcon />
                <span>{ccStrings.RECOMMENDED_IMAGE_SIZE}</span>
              </div>

              <FormControl fullWidth margin="dense">
                <InputLabel className="required">{commonStrings.FULL_NAME}</InputLabel>
                <Input id="full-name" type="text" error={fullNameError} required onBlur={handleFullNameBlur} onChange={handleFullNameChange} autoComplete="off" value={fullName} />
                <FormHelperText error={fullNameError}>{(fullNameError && ccStrings.INVALID_AGENCY_NAME) || ''}</FormHelperText>
              </FormControl>

              <FormControl fullWidth margin="dense">
                <InputLabel className="required">{commonStrings.EMAIL}</InputLabel>
                <Input id="email" type="text" value={email} disabled />
              </FormControl>

              <FormControl component="fieldset" style={{ marginTop: 15 }}>
                <FormControlLabel
                  control={(
                    <Switch
                      checked={payLater}
                      onChange={(e) => {
                        setPayLater(e.target.checked)
                      }}
                      color="primary"
                    />
                  )}
                  label={commonStrings.PAY_LATER}
                />
              </FormControl>

              <div className="info">
                <InfoIcon />
                <span>{commonStrings.OPTIONAL}</span>
              </div>

              <FormControl fullWidth margin="dense">
                <InputLabel>{commonStrings.PHONE}</InputLabel>
                <Input id="phone" type="text" onChange={handlePhoneChange} onBlur={handlePhoneBlur} autoComplete="off" value={phone} error={!phoneValid} />
                <FormHelperText error={!phoneValid}>{(!phoneValid && commonStrings.PHONE_NOT_VALID) || ''}</FormHelperText>
              </FormControl>
              <FormControl fullWidth margin="dense">
                <InputLabel>{commonStrings.LOCATION}</InputLabel>
                <Input id="location" type="text" onChange={handleLocationChange} autoComplete="off" value={location} />
              </FormControl>
              <FormControl fullWidth margin="dense">
                <InputLabel>{commonStrings.BIO}</InputLabel>
                <Input id="bio" type="text" onChange={handleBioChange} autoComplete="off" value={bio} />
              </FormControl>
              {admin && (
                <FormControl fullWidth margin="dense" className="resend-activation-link">
                  <Button
                    variant="outlined"
                    onClick={handleResendActivationLink}
                  >
                    {commonStrings.RESEND_ACTIVATION_LINK}
                  </Button>
                </FormControl>
              )}
              <div className="buttons">
                <Button type="submit" variant="contained" className="btn-primary btn-margin btn-margin-bottom" size="small" onClick={() => navigate(`/change-password?u=${agency && agency._id}`)}>
                  {commonStrings.RESET_PASSWORD}
                </Button>
                <Button type="submit" variant="contained" className="btn-primary btn-margin-bottom" size="small">
                  {commonStrings.SAVE}
                </Button>
                <Button variant="contained" className="btn-secondary btn-margin-bottom" size="small" onClick={() => navigate('/agencies')}>
                  {commonStrings.CANCEL}
                </Button>
              </div>

              <div className="form-error">
                {error && <Error message={commonStrings.GENERIC_ERROR} />}
                {avatarError && <Error message={commonStrings.IMAGE_REQUIRED} />}
              </div>
            </form>
          </Paper>
        </div>
      )}
      {loading && <Backdrop text={commonStrings.PLEASE_WAIT} />}
      {noMatch && <NoMatch hideHeader />}
    </Layout>
  )
}

export default UpdateAgency
