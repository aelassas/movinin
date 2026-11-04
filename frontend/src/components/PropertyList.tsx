import React, { useState, useEffect, useRef } from 'react'
import {
  Card,
  CardContent,
  Typography,
} from '@mui/material'
import * as movininTypes from ':movinin-types'
import env from '@/config/env.config'
import Const from '@/config/const'
import { strings } from '@/lang/properties'
import * as helper from '@/utils/helper'
import * as PropertyService from '@/services/PropertyService'
import Pager from './Pager'
import Property from './Property'
import Progress from './Progress'

import '@/assets/css/property-list.css'

interface PropertyListProps {
  agencies?: string[]
  types?: movininTypes.PropertyType[]
  rentalTerms?: movininTypes.RentalTerm[]
  location?: string
  from?: Date
  to?: Date
  sortBy?: movininTypes.PropertySortType
  refreshKey?: number
  reload?: boolean
  properties?: movininTypes.Property[]
  className?: string
  loading?: boolean
  hideAgency?: boolean
  hidePrice?: boolean
  hideActions?: boolean
  sizeAuto?: boolean
  onLoad?: movininTypes.DataEvent<movininTypes.Property>
  onSavedChange?: (propertyId: string, isSaved: boolean) => void
}

const PropertyList = ({
  agencies,
  types,
  rentalTerms,
  location,
  from,
  to,
  sortBy,
  refreshKey,
  reload,
  properties,
  className,
  loading: propertyListLoading,
  hideAgency,
  hidePrice,
  hideActions,
  sizeAuto,
  onLoad,
  onSavedChange,
}: PropertyListProps) => {
  const [init, setInit] = useState(true)
  const [loading, setLoading] = useState(false)
  const [fetch, setFetch] = useState(false)
  const [rows, setRows] = useState<movininTypes.Property[]>([])
  const [page, setPage] = useState(1)
  const [rowCount, setRowCount] = useState(0)
  const [totalRecords, setTotalRecords] = useState(0)

  // Only the latest fetch is allowed to update the list, older responses are ignored
  const requestIdRef = useRef(0)
  const filtersRef = useRef<unknown[]>([])

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
  }, [fetch, loading, page])

  const fetchData = async (_page: number) => {
    requestIdRef.current += 1
    const requestId = requestIdRef.current

    try {
      setLoading(true)

      const payload: movininTypes.GetPropertiesPayload = {
        agencies: agencies ?? [],
        types,
        rentalTerms,
        location,
        from,
        to,
        sortBy,
      }
      const data = await PropertyService.getProperties(payload, _page, env.PROPERTIES_PAGE_SIZE)

      if (requestId !== requestIdRef.current) {
        return
      }

      const _data = data && data.length > 0 ? data[0] : { pageInfo: { totalRecord: 0 }, resultData: [] }
      if (!_data) {
        helper.error()
        return
      }
      const _totalRecords = Array.isArray(_data.pageInfo) && _data.pageInfo.length > 0 ? _data.pageInfo[0].totalRecords : 0

      let _rows: movininTypes.Property[] = []
      if (env.PAGINATION_MODE === Const.PAGINATION_MODE.INFINITE_SCROLL || env.isMobile) {
        _rows = _page === 1 ? _data.resultData : [...rows, ..._data.resultData]
      } else {
        _rows = _data.resultData
      }

      setRows(_rows)
      setRowCount((_page - 1) * env.PROPERTIES_PAGE_SIZE + _rows.length)
      setTotalRecords(_totalRecords)

      if (((env.PAGINATION_MODE === Const.PAGINATION_MODE.INFINITE_SCROLL || env.isMobile) && _page === 1) || (env.PAGINATION_MODE === Const.PAGINATION_MODE.CLASSIC && !env.isMobile)) {
        window.scrollTo(0, 0)
      }

      if (onLoad) {
        onLoad({ rows: _data.resultData, rowCount: _totalRecords })
      }
    } catch (err) {
      if (requestId === requestIdRef.current) {
        helper.error(err)
      }
    } finally {
      if (requestId === requestIdRef.current) {
        setLoading(false)
        setInit(false)
      }
    }
  }

  useEffect(() => {
    const filters = [agencies, types, rentalTerms, location, from, to, sortBy, refreshKey]
    const filtersChanged = filters.some((filter, index) => filter !== filtersRef.current[index])
    filtersRef.current = filters

    // When filters change on a page other than the first one, the page reset below triggers the fetch
    if (filtersChanged && page !== 1) {
      return
    }

    if (agencies) {
      if (agencies.length > 0) {
        fetchData(page)
      } else {
        requestIdRef.current += 1
        setLoading(false)
        setRows([])
        setRowCount(0)
        setFetch(false)
        if (onLoad) {
          onLoad({ rows: [], rowCount: 0 })
        }
        setInit(false)
      }
    }
  }, [page, agencies, types, rentalTerms, location, from, to, sortBy, refreshKey]) // eslint-disable-line react-hooks/exhaustive-deps

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
    types,
    rentalTerms,
    location,
    from,
    to,
    sortBy,
    refreshKey,
  ])

  useEffect(() => {
    if (reload) {
      setPage(1)
      fetchData(1)
    }
  }, [reload, agencies, types, rentalTerms, location, sortBy]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
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
          : ((from && to && location) || hidePrice) // || (hidePrice && booking))
          && rows.map((property) => (
            <Property
              key={property._id}
              property={property}
              location={location}
              from={from}
              to={to}
              sizeAuto={sizeAuto}
              hideAgency={hideAgency}
              hidePrice={hidePrice}
              hideActions={hideActions}
              onSavedChange={onSavedChange}
            />
          ))}

        {loading && <Progress />}
      </section>

      {env.PAGINATION_MODE === Const.PAGINATION_MODE.CLASSIC && !env.isMobile && (
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
  )
}

export default PropertyList
