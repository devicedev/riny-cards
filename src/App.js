import React from 'react'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { Profile, Main, Login, Signin } from './components'

import GlobalStyle from './theme/globalStyles'
import Theme from './theme/theme'

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle/>
      <Router>
        <ToastContainer/>
        <Switch>
          <Route path={'/profile'} component={Profile}/>
          <Route path={'/login'} render={props => <Main><Login/></Main>}/>
          <Route path={'/signin'} render={props => <Main><Signin/></Main>}/>
          <Route path={'/'} exact component={Main}/>
        </Switch>
      </Router>
    </ThemeProvider>
  )
}

export default App
