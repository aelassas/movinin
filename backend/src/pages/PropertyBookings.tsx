import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  IconButton,
} from '@mui/material'
import {
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material'
import * as movininTypes from 'movinin-types'
import * as movininHelper from 'movinin-helper'
import Master from '../components/Master'
import env from '../config/env.config'
import { strings as commonStrings } from '../lang/common'
import { strings } from '../lang/properties'
import * as PropertyService from '../services/PropertyService'
import * as AgencyService from '../services/AgencyService'
import Backdrop from '../components/SimpleBackdrop'
import NoMatch from './NoMatch'
import Error from './Error'
import BookingList from '../components/BookingList'
import * as helper from '../common/helper'
import PropertyInfo from '../components/PropertyInfo'

import '../assets/css/property-bookings.css'
import AgencyBadge from '../components/AgencyBadge'

const PropertyBookings = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState<movininTypes.User>()
  const [property, setProperty] = useState<movininTypes.Property>()
  const [error, setError] = useState(false)
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [noMatch, setNoMatch] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [agencies, setAgencies] = useState<string[]>([])
  const [offset, setOffset] = useState(0)
  const [openInfoDialog, setOpenInfoDialog] = useState(false)

  const statuses = helper.getBookingStatuses().map((status) => status.value)

  useEffect(() => {
    if (visible) {
      const col1 = document.querySelector('.col-1')
      if (col1) {
        setOffset(col1.clientHeight)
      }
    }
  }, [visible])

  const handleDelete = async () => {
    try {
      if (property) {
        const status = await PropertyService.check(property._id)

        if (status === 200) {
          setOpenInfoDialog(true)
        } else if (status === 204) {
          setOpenDeleteDialog(true)
        } else {
          helper.error()
        }
      }
    } catch (err) {
      helper.error(err)
    }
  }

  const onLoad = async (_user?: movininTypes.User) => {
    setLoading(true)
    setUser(_user)

    const params = new URLSearchParams(window.location.search)
    if (_user && _user.verified && params.has('p')) {
      const id = params.get('p')
      if (id && id !== '') {
        try {
          const _property = await PropertyService.getProperty(id)

          if (_property) {
            if (_user.type === movininTypes.RecordType.Admin) {
              try {
                const _agencies = await AgencyService.getAllAgencies()
                const agencyIds = movininHelper.flattenAgencies(_agencies)
                setAgencies(agencyIds)
                setProperty(_property)
                setVisible(true)
                setLoading(false)
              } catch (err) {
                helper.error(err)
              }
            } else if (_property.agency._id === _user._id) {
              setAgencies([_user._id as string])
              setProperty(_property)
              setVisible(true)
              setLoading(false)
            } else {
              setLoading(false)
              setNoMatch(true)
            }
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

  return (
    <Master onLoad={onLoad} strict>
      {visible && property && property.agency && (
        <div className="property">
          <div className="col-1">
            <section className="property-sec">
              <div className="property-img">
                <img alt="" src={movininHelper.joinURL(env.CDN_PROPERTIES, property.image)} />
              </div>
              <div className="agency">
                <AgencyBadge agency={property.agency} />
              </div>
              <div className="name"><h2>{property.name}</h2></div>
              <div className="price">
                {helper.priceLabel(property)}
              </div>
              <PropertyInfo
                property={property}
                user={user}
                description
              />
            </section>

            <div className="action">
              <Tooltip title={strings.VIEW_PROPERTY}>
                <IconButton href={`/property?p=${property._id}`}>
                  <ViewIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={commonStrings.UPDATE}>
                <IconButton href={`/update-property?p=${property._id}`}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={commonStrings.DELETE}>
                <IconButton onClick={handleDelete}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </div>

          </div>
          <div className="col-2">
            <BookingList
              containerClassName="property"
              offset={offset}
              loggedUser={user}
              agencies={agencies}
              statuses={statuses}
              property={property._id}
              hideAgencyColumn
              hidePropertyColumn
              hideDates={env.isMobile()}
              checkboxSelection={!env.isMobile()}
            />
          </div>

          <Dialog disableEscapeKeyDown maxWidth="xs" open={openInfoDialog}>
            <DialogTitle className="dialog-header">{commonStrings.INFO}</DialogTitle>
            <DialogContent>{strings.CANNOT_DELETE_PROPERTY}</DialogContent>
            <DialogActions className="dialog-actions">
              <Button onClick={() => setOpenInfoDialog(false)} variant="contained" className="btn-secondary">
                {commonStrings.CLOSE}
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog disableEscapeKeyDown maxWidth="xs" open={openDeleteDialog}>
            <DialogTitle className="dialog-header">{commonStrings.CONFIRM_TITLE}</DialogTitle>
            <DialogContent>{strings.DELETE_PROPERTY}</DialogContent>
            <DialogActions className="dialog-actions">
              <Button onClick={() => setOpenDeleteDialog(false)} variant="contained" className="btn-secondary">
                {commonStrings.CANCEL}
              </Button>
              <Button
                onClick={async () => {
                try {
                  setOpenDeleteDialog(false)

                  const status = await PropertyService.deleteProperty(property._id)

                  if (status === 200) {
                    navigate('/properties')
                  } else {
                    helper.error()
                  }
                } catch (err) {
                  helper.error(err)
                }
              }}
                variant="contained"
                color="error"
              >
                {commonStrings.DELETE}
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}

      {loading && <Backdrop text={commonStrings.PLEASE_WAIT} />}
      {error && <Error />}
      {noMatch && <NoMatch hideHeader />}
    </Master>
  )
}

export default PropertyBookings
