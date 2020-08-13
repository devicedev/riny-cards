import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { ReactComponent as Logo } from '../res/new-logo.svg'
import { useMediaQuery } from 'react-responsive'
import authService from '../services/authService'

export const SiteTitle = () => {
  const user = authService.getCurrentUser()
  const isMobileOrTablet = useMediaQuery({ maxWidth: 1023 })
  return (
    <LinkWrapper to={'/'}>
      <BeneLogo/>
      {(!user || !isMobileOrTablet) && <SiteTitleWrapper>rinycards</SiteTitleWrapper>}
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
  .cls-1,
  .cls-3,
  .cls-4,
  .cls-5,
  .cls-7,
  .cls-8,
  .cls-9{fill:${({ theme }) => theme.colors.primaryColor};}
  .cls-1,
  .cls-3,
  .cls-4,
  .cls-7,
  .cls-8{stroke:none;}
  .cls-1,
  .cls-2,
  .cls-3,
  .cls-4,
  .cls-5,
  .cls-6,
  .cls-7,
  .cls-8,
  .cls-9{stroke-miterlimit:10;}
  .cls-1{stroke-width:15px;}
  .cls-2{fill:${({ theme }) => theme.colors.primaryColor};stroke-width:90px;}
  .cls-2,
  .cls-5,
  .cls-6,
  .cls-9{stroke:#FFF;}
  .cls-3,
  .cls-9{stroke-width:40px;}
  .cls-4{stroke-width:35px;}
  .cls-5{stroke-width:60px;}
  .cls-6{fill:#FFF;stroke-width:25px;}
  .cls-7{stroke-width:20px;}
  .cls-8{stroke-width:39px;}
`
const SiteTitleWrapper = styled.h1`
  color: #fff;
  font-weight: bold;
  font-size: 2.9rem;
  margin-left: 1rem;
`
