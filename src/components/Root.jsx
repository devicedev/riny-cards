import React from 'react'
import styled from 'styled-components'

import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { SearchProvider } from '../utils/SearchContext'

export const Root = (content) => {
  return (
    <SearchProvider>
      <Navbar/>
      <Content>
        {content}
      </Content>
      <Footer/>
    </SearchProvider>
  )
}

const Content = ({ children }) => {
  return <Wrapper>{children}</Wrapper>
}

const Wrapper = styled.div`
  display: flex;
  margin: 8vh 0;
  
  @media (min-width: 320px) and (max-width: 480px) {
    padding: 2rem;
  }
  @media (min-width: 481px) and (max-width: 767px) {
    
  }
  @media (min-width: 768px) and (max-width: 1024px) {

  }
  @media (min-width: 1025px) and (max-width: 1280px) {
  
  }
  @media (min-width: 1281px) {
    padding: 2rem 15rem;
  }
`
