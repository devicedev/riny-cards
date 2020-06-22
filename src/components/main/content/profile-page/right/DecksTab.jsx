import React from 'react'

import { DecksContainer } from './index'
import { RightTab,Menu } from '../../../../'

export const DecksTab = () => {
  const content = <>
    <DecksMenu/>
    <DecksContainer/>
  </>
  return RightTab(content)
}
const DecksMenu = () => {
  return (
    <Menu items={decksMenuItems}/>
  )
}
const decksMenuItems = [
  {
    name: 'Decks',
    url: '/'
  },
  {
    name: 'Followers',
    url: '/followers'
  },
  {
    name: 'Following',
    url: '/following'
  }
]