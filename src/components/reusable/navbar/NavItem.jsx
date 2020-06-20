import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom'

export const NavItem = ({ item: { icon, title, url } }) => {
  return (
    <NavLinkWrapper to={url}>
      {icon && <NavItemIcon icon={icon} />}
      <NavItemTitle>{title}</NavItemTitle>
    </NavLinkWrapper>
  )
}
const NavLinkWrapper = styled(NavLink)`
  display: flex;
  padding: 2rem 0;
  margin-left: 4rem;
  align-items: center;
  font-size: 1.5rem;
  color: #fff;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    opacity: 0.7;
  }
  &.active {
    border-bottom: 2px #fff solid;
  }
`
const NavItemIcon = styled(FontAwesomeIcon)`
  margin-right: 0.8rem;
`
const NavItemTitle = styled.div`
  font-weight: 500;
`
