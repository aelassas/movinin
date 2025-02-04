import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import * as movininTypes from ':movinin-types'
import * as movininHelper from ':movinin-helper'
import * as helper from '@/common/helper'
import { strings } from '@/lang/properties'
import { strings as commonStrings } from '@/lang/common'
import Layout from '@/components/Layout'
import AgencyFilter from '@/components/AgencyFilter'
import Search from '@/components/Search'
import InfoBox from '@/components/InfoBox'
import PropertyTypeFilter from '@/components/PropertyTypeFilter'
import AvailabilityFilter from '@/components/AvailabilityFilter'
import PropertyList from '@/components/PropertyList'
import * as AgencyService from '@/services/AgencyService'
import RentalTermFilter from '@/components/RentalTermFilter'
import env from '@/config/env.config'

import '@/assets/css/properties.css'

const Properties = () => {
  const navigate = useNavigate()

  const [user, setUser] = useState<movininTypes.User>()
  const [admin, setAdmin] = useState(false)
  const [allAgencies, setAllAgencies] = useState<movininTypes.User[]>([])
  const [agencies, setAgencies] = useState<string[]>()
  const [keyword, setKeyword] = useState('')
  const [rowCount, setRowCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [propertyTypes, setPropertyTypes] = useState(movininHelper.getAllPropertyTypes())
  const [rentalTerms, setRentalTerms] = useState(movininHelper.getAllRentalTerms())
  const [availability, setAvailability] = useState(
    [
      movininTypes.Availablity.Available,
      movininTypes.Availablity.Unavailable
    ]
  )

  const handleSearch = (newKeyword: string) => {
    setKeyword(newKeyword)
  }

  const handlePropertyListLoad: movininTypes.DataEvent<movininTypes.Property> = (data) => {
    if (data) {
      setRowCount(data.rowCount)
    }
  }

  const handlePropertyDelete = (_rowCount: number) => {
    setRowCount(_rowCount)
  }

  const handleAgencyFilterChange = (newAgencies: string[]) => {
    setAgencies(newAgencies)
  }

  const handlePropertyTypeFilterChange = (values: movininTypes.PropertyType[]) => {
    setPropertyTypes(values)
  }

  const handleRentalTermFilterChange = (values: movininTypes.RentalTerm[]) => {
    setRentalTerms(values)
  }

  const handleAvailabilityFilterChange = (values: movininTypes.Availablity[]) => {
    setAvailability(values)
  }

  const onLoad = async (_user?: movininTypes.User) => {
    setUser(_user)
    setAdmin(helper.admin(_user))
    const _allAgencies = await AgencyService.getAllAgencies()
    const _agencies = movininHelper.flattenAgencies(_allAgencies)
    setAllAgencies(_allAgencies)
    setAgencies(_agencies)
    setLoading(false)
  }

  return (
    <Layout onLoad={onLoad} strict>
      {user && (
        <div className="properties">
          <div className="col-1">
            <div className="col-1-container">
              <Search onSubmit={handleSearch} className="search" />

              <Button type="submit" variant="contained" className="btn-primary new-property" size="small" onClick={() => navigate('/create-property')}>
                {strings.NEW_PROPERTY}
              </Button>

              {rowCount > 0 && <InfoBox value={`${rowCount} ${rowCount > 1 ? commonStrings.PROPERTIES : commonStrings.PROPERTY}`} className="property-count" />}

              <AgencyFilter
                agencies={allAgencies}
                onChange={handleAgencyFilterChange}
                className="filter"
              />

              {rowCount > -1 && (
                <>
                  <PropertyTypeFilter
                    className="property-filter"
                    onChange={handlePropertyTypeFilterChange}
                  />
                  <RentalTermFilter
                    className="rental-term-filter"
                    onChange={handleRentalTermFilterChange}
                  />
                  {
                    admin
                    && (
                      <AvailabilityFilter
                        className="property-filter"
                        onChange={handleAvailabilityFilterChange}
                      />
                    )
                  }
                </>
              )}
            </div>
          </div>
          <div className="col-2">
            <PropertyList
              user={user}
              agencies={agencies}
              types={propertyTypes}
              rentalTerms={rentalTerms}
              availability={availability}
              keyword={keyword}
              loading={loading}
              language={user.language || env.DEFAULT_LANGUAGE}
              onLoad={handlePropertyListLoad}
              onDelete={handlePropertyDelete}
            />
          </div>
        </div>
      )}
    </Layout>
  )
}

export default Properties
