import React, { useContext } from 'react'

import { Card } from './'
import { DeckContext } from '../DeckContext'
import { Container } from './'


export const CardsContainer = () => {
  const { deck: { deck } } = useContext(DeckContext)
  const empty = Object.keys(deck).length === 0
  return <Container>
    {!empty && deck.cards.map((card, index) => <Card key={index} card={card}/>)}
  </Container>
}

