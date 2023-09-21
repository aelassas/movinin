import React, { useEffect, useState } from 'react'
import Master from '../components/Master'
import Env from '../config/env.config'
import * as Helper from '../common/Helper'
import BookingList from '../components/BookingList'
import AgencyFilter from '../components/AgencyFilter'
import StatusFilter from '../components/StatusFilter'
import BookingFilter from '../components/BookingFilter'
import * as AgencyService from '../services/AgencyService'
import * as movininTypes from 'movinin-types'
import * as movininHelper from 'movinin-helper'

import '../assets/css/bookings.css'

const Bookings = () => {
  const [user, setUser] = useState<movininTypes.User>()
  const [allAgencies, setAllAgencies] = useState<movininTypes.User[]>([])
  const [agencies, setAgencies] = useState<string[]>()
  const [statuses, setStatuses] = useState(Helper.getBookingStatuses().map((status) => status.value))
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

  const handleAgencyFilterChange = (agencies: string[]) => {
    setAgencies(agencies)
  }

  const handleStatusFilterChange = (statuses: movininTypes.BookingStatus[]) => {
    setStatuses(statuses)
  }

  const handleBookingFilterSubmit = (filter: movininTypes.Filter | null) => {
    setFilter(filter)
  }

  const onLoad = async (user?: movininTypes.User) => {
    setUser(user)
    setLoadingAgencies(true)

    const allAgencies = await AgencyService.getAllAgencies()
    const agencies = movininHelper.flattenAgencies(allAgencies)
    setAllAgencies(allAgencies)
    setAgencies(agencies)
    setLoadingAgencies(false)
  }

  return (
    <Master onLoad={onLoad} strict>
      {user && (
        <div className="bookings">
          <div className="col-1">
            <div>
              <AgencyFilter agencies={allAgencies} onChange={handleAgencyFilterChange} className="cl-agency-filter" />
              <StatusFilter onChange={handleStatusFilterChange} className="cl-status-filter" />
              <BookingFilter onSubmit={handleBookingFilterSubmit} language={(user && user.language) || Env.DEFAULT_LANGUAGE} className="cl-booking-filter" collapse={!Env.isMobile()} />
            </div>
          </div>
          <div className="col-2">
            <BookingList
              containerClassName="bookings"
              offset={offset}
              user={user}
              language={user.language}
              agencies={agencies}
              statuses={statuses}
              filter={filter}
              loading={loadingAgencies}
              hideDates={Env.isMobile()}
              checkboxSelection={false}
            />
          </div>
        </div>
      )}
    </Master>
  )
}

export default Bookings
