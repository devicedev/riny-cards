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
  height: 92vh;
  width: 100vw;
`

const ContentWrapper = styled.div`
  margin-top: 8vh;
  padding: 2rem;
  min-height: 84vh;
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
