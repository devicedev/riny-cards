import React from 'react'
import { NavbarRight, NavItem } from '../../reusable'
import { faSignInAlt, faUser } from '@fortawesome/free-solid-svg-icons'

export const MainNavbarRight = () => {
  return (
    <NavbarRight>
      {navItems.map((item, index) => (
        <NavItem key={index} item={item} />
      ))}
    </NavbarRight>
  )
}
const navItems = [
  {
    title: 'SIGN UP',
    icon: faSignInAlt,
    url: '/signup',
  },
  {
    title: 'LOG IN',
    icon: faUser,
    url: '/login',
  },
]
