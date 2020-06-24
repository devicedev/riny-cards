import React from 'react'

import { Root, NavbarLeft, SiteTitle } from '../reusable'
import { NavbarSearch, MainNavbarRight } from './navbar'

export const Main = (tabs) => {
  const navbar = {
    navbarLeft:
      <NavbarLeft>
        <SiteTitle/>
        <NavbarSearch/>
      </NavbarLeft>,
    navbarRight:
      <MainNavbarRight/>
  }
  const content = <>
    {tabs}
  </>
  return Root(navbar, content)
}
