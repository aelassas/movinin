import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import * as movininTypes from ':movinin-types'
import * as movininHelper from ':movinin-helper'
import env from '@/config/env.config'
import * as UserService from '@/services/UserService'
import * as PaymentService from '@/services/PaymentService'
import { strings as commonStrings } from '@/lang/common'
import { strings } from '@/lang/properties'
import * as helper from '@/common/helper'
import PropertyInfo from '@/components/PropertyInfo'
import AgencyBadge from '@/components/AgencyBadge'

import '@/assets/css/property-component.css'

interface PropertyProps {
  property: movininTypes.Property
  location?: string
  from?: Date
  to?: Date
  sizeAuto?: boolean
  hideAgency?: boolean
  hidePrice?: boolean
  hideActions?: boolean
}

const Property = ({
  property,
  location,
  from,
  to,
  sizeAuto,
  hideAgency,
  hidePrice,
  hideActions,
}: PropertyProps) => {
  const navigate = useNavigate()

  const [language, setLanguage] = useState('')
  const [days, setDays] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLanguage(UserService.getLanguage())
  }, [])

  useEffect(() => {
    const fetchPrice = async () => {
      if (from && to) {
        const _totalPrice = await PaymentService.convertPrice(movininHelper.calculateTotalPrice(property, from as Date, to as Date))
        setTotalPrice(_totalPrice)
        setDays(movininHelper.days(from, to))
      }
      setLoading(false)
    }

    fetchPrice()
  }, [from, to]) // eslint-disable-line react-hooks/exhaustive-deps

  if (loading || !language || (!hidePrice && (!days || !totalPrice))) {
    return null
  }

  return (
    <article key={property._id} className="property">

      <div className="left-panel">
        <img
          src={movininHelper.joinURL(env.CDN_PROPERTIES, property.image)}
          alt={property.name}
          className="property-img"
        />
        {!hideAgency && <AgencyBadge agency={property.agency} style={sizeAuto ? { bottom: 10 } : {}} />}
      </div>

      <div className="middle-panel">
        <div className="name">
          <h2>{property.name}</h2>
        </div>

        <PropertyInfo
          property={property}
          className="property-info"
          language={language}
          // description
        />
      </div>

      <div className="right-panel">
        {!hidePrice && from && to && (
          <div className="price">
            <span className="price-days">{helper.getDays(days)}</span>
            <span className="price-main">{movininHelper.formatPrice(totalPrice, commonStrings.CURRENCY, language)}</span>
            <span className="price-day">{`${strings.PRICE_PER_DAY} ${movininHelper.formatPrice(totalPrice / days, commonStrings.CURRENCY, language)}`}</span>
          </div>
        )}
        {hidePrice && !hideActions && <span />}
        {
          !hideActions
          && (
            <div className="action">
              <Button
                variant="outlined"
                className="btn-margin-bottom btn-view"
                onClick={() => {
                  navigate('/property', {
                    state: {
                      propertyId: property._id,
                      from,
                      to
                    }
                  })
                }}
              >
                {strings.VIEW}
              </Button>
              {
                !hidePrice && (
                  <Button
                    variant="contained"
                    className="btn-margin-bottom btn-book"
                    onClick={() => {
                      navigate('/checkout', {
                        state: {
                          propertyId: property._id,
                          locationId: location,
                          from,
                          to
                        }
                      })
                    }}
                  >
                    {strings.BOOK}
                  </Button>
                )
              }
            </div>
          )
        }

      </div>

    </article>
  )
}

export default Property
