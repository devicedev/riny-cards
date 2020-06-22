import React from 'react'

import { Root, NavbarLeft, SiteTitle } from '../reusable'
import { NavbarSearch, ProfileNavbarRight } from './navbar'

export const Main = (tabs) => {
  const navbar = {
    navbarLeft:
      <NavbarLeft>
        <SiteTitle/>
        <NavbarSearch/>
      </NavbarLeft>,
    navbarRight:
      <ProfileNavbarRight/>
  }
  const content = <>
    {tabs}
  </>
  return Root(navbar, content)
}
