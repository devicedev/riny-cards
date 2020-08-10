import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import decksService from '../../services/decksService'

import { Root } from '../../components'
import { DeckInfoTab, CardsTab } from './'
import { DeckContext, DeckProvider } from '../../utils/DeckContext'

export const DeckPageWrapper = () => {
  const { deck: { setDeck }, loading: { setLoading } } = useContext(DeckContext)
  const { id } = useParams()
  const fetchData = async () => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const content = <>
    <DeckInfoTab/>
    <CardsTab/>
  </>
  return Root(content)
}
export const DeckPage = () => {
  return <DeckProvider>
    <DeckPageWrapper/>
  </DeckProvider>
}
