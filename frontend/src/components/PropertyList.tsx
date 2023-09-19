import React, { useState, useEffect } from 'react'
import Env from '../config/env.config'
import Const from '../config/const'
import { strings as commonStrings } from '../lang/common'
import { strings as csStrings } from '../lang/properties'
import { strings } from '../lang/properties'
import * as Helper from '../common/Helper'
import * as PropertyService from '../services/PropertyService'
import {
  Card,
  CardContent,
  Typography,
  Button
} from '@mui/material'
import Pager from './Pager'
import * as movininTypes from 'movinin-types'
import * as movininHelper from 'movinin-helper'
import PropertyInfo from './PropertyInfo'
import AgencyBadge from './AgencyBadge'

import '../assets/css/property-list.css'

const PropertyList = (
  {
    agencies,
    types,
    rentalTerms,
    location,
    from,
    to,
    reload,
    properties,
    className,
    loading: propertyListLoading,
    hideAgency,
    hidePrice,
    hideActions,
    onLoad,
  }:
    {
      agencies?: string[]
      types?: movininTypes.PropertyType[]
      rentalTerms?: movininTypes.RentalTerm[]
      location?: string
      from?: Date
      to?: Date
      reload?: boolean
      properties?: movininTypes.Property[]
      user?: movininTypes.User
      className?: string
      loading?: boolean
      hideAgency?: boolean
      hidePrice?: boolean
      hideActions?: boolean
      onLoad?: movininTypes.DataEvent<movininTypes.Property>
    }
) => {
  const [init, setInit] = useState(true)
  const [loading, setLoading] = useState(false)
  const [fetch, setFetch] = useState(false)
  const [rows, setRows] = useState<movininTypes.Property[]>([])
  const [page, setPage] = useState(1)
  const [rowCount, setRowCount] = useState(0)
  const [totalRecords, setTotalRecords] = useState(0)

  useEffect(() => {
    if (Env.PAGINATION_MODE === Const.PAGINATION_MODE.INFINITE_SCROLL || Env.isMobile()) {
      const element = document.querySelector('body')

      if (element) {
        element.onscroll = () => {
          if (fetch
            && !loading
            && window.scrollY > 0
            && window.scrollY + window.innerHeight + Env.INFINITE_SCROLL_OFFSET >= document.body.scrollHeight) {
            setLoading(true)
            setPage(page + 1)
          }
        }
      }
    }
  }, [fetch, loading, page])

  const _fetch = async (page: number) => {
    try {
      setLoading(true)

      const payload: movininTypes.GetPropertiesPayload = {
        agencies: agencies ?? [],
        types,
        rentalTerms,
        location,
      }
      const data = await PropertyService.getProperties(payload, page, Env.PROPERTIES_PAGE_SIZE)

      const _data = data && data.length > 0 ? data[0] : { pageInfo: { totalRecord: 0 }, resultData: [] }
      if (!_data) {
        Helper.error()
        return
      }
      const totalRecords = Array.isArray(_data.pageInfo) && _data.pageInfo.length > 0 ? _data.pageInfo[0].totalRecords : 0

      let _rows = []
      if (Env.PAGINATION_MODE === Const.PAGINATION_MODE.INFINITE_SCROLL || Env.isMobile()) {
        _rows = page === 1 ? _data.resultData : [...rows, ..._data.resultData]
      } else {
        _rows = _data.resultData
      }

      setRows(_rows)
      setRowCount((page - 1) * Env.PROPERTIES_PAGE_SIZE + _rows.length)
      setTotalRecords(totalRecords)
      setFetch(_data.resultData.length > 0)

      if (((Env.PAGINATION_MODE === Const.PAGINATION_MODE.INFINITE_SCROLL || Env.isMobile()) && page === 1) || (Env.PAGINATION_MODE === Const.PAGINATION_MODE.CLASSIC && !Env.isMobile())) {
        window.scrollTo(0, 0)
      }

      if (onLoad) {
        onLoad({ rows: _data.resultData, rowCount: totalRecords })
      }
    } catch (err) {
      Helper.error(err)
    } finally {
      setLoading(false)
      setInit(false)
    }
  }

  useEffect(() => {
    if (agencies) {
      if (agencies.length > 0) {
        _fetch(page)
      } else {
        setRows([])
        setRowCount(0)
        setFetch(false)
        if (onLoad) {
          onLoad({ rows: [], rowCount: 0 })
        }
      }
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    page,
    agencies,
    types,
    rentalTerms,
    location
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
    types,
    rentalTerms,
    location
  ])

  useEffect(() => {
    if (reload) {
      setPage(1)
      _fetch(1)
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    reload,
    agencies,
    types,
    rentalTerms,
    location
  ])

  const days = movininHelper.days(from, to)

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
          : rows.map((property) => {
            const price = from && to && Helper.price(property, from, to) || 0

            return (
              <article key={property._id}>

                <div className="left-panel">
                  <img
                    src={movininHelper.joinURL(Env.CDN_PROPERTIES, property.image)}
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
                    className="property-info"
                    description
                  />
                </div>

                <div className="right-panel">
                  {!hidePrice && from && to && (
                    <div className="price">
                      <label className="price-days">{Helper.getDays(days)}</label>
                      <label className="price-main">{`${movininHelper.formatNumber(price)} ${commonStrings.CURRENCY}`}</label>
                      <label className="price-day">{`${csStrings.PRICE_PER_DAY} ${movininHelper.formatNumber((price || 0) / days)} ${commonStrings.CURRENCY}`}</label>
                    </div>
                  )}
                  {hidePrice && !hideActions && <span></span>}
                  {
                    !hideActions
                    && <div className="action">
                      <Button
                        type="submit"
                        variant="contained"
                        className="btn-action btn-margin-bottom"
                        href={`/property?p=${property._id}&f=${from?.getTime()}&t=${to?.getTime()}`}
                      >
                        {strings.VIEW}
                      </Button>
                      {
                        !hidePrice && (
                          <Button
                            type="submit"
                            variant="contained"
                            className="btn-action btn-margin-bottom"
                            href={`/checkout?p=${property._id}&l=${location}&f=${(from as Date).getTime()}&t=${(to as Date).getTime()}`}
                          >
                            {strings.BOOK}
                          </Button>
                        )
                      }
                    </div>
                  }

                </div>

              </article>
            )
          })}
      </section>

      {Env.PAGINATION_MODE === Const.PAGINATION_MODE.CLASSIC && !Env.isMobile() && (
        <Pager
          page={page}
          pageSize={Env.PROPERTIES_PAGE_SIZE}
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
