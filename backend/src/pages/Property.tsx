import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip
} from '@mui/material'
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Bookmarks as BookingsIcon
} from '@mui/icons-material'
import * as movininTypes from 'movinin-types'
import * as movininHelper from 'movinin-helper'
import Backdrop from '../components/SimpleBackdrop'
import Master from '../components/Master'
import env from '../config/env.config'
import { strings as commonStrings } from '../lang/common'
import { strings } from '../lang/properties'
import * as PropertyService from '../services/PropertyService'
import * as helper from '../common/helper'
import PropertyInfo from '../components/PropertyInfo'
import NoMatch from './NoMatch'
import ImageViewer from '../components/ImageViewer'
import AgencyBadge from '../components/AgencyBadge'

import '../assets/css/property.css'

const Property = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState<movininTypes.User>()
  const [loading, setLoading] = useState(false)
  const [noMatch, setNoMatch] = useState(false)
  const [property, setProperty] = useState<movininTypes.Property>()
  const [image, setImage] = useState('')
  const [images, setImages] = useState<string[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [openImageDialog, setOpenImageDialog] = useState(false)

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [openInfoDialog, setOpenInfoDialog] = useState(false)
  const edit = helper.admin(user) || (user?._id === property?.agency._id)

  useEffect(() => {
    const src = (img: string) => movininHelper.joinURL(env.CDN_PROPERTIES, img)

    if (property) {
      const _image = src(property.image)
      setImage(_image)
      const _images = property.images ? property.images.map(src) : []
      const __images = [_image, ..._images]
      setImages(__images)
    }
  }, [property])

  const onLoad = async (_user?: movininTypes.User) => {
    if (_user && _user.verified) {
      setLoading(true)
      setUser(_user)

      const params = new URLSearchParams(window.location.search)
      if (params.has('p')) {
        const id = params.get('p')
        if (id && id !== '') {
          try {
            const _property = await PropertyService.getProperty(id)

            if (_property) {
              setProperty(_property)
              setLoading(false)
            } else {
              setLoading(false)
              setNoMatch(true)
            }
          } catch (err) {
            helper.error(err)
            setLoading(false)
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

  return (
    <Master onLoad={onLoad} strict>
      {
        property
        && (
          <>
            <div className="main">
              <div className="property">
                <div className="images-container">
                  {/* Main image */}
                  <div className="main-image">
                    <img
                      className="main-image"
                      alt=""
                      src={image}
                      onClick={() => setOpenImageDialog(true)}
                    />
                  </div>

                  {/* Additional images */}
                  <div className="images">
                    {
                      images.map((_image, index) => (
                        <div
                          key={_image}
                          className={`image${currentIndex === index ? ' selected' : ''}`}
                          onClick={() => {
                            setCurrentIndex(index)
                            setImage(_image)
                          }}
                          role="button"
                          tabIndex={0}
                          aria-label="image"
                        >
                          <img alt="" className="image" src={_image} />
                        </div>
                      ))
                    }
                  </div>
                </div>

                {/* Property info */}
                <div className="right-panel">
                  <div className="right-panel-header">
                    <div className="name"><h2>{property.name}</h2></div>
                    <div className="price">{helper.priceLabel(property)}</div>
                  </div>
                  <PropertyInfo
                    property={property}
                    user={user}
                  />
                </div>
              </div>

              {/* Property description */}
              <div className="description">
                <div dangerouslySetInnerHTML={{ __html: property.description }} />
              </div>

              <div className="footer">
                <AgencyBadge agency={property.agency} />
                {edit && (
                  <div className="action">
                    <Tooltip title={strings.VIEW_BOOKINGS}>
                      <IconButton href={`/property-bookings?p=${property._id}`}>
                        <BookingsIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={commonStrings.UPDATE}>
                      <IconButton href={`/update-property?p=${property._id}`}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={commonStrings.DELETE}>
                      <IconButton
                        onClick={async () => {
                          try {
                            const status = await PropertyService.check(property._id)

                            if (status === 200) {
                              setOpenInfoDialog(true)
                            } else if (status === 204) {
                              setOpenDeleteDialog(true)
                            } else {
                              helper.error()
                            }
                          } catch (err) {
                            helper.error(err)
                          }
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                )}
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

            {
              openImageDialog
              && (
                <ImageViewer
                  src={images}
                  currentIndex={currentIndex}
                  closeOnClickOutside
                  title={property.name}
                  onClose={() => {
                    setOpenImageDialog(false)
                  }}
                />
              )
            }
          </>
        )
      }

      {loading && <Backdrop text={commonStrings.PLEASE_WAIT} />}
      {noMatch && <NoMatch hideHeader />}
    </Master>
  )
}

export default Property
