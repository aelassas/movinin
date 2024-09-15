import React, { useEffect, useState } from 'react'
import * as movininTypes from ':movinin-types'
import * as movininHelper from ':movinin-helper'
import env from '@/config/env.config'
import * as AgencyService from '@/services/AgencyService'

import '@/assets/css/agency-list.css'

const AgencyList = () => {
  const [agencies, setAgencies] = useState<movininTypes.User[]>([])

  useEffect(() => {
    const fetch = async () => {
      const _agencies = await AgencyService.getAllAgencies()
      setAgencies(_agencies)
    }

    fetch()
  }, [])

  return (
    <div className="agency-list">
      {
        agencies.map((agency) => (
          <div key={agency._id} className="agency" title={agency.fullName}>
            <div className="img">
              <img src={movininHelper.joinURL(env.CDN_USERS, agency.avatar)} alt={agency.fullName} />
            </div>
            <div className="name">{agency.fullName}</div>
          </div>
        ))
      }
    </div>
  )
}

export default AgencyList
