import React from 'react'
import Layout from '@/components/Layout'
import AgencyList from '@/components/AgencyList'
import Footer from '@/components/Footer'

import '@/assets/css/agencies.css'

const Agencies = () => {
  const onLoad = () => {
  }

  return (
    <Layout onLoad={onLoad} strict={false}>
      <div className="agencies">
        <AgencyList />
      </div>
      <Footer />
    </Layout>
  )
}

export default Agencies
