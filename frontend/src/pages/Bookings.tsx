import React, { useState } from 'react'
import * as movininTypes from ':movinin-types'
import * as movininHelper from ':movinin-helper'
import Layout from '@/components/Layout'
import env from '@/config/env.config'
import * as helper from '@/common/helper'
import BookingList from '@/components/BookingList'
import AgencyFilter from '@/components/AgencyFilter'
import StatusFilter from '@/components/StatusFilter'
import BookingFilter from '@/components/BookingFilter'
import * as AgencyService from '@/services/AgencyService'

import '@/assets/css/bookings.css'

const Bookings = () => {
  const [user, setUser] = useState<movininTypes.User>()
  const [allAgencies, setAllAgencies] = useState<movininTypes.User[]>([])
  const [agencies, setAgencies] = useState<string[]>()
  const [statuses, setStatuses] = useState(helper.getBookingStatuses().map((status) => status.value))
  const [filter, setFilter] = useState<movininTypes.Filter | null>()
  const [loadingAgencies, setLoadingAgencies] = useState(true)

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
    setUser(_user)
    setLoadingAgencies(true)

    const _allAgencies = await AgencyService.getAllAgencies()
    const _agencies = movininHelper.flattenAgencies(_allAgencies)
    setAllAgencies(_allAgencies)
    setAgencies(_agencies)
    setLoadingAgencies(false)
  }

  return (
    <Layout onLoad={onLoad} strict>
      {user && (
        <div className="bookings">
          <div className="col-1">
            <div>
              <AgencyFilter agencies={allAgencies} onChange={handleAgencyFilterChange} className="cl-agency-filter" />
              <StatusFilter onChange={handleStatusFilterChange} className="cl-status-filter" />
              <BookingFilter onSubmit={handleBookingFilterSubmit} language={(user && user.language) || env.DEFAULT_LANGUAGE} className="cl-booking-filter" collapse={!env.isMobile} />
            </div>
          </div>
          <div className="col-2">
            <BookingList
              user={user}
              language={user.language}
              agencies={agencies}
              statuses={statuses}
              filter={filter}
              loading={loadingAgencies}
              hideDates={env.isMobile}
              checkboxSelection={false}
              hideAgencyColumn={env.HIDE_AGENCIES}
            />
          </div>
        </div>
      )}
    </Layout>
  )
}

export default Bookings
