import React from 'react'
import styled from 'styled-components'

export const NavbarLeft = ({ children }) => {
  return <Wrapper>{children}</Wrapper>
}
const Wrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`
