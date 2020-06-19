import React from 'react'
import { Navbar, NavbarLeft, Content, SiteTitle, Footer } from '../reusable'
import { NavbarSearch, ProfileNavbarRight } from './navbar'
import { ProfileTab, DecksTab } from './content'

export const Profile = () => {
  return (
    <>
      <Navbar>
        <NavbarLeft>
          <SiteTitle />
          <NavbarSearch />
        </NavbarLeft>
        <ProfileNavbarRight />
      </Navbar>
      <Content>
        <ProfileTab />
        <DecksTab />
      </Content>
      <Footer />
    </>
  )
}
