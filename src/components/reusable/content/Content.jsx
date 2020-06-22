import React from 'react'
import styled from 'styled-components'

export const Content = ({ children }) => {
  return <Wrapper>{children}</Wrapper>
}
const Wrapper = styled.div`
  display: flex;
  padding: 10rem 15rem 5rem 15rem;
`
