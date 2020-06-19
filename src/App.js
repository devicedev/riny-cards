import React from 'react'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { Profile, Main, LogIn, SignUp } from './components'

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
          <Route path={'/login'} render={props => <Main><LogIn/></Main>}/>
          <Route path={'/signup'} render={props => <Main><SignUp/></Main>}/>
          <Route path={'/'} exact component={Main}/>
        </Switch>
      </Router>
    </ThemeProvider>
  )
}

export default App
