import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  DataGrid,
  GridPaginationModel,
  GridColDef,
  GridRowId,
  GridRenderCellParams
} from '@mui/x-data-grid'
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
import * as movininTypes from ':movinin-types'
import * as movininHelper from ':movinin-helper'
import env from '@/config/env.config'
import { strings as commonStrings } from '@/lang/common'
import { strings as csStrings } from '@/lang/properties'
import { strings } from '@/lang/booking-list'
import * as helper from '@/common/helper'
import * as BookingService from '@/services/BookingService'
import StatusList from './StatusList'
import BookingStatus from './BookingStatus'

import '@/assets/css/booking-list.css'

interface BookingListProps {
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

const BookingList = ({
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
}: BookingListProps) => {
  const navigate = useNavigate()

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
    pageSize: env.BOOKINGS_PAGE_SIZE,
    page: 0,
  })
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(env.isMobile ? env.BOOKINGS_MOBILE_PAGE_SIZE : env.BOOKINGS_PAGE_SIZE)
  const [init, setInit] = useState(true)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!env.isMobile) {
      setPage(paginationModel.page)
      setPageSize(paginationModel.pageSize)
    }
  }, [paginationModel])

  const fetchData = async (_page: number, _user?: movininTypes.User) => {
    try {
      const _pageSize = env.isMobile ? env.BOOKINGS_MOBILE_PAGE_SIZE : pageSize

      if (agencies && statuses) {
        setLoading(true)

        const payload: movininTypes.GetBookingsPayload = {
          agencies,
          statuses,
          filter: filter || undefined,
          property,
          user: (_user && _user._id) || undefined,
        }

        const data = await BookingService.getBookings(
          payload,
          _page + 1,
          _pageSize,
        )

        const _data = data && data.length > 0 ? data[0] : { pageInfo: { totalRecord: 0 }, resultData: [] }
        if (!_data) {
          helper.error()
          return
        }
        const totalRecords = Array.isArray(_data.pageInfo) && _data.pageInfo.length > 0 ? _data.pageInfo[0].totalRecords : 0

        if (env.isMobile) {
          const _rows = _page === 0 ? _data.resultData : [...rows, ..._data.resultData]
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
      helper.error(err)
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
    if (agencies && statuses && loggedUser) {
      fetchData(page, user)
    }
  }, [page]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (agencies && statuses && loggedUser) {
      if (page === 0) {
        fetchData(0, user)
      } else {
        const _paginationModel = movininHelper.clone(paginationModel)
        _paginationModel.page = 0
        setPaginationModel(_paginationModel)
      }
    }
  }, [pageSize]) // eslint-disable-line react-hooks/exhaustive-deps

  const getDate = (date?: string) => {
    if (date) {
      const d = new Date(date)
      return `${movininHelper.formatDatePart(d.getDate())}-${movininHelper.formatDatePart(d.getMonth() + 1)}-${d.getFullYear()}`
    }

    throw new Error('Invalid date')
  }

  const getColumns = (): GridColDef<movininTypes.Booking>[] => {
    const _columns: GridColDef<movininTypes.Booking>[] = [
      {
        field: 'renter',
        headerName: strings.RENTER,
        flex: 1,
        renderCell: ({ row, value }: GridRenderCellParams<movininTypes.Booking, string>) => (
          <Tooltip title={value} placement="left">
            <Link href={`/user?u=${(row?.renter as movininTypes.User)._id}`}>{value}</Link>
          </Tooltip>
        ),
        valueGetter: (value: movininTypes.User) => value?.fullName,
      },
      {
        field: 'from',
        headerName: commonStrings.FROM,
        flex: 1,
        valueGetter: (value: string) => getDate(value),
      },
      {
        field: 'to',
        headerName: commonStrings.TO,
        flex: 1,
        valueGetter: (value: string) => getDate(value),
      },
      {
        field: 'price',
        headerName: strings.PRICE,
        flex: 1,
        renderCell: ({ value }: GridRenderCellParams<movininTypes.Booking, string>) => <span className="bp">{value}</span>,
        valueGetter: (value: number) => movininHelper.formatPrice(value, commonStrings.CURRENCY, language as string),
      },
      {
        field: 'status',
        headerName: strings.STATUS,
        flex: 1,
        renderCell: ({ value }: GridRenderCellParams<movininTypes.Booking, movininTypes.BookingStatus>) => <BookingStatus value={value!} showIcon />,
        valueGetter: (value: string) => value,
      },
      {
        field: 'action',
        headerName: '',
        sortable: false,
        disableColumnMenu: true,
        renderCell: ({ row }: GridRenderCellParams<movininTypes.Booking>) => {
          const handleDelete = (e: React.MouseEvent<HTMLElement>) => {
            e.stopPropagation() // don't select this row after clicking
            setSelectedId(row._id || '')
            setopenDeleteDialog(true)
          }

          return (
            <div>
              <Tooltip title={commonStrings.UPDATE}>
                <IconButton onClick={() => navigate(`/update-booking?b=${row._id}`)}>
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
        renderHeader: () => (selectedIds.length > 0 ? (
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
        )),
      },
    ]

    if (hideDates) {
      _columns.splice(1, 2)
    }

    if (!hidePropertyColumn) {
      _columns.unshift({
        field: 'property',
        headerName: strings.PROPERTY,
        flex: 1,
        renderCell: ({ row, value }: GridRenderCellParams<movininTypes.Booking, string>) => (
          <Tooltip title={value} placement="left">
            <Link href={`/property-bookings?p=${(row.property as movininTypes.Property)._id}`}>{value}</Link>
          </Tooltip>
        ),
        valueGetter: (value: movininTypes.Property) => value?.name,
      })
    }

    if (helper.admin(loggedUser) && !hideAgencyColumn) {
      _columns.unshift({
        field: 'agency',
        headerName: commonStrings.AGENCY,
        flex: 1,
        renderCell: ({ row, value }: GridRenderCellParams<movininTypes.Booking, string>) => (
          <Link href={`/agency?c=${(row.agency as movininTypes.User)._id}`} className="cell-agency">
            <img src={movininHelper.joinURL(env.CDN_USERS, (row.agency as movininTypes.User).avatar)} alt={value} />
          </Link>
        ),
        valueGetter: (value: movininTypes.User) => value?.fullName,
      })
    }

    return _columns
  }

  useEffect(() => {
    if (agencies && statuses && loggedUser) {
      const _columns = getColumns()
      setColumns(_columns)

      if (page === 0) {
        fetchData(0, user)
      } else {
        const _paginationModel = movininHelper.clone(paginationModel)
        _paginationModel.page = 0
        setPaginationModel(_paginationModel)
      }
    }
  }, [agencies, statuses, filter]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const _columns = getColumns()
    setColumns(_columns)
  }, [selectedIds]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setLoggedUser(bookingLoggedUser || undefined)
  }, [bookingLoggedUser])

  useEffect(() => {
    if (env.isMobile) {
      const element: HTMLDivElement | null = containerClassName
        ? document.querySelector(`.${containerClassName}`)
        : document.querySelector('div.bookings')

      if (element) {
        element.onscroll = (event: Event) => {
          if (fetch && !loading) {
            const target = event.target as HTMLDivElement

            if (target.scrollTop > 0
              && target.offsetHeight + target.scrollTop + env.INFINITE_SCROLL_OFFSET >= target.scrollHeight) {
              setLoading(true)
              setPage(page + 1)
            }
          }
        }
      }
    }
  }, [containerClassName, page, fetch, loading, offset])

  const handleCancelUpdate = () => {
    setOpenUpdateDialog(false)
  }

  const handleStatusChange = (_status: movininTypes.BookingStatus) => {
    setStatus(_status)
  }

  const handleConfirmUpdate = async () => {
    try {
      if (!status) {
        helper.error()
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
        helper.error()
      }

      setOpenUpdateDialog(false)
    } catch (err) {
      helper.error(err)
    }
  }

  const handleDelete = (e: React.MouseEvent<HTMLElement>) => {
    const _selectedId = e.currentTarget.getAttribute('data-id') as string
    const _selectedIndex = Number(e.currentTarget.getAttribute('data-index') as string)

    setSelectedId(_selectedId)
    setSelectedIndex(_selectedIndex)
    setopenDeleteDialog(true)
    setSelectedId(_selectedId)
    setSelectedIndex(_selectedIndex)
  }

  const handleCancelDelete = () => {
    setopenDeleteDialog(false)
    setSelectedId('')
  }

  const handleConfirmDelete = async () => {
    try {
      if (env.isMobile) {
        const ids = [selectedId]

        const _status = await BookingService.deleteBookings(ids)

        if (_status === 200) {
          rows.splice(selectedIndex, 1)
          setRows(rows)
          setSelectedId('')
          setSelectedIndex(-1)
        } else {
          helper.error()
        }

        setopenDeleteDialog(false)
      } else {
        const ids = selectedIds.length > 0 ? selectedIds : [selectedId]

        const _status = await BookingService.deleteBookings(ids)

        if (_status === 200) {
          if (selectedIds.length > 0) {
            setRows(rows.filter((row) => row._id && !selectedIds.includes(row._id)))
          } else {
            setRows(rows.filter((row) => row._id !== selectedId))
          }
        } else {
          helper.error()
        }

        setopenDeleteDialog(false)
      }
    } catch (err) {
      helper.error(err)
    }
  }

  const _fr = language === 'fr'
  const _locale = _fr ? dfnsFR : dfnsENUS
  const _format = _fr ? 'eee d LLL yyyy kk:mm' : 'eee, d LLL yyyy, p'
  const bookingDetailHeight = env.AGENCY_IMAGE_HEIGHT + 10

  return (
    <div className="bs-list">
      {loggedUser
        && (rows.length === 0 ? (
          !loading
          && !init
          && !bookingLoading
          && (
            <Card variant="outlined" className="empty-list">
              <CardContent>
                <Typography color="textSecondary">{strings.EMPTY_LIST}</Typography>
              </CardContent>
            </Card>
          )
        ) : env.isMobile ? (
          <>
            {rows.map((booking, index) => {
              const from = new Date(booking.from)
              const to = new Date(booking.to)

              return (
                <div key={booking._id} className="booking-details">
                  <div className={`bs bs-${booking.status.toLowerCase()}`}>
                    <span>{helper.getBookingStatus(booking.status)}</span>
                  </div>
                  <div className="booking-detail" style={{ height: bookingDetailHeight }}>
                    <span className="booking-detail-title">{strings.PROPERTY}</span>
                    <div className="booking-detail-value">
                      <Link href={`property/?p=${(booking.property as movininTypes.Property)._id}`}>{(booking.property as movininTypes.Property).name}</Link>
                    </div>
                  </div>
                  <div className="booking-detail" style={{ height: bookingDetailHeight }}>
                    <span className="booking-detail-title">{strings.RENTER}</span>
                    <div className="booking-detail-value">
                      <Link href={`user/?u=${(booking.renter as movininTypes.User)._id}`}>{(booking.renter as movininTypes.User).fullName}</Link>
                    </div>
                  </div>
                  <div className="booking-detail" style={{ height: bookingDetailHeight }}>
                    <span className="booking-detail-title">{strings.DAYS}</span>
                    <div className="booking-detail-value">
                      {`${helper.getDaysShort(movininHelper.days(from, to))} (${movininHelper.capitalize(
                        format(from, _format, { locale: _locale }),
                      )} - ${movininHelper.capitalize(format(to, _format, { locale: _locale }))})`}
                    </div>
                  </div>
                  <div className="booking-detail" style={{ height: bookingDetailHeight }}>
                    <span className="booking-detail-title">{commonStrings.LOCATION}</span>
                    <div className="booking-detail-value">{((booking.property as movininTypes.Property).location as movininTypes.Location).name}</div>
                  </div>
                  <div className="booking-detail" style={{ height: bookingDetailHeight }}>
                    <span className="booking-detail-title">{commonStrings.AGENCY}</span>
                    <div className="booking-detail-value">
                      <div className="property-agency">
                        <img src={movininHelper.joinURL(env.CDN_USERS, (booking.agency as movininTypes.User).avatar)} alt={(booking.agency as movininTypes.User).fullName} />
                        <span className="property-agency-name">{(booking.agency as movininTypes.User).fullName}</span>
                      </div>
                    </div>
                  </div>

                  {booking.cancellation && (
                    <>
                      <div className="extras">
                        <span className="extras-title">{commonStrings.OPTIONS}</span>
                        {booking.cancellation && (
                          <div className="extra">
                            <CheckIcon className="extra-icon" />
                            <span className="extra-title">{csStrings.CANCELLATION}</span>
                            <span className="extra-text">{helper.getCancellationOption((booking.property as movininTypes.Property).cancellation, language as string, true)}</span>
                          </div>
                        )}

                      </div>
                    </>
                  )}

                  <div className="booking-detail" style={{ height: bookingDetailHeight }}>
                    <span className="booking-detail-title">{strings.COST}</span>
                    <div className="booking-detail-value booking-price">{movininHelper.formatPrice(booking.price as number, commonStrings.CURRENCY, language as string)}</div>
                  </div>

                  <div className="bs-buttons">
                    <Button
                      variant="contained"
                      className="btn-primary"
                      size="small"
                      onClick={() => navigate(`/update-booking?b=${booking._id}`)}
                    >
                      {commonStrings.UPDATE}
                    </Button>
                    <Button
                      variant="contained"
                      className="btn-secondary"
                      size="small"
                      data-id={booking._id}
                      data-index={index}
                      onClick={handleDelete}
                    >
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
                paginationModel: { pageSize: env.BOOKINGS_PAGE_SIZE },
              },
            }}
            pageSizeOptions={[env.BOOKINGS_PAGE_SIZE, 50, 100]}
            pagination
            paginationMode="server"
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            onRowSelectionModelChange={(_selectedIds) => {
              setSelectedIds(Array.from(new Set(_selectedIds)).map((id) => id.toString()))
            }}
            disableRowSelectionOnClick
            className="booking-grid"
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
