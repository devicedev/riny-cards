import React, { useState } from 'react'

import { Menu, RightTab } from '../../components'
import { DecksContainer } from './'

export const DecksTab = () => {
  const [activeTab, setActiveTab] = useState('decks')
  const handleOnChange = (component) => setActiveTab(component)
  let activeComponent
  switch(activeTab){
    case 'decks':
      activeComponent = <DecksContainer/>
      break;
    case 'followers':
      activeComponent = <></>
      break;
    case 'following':
      activeComponent = <></>
      break;
    default:
      break;
  }
  const content = <>
    <DecksMenu onChange={handleOnChange}/>
    {activeComponent}
  </>
  return RightTab(content)
}

const DecksMenu = ({ onChange }) => {
  const decksMenuItems = [
    {
      name: 'Decks',
      change: () => onChange('decks'),
      active: true
    },
    {
      name: 'Followers',
      change: () => onChange('followers'),
      active: false
    },
    {
      name: 'Following',
      change: () => onChange('following'),
      active: false
    }
  ]
  const [menuItems, setMenuItems] = useState(decksMenuItems)
  return (
    <Menu items={menuItems} updateMenuItems={setMenuItems}/>
  )
}