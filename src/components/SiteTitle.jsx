import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faReact} from '@fortawesome/free-brands-svg-icons'

export const SiteTitle = () => {
  return (
    <LinkWrapper to={'/'}>
      <NavLeftLogo icon={faReact} />
      <SiteTitleWrapper>rinycards</SiteTitleWrapper>
    </LinkWrapper>
  )
}
const LinkWrapper = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
`
const NavLeftLogo = styled(FontAwesomeIcon)`
  color: #fff;
  font-size: 4rem;
`
const SiteTitleWrapper = styled.h1`
  color: #fff;
  font-weight: bold;
  font-size: 2.9rem;
  margin-left: 1rem;
`
