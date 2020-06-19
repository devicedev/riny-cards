import React from 'react'
import styled from 'styled-components'

export const Authentication = ({ children }) => {
  return <Wrapper>{children}</Wrapper>
}
const Wrapper = styled.div`
  flex: 1;
  padding: 0 35rem;
  text-align: center;
  height: 70vh;
`
