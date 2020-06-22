import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { Main } from '../../'
import { DeckTab, CardsTab } from './'

import decksService from '../../../../services/decksService'

export const DeckPage = ({ match }) => {
  const [deck, setDeck] = useState({})
  const [loading, setLoading] = useState(true)

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
  const tabs = <>
    <DeckTab/>
    <CardsTab/>
  </>
  return Main(tabs)
}
