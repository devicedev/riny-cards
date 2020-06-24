import React from 'react'
import { faHome, faPlus, faUser,faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import { NavbarRight, NavItem } from '../../reusable'
import authService from '../../../services/authService'

export const MainNavbarRight = () => {
  const user = authService.getCurrentUser()
  navItems.slice(-1)[0].title = user.name.toUpperCase();
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
    title: 'HOME',
    icon: faHome,
    url: '/home',
  },
  {
    title: 'CREATE',
    icon: faPlus,
    url: '/create',
  },
  {
    title: "LOGOUT",
    icon: faSignOutAlt,
    url: '/logout',
  },
  {
    icon: faUser,
    url: '/',
  },
]
