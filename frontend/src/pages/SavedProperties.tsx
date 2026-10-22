import React, { useState } from 'react'
import * as movininTypes from ':movinin-types'
import env from '@/config/env.config'
import { strings } from '@/lang/properties'
import * as helper from '@/utils/helper'
import * as SavedPropertyService from '@/services/SavedPropertyService'
import Layout from '@/components/Layout'
import PropertyList from '@/components/PropertyList'
import Footer from '@/components/Footer'

import '@/assets/css/saved-properties.css'

const SavedProperties = () => {
  const [user, setUser] = useState<movininTypes.User>()
  const [properties, setProperties] = useState<movininTypes.Property[]>([])
  const [loading, setLoading] = useState(true)

  const onLoad = async (_user?: movininTypes.User) => {
    setUser(_user)
    if (!_user) {
      setLoading(false)
      return
    }

    try {
      const data = await SavedPropertyService.getSavedProperties(_user.language || env.DEFAULT_LANGUAGE)
      setProperties(data)
    } catch (err) {
      helper.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSavedChange = (propertyId: string, isSaved: boolean) => {
    if (!isSaved) {
      setProperties((current) => current.filter((property) => property._id !== propertyId))
    }
  }

  return (
    <Layout onLoad={onLoad} strict>
      <main className="saved-properties-page">
        <h1>{strings.SAVED_PROPERTIES}</h1>
        {!loading && user && properties.length === 0
          ? <p className="saved-properties-empty">{strings.EMPTY_SAVED_PROPERTIES}</p>
          : <PropertyList properties={properties} hidePrice sizeAuto onSavedChange={handleSavedChange} />}
      </main>
      <Footer />
    </Layout>
  )
}

export default SavedProperties
