import React, { useState, useEffect } from 'react'
import Master from '../components/Master'
import Env from '../config/env.config'
import { strings } from '../lang/bookings'
import * as Helper from '../common/Helper'
import BookingList from '../components/BookingList'
import AgencyFilter from '../components/AgencyFilter'
import StatusFilter from '../components/StatusFilter'
import BookingFilter from '../components/BookingFilter'
import { Button } from '@mui/material'
import * as AgencyService from '../services/AgencyService'
import * as movininTypes from 'movinin-types'
import * as movininHelper from 'movinin-helper'

import '../assets/css/bookings.css'

const Bookings = () => {
  const [user, setUser] = useState<movininTypes.User>()
  const [leftPanel, setLeftPanel] = useState(false)
  const [admin, setAdmin] = useState(false)
  const [allAgencies, setAllAgencies] = useState<movininTypes.User[]>([])
  const [agencies, setAgencies] = useState<string[]>([])
  const [statuses, setStatuses] = useState(Helper.getBookingStatuses().map((status) => status.value))
  const [filter, setFilter] = useState<movininTypes.Filter | null>()
  const [reload, setReload] = useState(false)
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

  const handleAgencyFilterChange = (newAgencies: string[]) => {
    setAgencies(newAgencies)
    setReload(movininHelper.arrayEqual(agencies, newAgencies))
  }

  const handleStatusFilterChange = (newStatuses: movininTypes.BookingStatus[]) => {
    setStatuses(newStatuses)
    setReload(movininHelper.arrayEqual(statuses, newStatuses))
  }

  const handleBookingFilterSubmit = (newFilter: movininTypes.Filter | null) => {
    setFilter(newFilter)
    setReload(movininHelper.filterEqual(filter, newFilter))
  }

  const handleBookingListLoad = () => {
    setReload(false)
  }

  const onLoad = async (user?: movininTypes.User) => {
    if (user) {
      const admin = Helper.admin(user)
      setUser(user)
      setAdmin(admin)
      setLeftPanel(!admin)
      setLoadingAgencies(admin)

      const allAgencies = admin ? await AgencyService.getAllAgencies() : []
      const agencies = admin ? movininHelper.flattenAgencies(allAgencies) : [user._id ?? '']
      setAllAgencies(allAgencies)
      setAgencies(agencies)
      setLeftPanel(true)
      setLoadingAgencies(false)
    }
  }

  return (
    <Master onLoad={onLoad} strict>
      {user && (
        <div className="bookings">
          <div className="col-1">
            {leftPanel && (
              <>
                <Button variant="contained" className="btn-primary cl-new-booking" size="small" href="/create-booking">
                  {strings.NEW_BOOKING}
                </Button>
                {
                  admin &&
                  <AgencyFilter
                    agencies={allAgencies}
                    onChange={handleAgencyFilterChange}
                    className="cl-agency-filter"
                  />
                }
                <StatusFilter
                  onChange={handleStatusFilterChange}
                  className="cl-status-filter" />
                <BookingFilter
                  onSubmit={handleBookingFilterSubmit}
                  language={(user && user.language) || Env.DEFAULT_LANGUAGE}
                  className="cl-booking-filter"
                  collapse={!Env.isMobile()}
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
              reload={reload}
              onLoad={handleBookingListLoad}
              hideDates={Env.isMobile()}
              checkboxSelection={!Env.isMobile()}
            />
          </div>
        </div>
      )}
    </Master>
  )
}

export default Bookings
