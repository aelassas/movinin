import React, { useState, useEffect } from 'react'
import {
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  Card,
  CardContent,
  Typography
} from '@mui/material'
import {
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Bookmarks as BookingsIcon
} from '@mui/icons-material'
import * as movininTypes from 'movinin-types'
import * as movininHelper from 'movinin-helper'
import env from '../config/env.config'
import Const from '../config/const'
import { strings as commonStrings } from '../lang/common'
import { strings } from '../lang/properties'
import * as helper from '../common/helper'
import * as PropertyService from '../services/PropertyService'
import Pager from './Pager'
import PropertyInfo from './PropertyInfo'
import AgencyBadge from './AgencyBadge'

import '../assets/css/property-list.css'

interface PropertyListProps {
  agencies?: string[]
  keyword?: string
  types?: movininTypes.PropertyType[]
  rentalTerms?: movininTypes.RentalTerm[]
  availability?: movininTypes.Availablity[]
  reload?: boolean
  properties?: movininTypes.Property[]
  user?: movininTypes.User
  booking?: movininTypes.Booking
  className?: string
  loading?: boolean
  hideAgency?: boolean
  hidePrice?: boolean
  language: string
  onLoad?: movininTypes.DataEvent<movininTypes.Property>
  onDelete?: (rowCount: number) => void
}

const PropertyList = ({
  agencies,
  keyword,
  types,
  rentalTerms,
  availability,
  reload,
  properties,
  user: propertyListUser,
  booking,
  className,
  loading: propertyListLoading,
  hideAgency,
  hidePrice,
  language,
  onLoad,
  onDelete
}: PropertyListProps) => {
  const [user, setUser] = useState<movininTypes.User>()
  const [init, setInit] = useState(true)
  const [loading, setLoading] = useState(false)
  const [fetch, setFetch] = useState(false)
  const [rows, setRows] = useState<movininTypes.Property[]>([])
  const [page, setPage] = useState(1)
  const [rowCount, setRowCount] = useState(0)
  const [totalRecords, setTotalRecords] = useState(0)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [propertyId, setPropertyId] = useState('')
  const [propertyIndex, setPropertyIndex] = useState(-1)
  const [openInfoDialog, setOpenInfoDialog] = useState(false)

  useEffect(() => {
    if (env.PAGINATION_MODE === Const.PAGINATION_MODE.INFINITE_SCROLL || env.isMobile()) {
      const element = document.querySelector('body')

      if (element) {
        element.onscroll = () => {
          if (fetch
            && !loading
            && window.scrollY > 0
            && window.scrollY + window.innerHeight + env.INFINITE_SCROLL_OFFSET >= document.body.scrollHeight) {
            setLoading(true)
            setPage(page + 1)
          }
        }
      }
    }
  }, [fetch, loading, page])

  const fetchData = async (_page: number) => {
    try {
      setLoading(true)
      const payload: movininTypes.GetPropertiesPayload = {
        agencies: agencies ?? [],
        types,
        rentalTerms,
        availability,
        language
      }

      const data = await PropertyService.getProperties(keyword || '', payload, _page, env.PROPERTIES_PAGE_SIZE)

      const _data = data && data.length > 0 ? data[0] : { pageInfo: { totalRecord: 0 }, resultData: [] }
      if (!_data) {
        helper.error()
        return
      }
      const _totalRecords = Array.isArray(_data.pageInfo) && _data.pageInfo.length > 0 ? _data.pageInfo[0].totalRecords : 0

      let _rows = []
      if (env.PAGINATION_MODE === Const.PAGINATION_MODE.INFINITE_SCROLL || env.isMobile()) {
        _rows = _page === 1 ? _data.resultData : [...rows, ..._data.resultData]
      } else {
        _rows = _data.resultData
      }

      setRows(_rows)
      setRowCount((_page - 1) * env.PROPERTIES_PAGE_SIZE + _rows.length)
      setTotalRecords(_totalRecords)
      setFetch(_data.resultData.length > 0)

      if (((env.PAGINATION_MODE === Const.PAGINATION_MODE.INFINITE_SCROLL || env.isMobile()) && _page === 1) || (env.PAGINATION_MODE === Const.PAGINATION_MODE.CLASSIC && !env.isMobile())) {
        window.scrollTo(0, 0)
      }

      if (onLoad) {
        onLoad({ rows: _data.resultData, rowCount: _totalRecords })
      }
    } catch (err) {
      helper.error(err)
    } finally {
      setLoading(false)
      setInit(false)
    }
  }

  useEffect(() => {
    if (agencies) {
      if (agencies.length > 0) {
        fetchData(page)
      } else {
        setRows([])
        setRowCount(0)
        setFetch(false)
        if (onLoad) {
          onLoad({ rows: [], rowCount: 0 })
        }
        setInit(false)
      }
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    page,
    agencies,
    keyword,
    availability,
    types,
    rentalTerms
  ])

  useEffect(() => {
    if (properties) {
      setRows(properties)
      setRowCount(properties.length)
      setFetch(false)
      if (onLoad) {
        onLoad({ rows: properties, rowCount: properties.length })
      }
      // setLoading(false)
    }
  }, [properties]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setPage(1)
  }, [
    agencies,
    keyword,
    types,
    rentalTerms,
    availability
  ])

  useEffect(() => {
    if (reload) {
      setPage(1)
      fetchData(1)
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    reload,
    agencies,
    keyword,
    types,
    rentalTerms,
    availability
  ])

  useEffect(() => {
    setUser(propertyListUser)
  }, [propertyListUser])

  const handleDelete = async (e: React.MouseEvent<HTMLElement>) => {
    try {
      const _propertyId = e.currentTarget.getAttribute('data-id') as string
      const _propertyIndex = Number(e.currentTarget.getAttribute('data-index') as string)

      const status = await PropertyService.check(_propertyId)

      if (status === 200) {
        setOpenInfoDialog(true)
      } else if (status === 204) {
        setOpenDeleteDialog(true)
        setPropertyId(_propertyId)
        setPropertyIndex(_propertyIndex)
      } else {
        helper.error()
      }
    } catch (err) {
      helper.error(err)
    }
  }

  const handleCloseInfo = () => {
    setOpenInfoDialog(false)
  }

  const handleConfirmDelete = async () => {
    try {
      if (propertyId !== '' && propertyIndex > -1) {
        setOpenDeleteDialog(false)

        const status = await PropertyService.deleteProperty(propertyId)

        if (status === 200) {
          const _rowCount = rowCount - 1
          rows.splice(propertyIndex, 1)
          setRows(rows)
          setRowCount(_rowCount)
          setTotalRecords(totalRecords - 1)
          setPropertyId('')
          setPropertyIndex(-1)
          if (onDelete) {
            onDelete(_rowCount)
          }
          setLoading(false)
        } else {
          helper.error()
          setPropertyId('')
          setPropertyIndex(-1)
          setLoading(false)
        }
      } else {
        helper.error()
        setPropertyId('')
        setPropertyIndex(-1)
        setOpenDeleteDialog(false)
      }
    } catch (err) {
      helper.error(err)
    }
  }

  const handleCancelDelete = () => {
    setOpenDeleteDialog(false)
    setPropertyId('')
  }

  const admin = helper.admin(user)

  return (
    (user && (
      <>
        <section className={`${className ? `${className} ` : ''}property-list`}>
          {rows.length === 0
            ? !init
            && !loading
            && !propertyListLoading && (
              <Card variant="outlined" className="empty-list">
                <CardContent>
                  <Typography color="textSecondary">{strings.EMPTY_LIST}</Typography>
                </CardContent>
              </Card>
            )
            : rows.map((property, index) => {
              const edit = admin || property.agency._id === user._id
              return (
                <article key={property._id}>

                  <div className="left-panel">
                    <img
                      src={movininHelper.joinURL(env.CDN_PROPERTIES, property.image)}
                      alt={property.name}
                      className="property-img"
                    />
                    {!hideAgency && <AgencyBadge agency={property.agency} />}
                  </div>

                  <div className="middle-panel">
                    <div className="name">
                      <h2>{property.name}</h2>
                    </div>

                    <PropertyInfo
                      property={property}
                      user={user}
                      booking={booking}
                      className="property-info"
                      description
                    />
                  </div>

                  <div className="right-panel">
                    {!hidePrice && (
                      <div className="price">
                        {helper.priceLabel(property)}
                      </div>
                    )}

                    <div className="action">
                      <Tooltip title={strings.VIEW_PROPERTY}>
                        <IconButton href={`/property?p=${property._id}`}>
                          <ViewIcon />
                        </IconButton>
                      </Tooltip>
                      {edit && (
                        <>
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
                            <IconButton data-id={property._id} data-index={index} onClick={handleDelete}>
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </>
                      )}
                    </div>
                  </div>

                </article>
              )
            })}
          <Dialog disableEscapeKeyDown maxWidth="xs" open={openInfoDialog}>
            <DialogTitle className="dialog-header">{commonStrings.INFO}</DialogTitle>
            <DialogContent>{strings.CANNOT_DELETE_PROPERTY}</DialogContent>
            <DialogActions className="dialog-actions">
              <Button onClick={handleCloseInfo} variant="contained" className="btn-secondary">
                {commonStrings.CLOSE}
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog disableEscapeKeyDown maxWidth="xs" open={openDeleteDialog}>
            <DialogTitle className="dialog-header">{commonStrings.CONFIRM_TITLE}</DialogTitle>
            <DialogContent>{strings.DELETE_PROPERTY}</DialogContent>
            <DialogActions className="dialog-actions">
              <Button onClick={handleCancelDelete} variant="contained" className="btn-secondary">
                {commonStrings.CANCEL}
              </Button>
              <Button onClick={handleConfirmDelete} variant="contained" color="error">
                {commonStrings.DELETE}
              </Button>
            </DialogActions>
          </Dialog>
        </section>
        {env.PAGINATION_MODE === Const.PAGINATION_MODE.CLASSIC && !env.isMobile() && (
          <Pager
            page={page}
            pageSize={env.PROPERTIES_PAGE_SIZE}
            rowCount={rowCount}
            totalRecords={totalRecords}
            onNext={() => setPage(page + 1)}
            onPrevious={() => setPage(page - 1)}
          />
        )}
      </>
    )) || <></>
  )
}

export default PropertyList
