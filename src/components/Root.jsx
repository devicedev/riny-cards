import React from 'react'
import styled from 'styled-components'

import { Navbar } from './Navbar'
import { Footer } from './Footer'

export const Root = (content) => {
  return (
    <>
      <Navbar/>
      <Content>
        {content}
      </Content>
      <Footer/>
    </>
  )
}

const Content = ({ children }) => {
  return <Wrapper>{children}</Wrapper>
}

const Wrapper = styled.div`
  display: flex;
  padding: 10vh 15rem 5rem 15rem;
`
