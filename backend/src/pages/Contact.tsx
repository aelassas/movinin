import React, { useState } from 'react'
import * as movininTypes from ':movinin-types'
import Layout from '@/components/Layout'
import ContactForm from '@/components/ContactForm'

import '@/assets/css/contact.css'

const Contact = () => {
  const [user, setUser] = useState<movininTypes.User>()

  const onLoad = (_user?: movininTypes.User) => {
    setUser(_user)
  }

  return (
    <Layout onLoad={onLoad} strict>
      <div className="contact">
        <ContactForm user={user} className="form" />
      </div>
    </Layout>
  )
}

export default Contact
