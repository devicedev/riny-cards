import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useHistory, useParams } from 'react-router-dom'

import decksService from '../../services/decksService'
import unfinishedDecksService from '../../services/unfinishedDecksService'

import { Root } from '../../components'
import { CreateContinueUpdate } from '../ccu-page/CreateContinueUpdate'

export const updateSubmit = (id, history) => (deck, { setSubmitting }) => {
  const apiCall = async () => {
    try {
      unfinishedDecksService.removeUnfinishedDeck(id)
      await decksService.updateDeck(id, deck)
      history.push(`/decks/${id}`)
    } catch ({ response }) {
      if (response && response.data) {
        toast.error(response.data)
      }
    }
  }
  apiCall()
  setSubmitting(false)
}

export const UpdatePage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [updateDeck, setUpdateDeck] = useState({})
  const { id } = useParams()
  const history = useHistory()

  const fetchDeck = async () => {
    try {
      const { data } = await decksService.getDeck(id)
      setUpdateDeck(data)
    } catch ({ response }) {
      if (response && response.data) {
        toast.error(response.data)
      }
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchDeck()
  }, [])

  const handleSubmit = updateSubmit(id, history)

  const content = <CreateContinueUpdate
    onSubmit={handleSubmit}
    initialValues={updateDeck}
    unfinishedDeckId={id}
    loading={isLoading}
    path={'update'}
  />
  return Root(content)
}