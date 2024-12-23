import React, { useState } from 'react'
import { Tabs, Tab, Dialog, DialogContent } from '@mui/material'
import L from 'leaflet'
import * as movininTypes from ':movinin-types'
import env from '@/config/env.config'
import { strings } from '@/lang/home'
import * as CountryService from '@/services/CountryService'
import * as LocationService from '@/services/LocationService'
import Layout from '@/components/Layout'
import SearchForm from '@/components/SearchForm'
import LocationCarrousel from '@/components/LocationCarrousel'
import TabPanel, { a11yProps } from '@/components/TabPanel'
import Map from '@/components/Map'
import Footer from '@/components/Footer'

import '@/assets/css/home.css'

const Home = () => {
  const [countries, setCountries] = useState<movininTypes.CountryInfo[]>([])
  const [tabValue, setTabValue] = useState(0)
  const [openLocationSearchFormDialog, setOpenLocationSearchFormDialog] = useState(false)
  const [locations, setLocations] = useState<movininTypes.Location[]>([])
  const [location, setLocation] = useState('')
  const [videoLoaded, setVideoLoaded] = useState(false)

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const onLoad = async () => {
    const _countries = await CountryService.getCountriesWithLocations('', true, env.MIN_LOCATIONS)
    setCountries(_countries)
    const _locations = await LocationService.getLocationsWithPosition()
    setLocations(_locations)

    const video = document.getElementById('cover') as HTMLVideoElement
    if (video) {
      video.muted = true
      video.play()
    } else {
      console.error('Cover video tag not loaded')
    }
  }

  return (
    <Layout onLoad={onLoad} strict={false}>
      <div className="home">
        {/* <div className="home-content">

          <div className="home-cover">{strings.COVER}</div>

          <div className="home-search">
            <SearchForm />
          </div>

        </div> */}

        <div className="home-content">

          <div className="video">
            <video
              id="cover"
              muted={!env.isSafari}
              autoPlay={!env.isSafari}
              loop
              playsInline
              disablePictureInPicture
              onLoadedData={async () => {
                setVideoLoaded(true)
              }}
            >
              <source src="cover.mp4" type="video/mp4" />
              <track kind="captions" />
            </video>
            {!videoLoaded && (
              <div className="video-background" />
            )}
          </div>

          <div className="home-title">{strings.TITLE}</div>
          <div className="home-cover">{strings.COVER}</div>
          {/* <div className="home-subtitle">{strings.SUBTITLE}</div> */}

        </div>

        <div className="search">
          <div className="home-search">
            <SearchForm />
          </div>
        </div>

        {countries.length > 0 && (
          <div className="destinations">
            <h1>{strings.DESTINATIONS_TITLE}</h1>
            <div className="tabs">
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                aria-label="destinations"
                TabIndicatorProps={{ sx: { display: env.isMobile ? 'none' : null } }}
                sx={{
                  '& .MuiTabs-flexContainer': {
                    flexWrap: 'wrap',
                  },
                }}
              >
                {
                  countries.map((country, index) => (
                    <Tab key={country._id} label={country.name?.toUpperCase()} {...a11yProps(index)} />
                  ))
                }
              </Tabs>

              {
                countries.map((country, index) => (
                  <TabPanel key={country._id} value={tabValue} index={index}>
                    <LocationCarrousel
                      locations={country.locations!}
                      onSelect={(_location) => {
                        setLocation(_location._id)
                        setOpenLocationSearchFormDialog(true)
                      }}
                    />
                  </TabPanel>
                ))
              }
            </div>
          </div>
        )}

        <div className="home-map">
          <Map
            title={strings.MAP_TITLE}
            position={new L.LatLng(36.966428, -95.844032)}
            initialZoom={5}
            locations={locations}
            onSelelectLocation={async (locationId) => {
              setLocation(locationId)
              setOpenLocationSearchFormDialog(true)
            }}
          />
        </div>

        <Footer />
      </div>

      <Dialog
        fullWidth={env.isMobile}
        maxWidth={false}
        open={openLocationSearchFormDialog}
        onClose={() => {
          setOpenLocationSearchFormDialog(false)
        }}
      >
        <DialogContent className="search-dialog-content">
          <SearchForm
            location={location}
            // onCancel={() => {
            //   setOpenLocationSearchFormDialog(false)
            // }}
          />
        </DialogContent>
      </Dialog>

    </Layout>
  )
}

export default Home
