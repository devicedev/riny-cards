import React, { useState } from 'react'

import { DecksContainer } from './index'
import { RightTab, Menu } from '../../../../'

export const DecksTab = () => {
  const [activeTab, setActiveTab] = useState(<DecksContainer/>)
  const handleOnChange = (component) => setActiveTab(component)
  const content = <>
    <DecksMenu onChange={handleOnChange}/>
    {activeTab}
  </>
  return RightTab(content)
}
const DecksMenu = ({ onChange }) => {
  const decksMenuItems = [
    {
      name: 'Decks',
      change: () => onChange(<DecksContainer/>),
      active: true
    },
    {
      name: 'Followers',
      change: () => onChange(<></>),
      active: false
    },
    {
      name: 'Following',
      change: () => onChange(<></>),
      active: false
    }
  ]
  const [menuItems, setMenuItems] = useState(decksMenuItems)
  return (
    <Menu items={menuItems} updateMenuItems={setMenuItems}/>
  )
}