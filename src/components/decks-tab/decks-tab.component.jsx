import React from 'react'

import CardsMenu from '../cards-menu/cards-menu.component'
import DecksContainer from '../decks-container/decks-container.component'

import './cards-tab.styles.css'

const CardsTab = () => {
  return (
    <div className={'cards-tab'}>
      <CardsMenu/>
      <DecksContainer />
    </div>
  )
}

export default CardsTab
