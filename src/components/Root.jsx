import React from 'react'
import styled from 'styled-components'

import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { SearchProvider } from '../utils/SearchContext'

export const Root = (content) => {
  return (
    <SearchProvider>
      <RootWrapper>
        <Navbar/>
        <Content>
          {content}
        </Content>
        <Footer/>
      </RootWrapper>
    </SearchProvider>
  )
}

const Content = ({ children }) => {
  return <ContentWrapper>{children}</ContentWrapper>
}

const RootWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`

const ContentWrapper = styled.div`
  flex: 1;
  margin: 8vh 0;
  padding: 2rem;

  @media (min-width: 768px) {
    padding: 2rem 10rem;
  }
  @media (min-width: 1024px) {
    padding: 2rem 15rem;
  }
  @media (min-width: 1281px) {
    padding: 2rem 20rem;
  }
`
