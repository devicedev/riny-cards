import React from 'react'

import { Navbar, Content, Footer } from '../reusable'

export const Root = ({ navbarLeft, navbarRight }, content) => {
  return (
    <>
      <Navbar>
        {navbarLeft}
        {navbarRight}
      </Navbar>
      <Content>
        {content}
      </Content>
      <Footer/>
    </>
  )
}
