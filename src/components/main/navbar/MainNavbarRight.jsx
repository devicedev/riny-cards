import React, { useState } from 'react'
import { NavbarRight, NavItem } from '../../reusable'
import { faSignInAlt, faUser } from '@fortawesome/free-solid-svg-icons'

export const MainNavbarRight = () => {
  const [navItems] = useState(initialNavItems)
  return (
    <NavbarRight>
      {navItems.map((item) => (
        <NavItem key={item.title} item={item} />
      ))}
    </NavbarRight>
  )
}
const initialNavItems = [
  {
    title: 'SIGNIN',
    icon: faSignInAlt,
    url: '/signin',
    active: false,
  },
  {
    title: 'LOGIN',
    icon: faUser,
    url: '/login',
    active: false,
  },
]
