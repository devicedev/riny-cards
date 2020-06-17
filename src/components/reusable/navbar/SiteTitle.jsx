import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBitcoin } from '@fortawesome/free-brands-svg-icons'

import { siteTitle } from '../../../config'

export const SiteTitle = () => {
  return (
    <>
      <NavLeftLogo icon={faBitcoin} />
      <SiteTitleWrapper>{siteTitle}</SiteTitleWrapper>
    </>
  )
}
const NavLeftLogo = styled(FontAwesomeIcon)`
  color: #fff;
  font-size: 4rem;
`
const SiteTitleWrapper = styled.h1`
  color: #fff;
  font-weight: bold;
  font-size: 2.9rem;
  margin-left: 1rem;
  letter-spacing: normal;
`
