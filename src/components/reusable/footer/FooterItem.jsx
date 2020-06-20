import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

export const FooterItem = ({ item: { title, url } }) => {
  return (
    <NavLinkWrapper to={url}>
      <FooterItemTitle>{title}</FooterItemTitle>
    </NavLinkWrapper>
  )
}
const NavLinkWrapper = styled(NavLink)`
  display: flex;
  padding: 2rem 0;
  margin-left: 4rem;
  align-items: center;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.menuTextColor};
  cursor: pointer;
  text-decoration: none;
  &:hover {
    opacity: 0.7;
  }
`
const FooterItemTitle = styled.div`
  font-weight: 500;
`
