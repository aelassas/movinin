import React, { useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import * as movininTypes from ':movinin-types'
import * as movininHelper from ':movinin-helper'
import * as helper from '@/utils/helper'
import * as LocationService from '@/services/LocationService'
import * as AgencyService from '@/services/AgencyService'
import Layout from '@/components/Layout'
import NoMatch from './NoMatch'
import PropertyFilter from '@/components/PropertyFilter'
import AgencyFilter from '@/components/AgencyFilter'
import RentalTermFilter from '@/components/RentalTermFilter'
import PropertyList from '@/components/PropertyList'
import PropertyTypeFilter from '@/components/PropertyTypeFilter'
import Map from '@/components/Map'
import ViewOnMapButton from '@/components/ViewOnMapButton'
import MapDialog from '@/components/MapDialog'
import PropertySort from '@/components/PropertySort'
import env from '@/config/env.config'

import '@/assets/css/search.css'

const Properties = () => {
  const reactLocation = useLocation()

  const [visible, setVisible] = useState(false)
  const [noMatch, setNoMatch] = useState(false)
  const [location, setLocation] = useState<movininTypes.Location>()
  const [from, setFrom] = useState<Date>()
  const [to, setTo] = useState<Date>()
  const [allAgencies, setAllAgencies] = useState<movininTypes.User[]>([])
  const [agencies, setAgencies] = useState<string[]>()
  const [loading, setLoading] = useState(true)
  const [propertyTypes, setPropertyTypes] = useState(movininHelper.getAllPropertyTypes())
  const [rentalTerms, setRentalTerms] = useState(movininHelper.getAllRentalTerms())
  const [sortBy, setSortBy] = useState<movininTypes.PropertySortType>(movininTypes.PropertySortType.Default)
  const [openMapDialog, setOpenMapDialog] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const initializedRef = useRef(false)

  const handleAgencyFilterChange = (newAgencies: string[]) => {
    setAgencies(newAgencies)
  }

  const handlePropertyFilterSubmit = async (filter: movininTypes.PropertyFilter) => {
    let _location = filter.location

    // The filter only provides the location id and name, load the full location (coordinates, etc.)
    if (location && location._id === _location._id) {
      _location = location
    } else {
      try {
        _location = await LocationService.getLocation(_location._id as string) ?? _location
      } catch (err) {
        helper.error(err)
      }
    }

    setLocation(_location)
    setFrom(filter.from)
    setTo(filter.to)
    // Always query again, even if the search criteria are unchanged, as property data may have changed
    setRefreshKey((prev) => prev + 1)
  }

  const handlePropertyTypeFilterChange = (values: movininTypes.PropertyType[]) => {
    setPropertyTypes(values)
  }

  const handleRentalTermFilterChange = (values: movininTypes.RentalTerm[]) => {
    setRentalTerms(values)
  }

  const onLoad = async (user?: movininTypes.User) => {
    // onLoad is called again each time the user changes (e.g. when saving a property),
    // in that case keep the current search instead of resetting it to the initial one
    if (initializedRef.current) {
      if (!user || user.verified) {
        setVisible(true)
      }
      return
    }

    const { state } = reactLocation
    if (!state) {
      setNoMatch(true)
      return
    }
    const { locationId } = state
    const { from: _from } = state
    const { to: _to } = state

    if (!locationId || !_from || !_to) {
      setLoading(false)
      setNoMatch(true)
      return
    }

    initializedRef.current = true

    let _location: movininTypes.Location | null = null
    try {
      _location = await LocationService.getLocation(locationId)

      if (!_location) {
        setLoading(false)
        setNoMatch(true)
        return
      }

      const _allAgencies = await AgencyService.getAllAgencies()
      const _agencies = movininHelper.flattenAgencies(_allAgencies)

      setLocation(_location)
      setFrom(_from)
      setTo(_to)
      setAllAgencies(_allAgencies)
      setAgencies(_agencies)
      setLoading(false)
      if (!user || (user && user.verified)) {
        setVisible(true)
      }
    } catch (err) {
      initializedRef.current = false
      helper.error(err)
    }
  }

  return (
    <Layout onLoad={onLoad} strict={false}>
      {visible && agencies && location && from && to && (
        <div className="properties">
          <div className="col-1">
            {!loading && (
              <>
                {location.latitude && location.longitude && (
                  <Map
                    position={[location.latitude || env.MAP_LATITUDE, location.longitude || env.MAP_LONGITUDE]}
                    initialZoom={location.latitude && location.longitude ? 10 : 2.5}
                    locations={[location]}
                    className="map"
                  >
                    <ViewOnMapButton onClick={() => setOpenMapDialog(true)} />
                  </Map>
                )}
                <PropertyFilter
                  className="filter"
                  location={location}
                  from={from}
                  to={to}
                  collapse
                  onSubmit={handlePropertyFilterSubmit}
                />
                {!env.HIDE_AGENCIES && (
                  <AgencyFilter
                    className="filter"
                    agencies={allAgencies}
                    onChange={handleAgencyFilterChange}
                  />
                )}
                <PropertyTypeFilter
                  className="filter"
                  onChange={handlePropertyTypeFilterChange}
                />
                <RentalTermFilter
                  className="filter"
                  onChange={handleRentalTermFilterChange}
                />
              </>
            )}
          </div>
          <div className="col-2">
            <PropertySort
              value={sortBy}
              onChange={(newSortBy) => setSortBy(newSortBy)}
            />
            <PropertyList
              agencies={agencies}
              types={propertyTypes}
              rentalTerms={rentalTerms}
              location={location._id}
              loading={loading}
              from={from}
              to={to}
              sortBy={sortBy}
              refreshKey={refreshKey}
              hideAgency={env.HIDE_AGENCIES}
            />
          </div>
        </div>
      )}

      <MapDialog
        location={location}
        openMapDialog={openMapDialog}
        onClose={() => setOpenMapDialog(false)}
      />

      {noMatch && <NoMatch hideHeader />}
    </Layout>
  )
}

export default Properties
