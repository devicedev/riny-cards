import React, { useState, useEffect } from 'react'
import styled  from 'styled-components'

import { RinyDeck } from '.'
import { LoadingIcon } from '../../navbar/LoadingIcon'

import { getDecks } from '../../../../services/decksService'
import testInitialState from '../../../../res/testInitialState'

export const DecksContainer = () => {
  const [decks, setDecks] = useState(decksInitialState)
  const [isLoading, setIsLoading] = useState(loadingInitialState)

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getDecks()
      setDecks(data.slice(0, 15))
      setIsLoading(false)
    }
    fetchData()
  }, [])

  return <Wrapper>

    {isLoading ? <LoadingIcon/> : decks.map((deck) => (
      <RinyDeck key={deck._id} deck={deck}/>
    ))}
  </Wrapper>

}
const Wrapper = styled.div`
  padding: 4rem 5rem;
  display: flex;
  flex-direction: column;
  height: auto;
`
const decksInitialState = []
const loadingInitialState = true