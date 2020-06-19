import React from 'react'
import { faHome, faPlus, faUser } from '@fortawesome/free-solid-svg-icons'

import { NavbarRight, NavItem } from '../../reusable'

const user = {
  name: 'Radu',
}

export const ProfileNavbarRight = () => {
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
    title: user.name.toUpperCase(),
    icon: faUser,
    url: '/profile',
  },
]
