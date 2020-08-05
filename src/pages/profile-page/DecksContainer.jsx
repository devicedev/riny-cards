import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'

import decksService from '../../services/decksService'
import unfinishedDecksService from '../../services/unfinishedDecksService'

import { RinyDeck } from './'
import { LoadingIcon } from '../../components'

export const DecksContainer = () => {
  const [decks, setDecks] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async () => {
    try {
      let { data: apiDecks } = await decksService.getDecks()
      const unfinishedDecks = unfinishedDecksService.getUnfinishedDecks()

      const mergeDecks = () => {
        unfinishedDecks.forEach((unfinishedDeck) => {
          apiDecks = apiDecks.filter((deck) => deck._id !== unfinishedDeck.id)
        })
      }
      mergeDecks()

      setDecks([...unfinishedDecks, ...apiDecks])
    } catch ({ response }) {
      if (response && response.data) {
        toast.error(response.data)
      }
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Wrapper>
      {isLoading ? (
        <LoadingIcon icon={faSpinner} pulse/>
      ) : (
        decks.map((deck) => <RinyDeck key={deck._id || deck.id} deck={deck}/>)
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