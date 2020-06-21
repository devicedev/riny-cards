import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import authService from '../../services/authService'

export const ProtectedRoute = ({ fail, condition = 'loggedIn', component: Component, render, ...rest }) => {
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
        switch (condition) {
          case 'loggedIn':
            if (authService.getCurrentUser())
              return Component ? <Component {...props}/> : render(props)
            else
              redirect = true
            break
          case 'loggedOut':
            if (!authService.getCurrentUser())
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