import React, { useState, useEffect } from 'react'
import Env from '../config/env.config'
import { strings as commonStrings } from '../lang/common'
import { strings as csStrings } from '../lang/properties'
import { strings } from '../lang/booking-list'
import * as Helper from '../common/Helper'
import * as BookingService from '../services/BookingService'
import StatusList from './StatusList'
import { DataGrid, frFR, enUS, GridPaginationModel, GridColDef, GridRowId } from '@mui/x-data-grid'
import {
  Tooltip,
  IconButton,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Card,
  CardContent,
  Typography
} from '@mui/material'
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Check as CheckIcon
} from '@mui/icons-material'
import { format } from 'date-fns'
import { fr as dfnsFR, enUS as dfnsENUS } from 'date-fns/locale'
import * as movininTypes from 'movinin-types'
import * as movininHelper from 'movinin-helper'

import '../assets/css/booking-list.css'

const BookingList = (
  {
    agencies: bookingAgencies,
    statuses: bookingStatuses,
    filter: bookingFilter,
    property: bookingProperty,
    offset: bookingOffset,
    user: bookingUser,
    loggedUser: bookingLoggedUser,
    containerClassName,
    hideDates,
    hidePropertyColumn,
    hideAgencyColumn,
    language,
    loading: bookingLoading,
    checkboxSelection,
    onLoad,
  }: {
    agencies?: string[]
    statuses?: string[]
    filter?: movininTypes.Filter | null
    property?: string
    offset?: number
    user?: movininTypes.User
    loggedUser?: movininTypes.User
    containerClassName?: string
    hideDates?: boolean
    hidePropertyColumn?: boolean
    hideAgencyColumn?: boolean
    language?: string
    loading?: boolean
    checkboxSelection?: boolean
    onLoad?: movininTypes.DataEvent<movininTypes.Booking>
  }
) => {
  const [loggedUser, setLoggedUser] = useState<movininTypes.User>()
  const [user, setUser] = useState<movininTypes.User>()
  const [columns, setColumns] = useState<GridColDef<movininTypes.Booking>[]>([])
  const [rows, setRows] = useState<movininTypes.Booking[]>([])
  const [rowCount, setRowCount] = useState(0)
  const [fetch, setFetch] = useState(false)
  const [selectedId, setSelectedId] = useState('')
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [agencies, setAgencies] = useState<string[] | undefined>(bookingAgencies)
  const [statuses, setStatuses] = useState<string[] | undefined>(bookingStatuses)
  const [status, setStatus] = useState<movininTypes.BookingStatus>()
  const [filter, setFilter] = useState<movininTypes.Filter | undefined | null>(bookingFilter)
  const [property, setProperty] = useState<string>(bookingProperty || '')
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false)
  const [openDeleteDialog, setopenDeleteDialog] = useState(false)
  const [offset, setOffset] = useState(0)
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: Env.BOOKINGS_PAGE_SIZE,
    page: 0,
  })
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(Env.isMobile() ? Env.BOOKINGS_MOBILE_PAGE_SIZE : Env.BOOKINGS_PAGE_SIZE)
  const [init, setInit] = useState(true)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setPage(paginationModel.page)
    setPageSize(paginationModel.pageSize)
  }, [paginationModel])

  const _fetch = async (page: number, user?: movininTypes.User) => {
    try {
      const _pageSize = Env.isMobile() ? Env.BOOKINGS_MOBILE_PAGE_SIZE : pageSize

      if (agencies && statuses) {
        setLoading(true)

        const payload: movininTypes.GetBookingsPayload = {
          agencies,
          statuses,
          filter: filter || undefined,
          property,
          user: (user && user._id) || undefined,
          language: loggedUser?.language || Env.DEFAULT_LANGUAGE
        }

        const data = await BookingService.getBookings(
          payload,
          page,
          _pageSize,
        )

        const _data = data && data.length > 0 ? data[0] : { pageInfo: { totalRecord: 0 }, resultData: [] }
        if (!_data) {
          Helper.error()
          return
        }
        const totalRecords = Array.isArray(_data.pageInfo) && _data.pageInfo.length > 0 ? _data.pageInfo[0].totalRecords : 0

        if (Env.isMobile()) {
          const _rows = page === 0 ? _data.resultData : [...rows, ..._data.resultData]
          setRows(_rows)
          setRowCount(totalRecords)
          setFetch(_data.resultData.length > 0)
          if (onLoad) {
            onLoad({ rows: _rows, rowCount: totalRecords })
          }
        } else {
          setRows(_data.resultData)
          setRowCount(totalRecords)
          if (onLoad) {
            onLoad({ rows: _data.resultData, rowCount: totalRecords })
          }
        }
      } else {
        setRows([])
        setRowCount(0)
        if (onLoad) {
          onLoad({ rows: [], rowCount: 0 })
        }
      }
    } catch (err) {
      Helper.error(err)
    } finally {
      setLoading(false)
      setInit(false)
    }
  }

  useEffect(() => {
    setAgencies(bookingAgencies)
  }, [bookingAgencies])

  useEffect(() => {
    setStatuses(bookingStatuses)
  }, [bookingStatuses])

  useEffect(() => {
    setFilter(bookingFilter)
  }, [bookingFilter])

  useEffect(() => {
    setProperty(bookingProperty || '')
  }, [bookingProperty])

  useEffect(() => {
    setOffset(bookingOffset || 0)
  }, [bookingOffset])

  useEffect(() => {
    setUser(bookingUser)
  }, [bookingUser])

  useEffect(() => {
    if (agencies && statuses && !loading) {
      _fetch(page, user)
    }
  }, [page]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (agencies && statuses) {
      const _paginationModel = movininHelper.clone(paginationModel)
      _paginationModel.page = 0
      setPaginationModel(_paginationModel)

      _fetch(0, user)
    }
  }, [pageSize]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (agencies && statuses) {
      const columns = getColumns()
      setColumns(columns)

      const _paginationModel = movininHelper.clone(paginationModel)
      _paginationModel.page = 0
      setPaginationModel(_paginationModel)

      _fetch(0, user)
    }
  }, [agencies, statuses, filter]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const columns = getColumns()
    setColumns(columns)
  }, [selectedIds]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setLoggedUser(bookingLoggedUser || undefined)
  }, [bookingLoggedUser])

  useEffect(() => {
    if (Env.isMobile()) {
      const element: HTMLDivElement | null =
        containerClassName
          ? document.querySelector(`.${containerClassName}`)
          : document.querySelector('div.bookings')

      if (element) {
        element.onscroll = (event: Event) => {
          if (fetch && !loading) {
            const target = event.target as HTMLDivElement

            if (target.scrollTop > 0
              && target.offsetHeight + target.scrollTop + Env.INFINITE_SCROLL_OFFSET >= target.scrollHeight) {
              setLoading(true)
              setPage(page + 1)
            }
          }
        }
      }
    }
  }, [containerClassName, page, fetch, loading, offset]) // eslint-disable-line react-hooks/exhaustive-deps

  const getDate = (date: Date) => {
    const d = new Date(date)
    return `${movininHelper.formatDatePart(d.getDate())}-${movininHelper.formatDatePart(d.getMonth() + 1)}-${d.getFullYear()}`
  }

  const getColumns = () => {
    const columns = [
      {
        field: 'renter',
        headerName: strings.RENTER,
        flex: 1,
        renderCell: (params: any) =>
          <Tooltip title={params.value} placement="left">
            <Link href={`/user?u=${params.row.renter._id}`}>{params.value}</Link>
          </Tooltip>,
        valueGetter: (params: any) => params.value.fullName,
      },
      {
        field: 'from',
        headerName: commonStrings.FROM,
        flex: 1,
        valueGetter: (params: any) => getDate(params.value),
      },
      {
        field: 'to',
        headerName: commonStrings.TO,
        flex: 1,
        valueGetter: (params: any) => getDate(params.value),
      },
      {
        field: 'price',
        headerName: strings.PRICE,
        flex: 1,
        valueGetter: (params: any) => `${movininHelper.formatNumber(params.value)} ${commonStrings.CURRENCY}`,
        renderCell: (params: any) => <span className="bp">{params.value}</span>,
      },
      {
        field: 'status',
        headerName: strings.STATUS,
        flex: 1,
        renderCell: (params: any) => <span className={`bs bs-${params.value.toLowerCase()}`}>{Helper.getBookingStatus(params.value)}</span>,
        valueGetter: (params: any) => params.value,
      },
      {
        field: 'action',
        headerName: '',
        sortable: false,
        disableColumnMenu: true,
        renderCell: (params: any) => {
          const handleDelete = (e: React.MouseEvent<HTMLElement>) => {
            e.stopPropagation() // don't select this row after clicking
            setSelectedId(params.row._id)
            setopenDeleteDialog(true)
          }

          return (
            <div>
              <Tooltip title={commonStrings.UPDATE}>
                <IconButton href={`update-booking?b=${params.row._id}`}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={commonStrings.DELETE}>
                <IconButton onClick={handleDelete}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </div>
          )
        },
        renderHeader: () => {
          return selectedIds.length > 0 ? (
            <div>
              <Tooltip title={strings.UPDATE_SELECTION}>
                <IconButton
                  onClick={() => {
                    setOpenUpdateDialog(true)
                  }}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={strings.DELETE_SELECTION}>
                <IconButton
                  onClick={() => {
                    setopenDeleteDialog(true)
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </div>
          ) : (
            <></>
          )
        },
      },
    ]

    if (hideDates) {
      columns.splice(1, 2)
    }

    if (!hidePropertyColumn) {
      columns.unshift({
        field: 'property',
        headerName: strings.PROPERTY,
        flex: 1,
        renderCell: (params: any) =>
          <Tooltip title={params.value} placement="left">
            <Link href={`/property-bookings?p=${params.row.property._id}`}>{params.value}</Link>
          </Tooltip>,
        valueGetter: (params: any) => params.value.name,
      })
    }

    if (Helper.admin(loggedUser) && !hideAgencyColumn) {
      columns.unshift({
        field: 'agency',
        headerName: commonStrings.AGENCY,
        flex: 1,
        renderCell: (params: any) => (
          <Link href={`/agency?c=${params.row.agency._id}`} className="cell-agency">
            <img src={movininHelper.joinURL(Env.CDN_USERS, params.row.agency.avatar)} alt={params.value} />
          </Link>
        ),
        valueGetter: (params: any) => params.value.fullName,
      })
    }

    return columns
  }

  const handleCancelUpdate = () => {
    setOpenUpdateDialog(false)
  }

  const handleStatusChange = (status: movininTypes.BookingStatus) => {
    setStatus(status)
  }

  const handleConfirmUpdate = async () => {
    try {
      if (!status) {
        Helper.error()
        return
      }

      const data: movininTypes.UpdateStatusPayload = { ids: selectedIds, status }

      const _status = await BookingService.updateStatus(data)

      if (_status === 200) {
        rows.forEach((row: movininTypes.Booking) => {
          if (row._id && selectedIds.includes(row._id)) {
            row.status = status
          }
        })
        setRows(movininHelper.clone(rows))
      } else {
        Helper.error()
      }

      setOpenUpdateDialog(false)
    } catch (err) {
      Helper.error(err)
    }
  }

  const handleDelete = (e: React.MouseEvent<HTMLElement>) => {
    const selectedId = e.currentTarget.getAttribute('data-id') as string
    const selectedIndex = Number(e.currentTarget.getAttribute('data-index') as string)

    setSelectedId(selectedId)
    setSelectedIndex(selectedIndex)
    setopenDeleteDialog(true)
    setSelectedId(selectedId)
    setSelectedIndex(selectedIndex)
  }

  const handleCancelDelete = () => {
    setopenDeleteDialog(false)
    setSelectedId('')
  }

  const handleConfirmDelete = async () => {
    try {
      if (Env.isMobile()) {
        const ids = [selectedId]

        const status = await BookingService.deleteBookings(ids)

        if (status === 200) {
          rows.splice(selectedIndex, 1)
          setRows(rows)
          setSelectedId('')
          setSelectedIndex(-1)
        } else {
          Helper.error()
        }

        setopenDeleteDialog(false)
      } else {
        const ids = selectedIds.length > 0 ? selectedIds : [selectedId]

        const status = await BookingService.deleteBookings(ids)

        if (status === 200) {
          if (selectedIds.length > 0) {
            setRows(rows.filter((row) => row._id && !selectedIds.includes(row._id)))
          } else {
            setRows(rows.filter((row) => row._id !== selectedId))
          }
        } else {
          Helper.error()
        }

        setopenDeleteDialog(false)
      }
    } catch (err) {
      Helper.error(err)
    }
  }

  const _fr = language === 'fr'
  const _locale = _fr ? dfnsFR : dfnsENUS
  const _format = _fr ? 'eee d LLL kk:mm' : 'eee, d LLL, kk:mm'
  const bookingDetailHeight = Env.AGENCY_IMAGE_HEIGHT + 10

  return (
    <div className="bs-list">
      {loggedUser &&
        (rows.length === 0 ? (
          !loading &&
          !init &&
          !bookingLoading &&
          <Card variant="outlined" className="empty-list">
            <CardContent>
              <Typography color="textSecondary">{strings.EMPTY_LIST}</Typography>
            </CardContent>
          </Card>
        ) : Env.isMobile() ? (
          <>
            {rows.map((booking, index) => {
              const from = new Date(booking.from)
              const to = new Date(booking.to)

              return (
                <div key={booking._id} className="booking-details">
                  <div className={`bs bs-${booking.status.toLowerCase()}`}>
                    <label>{Helper.getBookingStatus(booking.status)}</label>
                  </div>
                  <div className="booking-detail" style={{ height: bookingDetailHeight }}>
                    <label className="booking-detail-title">{strings.PROPERTY}</label>
                    <div className="booking-detail-value">
                      <Link href={`property/?p=${(booking.property as movininTypes.Property)._id}`}>{(booking.property as movininTypes.Property).name}</Link>
                    </div>
                  </div>
                  <div className="booking-detail" style={{ height: bookingDetailHeight }}>
                    <label className="booking-detail-title">{strings.RENTER}</label>
                    <div className="booking-detail-value">
                      <Link href={`user/?u=${(booking.renter as movininTypes.User)._id}`}>{(booking.renter as movininTypes.User).fullName}</Link>
                    </div>
                  </div>
                  <div className="booking-detail" style={{ height: bookingDetailHeight }}>
                    <label className="booking-detail-title">{strings.DAYS}</label>
                    <div className="booking-detail-value">{`${Helper.getDaysShort(movininHelper.days(from, to))} (${movininHelper.capitalize(
                      format(from, _format, { locale: _locale }),
                    )} - ${movininHelper.capitalize(format(to, _format, { locale: _locale }))})`}</div>
                  </div>
                  <div className="booking-detail" style={{ height: bookingDetailHeight }}>
                    <label className="booking-detail-title">{commonStrings.LOCATION}</label>
                    <div className="booking-detail-value">{((booking.property as movininTypes.Property).location as movininTypes.Location).name}</div>
                  </div>
                  <div className="booking-detail" style={{ height: bookingDetailHeight }}>
                    <label className="booking-detail-title">{commonStrings.AGENCY}</label>
                    <div className="booking-detail-value">
                      <div className="property-agency">
                        <img src={movininHelper.joinURL(Env.CDN_USERS, (booking.agency as movininTypes.User).avatar)} alt={(booking.agency as movininTypes.User).fullName} />
                        <label className="property-agency-name">{(booking.agency as movininTypes.User).fullName}</label>
                      </div>
                    </div>
                  </div>

                  {booking.cancellation && (
                    <>
                      <div className="extras">
                        <label className="extras-title">{commonStrings.OPTIONS}</label>
                        {booking.cancellation && (
                          <div className="extra">
                            <CheckIcon className="extra-icon" />
                            <label className="extra-title">{csStrings.CANCELLATION}</label>
                            <label className="extra-text">{Helper.getCancellationOption((booking.property as movininTypes.Property).cancellation, _fr, true)}</label>
                          </div>
                        )}

                      </div>
                    </>
                  )}

                  <div className="booking-detail" style={{ height: bookingDetailHeight }}>
                    <label className="booking-detail-title">{strings.COST}</label>
                    <div className="booking-detail-value booking-price">{`${movininHelper.formatNumber(booking.price)} ${commonStrings.CURRENCY}`}</div>
                  </div>

                  <div className="bs-buttons">
                    <Button
                      variant="contained"
                      className="btn-primary"
                      size="small"
                      href={`update-booking?b=${booking._id}`}>
                      {commonStrings.UPDATE}
                    </Button>
                    <Button
                      variant="contained"
                      className="btn-secondary"
                      size="small"
                      data-id={booking._id}
                      data-index={index}
                      onClick={handleDelete}>
                      {commonStrings.DELETE}
                    </Button>
                  </div>
                </div>
              )
            })}
          </>
        ) : (
          <DataGrid
            checkboxSelection={checkboxSelection}
            getRowId={(row: movininTypes.Booking): GridRowId => row._id as GridRowId}
            columns={columns}
            rows={rows}
            rowCount={rowCount}
            loading={loading}
            initialState={{
              pagination: {
                paginationModel: { pageSize: Env.BOOKINGS_PAGE_SIZE },
              },
            }}
            pageSizeOptions={[Env.BOOKINGS_PAGE_SIZE, 50, 100]}
            pagination
            paginationMode="server"
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            localeText={(loggedUser.language === 'fr' ? frFR : enUS).components.MuiDataGrid.defaultProps.localeText}
            onRowSelectionModelChange={(selectedIds) => {
              setSelectedIds(Array.from(new Set(selectedIds)).map(id => id.toString()))
            }}
            disableRowSelectionOnClick
          />
        ))}
      <Dialog disableEscapeKeyDown maxWidth="xs" open={openUpdateDialog}>
        <DialogTitle className="dialog-header">{strings.UPDATE_STATUS}</DialogTitle>
        <DialogContent className="bs-update-status">
          <StatusList label={strings.NEW_STATUS} onChange={handleStatusChange} />
        </DialogContent>
        <DialogActions className="dialog-actions">
          <Button onClick={handleCancelUpdate} variant="contained" className="btn-secondary">
            {commonStrings.CANCEL}
          </Button>
          <Button onClick={handleConfirmUpdate} variant="contained" className="btn-primary">
            {commonStrings.UPDATE}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog disableEscapeKeyDown maxWidth="xs" open={openDeleteDialog}>
        <DialogTitle className="dialog-header">{commonStrings.CONFIRM_TITLE}</DialogTitle>
        <DialogContent className="dialog-content">{selectedIds.length === 0 ? strings.DELETE_BOOKING : strings.DELETE_BOOKINGS}</DialogContent>
        <DialogActions className="dialog-actions">
          <Button onClick={handleCancelDelete} variant="contained" className="btn-secondary">
            {commonStrings.CANCEL}
          </Button>
          <Button onClick={handleConfirmDelete} variant="contained" color="error">
            {commonStrings.DELETE}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default BookingList
