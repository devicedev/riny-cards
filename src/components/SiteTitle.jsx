import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { ReactComponent as Logo } from '../res/logobigstroke.svg'

export const SiteTitle = () => {
  return (
    <LinkWrapper to={'/'}>
      <BeneLogo/>
      <SiteTitleWrapper>rinycards</SiteTitleWrapper>
    </LinkWrapper>
  )
}
const LinkWrapper = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
`
const BeneLogo = styled(Logo)`
  height: 4rem;
`
const SiteTitleWrapper = styled.h1`
  color: #fff;
  font-weight: bold;
  font-size: 2.9rem;
  margin-left: 1rem;
`
