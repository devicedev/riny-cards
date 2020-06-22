import React from 'react'
import { Menu, RightTab } from '../../../../reusable/content'

export const CardsTab = () => {
  const content = <>

  </>
  return RightTab(content)
}

const CardsMenu = () => {
  return (
    <Menu items={cardsMenuItems}/>
  )
}
const cardsMenuItems = [
  {
    name: 'Lessons',
    url: '/'
  },
  {
    name: 'Cards',
    url: '/cards'
  },
]