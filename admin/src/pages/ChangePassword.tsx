import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Paper,
  Button
} from '@mui/material'
import * as movininTypes from ':movinin-types'
import Layout from '@/components/Layout'
import { strings as commonStrings } from '@/lang/common'
import { strings } from '@/lang/change-password'
import * as UserService from '@/services/UserService'
import Backdrop from '@/components/SimpleBackdrop'
import * as helper from '@/utils/helper'
import PasswordInput from '@/components/PasswordInput'
import NoMatch from '@/pages/NoMatch'

import '@/assets/css/change-password.css'

const ChangePassword = () => {
  const navigate = useNavigate()

  const [loggedUser, setLoggedUser] = useState<movininTypes.User>()
  const [userId, setUserId] = useState<string>()
  const [user, setUser] = useState<movininTypes.User | null>()
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [newPasswordError, setNewPasswordError] = useState(false)
  const [confirmPasswordError, setConfirmPasswordError] = useState(false)
  const [passwordLengthError, setPasswordLengthError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [visible, setVisible] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [currentPasswordError, setCurrentPasswordError] = useState(false)
  const [strict, setStrict] = useState<boolean>(false)
  const [noMatch, setNoMatch] = useState(false)

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value)
  }

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value)
  }

  const handleCurrentPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPassword(e.target.value)
  }

  const error = () => {
    helper.error(null, strings.PASSWORD_UPDATE_ERROR)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLElement>) => {
    try {
      e.preventDefault()

      if (!userId && !loggedUser) {
        error()
        return
      }

      const submit = async () => {
        if (newPassword.length < 6) {
          setPasswordLengthError(true)
          setConfirmPasswordError(false)
          setNewPasswordError(false)
          return
        }
        setPasswordLengthError(false)
        setNewPasswordError(false)

        if (newPassword !== confirmPassword) {
          setConfirmPasswordError(true)
          setNewPasswordError(false)
          return
        }
        setConfirmPasswordError(false)
        setNewPasswordError(false)

        const data: movininTypes.ChangePasswordPayload = {
          _id: userId || loggedUser?._id as string,
          password: currentPassword,
          newPassword,
          strict,
        }

        const status = await UserService.changePassword(data)

        if (status === 200) {
          setNewPasswordError(false)
          setCurrentPassword('')
          setNewPassword('')
          setConfirmPassword('')
          setStrict(
            (user?.type === movininTypes.UserType.Admin && loggedUser?.type === movininTypes.UserType.Admin)
            || (user?.type === movininTypes.UserType.Agency && loggedUser?.type === movininTypes.UserType.Agency)
          )
          helper.info(strings.PASSWORD_UPDATE)
        } else {
          error()
        }
      }

      if (strict) {
        const status = await UserService.checkPassword(userId || loggedUser?._id as string, currentPassword)

        setCurrentPasswordError(status !== 200)
        setNewPasswordError(false)
        setPasswordLengthError(false)
        setConfirmPasswordError(false)

        if (status === 200) {
          submit()
        }
      } else {
        submit()
      }
    } catch (err) {
      helper.error(err)
    }
  }

  const handleConfirmPasswordKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      handleSubmit(e)
    }
  }

  const onLoad = async (_loggedUser?: movininTypes.User) => {
    if (_loggedUser) {
      const params = new URLSearchParams(window.location.search)
      let _userId = _loggedUser?._id
      let __user: movininTypes.User | null = null
      if (params.has('u')) {
        _userId = params.get('u') || undefined
        setUserId(_userId)
        __user = await UserService.getUser(_userId)
      } else {
        setUserId(_loggedUser._id)
        __user = _loggedUser
      }

      if (_loggedUser.type === movininTypes.UserType.Agency
        && (__user?.type === movininTypes.UserType.Admin || (__user?.type === movininTypes.UserType.Agency && __user._id !== _loggedUser._id))
      ) {
        setNoMatch(true)
        setLoading(false)
        return
      }

      const status = await UserService.hasPassword(_userId!)
      const __hasPassword = status === 200
      setStrict(__hasPassword
        && (
          (__user?.type === movininTypes.UserType.Admin && _loggedUser.type === movininTypes.UserType.Admin)
          || (__user?.type === movininTypes.UserType.Agency && _loggedUser.type === movininTypes.UserType.Agency)
        )
      )
      setLoggedUser(_loggedUser)
      setUser(__user)
      setLoading(false)
      setVisible(true)
    }
  }

  return (
    <Layout onLoad={onLoad} strict>
      {!noMatch && (
        <div className="password-reset" style={visible ? {} : { display: 'none' }}>
          <Paper className="password-reset-form password-reset-form-wrapper" elevation={10}>
            <h1 className="password-reset-form-title">
              {' '}
              {strings.CHANGE_PASSWORD_HEADING}
              {' '}
            </h1>
            <form className="form" onSubmit={handleSubmit}>

              {strict && (
                <PasswordInput
                  label={strings.CURRENT_PASSWORD}
                  variant="standard"
                  value={currentPassword}
                  onChange={handleCurrentPasswordChange}
                  error={currentPasswordError}
                  required
                  helperText={(currentPasswordError && strings.CURRENT_PASSWORD_ERROR) || ''}
                />
              )}

              <PasswordInput
                label={strings.NEW_PASSWORD}
                variant="standard"
                value={newPassword}
                onChange={handleNewPasswordChange}
                error={newPasswordError || passwordLengthError}
                required
                helperText={(newPasswordError && strings.NEW_PASSWORD_ERROR) || (passwordLengthError && commonStrings.PASSWORD_ERROR) || ''}
              />

              <PasswordInput
                label={commonStrings.CONFIRM_PASSWORD}
                variant="standard"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                onKeyDown={handleConfirmPasswordKeyDown}
                error={confirmPasswordError}
                required
                helperText={(confirmPasswordError && commonStrings.PASSWORDS_DONT_MATCH) || ''}
              />

              <div className="buttons">
                <Button type="submit" className="btn-primary btn-margin btn-margin-bottom" size="small" variant="contained">
                  {commonStrings.RESET_PASSWORD}
                </Button>
                <Button className="btn-secondary btn-margin-bottom" size="small" variant="contained" onClick={() => navigate('/')}>
                  {commonStrings.CANCEL}
                </Button>
              </div>
            </form>
          </Paper>
        </div>)}
      {loading && <Backdrop text={commonStrings.PLEASE_WAIT} />}
      {noMatch && <NoMatch hideHeader />}
    </Layout>
  )
}

export default ChangePassword
