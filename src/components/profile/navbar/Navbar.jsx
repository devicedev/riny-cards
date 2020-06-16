import React from 'react'
import styled from 'styled-components'

import { NavbarLeft } from './NavbarLeft'
import { NavbarRight } from './NavbarRight'

export const Navbar = () => {
  return <Wrapper>
    <NavbarLeft/>
    <NavbarRight/>
  </Wrapper>
}
const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.primaryColor};
  height: 8vh;
  width: 100vw;
  position: fixed;
  padding: 0 15rem;
  display: flex;
`
