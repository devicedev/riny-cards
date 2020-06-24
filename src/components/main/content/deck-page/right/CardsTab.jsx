import React from 'react'
import { Menu, RightTab } from '../../../../reusable/'
import { CardsContainer } from './'

export const CardsTab = ({ deckId }) => {
  const content = <>
    <CardsMenu deckId={deckId}/>
    <CardsContainer/>
  </>
  return RightTab(content)
}

const CardsMenu = ({ deckId }) => {
  cardsMenuItems[0].url = `/decks/${deckId}`
  return (
    <Menu items={cardsMenuItems}/>
  )
}
const cardsMenuItems = [
  {
    name: 'Lessons',
    url: '/decks/'
  },
  {
    name: 'Cards',
    url: '/cards'
  }
]