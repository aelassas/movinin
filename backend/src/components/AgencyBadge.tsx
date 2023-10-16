import React from 'react'
import * as movininTypes from 'movinin-types'
import * as movininHelper from 'movinin-helper'
import Env from '../config/env.config'

import '../assets/css/agency-badge.css'

interface AgencyBadgeProps {
  agency: movininTypes.User
}

function AgencyBadge({ agency }: AgencyBadgeProps) {
  return agency
    ? (
      <div className="agency-badge">
        <span className="agency-badge-logo">
          <img
            src={movininHelper.joinURL(Env.CDN_USERS, agency.avatar)}
            alt={agency.fullName}
          />
        </span>
        <a href={`/agency?c=${agency._id}`} className="agency-badge-info">
          {agency.fullName}
        </a>
      </div>
    )
    : <></>
}

export default AgencyBadge
