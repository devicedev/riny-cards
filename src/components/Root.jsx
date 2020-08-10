import React from 'react'
import styled from 'styled-components'

import { Navbar } from './Navbar'
import { Footer } from './Footer'
import {SearchProvider} from '../utils/SearchContext'

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
  padding: 10vh 15rem 5rem 15rem;
`
