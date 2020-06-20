import React from 'react'
import { Navbar, NavbarLeft, Content, SiteTitle, Footer } from '../reusable'
import { NavbarSearch, ProfileNavbarRight } from './navbar'
import { ProfileTab, DecksTab } from './content'
import { ToastContainer } from 'react-toastify'

export const Profile = () => {
  return (
    <>
      <ToastContainer/>
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
