import React from 'react'
import { ThemeProvider } from 'styled-components'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import { ProfilePage, DeckPage, LogInPage, SignUpPage, NotFound, LogOut, ProtectedRoute } from './components'

import GlobalStyle from './theme/globalStyles'
import Theme from './theme/theme'

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
          <ProtectedRoute path={'/logout'} fail={'/login'} component={LogOut}/>
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
          <Route path={'/not-found'} component={NotFound}/>
          <Redirect to={'/not-found'}/>
        </Switch>
      </Router>
    </ThemeProvider>
  )
}
export default App
