import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import * as movininTypes from ':movinin-types'
import * as movininHelper from ':movinin-helper'
import { strings } from '@/lang/bookings'
import env from '@/config/env.config'
import * as helper from '@/common/helper'
import * as AgencyService from '@/services/AgencyService'
import PropertyScheduler from '@/components/PropertyScheduler'
import AgencyFilter from '@/components/AgencyFilter'
import StatusFilter from '@/components/StatusFilter'
import PropertySchedulerFilter from '@/components/PropertySchedulerFilter'

import Layout from '@/components/Layout'

import '@/assets/css/scheduler.css'

const Scheduler = () => {
  const navigate = useNavigate()

  const [user, setUser] = useState<movininTypes.User>()
  const [leftPanel, setLeftPanel] = useState(false)
  const [admin, setAdmin] = useState(false)
  const [allAgencies, setAllAgencies] = useState<movininTypes.User[]>([])
  const [agencies, setAgencies] = useState<string[]>()
  const [statuses, setStatuses] = useState(helper.getBookingStatuses().map((status) => status.value))
  const [filter, setFilter] = useState<movininTypes.Filter | null>()

  const handleAgencyFilterChange = (_agencies: string[]) => {
    setAgencies(_agencies)
  }

  const handleStatusFilterChange = (_statuses: movininTypes.BookingStatus[]) => {
    setStatuses(_statuses)
  }

  const handlePropertySchedulerFilterSubmit = (_filter: movininTypes.Filter | null) => {
    setFilter(_filter)
  }

  const onLoad = async (_user?: movininTypes.User) => {
    if (_user) {
      const _admin = helper.admin(_user)
      setUser(_user)
      setAdmin(_admin)
      setLeftPanel(!_admin)

      const _allAgencies = await AgencyService.getAllAgencies()
      const _agencies = _admin ? movininHelper.flattenAgencies(_allAgencies) : [_user._id ?? '']
      setAllAgencies(_allAgencies)
      setAgencies(_agencies)
      setLeftPanel(true)
    }
  }

  return (
    <Layout onLoad={onLoad} strict>
      {user && agencies && (
        <div className="scheduler">
          <div className="col-1">
            {leftPanel && (
              <>
                <Button variant="contained" className="btn-primary cl-new-booking" size="small" onClick={() => navigate('/create-booking')}>
                  {strings.NEW_BOOKING}
                </Button>
                {admin
                  && (
                    <AgencyFilter
                      agencies={allAgencies}
                      onChange={handleAgencyFilterChange}
                      className="cl-supplier-filter"
                    />
                  )}
                <StatusFilter
                  onChange={handleStatusFilterChange}
                  className="cl-status-filter"
                />
                <PropertySchedulerFilter
                  onSubmit={handlePropertySchedulerFilterSubmit}
                  className="cl-scheduler-filter"
                  collapse={!env.isMobile}
                />
              </>
            )}
          </div>
          <div className="col-2">
            <PropertyScheduler
              agencies={agencies}
              statuses={statuses}
              filter={filter!}
              language={user.language!}
            />
          </div>
        </div>
      )}
    </Layout>
  )
}

export default Scheduler
