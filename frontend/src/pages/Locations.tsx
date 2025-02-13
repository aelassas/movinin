import React, { useState } from 'react'
import { Dialog, DialogContent } from '@mui/material'
import L from 'leaflet'
import env from '@/config/env.config'
import * as movininTypes from ':movinin-types'
import * as LocationService from '@/services/LocationService'
import Layout from '@/components/Layout'
import Map from '@/components/Map'
import SearchForm from '@/components/SearchForm'
import Footer from '@/components/Footer'

import '@/assets/css/locations.css'

const Locations = () => {
  const [locations, setLocations] = useState<movininTypes.Location[]>([])
  const [location, setLocation] = useState('')
  const [openSearchFormDialog, setOpenSearchFormDialog] = useState(false)

  const onLoad = async () => {
    const _locations = await LocationService.getLocationsWithPosition()
    setLocations(_locations)
  }

  return (
    <Layout onLoad={onLoad} strict={false}>
      <div className="locations">
        <Map
          position={new L.LatLng(env.MAP_LATITUDE, env.MAP_LONGITUDE)}
          initialZoom={env.MAP_ZOOM}
          locations={locations}
          onSelelectLocation={async (locationId) => {
            setLocation(locationId)
            setOpenSearchFormDialog(true)
          }}
        />
      </div>

      <Dialog
        fullWidth={env.isMobile}
        maxWidth={false}
        open={openSearchFormDialog}
        onClose={() => {
          setOpenSearchFormDialog(false)
        }}
      >
        <DialogContent className="search-dialog-content">
          <SearchForm
            location={location}
            onCancel={() => {
              setOpenSearchFormDialog(false)
            }}
          />
        </DialogContent>
      </Dialog>

      <Footer />
    </Layout>
  )
}

export default Locations
