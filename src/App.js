import React from 'react'
import styled, { ThemeProvider } from 'styled-components'

import { Navbar, Content } from './components/profile'

import GlobalStyle from './theme/globalStyles'
import Theme from './theme/theme'

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle/>
      <Wrapper>
        <Navbar/>
        <Content/>
      </Wrapper>
    </ThemeProvider>
  )
}

const Wrapper = styled.div`
`

export default App
