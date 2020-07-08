import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import authService from '../services/authService'

export const ProtectedRoute = ({ fail = '/login', condition = 'loggedIn', component: Component, render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        let redirect = false
        const RedirectComponent = <Redirect to={{
          pathname: fail,
          state: {
            from: props.location
          }
        }}/>
        const user = authService.getCurrentUser()
        switch (condition) {
          case 'loggedIn':
            if (user)
              return Component ? <Component {...props}/> : render(props)
            else
              redirect = true
            break
          case 'loggedOut':
            if (!user)
              return Component ? <Component {...props}/> : render(props)
            else
              redirect = true
            break
          default:
            return RedirectComponent
        }
        if (redirect)
          return RedirectComponent
      }}
    />
  )
}