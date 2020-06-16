import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBitcoin } from '@fortawesome/free-brands-svg-icons'
import { NavbarSearch } from './NavbarSearch'

export const NavbarLeft = () => {
  return (
    <Wrapper>
      <FontAwesomeIcon
        size={'4x'}
        icon={faBitcoin}
        color={'#FFF'}
      />
      <SiteTitle>
        rinycards
      </SiteTitle>
      <NavbarSearch/>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`
const SiteTitle = styled.h1`
  color:#FFF;
  font-weight: bold;
  font-size: 2.9rem;
  margin-left: 1rem;
  letter-spacing: normal;
`
