import React, { useState } from 'react'
import * as Helper from '../common/Helper'
import { strings } from '../lang/properties'
import { strings as commonStrings } from '../lang/common'
import Master from '../components/Master'
import AgencyFilter from '../components/AgencyFilter'
import Search from '../components/Search'
import InfoBox from '../components/InfoBox'
import PropertyTypeFilter from '../components/PropertyTypeFilter'
import AvailabilityFilter from '../components/AvailabilityFilter'
import PropertyList from '../components/PropertyList'
import * as AgencyService from '../services/AgencyService'
import { Button } from '@mui/material'
import * as movininTypes from 'movinin-types'
import * as movininHelper from 'movinin-helper'
import RentalTermFilter from '../components/RentalTermFilter'
import Env from '../config/env.config'

import '../assets/css/properties.css'

const Properties = () => {
  const [user, setUser] = useState<movininTypes.User>()
  const [admin, setAdmin] = useState(false)
  const [allAgencies, setAllAgencies] = useState<movininTypes.User[]>([])
  const [agencies, setAgencies] = useState<string[]>([])
  const [keyword, setKeyword] = useState('')
  const [rowCount, setRowCount] = useState(0)
  const [reload, setReload] = useState(false)
  const [loading, setLoading] = useState(true)
  const [propertyTypes, setPropertyTypes] = useState(Helper.getAllPropertyTypes())
  const [rentalTerms, setRentalTerms] = useState(Helper.getAllRentalTerms())
  const [availability, setAvailability] = useState(
    [
      movininTypes.Availablity.Available,
      movininTypes.Availablity.Unavailable
    ])

  const handleSearch = (newKeyword: string) => {
    setKeyword(newKeyword)
    setReload(newKeyword === keyword)
  }

  const handlePropertyListLoad: movininTypes.DataEvent<movininTypes.Property> = (data) => {
    if (data) {
      setReload(false)
      setRowCount(data.rowCount)
    }
  }

  const handlePropertyDelete = (rowCount: number) => {
    setRowCount(rowCount)
  }

  const handleAgencyFilterChange = (newAgencies: string[]) => {
    setAgencies(newAgencies)
    setReload(movininHelper.arrayEqual(newAgencies, agencies))
  }

  const handlePropertyTypeFilterChange = (values: movininTypes.PropertyType[]) => {
    setPropertyTypes(values)
    setReload(movininHelper.arrayEqual(values, propertyTypes))
  }

  const handleRentalTermFilterChange = (values: movininTypes.RentalTerm[]) => {
    setRentalTerms(values)
    setReload(movininHelper.arrayEqual(values, rentalTerms))
  }

  const handleAvailabilityFilterChange = (values: movininTypes.Availablity[]) => {
    setAvailability(values)
    setReload(movininHelper.arrayEqual(values, availability))
  }

  const onLoad = async (user?: movininTypes.User) => {
    setUser(user)
    setAdmin(Helper.admin(user))
    const allAgencies = await AgencyService.getAllAgencies()
    const agencies = movininHelper.flattenAgencies(allAgencies)
    setAllAgencies(allAgencies)
    setAgencies(agencies)
    setLoading(false)
  }

  return (
    <Master onLoad={onLoad} strict>
      {user && (
        <div className="properties">
          <div className="col-1">
            <div className="col-1-container">
              <Search onSubmit={handleSearch} className="search" />

              <Button type="submit" variant="contained" className="btn-primary new-property" size="small" href="/create-property">
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
                    onChange={handlePropertyTypeFilterChange} />
                  <RentalTermFilter
                    className="rental-term-filter"
                    onChange={handleRentalTermFilterChange} />
                  {
                    admin &&
                    <AvailabilityFilter
                      className="property-filter"
                      onChange={handleAvailabilityFilterChange} />
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
              reload={reload}
              loading={loading}
              language={user.language || Env.DEFAULT_LANGUAGE}
              onLoad={handlePropertyListLoad}
              onDelete={handlePropertyDelete}
            />
          </div>
        </div>
      )}
    </Master>
  )
}

export default Properties
