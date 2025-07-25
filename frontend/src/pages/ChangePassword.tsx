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
import Footer from '@/components/Footer'
import * as helper from '@/utils/helper'
import PasswordInput from '@/components/PasswordInput'

import '@/assets/css/change-password.css'

const ChangePassword = () => {
  const navigate = useNavigate()

  const [user, setUser] = useState<movininTypes.User>()
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [newPasswordError, setNewPasswordError] = useState(false)
  const [confirmPasswordError, setConfirmPasswordError] = useState(false)
  const [passwordLengthError, setPasswordLengthError] = useState(false)
  const [visible, setVisible] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [currentPasswordError, setCurrentPasswordError] = useState(false)
  const [hasPassword, setHasPassword] = useState(false)

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value)
    setConfirmPasswordError(false)
  }

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value)
    setConfirmPasswordError(false)
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

      if (!user) {
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
          _id: user._id as string,
          password: currentPassword,
          newPassword,
          strict: hasPassword,
        }

        const status = await UserService.changePassword(data)

        if (status === 200) {
          const _user = await UserService.getUser(user._id as string)

          if (_user) {
            setUser(_user)
            setNewPasswordError(false)
            setCurrentPassword('')
            setNewPassword('')
            setConfirmPassword('')
            setHasPassword(true)
            helper.info(strings.PASSWORD_UPDATE)
          } else {
            error()
          }
        } else {
          error()
        }
      }

      let status = 200
      if (hasPassword) {
        status = await UserService.checkPassword(user._id as string, currentPassword)
      }

      setCurrentPasswordError(status !== 200)
      setNewPasswordError(false)
      setPasswordLengthError(false)
      setConfirmPasswordError(false)

      if (status === 200) {
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

  const onLoad = async (_user?: movininTypes.User) => {
    setUser(_user)

    const status = await UserService.hasPassword(_user!._id!)
    setHasPassword(status === 200)

    setVisible(true)
  }

  return (
    <Layout onLoad={onLoad} strict>
      {visible && (
        <>
          <div className="password-reset">
            <Paper className="password-reset-form password-reset-form-wrapper" elevation={10}>
              <h1 className="password-reset-form-title">
                {' '}
                {strings.CHANGE_PASSWORD_HEADING}
                {' '}
              </h1>
              <form className="form" onSubmit={handleSubmit}>
                {hasPassword && (
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
                  <Button type="submit" className="btn-primary btn-margin btn-margin-bottom btn-cp" variant="contained">
                    {commonStrings.RESET_PASSWORD}
                  </Button>
                  <Button
                    className="btn-margin-bottom btn-cp"
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      navigate('/')
                    }}
                  >
                    {commonStrings.CANCEL}
                  </Button>
                </div>
              </form>
            </Paper>
          </div>

          <Footer />
        </>
      )}
    </Layout>
  )
}

export default ChangePassword
