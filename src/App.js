import React from 'react'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import { Profile, LogIn, SignUp, NotFound, LogOut, ProtectedRoute } from './components'

import GlobalStyle from './theme/globalStyles'
import Theme from './theme/theme'

import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle/>
      <Router>
        <Switch>
          <ProtectedRoute path={'/'} fail={'/login'} exact component={Profile}/>
          <ProtectedRoute path={'/logout'} fail={'/login'} component={LogOut}/>
          <ProtectedRoute
            path={'/login'}
            fail={'/'}
            condition={'loggedOut'}
            component={LogIn}
          />
          <ProtectedRoute
            path={'/signup'}
            fail={'/'}
            condition={'loggedOut'}
            component={SignUp}
          />
          <Route path={'/not-found'} component={NotFound}/>
          <Redirect to={'/not-found'}/>
        </Switch>
      </Router>
    </ThemeProvider>
  )
}

export default App
