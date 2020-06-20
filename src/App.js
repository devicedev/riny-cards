import React from 'react'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import { Profile, Main, LogIn, SignUp, NotFound, LogOut, ProtectedRoute } from './components'

import GlobalStyle from './theme/globalStyles'
import Theme from './theme/theme'

import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle/>
      <Router>
        <Switch>
          <ProtectedRoute fail={'/login'} exact path={'/'} component={Profile}/>
          <Route path={'/login'} render={props => <Main><LogIn {...props}/></Main>}/>
          <Route path={'/signup'} render={props => <Main><SignUp {...props}/></Main>}/>
          <Route path={'/logout'} component={LogOut}/>
          <Route path={'/not-found'} component={NotFound}/>
          <Redirect to={'/not-found'}/>
        </Switch>
      </Router>
    </ThemeProvider>
  )
}

export default App
