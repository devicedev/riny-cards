import React from 'react'
import styled from 'styled-components'

import { NavLink } from 'react-router-dom'

export const Footer = () => {
  return (
    <Wrapper>
      {footerItems.map((item, index) => (
        <FooterItem item={item} last={index + 1 === footerItems.length ? 1 : 0} key={index}/>
      ))}
    </Wrapper>
  )
}

const FooterItem = ({ last, item: { title, url } }) => {
  return (
    <NavLinkWrapper to={url} last={last}>
      <FooterItemTitle>{title}</FooterItemTitle>
    </NavLinkWrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  height: 8vh;
  justify-content: center;
  width: 100%;
  padding: 0 5rem;
  @media (min-width: 768px) {
    padding: 0 10rem;
  }
  @media (min-width: 1024px) {
    padding: 0 15rem;
  }
  @media (min-width: 1281px) {
    padding: 0 20rem;
  }
`
const footerItems = [
  {
    title: 'About',
    url: '/about'
  },
  {
    title: 'Donate',
    url: '/donate'
  }
]

const NavLinkWrapper = styled(NavLink)`
  display: flex;
  padding: 2rem 0;
  margin-right: ${({ last }) => last ? '0' : '4rem'};
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
