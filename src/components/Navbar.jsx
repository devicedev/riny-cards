import React, { useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faPlus, faSignInAlt, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons'
import { useMediaQuery } from 'react-responsive'
import pSBC from 'shade-blend-color'

import authService from '../services/authService'

import { SiteTitle } from './SiteTitle'
import { NavbarSearch } from './'

export const Navbar = () => {
  const user = authService.getCurrentUser()
  const isMobile = useMediaQuery({ maxWidth: 767 })
  return <Wrapper>
    <NavbarLeft user={user}/>
    {isMobile ? <NavRightBurger user={user}/> : <NavbarRight user={user}/>}
  </Wrapper>
}

const NavbarLeft = ({ user }) => {
  return <NavLeftWrapper>
    <SiteTitle/>
    {user && <NavbarSearch/>}
  </NavLeftWrapper>
}
const NavRightBurger = ({ user }) => {
  const [open, setIsOpen] = useState(false)
  const divRef = useRef()
  const navItems = user ? [
    {
      title: 'HOME',
      icon: faHome,
      url: '/'
    },
    {
      title: 'CREATE',
      icon: faPlus,
      url: '/create'
    },
    {
      title: 'LOGOUT',
      icon: faSignOutAlt,
      url: '/logout'
    }
  ] : [
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
  return <NavRightBurgerWrapper tabIndex={0} ref={divRef} onBlur={() => setIsOpen(false)}>
    <BurgerIconWrapper onClick={() => setIsOpen(open => !open)}>
      <BurgerIcon open={open}>
        <BurgerPart/>
        <BurgerPart/>
        <BurgerPart/>
      </BurgerIcon>
    </BurgerIconWrapper>
    <NavRightBurgerItemsWrapper open={open}>
      {navItems.map((item, index) => (
        <NavItem key={index} item={item} logout={(index + 1 === navItems.length) && user ? 1 : 0}/>
      ))}
    </NavRightBurgerItemsWrapper>
  </NavRightBurgerWrapper>
}
const NavbarRight = ({ user }) => {
  const navItems = user ? [
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
      title: 'HOME',
      icon: faHome,
      url: '/'
    }
  ] : [
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
  return <NavRightWrapper>
    {navItems.map((item, index) => (
      <NavItem key={index} item={item}/>
    ))}
  </NavRightWrapper>
}
const NavItem = ({ item: { icon, title, url }, logout }) => {
  return (
    <NavLinkWrapper exact to={url} logout={logout}>
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

const NavLeftWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (min-width: 768px) {
    justify-content: flex-start;
  }
`

const NavLinkWrapper = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  color: #fff;
  cursor: pointer;
  text-decoration: none;
  margin-bottom: 4rem;
  
  ${({ logout }) => logout && css`
    position: fixed;
    bottom: 8vh;
  `};
  
  @media (min-width: 768px) {
    font-size: 1.5rem;
    height: 100%;
    margin-left: 4rem;
    margin-top: 0;
    &:hover {
      opacity: .8;
    }
    &.active {
      border-bottom: 2px #fff solid;
    } 
  }
`
const NavItemIcon = styled(FontAwesomeIcon)`
  margin-right: 0.8rem;
`
const NavItemTitle = styled.div`
  font-weight: 500;
`
const NavRightBurgerWrapper = styled.div``
const NavRightBurgerItemsWrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  top: 0;
  right: 0;
  height: 100vh;
  width: 40vw;
  margin-top: 8vh;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.primaryColor};
  transform: translateX(${({ open }) => open ? '0' : '100%'});
  transition: all .3s ease-in-out;
  border-top: 1px solid ${({ theme }) => pSBC(0.3, theme.colors.primaryColor)};
`
const BurgerIconWrapper = styled.div`
  position: fixed;
  z-index: 100;
  height: 8vh;
  right: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`
const BurgerPart = styled.div`
  width: 3rem;
  height: .5rem;
  border-radius: 10px;
  background-color: #FFF;
  transform-origin: 1px;
  transition: all .2s linear;
`
const BurgerIcon = styled.div`
  height: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  
  & > ${BurgerPart}:nth-child(1){
    transform: rotate(${({ open }) => open ? '53deg' : '0'})
  }
  & > ${BurgerPart}:nth-child(2){
    transform: translateX(${({ open }) => open ? '100%' : '0'});
    opacity: ${({ open }) => open ? 0 : 1};
  }
  & > ${BurgerPart}:nth-child(3){
    transform: rotate(${({ open }) => open ? '-53deg' : '0'})
  }
`

const NavRightWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`

