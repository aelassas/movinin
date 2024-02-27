import React, { useState } from 'react'
import { Button } from '@mui/material'
import * as movininTypes from 'movinin-types'
import Master from '../components/Master'
import Env from '../config/env.config'
import { strings } from '../lang/users'
import * as Helper from '../common/Helper'
import UserTypeFilter from '../components/UserTypeFilter'
import Search from '../components/Search'
import UserList from '../components/UserList'

import '../assets/css/users.css'

const Users = () => {
  const [user, setUser] = useState<movininTypes.User>()
  const [admin, setAdmin] = useState(false)
  const [types, setTypes] = useState<movininTypes.UserType[]>([])
  const [keyword, setKeyword] = useState('')

  const handleUserTypeFilterChange = (newTypes: movininTypes.UserType[]) => {
    setTypes(newTypes)
  }

  const handleSearch = (newKeyword: string) => {
    setKeyword(newKeyword)
  }

  const onLoad = (_user?: movininTypes.User) => {
    const _admin = Helper.admin(_user)
    const _types = _admin
      ? Helper.getUserTypes().map((userType) => userType.value)
      : [movininTypes.UserType.Agency, movininTypes.UserType.User]

    setUser(_user)
    setAdmin(_admin)
    setTypes(_types)
  }

  return (
    <Master onLoad={onLoad} strict>
      {user && (
        <div className="users">
          <div className="col-1">
            <div className="div.col-1-container">
              <Search onSubmit={handleSearch} className="search" />

              {admin
                && (
                  <UserTypeFilter
                    className="user-type-filter"
                    onChange={handleUserTypeFilterChange}
                  />
                )}

              <Button variant="contained" className="btn-primary new-user" size="small" href="/create-user">
                {strings.NEW_USER}
              </Button>
            </div>
          </div>
          <div className="col-2">
            <UserList
              user={user}
              types={types}
              keyword={keyword}
              checkboxSelection={!Env.isMobile() && admin}
              hideDesktopColumns={Env.isMobile()}
            />
          </div>
        </div>
      )}
    </Master>
  )
}

export default Users
