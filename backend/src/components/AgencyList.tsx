import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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
  Delete as DeleteIcon
} from '@mui/icons-material'
import * as movininTypes from ':movinin-types'
import * as movininHelper from ':movinin-helper'
import env from '@/config/env.config'
import Const from '@/config/const'
import { strings as commonStrings } from '@/lang/common'
import { strings } from '@/lang/agency-list'
import * as AgencyService from '@/services/AgencyService'
import * as helper from '@/common/helper'
import Pager from './Pager'

import '@/assets/css/agency-list.css'

interface AgencyListProps {
  user?: movininTypes.User
  keyword?: string
  onLoad?: movininTypes.DataEvent<movininTypes.User>
  onDelete?: (rowCount: number) => void
}

const AgencyList = ({
  user,
  keyword: agencyListKeyword,
  onDelete,
  onLoad
}: AgencyListProps) => {
  const navigate = useNavigate()

  const [keyword, setKeyword] = useState(agencyListKeyword)
  const [init, setInit] = useState(true)
  const [loading, setLoading] = useState(false)
  const [fetch, setFetch] = useState(false)
  const [rows, setRows] = useState<movininTypes.User[]>([])
  const [rowCount, setRowCount] = useState(0)
  const [totalRecords, setTotalRecords] = useState(0)
  const [page, setPage] = useState(1)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [agencyId, setAgencyId] = useState('')
  const [agencyIndex, setAgencyIndex] = useState(-1)

  const fetchData = async (_page: number, _keyword?: string) => {
    try {
      setLoading(true)
      const data = await AgencyService.getAgencies(_keyword || '', _page, env.PAGE_SIZE)
      const _data = data && data.length > 0 ? data[0] : { pageInfo: { totalRecord: 0 }, resultData: [] }
      if (!_data) {
        helper.error()
        return
      }
      const _totalRecords = Array.isArray(_data.pageInfo) && _data.pageInfo.length > 0 ? _data.pageInfo[0].totalRecords : 0

      let _rows = []
      if (env.PAGINATION_MODE === Const.PAGINATION_MODE.INFINITE_SCROLL || env.isMobile) {
        _rows = _page === 1 ? _data.resultData : [...rows, ..._data.resultData]
      } else {
        _rows = _data.resultData
      }

      setRows(_rows)
      setRowCount((_page - 1) * env.PAGE_SIZE + _rows.length)
      setTotalRecords(_totalRecords)
      setFetch(_data.resultData.length > 0)

      if (((env.PAGINATION_MODE === Const.PAGINATION_MODE.INFINITE_SCROLL || env.isMobile) && _page === 1) || (env.PAGINATION_MODE === Const.PAGINATION_MODE.CLASSIC && !env.isMobile)) {
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
    if (agencyListKeyword !== keyword) {
      fetchData(1, agencyListKeyword)
    }
    setKeyword(agencyListKeyword || '')
  }, [agencyListKeyword, keyword]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchData(page, keyword)
  }, [page]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (env.PAGINATION_MODE === Const.PAGINATION_MODE.INFINITE_SCROLL || env.isMobile) {
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
  }, [fetch, loading, page, keyword])

  const handleDelete = (e: React.MouseEvent<HTMLElement>) => {
    const _agencyId = e.currentTarget.getAttribute('data-id') as string
    const _agencyIndex = Number(e.currentTarget.getAttribute('data-index') as string)

    setOpenDeleteDialog(true)
    setAgencyId(_agencyId)
    setAgencyIndex(_agencyIndex)
  }

  const handleConfirmDelete = async () => {
    try {
      if (agencyId !== '' && agencyIndex > -1) {
        setLoading(false)
        setOpenDeleteDialog(false)
        const status = await AgencyService.deleteAgency(agencyId)
        if (status === 200) {
          const _rowCount = rowCount - 1
          rows.splice(agencyIndex, 1)

          setRows(rows)
          setRowCount(_rowCount)
          setTotalRecords(totalRecords - 1)
          setAgencyId('')
          setAgencyIndex(-1)
          setLoading(false)

          if (onDelete) {
            onDelete(_rowCount)
          }
        } else {
          helper.error()
          setAgencyId('')
          setAgencyIndex(-1)
          setLoading(false)
        }
      } else {
        helper.error()
        setOpenDeleteDialog(false)
        setAgencyId('')
        setAgencyIndex(-1)
        setLoading(false)
      }
    } catch (err) {
      helper.error(err)
    }
  }

  const handleCancelDelete = () => {
    setOpenDeleteDialog(false)
    setAgencyId('')
    setAgencyIndex(-1)
  }

  const admin = helper.admin(user)

  return (
    <>

      <section className="agency-list">
        {rows.length === 0
          ? !init
          && !loading
          && (
            <Card variant="outlined" className="empty-list">
              <CardContent>
                <Typography color="textSecondary">{strings.EMPTY_LIST}</Typography>
              </CardContent>
            </Card>
          )
          : rows.map((agency, index) => {
            const edit = admin || user?._id === agency._id
            const canDelete = admin

            return (
              <article key={agency._id}>
                <div className="agency-item">
                  <div className="agency-item-avatar">
                    <img src={movininHelper.joinURL(env.CDN_USERS, agency.avatar)} alt={agency.fullName} />
                  </div>
                  <span className="agency-item-title">{agency.fullName}</span>
                </div>
                <div className="agency-actions">
                  {canDelete && (
                    <Tooltip title={commonStrings.DELETE}>
                      <IconButton data-id={agency._id} data-index={index} onClick={handleDelete}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                  {edit && (
                    <Tooltip title={commonStrings.UPDATE}>
                      <IconButton onClick={() => navigate(`/update-agency?c=${agency._id}`)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                  <Tooltip title={strings.VIEW_AGENCY}>
                    <IconButton onClick={() => navigate(`/agency?c=${agency._id}`)}>
                      <ViewIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              </article>
            )
          })}
        <Dialog disableEscapeKeyDown maxWidth="xs" open={openDeleteDialog}>
          <DialogTitle className="dialog-header">{commonStrings.CONFIRM_TITLE}</DialogTitle>
          <DialogContent>{strings.DELETE_AGENCY}</DialogContent>
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

      {env.PAGINATION_MODE === Const.PAGINATION_MODE.CLASSIC && !env.isMobile && (
        <Pager
          page={page}
          pageSize={env.PAGE_SIZE}
          rowCount={rowCount}
          totalRecords={totalRecords}
          onNext={() => setPage(page + 1)}
          onPrevious={() => setPage(page - 1)}
        />
      )}

    </>
  )
}

export default AgencyList
