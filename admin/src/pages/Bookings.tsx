import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import * as movininTypes from ':movinin-types'
import * as movininHelper from ':movinin-helper'
import Layout from '@/components/Layout'
import env from '@/config/env.config'
import { strings } from '@/lang/bookings'
import * as helper from '@/common/helper'
import BookingList from '@/components/BookingList'
import AgencyFilter from '@/components/AgencyFilter'
import StatusFilter from '@/components/StatusFilter'
import BookingFilter from '@/components/BookingFilter'
import * as AgencyService from '@/services/AgencyService'

import '@/assets/css/bookings.css'

const Bookings = () => {
  const navigate = useNavigate()

  const [user, setUser] = useState<movininTypes.User>()
  const [leftPanel, setLeftPanel] = useState(false)
  const [admin, setAdmin] = useState(false)
  const [allAgencies, setAllAgencies] = useState<movininTypes.User[]>([])
  const [agencies, setAgencies] = useState<string[]>()
  const [statuses, setStatuses] = useState(helper.getBookingStatuses().map((status) => status.value))
  const [filter, setFilter] = useState<movininTypes.Filter | null>()
  const [loadingAgencies, setLoadingAgencies] = useState(true)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    if (user && user.verified) {
      const col1 = document.querySelector('div.col-1')
      if (col1) {
        setOffset(col1.clientHeight)
      }
    }
  }, [user])

  const handleAgencyFilterChange = (_agencies: string[]) => {
    setAgencies(_agencies)
  }

  const handleStatusFilterChange = (_statuses: movininTypes.BookingStatus[]) => {
    setStatuses(_statuses)
  }

  const handleBookingFilterSubmit = (_filter: movininTypes.Filter | null) => {
    setFilter(_filter)
  }

  const onLoad = async (_user?: movininTypes.User) => {
    if (_user) {
      const _admin = helper.admin(_user)
      setUser(_user)
      setAdmin(_admin)
      setLeftPanel(!_admin)
      setLoadingAgencies(_admin)

      const _allAgencies = await AgencyService.getAllAgencies()
      const _agencies = _admin ? movininHelper.flattenAgencies(_allAgencies) : [_user._id ?? '']
      setAllAgencies(_allAgencies)
      setAgencies(_agencies)
      setLeftPanel(true)
      setLoadingAgencies(false)
    }
  }

  return (
    <Layout onLoad={onLoad} strict>
      {user && (
        <div className="bookings">
          <div className="col-1">
            {leftPanel && (
              <>
                <Button variant="contained" className="btn-primary cl-new-booking" size="small" onClick={() => navigate('/create-booking')}>
                  {strings.NEW_BOOKING}
                </Button>
                {
                  admin
                  && (
                    <AgencyFilter
                      agencies={allAgencies}
                      onChange={handleAgencyFilterChange}
                      className="cl-agency-filter"
                    />
                  )
                }
                <StatusFilter
                  onChange={handleStatusFilterChange}
                  className="cl-status-filter"
                />
                <BookingFilter
                  onSubmit={handleBookingFilterSubmit}
                  language={(user && user.language) || env.DEFAULT_LANGUAGE}
                  className="cl-booking-filter"
                  collapse={!env.isMobile}
                />
              </>
            )}
          </div>
          <div className="col-2">
            <BookingList
              containerClassName="bookings"
              offset={offset}
              language={user.language}
              loggedUser={user}
              agencies={agencies}
              statuses={statuses}
              filter={filter}
              loading={loadingAgencies}
              hideDates={env.isMobile}
              checkboxSelection={!env.isMobile}
            />
          </div>
        </div>
      )}
    </Layout>
  )
}

export default Bookings
