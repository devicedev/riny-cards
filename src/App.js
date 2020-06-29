import React from 'react'
import { ThemeProvider } from 'styled-components'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import { ProtectedRoute } from './components'
import { ProfilePage, DeckPage, LogInPage, SignUpPage, NotFoundPage, LogOutPage } from './pages'

import {GlobalStyle,Theme} from './theme'

import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle/>
      <ToastContainer position={'bottom-right'}/>
      <Router>
        <Switch>
          <ProtectedRoute path={'/'} fail={'/login'} exact component={ProfilePage}/>
          <ProtectedRoute path={'/decks/:id'} fail={'/login'} component={DeckPage}/>
          <ProtectedRoute path={'/logout'} fail={'/login'} component={LogOutPage}/>
          <ProtectedRoute
            path={'/login'}
            fail={'/'}
            condition={'loggedOut'}
            component={LogInPage}
          />
          <ProtectedRoute
            path={'/signup'}
            fail={'/'}
            condition={'loggedOut'}
            component={SignUpPage}
          />
          <Route path={'/not-found'} component={NotFoundPage}/>
          <Redirect to={'/not-found'}/>
        </Switch>
      </Router>
    </ThemeProvider>
  )
}
export default App
