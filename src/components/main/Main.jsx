import React from 'react'

import { Root, NavbarLeft, SiteTitle } from '../reusable'
import { NavbarSearch, MainNavbarRight } from './navbar'

export const Main = (content) => {
  const navbar = {
    navbarLeft:
      <NavbarLeft>
        <SiteTitle/>
        <NavbarSearch/>
      </NavbarLeft>,
    navbarRight:
      <MainNavbarRight/>
  }
  return Root(navbar, content)
}
