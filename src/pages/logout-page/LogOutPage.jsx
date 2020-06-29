import React from 'react'
import { Redirect } from 'react-router-dom'

import authService from '../../services/authService'

export const LogOutPage = () => {
  authService.logoutJwt()
  return <Redirect to={'/login'}/>
}
