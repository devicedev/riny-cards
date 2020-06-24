import React, { useContext, useEffect } from 'react'
import { toast } from 'react-toastify'

import { Main } from '../../'
import { DeckTab, CardsTab } from './'
import { DeckContext, DeckProvider } from './DeckContext'

import decksService from '../../../../services/decksService'

export const DeckPageWrapper = ({ match }) => {
  const { deck: { setDeck }, loading: { setLoading } } = useContext(DeckContext)

  const fetchData = async () => {
    const { id } = match.params
    try {
      const { data } = await decksService.getDeck((id))
      setDeck(data)
    } catch ({ response }) {
      if (response && response.data)
        toast.error(response.data)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])
  const tabs =
    <>
      <DeckTab/>
      <CardsTab deckId={match.params.id}/>
    </>
  return Main(tabs)
}
export const DeckPage = (props) => {
  return <DeckProvider>
    <DeckPageWrapper {...props}/>
  </DeckProvider>
}
