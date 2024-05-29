import React from 'react'
import * as movininTypes from ':movinin-types'
import * as movininHelper from ':movinin-helper'
import env from '../config/env.config'

import '../assets/css/agency-badge.css'

interface AgencyBadgeProps {
  agency: movininTypes.User
  style?: React.CSSProperties
}

const AgencyBadge = ({ agency, style }: AgencyBadgeProps) => (agency
  ? (
    <div className="agency-badge" style={style || {}}>
      <span className="agency-badge-logo">
        <img
          src={movininHelper.joinURL(env.CDN_USERS, agency.avatar)}
          alt={agency.fullName}
        />
      </span>
      <span className="agency-badge-text">{agency.fullName}</span>
    </div>
  )
  : <></>)

export default AgencyBadge
