import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  Link
} from '@mui/material'
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material'
import * as movininTypes from ':movinin-types'
import * as movininHelper from ':movinin-helper'
import env from '@/config/env.config'
import { strings as commonStrings } from '@/lang/common'
import { strings as clStrings } from '@/lang/agency-list'
import * as AgencyService from '@/services/AgencyService'
import * as helper from '@/common/helper'
import Layout from '@/components/Layout'
import Backdrop from '@/components/SimpleBackdrop'
import Avatar from '@/components/Avatar'
import PropertyList from '@/components/PropertyList'
import InfoBox from '@/components/InfoBox'
import Error from './Error'
import NoMatch from './NoMatch'

import '@/assets/css/agency.css'

const Agency = () => {
  const navigate = useNavigate()

  const [user, setUser] = useState<movininTypes.User>()
  const [agency, setAgency] = useState<movininTypes.User>()
  const [agencies, setAgencies] = useState<string[]>()
  const [error, setError] = useState(false)
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(true)
  const [noMatch, setNoMatch] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [rowCount, setRowCount] = useState(-1)

  const onBeforeUpload = () => {
    setLoading(true)
  }

  const onAvatarChange = (avatar: string) => {
    if (user && agency && user._id === agency._id) {
      const _user = movininHelper.clone(user)
      _user.avatar = avatar

      setUser(_user)
    }

    setLoading(false)
  }

  const handleDelete = () => {
    setOpenDeleteDialog(true)
  }

  const handleConfirmDelete = async () => {
    if (agency) {
      try {
        setOpenDeleteDialog(false)

        const status = await AgencyService.deleteAgency(agency._id as string)

        if (status === 200) {
          navigate('/agencies')
        } else {
          helper.error()
        }
      } catch (err) {
        helper.error(err)
      }
    } else {
      helper.error()
    }
  }

  const handleCancelDelete = () => {
    setOpenDeleteDialog(false)
  }

  const handlePropertyListLoad: movininTypes.DataEvent<movininTypes.Property> = (data) => {
    if (data) {
      setRowCount(data.rowCount)
    }
  }

  const handlePropertyDelete = (_rowCount: number) => {
    setRowCount(_rowCount)
  }

  const onLoad = async (_user?: movininTypes.User) => {
    setUser(_user)

    if (_user && _user.verified) {
      const params = new URLSearchParams(window.location.search)
      if (params.has('c')) {
        const id = params.get('c')
        if (id && id !== '') {
          try {
            const _agency = await AgencyService.getAgency(id)

            if (_agency) {
              setAgency(_agency)
              setAgencies([_agency._id as string])
              setVisible(true)
              setLoading(false)
            } else {
              setLoading(false)
              setNoMatch(true)
            }
          } catch {
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

  const edit = user && agency && (user.type === movininTypes.RecordType.Admin || user._id === agency._id)

  return (
    <Layout onLoad={onLoad} strict>
      {visible && agency && agencies && (
        <div className="agency">
          <div className="col-1">
            <section className="agency-avatar-sec">
              {edit ? (
                <Avatar
                  record={agency}
                  type={movininTypes.RecordType.Agency}
                  mode="update"
                  size="large"
                  hideDelete
                  onBeforeUpload={onBeforeUpload}
                  onChange={onAvatarChange}
                  readonly={!edit}
                  color="disabled"
                  className="agency-avatar"
                />
              ) : (
                <div className="property-agency">
                  <span className="property-agency-logo">
                    <img src={movininHelper.joinURL(env.CDN_USERS, agency.avatar)} alt={agency.fullName} style={{ width: env.AGENCY_IMAGE_WIDTH }} />
                  </span>
                  <span className="property-agency-info">{agency.fullName}</span>
                </div>
              )}
            </section>
            {edit && (
              <Typography variant="h4" className="agency-name">
                {agency.fullName}
              </Typography>
            )}
            {agency.bio && (
              helper.isValidURL(agency.bio)
                ? (<Link href={agency.bio} target="_blank" rel="noreferrer" className="agency-bio-link">{agency.bio}</Link>) : (
                  <Typography variant="h6" className="agency-info">
                    {agency.bio}
                  </Typography>
                )
            )}
            {agency.location && agency.location !== '' && (
              <Typography variant="h6" className="agency-info">
                {agency.location}
              </Typography>
            )}
            {agency.phone && agency.phone !== '' && (
              <Typography variant="h6" className="agency-info">
                {agency.phone}
              </Typography>
            )}
            <div className="agency-actions">
              {edit && (
                <Tooltip title={commonStrings.UPDATE}>
                  <IconButton onClick={() => navigate(`/update-agency?c=${agency._id}`)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              )}
              {edit && (
                <Tooltip title={commonStrings.DELETE}>
                  <IconButton data-id={agency._id} onClick={handleDelete}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              )}
            </div>
            {rowCount > 0 && <InfoBox value={`${rowCount} ${rowCount > 1 ? commonStrings.PROPERTIES : commonStrings.PROPERTY}`} className="property-count" />}
          </div>
          <div className="col-2">
            <PropertyList
              user={user}
              types={movininHelper.getAllPropertyTypes()}
              rentalTerms={movininHelper.getAllRentalTerms()}
              availability={[movininTypes.Availablity.Available, movininTypes.Availablity.Unavailable]}
              agencies={agencies}
              keyword=""
              reload={false}
              language={user?.language || env.DEFAULT_LANGUAGE}
              hideAgency
              onLoad={handlePropertyListLoad}
              onDelete={handlePropertyDelete}
            />
          </div>
        </div>
      )}
      <Dialog disableEscapeKeyDown maxWidth="xs" open={openDeleteDialog}>
        <DialogTitle className="dialog-header">{commonStrings.CONFIRM_TITLE}</DialogTitle>
        <DialogContent>{clStrings.DELETE_AGENCY}</DialogContent>
        <DialogActions className="dialog-actions">
          <Button onClick={handleCancelDelete} variant="contained" className="btn-secondary">
            {commonStrings.CANCEL}
          </Button>
          <Button onClick={handleConfirmDelete} variant="contained" color="error">
            {commonStrings.DELETE}
          </Button>
        </DialogActions>
      </Dialog>
      {loading && <Backdrop text={commonStrings.LOADING} />}
      {error && <Error />}
      {noMatch && <NoMatch hideHeader />}
    </Layout>
  )
}

export default Agency
