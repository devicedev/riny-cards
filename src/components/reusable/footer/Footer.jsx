import React from 'react'
import styled from 'styled-components'

import { FooterItem } from './'

export const Footer = () => {
  return (
    <Wrapper>
      {footerItems.map((item, index) => (
        <FooterItem item={item} key={index} />
      ))}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  display: flex;
  height: 8vh;
  justify-content: center;
  padding: 0 15rem;
`
const footerItems = [
  {
    title: 'About',
    url: '/profile',
  },
  {
    title: 'Terms',
    url: '/terms',
  },
  {
    title: 'Privacy',
    url: '/privacy',
  },
  {
    title: 'Duolingo',
    url: '/duolingo',
  },
  {
    title: 'Facebook',
    url: '/facebook',
  },
  {
    title: 'Twitter',
    url: '/twitter',
  },
]
