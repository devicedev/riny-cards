import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import authService from '../../services/authService'

export const ProtectedRoute = ({ fail, component: Component, render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (authService.getCurrentUser())
          return Component ? <Component {...props}/> : render(props)
        else
          return <Redirect to={{
            pathname: fail,
            state: {
              from: props.location
            }
          }}/>
      }}
    />
  )
}