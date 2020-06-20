import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'

import authService from '../../../services/authService'

export const LogOut = () => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    authService.logoutJwt()
    setLoading(false)
  }, [])
  if (!loading)
    return <Redirect to={'/login'}/>
  return null
}
