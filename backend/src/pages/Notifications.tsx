import React, { useState } from 'react'
import * as movininTypes from 'movinin-types'
import Master from '../components/Master'
import NotificationList from '../components/NotificationList'

const Notifications = () => {
  const [user, setUser] = useState<movininTypes.User>()

  const onLoad = async (_user?: movininTypes.User) => {
    setUser(_user)
  }

  return (
    <Master onLoad={onLoad} strict>
      <NotificationList user={user} />
    </Master>
  )
}

export default Notifications
