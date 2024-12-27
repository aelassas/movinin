import React, { useEffect, useState } from 'react'
import {
  Check as CheckIcon,
} from '@mui/icons-material'
import * as movininTypes from ':movinin-types'
import * as helper from '@/common/helper'
import { strings as csStrings } from '@/lang/properties'
import { strings as commonStrings } from '@/lang/common'
import * as UserService from '@/services/UserService'

import '@/assets/css/extras.css'

interface ExtrasProps {
  booking: movininTypes.Booking
}

const Extras = ({ booking }: ExtrasProps) => {
  const [cancellationOption, setCancellationOption] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      if (booking) {
        const language = UserService.getLanguage()
        const property = booking.property as movininTypes.Property

        if (booking.cancellation) {
          setCancellationOption(await helper.getCancellationOption(property.cancellation, language))
        }
        setLoading(false)
      }
    }

    init()
  }, [booking])

  if (loading) {
    return null
  }

  return (
    <div className="extras">
      <span className="extras-title">{commonStrings.OPTIONS}</span>
      {booking.cancellation && (
        <div className="extra">
          <CheckIcon className="extra-icon" />
          <span className="extra-title">{csStrings.CANCELLATION}</span>
          <span className="extra-text">{cancellationOption}</span>
        </div>
      )}

    </div>
  )
}

export default Extras
