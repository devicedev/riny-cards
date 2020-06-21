import React from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { useLocation } from 'react-router-dom'

import { Navbar, NavbarLeft, Content, SiteTitle, Footer } from '../reusable'
import { NavbarSearch, ProfileNavbarRight } from './navbar'
import { ProfileTab, DecksTab } from './content'


export const Profile = () => {
  // const { state: { from } } = useLocation()
  // if (from === '/login')
  //   toast.success('You have successfully logged in')
  // else if (from === '/signup')
  //   toast.success('You have successfully signed up')
  // renderToasts()

  return (
    <>
      <ToastContainer/>
      <Navbar>
        <NavbarLeft>
          <SiteTitle/>
          <NavbarSearch/>
        </NavbarLeft>
        <ProfileNavbarRight/>
      </Navbar>
      <Content>
        <ProfileTab/>
        <DecksTab/>
      </Content>
      <Footer/>
    </>
  )
}
