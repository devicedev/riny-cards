import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'

import { RinyDeck } from './'
import { LoadingIconWrapper } from '../../../../'

import decksService from '../../../../../services/decksService'

export const DecksContainer = () => {
  const [decks, setDecks] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async () => {
    try {
      const { data } = await decksService.getDecks()
      setDecks(data.slice(0, 15))
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
        <LoadingIconWrapper icon={faSpinner} pulse/>
      ) : (
        decks.map((deck) => <RinyDeck key={deck._id} deck={deck}/>)
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