import React, { useState } from 'react'
import { faHome, faPlus, faUser } from '@fortawesome/free-solid-svg-icons'

import { NavbarRight, NavItem } from '../../reusable'

const user = {
  name: 'Radu',
}

export const ProfileNavbarRight = () => {
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
