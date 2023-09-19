import React, { useState } from 'react'
import Env from '../config/env.config'
import * as Helper from '../common/Helper'
import * as LocationService from '../services/LocationService'
import * as AgencyService from '../services/AgencyService'
import Master from '../components/Master'
import NoMatch from './NoMatch'
import PropertyFilter from '../components/PropertyFilter'
import AgencyFilter from '../components/AgencyFilter'
import RentalTermFilter from '../components/RentalTermFilter'
import PropertyList from '../components/PropertyList'
import * as movininTypes from 'movinin-types'
import * as movininHelper from 'movinin-helper'

import '../assets/css/properties.css'
import PropertyTypeFilter from '../components/PropertyTypeFilter'

const Properties = () => {
  const [visible, setVisible] = useState(false)
  const [noMatch, setNoMatch] = useState(false)
  const [location, setLocation] = useState<movininTypes.Location>()
  const [from, setFrom] = useState<Date>()
  const [to, setTo] = useState<Date>()
  const [allAgencies, setAllAgencies] = useState<movininTypes.User[]>([])
  const [agencies, setAgencies] = useState<string[]>([])
  const [reload, setReload] = useState(false)
  const [loading, setLoading] = useState(true)
  const [propertyTypes, setPropertyTypes] = useState(movininHelper.getAllPropertyTypes())
  const [rentalTerms, setRentalTerms] = useState(movininHelper.getAllRentalTerms())

  const handlePropertyListLoad = () => {
    setReload(false)
  }

  const handleAgencyFilterChange = (newAgencies: string[]) => {
    setAgencies(newAgencies)
    setReload(movininHelper.arrayEqual(newAgencies, agencies))
  }

  const handlePropertyFilterSubmit = (filter: movininTypes.PropertyFilter) => {
    setLocation(filter.location)
    setFrom(filter.from)
    setTo(filter.to)
    setReload((location && location._id === filter.location._id) || false)
  }

  const handlePropertyTypeFilterChange = (values: movininTypes.PropertyType[]) => {
    setPropertyTypes(values)
    setReload(movininHelper.arrayEqual(values, propertyTypes))
  }

  const handleRentalTermFilterChange = (values: movininTypes.RentalTerm[]) => {
    setRentalTerms(values)
    setReload(movininHelper.arrayEqual(values, rentalTerms))
  }

  const onLoad = async (user?: movininTypes.User) => {
    let locationId: string | null = null
    let location: movininTypes.Location | null = null
    let from: Date | null = null
    let to: Date | null = null

    const params = new URLSearchParams(window.location.search)
    if (params.has('l')) {
      locationId = params.get('l')
    }
    if (params.has('f')) {
      const val = params.get('f')
      from = val && movininHelper.isInteger(val) ? new Date(Number.parseInt(val)) : null
    }
    if (params.has('t')) {
      const val = params.get('t')
      to = val && movininHelper.isInteger(val) ? new Date(Number.parseInt(val)) : null
    }

    if (!locationId || !from || !to) {
      setLoading(false)
      setNoMatch(true)
      return
    }

    try {
      location = await LocationService.getLocation(locationId)

      if (!location) {
        setLoading(false)
        setNoMatch(true)
        return
      }

      const allAgencies = await AgencyService.getAllAgencies()
      const agencies = movininHelper.flattenAgencies(allAgencies)

      setLocation(location)
      setFrom(from)
      setTo(to)
      setAllAgencies(allAgencies)
      setAgencies(agencies)
      setLoading(false)
      if (!user || (user && user.verified)) {
        setVisible(true)
      }
    } catch (err) {
      Helper.error(err)
    }
  }

  return (
    <Master onLoad={onLoad} strict={false}>
      {visible && agencies && location && from && to && (
        <div className="properties">
          <div className="col-1">
            {!loading && (
              <>
                <PropertyFilter
                  className="filter"
                  location={location}
                  from={from}
                  to={to}
                  onSubmit={handlePropertyFilterSubmit} />
                <AgencyFilter
                  className="filter"
                  agencies={allAgencies}
                  onChange={handleAgencyFilterChange}
                  collapse={!Env.isMobile()} />
                <PropertyTypeFilter
                  className="filter"
                  onChange={handlePropertyTypeFilterChange} />
                <RentalTermFilter
                  className="filter"
                  onChange={handleRentalTermFilterChange} />
              </>
            )}
          </div>
          <div className="col-2">
            <PropertyList
              agencies={agencies}
              types={propertyTypes}
              rentalTerms={rentalTerms}
              location={location._id}
              reload={reload}
              loading={loading}
              from={from}
              to={to}
              onLoad={handlePropertyListLoad}
            />
          </div>
        </div>
      )}
      {noMatch && <NoMatch hideHeader />}
    </Master>
  )
}

export default Properties
