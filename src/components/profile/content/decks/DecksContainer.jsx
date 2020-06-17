import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import { RinyDeck } from '.'

import { getDecks } from '../../../../services/decksService'
import testInitialState from '../../../../res/testInitialState'

export const DecksContainer = () => {
  const [decks, setDecks] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async () => {
    const { data } = await getDecks()
    setDecks(data.slice(0, 15))
    setIsLoading(false)
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Wrapper>
      {isLoading ? (
        <LoadingIconWrapper icon={faSpinner} pulse />
      ) : (
        decks.map((deck) => <RinyDeck key={deck._id} deck={deck} />)
      )}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4rem 5rem;
  height: auto;
`
const LoadingIconWrapper = styled(FontAwesomeIcon)`
  align-self: center;
  font-size: 5rem;
  color: ${({ theme }) => theme.colors.primaryColor};
`
