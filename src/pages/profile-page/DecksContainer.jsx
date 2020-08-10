import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'

import decksService from '../../services/decksService'
import unfinishedDecksService from '../../services/unfinishedDecksService'

import { SearchContext } from '../../utils/SearchContext'

import { RinyDeck } from './'
import { LoadingIcon } from '../../components'


export const DecksContainer = () => {
  const [decks, setDecks] = useState([])
  const [searchedDecks, setSearchedDecks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [search] = useContext(SearchContext)

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
      let allDecks = [...unfinishedDecks, ...apiDecks]

      setDecks(allDecks)
    } catch ({ response }) {
      if (response && response.data) {
        toast.error(response.data)
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (search) {
      const lowerSearch = search.toLowerCase()
      setSearchedDecks(decks.filter((deck) => deck.title.toLowerCase().includes(lowerSearch) || deck.description.toLowerCase().includes(lowerSearch)))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])
  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const decksMap = search ? searchedDecks : decks
  return (
    <Wrapper>
      {isLoading ? (
        <LoadingIcon icon={faSpinner} pulse/>
      ) : (
        decksMap.length === 0 ?
          <NoDecksSpan>There are no decks available</NoDecksSpan>
          :
          decksMap.map((deck) => <RinyDeck key={deck._id || deck.id} deck={deck}/>)
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
const NoDecksSpan = styled.span`
  font-size: 2rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textColor}
`
