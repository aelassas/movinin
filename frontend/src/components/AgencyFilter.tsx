import React, { useEffect, useRef, useState } from 'react'
import * as movininTypes from ':movinin-types'
import * as movininHelper from ':movinin-helper'
import env from '@/config/env.config'
import { strings as commonStrings } from '@/lang/common'
import Accordion from './Accordion'

import '@/assets/css/agency-filter.css'

interface AgencyFilterProps {
  agencies: movininTypes.User[]
  collapse?: boolean
  className?: string
  onChange?: (value: string[]) => void
}

const AgencyFilter = ({
  agencies: filterAgencies,
  collapse,
  className,
  onChange
}: AgencyFilterProps) => {
  const [agencies, setAgencies] = useState<movininTypes.User[]>([])
  const [checkedAgencies, setCheckedAgencies] = useState<string[]>([])
  const [allChecked, setAllChecked] = useState(false)
  const refs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    setAgencies(filterAgencies)
  }, [filterAgencies])

  const handleCheckAgencyChange = (e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement>) => {
    const agencyId = e.currentTarget.getAttribute('data-id') as string

    if ('checked' in e.currentTarget && e.currentTarget.checked) {
      checkedAgencies.push(agencyId)

      if (checkedAgencies.length === agencies.length) {
        setAllChecked(true)
      }
    } else {
      const index = checkedAgencies.indexOf(agencyId)
      checkedAgencies.splice(index, 1)

      if (checkedAgencies.length === 0) {
        setAllChecked(false)
      }
    }

    setCheckedAgencies(checkedAgencies)

    if (onChange) {
      onChange(checkedAgencies.length === 0 ? movininHelper.flattenAgencies(agencies) : movininHelper.clone(checkedAgencies))
    }
  }

  const handleAgencyClick = (e: React.MouseEvent<HTMLElement>) => {
    const checkbox = e.currentTarget.previousSibling as HTMLInputElement
    checkbox.checked = !checkbox.checked
    const event = e
    event.currentTarget = checkbox
    handleCheckAgencyChange(event)
  }

  const handleUncheckAllChange = () => {
    if (allChecked) {
      // uncheck all
      refs.current.forEach((checkbox) => {
        if (checkbox) {
          checkbox.checked = false
        }
      })

      setAllChecked(false)
      setCheckedAgencies([])
    } else {
      // check all
      refs.current.forEach((checkbox) => {
        if (checkbox) {
          checkbox.checked = true
        }
      })

      const agencyIds = movininHelper.flattenAgencies(agencies)
      setAllChecked(true)
      setCheckedAgencies(agencyIds)

      if (onChange) {
        onChange(movininHelper.clone(agencyIds))
      }
    }
  }

  return (
    ((agencies.length > 1 && agencies.length < 17)
      && (
        <Accordion
          title={commonStrings.AGENCY}
          collapse={collapse}
          offsetHeight={Math.floor((agencies.length / 2) * env.AGENCY_IMAGE_HEIGHT)}
          className={`${className ? `${className} ` : ''}agency-filter`}
        >
          <ul className="agency-list">
            {agencies.map((agency, index) => (
              <li key={agency._id}>
                <input
                  ref={(ref) => {
                    refs.current[index] = ref
                  }}
                  type="checkbox"
                  data-id={agency._id}
                  className="agency-checkbox"
                  onChange={handleCheckAgencyChange}
                />
                <span
                  onClick={handleAgencyClick}
                  role="button"
                  tabIndex={0}
                >
                  <img
                    src={movininHelper.joinURL(env.CDN_USERS, agency.avatar)}
                    alt={agency.fullName}
                    title={agency.fullName}
                  />
                </span>
              </li>
            ))}
          </ul>
          <div className="filter-actions">
            <span
              onClick={handleUncheckAllChange}
              className="uncheckall"
              role="button"
              tabIndex={0}
            >
              {allChecked ? commonStrings.UNCHECK_ALL : commonStrings.CHECK_ALL}
            </span>
          </div>
        </Accordion>
      )
    ) || <></>
  )
}

export default AgencyFilter
