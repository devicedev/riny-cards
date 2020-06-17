import React from 'react'
import styled from 'styled-components'

export const NavbarRight = ({ children }) => {
  return <Wrapper>{children}</Wrapper>
}
const Wrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`
