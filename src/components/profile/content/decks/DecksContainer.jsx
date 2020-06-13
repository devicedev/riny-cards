import React, {useState} from 'react'
import styled from 'styled-components'

import {RinyDeck} from '.'

export const DecksContainer = () => {
  const [{decks}] = useState(initialState)
  console.log(decks)
  return (
    <Wrapper>
      {decks.map((deck) => <RinyDeck key={deck.id}/>)}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 3rem 5rem;
  height: 100%;
`

const initialState = {
  decks: [
    {
      id: '1',
      title: 'Unbekannte Wörter B2',
      description: '15.06.20',
      numerOfElements: 5
    }
  ]
}