import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { RinyDeck } from '.'

import { getDecks } from '../../../../services/decksService'

export const DecksContainer = () => {
  const [decks, setDecks] = useState(decksInitialState)

  useEffect(() => {
    const fetchData = async () => {
      const queryDecks = await getDecks()
      setDecks(queryDecks.data)
    }
    fetchData()
  }, [])

  return (
    <Wrapper>
      {decks.map((deck) => <RinyDeck key={deck._id} deck={deck}/>)}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 3rem 5rem;
  height: auto;
  display:flex;
  flex-direction: column;
`

const decksInitialState = []