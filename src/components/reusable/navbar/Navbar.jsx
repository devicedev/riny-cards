import React from 'react'
import styled from 'styled-components'

export const Navbar = ({ children }) => {
  return <Wrapper>{children}</Wrapper>
}
const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.primaryColor};
  height: 8vh;
  width: 100vw;
  position: fixed;
  padding: 0 15rem;
  display: flex;
  z-index: 100;
`
