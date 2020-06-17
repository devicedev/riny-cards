import React from 'react'
import { Navbar, NavbarLeft, SiteTitle, Content } from '../reusable'
import { MainNavbarRight } from './navbar'

export const Main = ({ children }) => {
  return (
    <>
      <Navbar>
        <NavbarLeft>
          <SiteTitle />
        </NavbarLeft>
        <MainNavbarRight />
      </Navbar>
      <Content>{children}</Content>
    </>
  )
}
