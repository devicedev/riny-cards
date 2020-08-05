import React from 'react'
import { ThemeProvider } from 'styled-components'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import { ProtectedRoute } from './components'
import {
  ProfilePage,
  DeckPage,
  LogInPage,
  SignUpPage,
  NotFoundPage,
  LogOutPage,
  LessonPage,
  CreatePage,
  ContinuePage,
  UpdatePage
} from './pages'

import { GlobalStyle, Theme } from './theme'

import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle/>
      <ToastContainer position={'bottom-right'} pauseOnFocusLoss={false}/>
      <Router>
        <Switch>
          <ProtectedRoute path={'/decks/:id'} exact component={DeckPage}/>
          <ProtectedRoute path={'/decks/:id/:lesson'} exact component={LessonPage}/>
          <ProtectedRoute path={'/create'} exact component={CreatePage}/>
          <ProtectedRoute path={'/continue/:id'} exact component={ContinuePage}/>
          <ProtectedRoute path={'/update/:id'} exact component={UpdatePage}/>
          <ProtectedRoute path={'/logout'} exact component={LogOutPage}/>
          <ProtectedRoute path={'/'} exact component={ProfilePage}/>
          <ProtectedRoute
            path={'/login'}
            fail={'/'}
            exact
            condition={'loggedOut'}
            component={LogInPage}
          />
          <ProtectedRoute
            path={'/signup'}
            fail={'/'}
            exact
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
