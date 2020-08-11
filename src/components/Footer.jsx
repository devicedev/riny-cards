import React from 'react'
import styled from 'styled-components'

import { NavLink } from 'react-router-dom'

export const Footer = () => {
  return (
    <Wrapper>
      {footerItems.map((item, index) => (
        <FooterItem item={item} key={index}/>
      ))}
    </Wrapper>
  )
}

const FooterItem = ({ item: { title, url } }) => {
  return (
    <NavLinkWrapper to={url}>
      <FooterItemTitle>{title}</FooterItemTitle>
    </NavLinkWrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  height: 8vh;
  justify-content: center;
  padding: 0 15rem;
`
const footerItems = [
  {
    title: 'About',
    url: '/main'
  },
  {
    title: 'Terms',
    url: '/terms'
  },
  {
    title: 'Privacy',
    url: '/privacy'
  },
  {
    title: 'Duolingo',
    url: '/duolingo'
  },
  {
    title: 'Facebook',
    url: '/facebook'
  },
  {
    title: 'Twitter',
    url: '/twitter'
  }
]

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
