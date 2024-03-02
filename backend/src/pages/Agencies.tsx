import React, { useState } from 'react'
import { Button } from '@mui/material'
import * as movininTypes from 'movinin-types'
import Master from '../components/Master'
import { strings } from '../lang/agencies'
import Search from '../components/Search'
import AgencyList from '../components/AgencyList'
import InfoBox from '../components/InfoBox'
import * as helper from '../common/helper'

import '../assets/css/agencies.css'

const Agencies = () => {
  const [user, setUser] = useState<movininTypes.User>()
  const [keyword, setKeyword] = useState('')
  const [rowCount, setRowCount] = useState(-1)

  const handleSearch = (newKeyword: string) => {
    setKeyword(newKeyword)
  }

  const handleAgencyListLoad: movininTypes.DataEvent<movininTypes.User> = (data) => {
    if (data) {
      setRowCount(data.rowCount)
    }
  }

  const handleAgencyDelete = (_rowCount: number) => {
    setRowCount(_rowCount)
  }

  const onLoad = (_user?: movininTypes.User) => {
    setUser(_user)
  }

  const admin = helper.admin(user)

  return (
    <Master onLoad={onLoad} strict>
      {user && (
        <div className="agencies">
          <div className="col-1">
            <div className="col-1-container">
              <Search className="search" onSubmit={handleSearch} />

              {rowCount > -1 && admin && (
                <Button
                  type="submit"
                  variant="contained"
                  className="btn-primary new-agency"
                  size="small"
                  href="/create-agency"
                >
                  {strings.NEW_AGENCY}
                </Button>
              )}

              {rowCount > 0 && (
              <InfoBox
                value={`${rowCount} ${rowCount > 1 ? strings.AGENCIES : strings.AGENCY}`}
                className="agency-count"
              />
)}
            </div>
          </div>
          <div className="col-2">
            <AgencyList
              user={user}
              keyword={keyword}
              onLoad={handleAgencyListLoad}
              onDelete={handleAgencyDelete}
            />
          </div>
        </div>
      )}
    </Master>
  )
}

export default Agencies
