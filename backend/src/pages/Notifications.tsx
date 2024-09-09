import React, { useState } from 'react'
import * as movininTypes from ':movinin-types'
import Layout from '@/components/Layout'
import NotificationList from '@/components/NotificationList'

const Notifications = () => {
  const [user, setUser] = useState<movininTypes.User>()

  const onLoad = async (_user?: movininTypes.User) => {
    setUser(_user)
  }

  return (
    <Layout onLoad={onLoad} strict>
      <NotificationList user={user} />
    </Layout>
  )
}

export default Notifications
