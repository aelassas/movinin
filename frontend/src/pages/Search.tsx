import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Box, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import * as movininTypes from ':movinin-types'
import * as movininHelper from ':movinin-helper'
import env from '@/config/env.config'
import * as helper from '@/common/helper'
import { strings } from '@/lang/search'
import * as UserService from '@/services/UserService'
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

import ViewOnMap from '@/assets/img/view-on-map.png'

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
  const [language, setLanguage] = useState(env.DEFAULT_LANGUAGE)
  const [openMapDialog, setOpenMapDialog] = useState(false)

  const handleAgencyFilterChange = (newAgencies: string[]) => {
    setAgencies(newAgencies)
  }

  const handlePropertyFilterSubmit = (filter: movininTypes.PropertyFilter) => {
    setLocation(filter.location)
    setFrom(filter.from)
    setTo(filter.to)
  }

  const handlePropertyTypeFilterChange = (values: movininTypes.PropertyType[]) => {
    setPropertyTypes(values)
  }

  const handleRentalTermFilterChange = (values: movininTypes.RentalTerm[]) => {
    setRentalTerms(values)
  }

  const onLoad = async (user?: movininTypes.User) => {
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

    setLanguage(UserService.getLanguage())

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
                    position={[location.latitude || 36.966428, location.longitude || -95.844032]}
                    initialZoom={location.latitude && location.longitude ? 10 : 2.5}
                    locations={[location]}
                    className="map"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setOpenMapDialog(true)
                      }}
                      className="view-on-map"
                    >
                      <img alt="View On Map" src={ViewOnMap} />
                      <span>{strings.VIEW_ON_MAP}</span>
                    </button>
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
                <AgencyFilter
                  className="filter"
                  agencies={allAgencies}
                  onChange={handleAgencyFilterChange}
                />
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
            <PropertyList
              agencies={agencies}
              types={propertyTypes}
              rentalTerms={rentalTerms}
              location={location._id}
              loading={loading}
              from={from}
              to={to}
              language={language}
            />
          </div>
        </div>
      )}

      <Dialog
        fullWidth={env.isMobile}
        maxWidth={false}
        open={openMapDialog}
        onClose={() => {
          setOpenMapDialog(false)
        }}
        sx={{
          '& .MuiDialog-container': {
            '& .MuiPaper-root': {
              width: '80%',
              height: '800px',
            },
          },
        }}
      >
        <DialogTitle>
          <Box display="flex" justifyContent="flex-end">
            <Box>
              <IconButton
                onClick={() => {
                  setOpenMapDialog(false)
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent className="map-dialog-content">
          {location && (
            <Map
              position={[location.latitude || 36.966428, location.longitude || -95.844032]}
              initialZoom={location.latitude && location.longitude ? 10 : 2.5}
              locations={[location]}
              className="map"
            >
              <button
                type="button"
                onClick={() => { }}
                className="view-on-map"
              >
                <img alt="View On Map" src={ViewOnMap} />
                <span>{strings.VIEW_ON_MAP}</span>
              </button>
            </Map>
          )}
        </DialogContent>
      </Dialog>

      {noMatch && <NoMatch hideHeader />}
    </Layout>
  )
}

export default Properties
