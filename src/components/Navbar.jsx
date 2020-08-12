import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faSignInAlt, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons'
import { useMediaQuery } from 'react-responsive'

import authService from '../services/authService'

import { SiteTitle } from './SiteTitle'
import { NavbarSearch } from './'

export const Navbar = () => {
  const user = authService.getCurrentUser()
  const isMobile = useMediaQuery({ minWidth: 320, maxWidth: 480 })

  return <Wrapper>
    <NavbarLeft user={user}/>
    {!isMobile && <NavbarRight user={user}/>}
  </Wrapper>
}

const NavbarLeft = ({ user }) => {
  return <NavLeftWrapper>
    <SiteTitle/>
    {user && <NavbarSearch/>}
  </NavLeftWrapper>
}
const NavbarRight = ({ user }) => {
  let navItems
  if (user) {
    navItems = [
      {
        title: 'CREATE',
        icon: faPlus,
        url: '/create'
      },
      {
        title: 'LOGOUT',
        icon: faSignOutAlt,
        url: '/logout'
      },
      {
        title: user.name.toUpperCase(),
        icon: faUser,
        url: '/'
      }
    ]
  } else {
    navItems = [
      {
        title: 'SIGN UP',
        icon: faSignInAlt,
        url: '/signup'
      },
      {
        title: 'LOG IN',
        icon: faUser,
        url: '/login'
      }
    ]
  }
  return <NavRightWrapper>
    {navItems.map((item, index) => (
      <NavItem key={index} item={item}/>
    ))}
  </NavRightWrapper>
}
const NavItem = ({ item: { icon, title, url } }) => {
  return (
    <NavLinkWrapper exact to={url}>
      {icon && <NavItemIcon icon={icon}/>}
      <NavItemTitle>{title}</NavItemTitle>
    </NavLinkWrapper>
  )
}

const Wrapper = styled.div`
  top: 0;
  background-color: ${({ theme }) => theme.colors.primaryColor};
  height: 8vh;
  position: fixed;
  display: flex;
  z-index: 100;
  width: 100%;
  
  @media (min-width: 320px) and (max-width: 480px) {
    padding: 0 2rem;
  }
  @media (min-width: 481px) and (max-width: 767px) {
    
  }
  @media (min-width: 768px) and (max-width: 1024px) {

  }
  @media (min-width: 1025px) and (max-width: 1280px) {
    
  }
  @media (min-width: 1281px) {
    padding: 0 15rem;
  }

`

const NavLeftWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  
  @media (min-width: 320px) and (max-width: 480px) {
    justify-content: center;
  }
  @media (min-width: 481px) and (max-width: 767px) {
    
  }
  @media (min-width: 768px) and (max-width: 1024px) {

  }
  @media (min-width: 1025px) and (max-width: 1280px) {
    
  }
  @media (min-width: 1281px) {
    justify-content: flex-start;
  }
`

const NavRightWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

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
    opacity: .8;
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
