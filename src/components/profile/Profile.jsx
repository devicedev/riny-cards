import React, { useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'

import { Navbar, NavbarLeft, Content, SiteTitle, Footer } from '../reusable'
import { NavbarSearch, ProfileNavbarRight } from './navbar'
import { ProfileTab, DecksTab } from './content'


export const Profile = ({ history }) => {
  useEffect(() => {
    const { state } = history.location
    if (state && state.from) {
      const { from } = state
      let text
      if (from === '/login')
        text = 'You have successfully logged in'
      else if (from === '/signup')
        text = 'You have successfully signed up'

      toast.success(text, { position: toast.POSITION.BOTTOM_RIGHT })
      history.push({})
    }
  }, [history])
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
