import React from 'react'

import { Navbar, NavbarLeft, SiteTitle, Content, Footer } from '../reusable'
import { MainNavbarRight } from './navbar'
import { Authentication } from './'

export const Main = (Child) => {
  return (
    <>
      <Navbar>
        <NavbarLeft>
          <SiteTitle/>
        </NavbarLeft>
        <MainNavbarRight/>
      </Navbar>
      <Content>
        <Authentication>
          {Child}
        </Authentication>
      </Content>
      <Footer/>
    </>
  )
}
