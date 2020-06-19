import React from 'react'
import { Navbar, NavbarLeft, SiteTitle, Content, Footer } from '../reusable'
import { MainNavbarRight } from './navbar'
import { Authentication } from './'

export const Main = ({ children }) => {
  return (
    <>
      <Navbar>
        <NavbarLeft>
          <SiteTitle />
        </NavbarLeft>
        <MainNavbarRight />
      </Navbar>
      <Content>
        <Authentication>{children}</Authentication>
      </Content>
      <Footer />
    </>
  )
}
