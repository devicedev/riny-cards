import React from 'react'
import { useHistory } from 'react-router-dom'
import { v4 } from 'uuid'
import { toast } from 'react-toastify'

import { Root } from '../../components'
import { CreateContinueUpdate } from '../ccu-page/CreateContinueUpdate'

import decksService from '../../services/decksService'
import unfinishedDecksService from '../../services/unfinishedDecksService'

export const createSubmit = (unfinishedDeckId, history) => (deck, { setSubmitting }) => {
  const apiCall = async () => {
    try {
      unfinishedDecksService.removeUnfinishedDeck(unfinishedDeckId)
      await decksService.createDeck(deck)
      toast.success('You have successfully created a new deck')
      history.push(`/`)
    } catch ({ response }) {
      if (response && response.data) {
        toast.error(response.data)
      }
    }
  }
  apiCall()
  setSubmitting(false)
}

export const CreatePage = () => {
  const unfinishedDeckId = v4()
  const history = useHistory()

  const handleSubmit = createSubmit(unfinishedDeckId, history)

  const content = <CreateContinueUpdate
    onSubmit={handleSubmit}
    initialValues={defaultInitialValues}
    unfinishedDeckId={unfinishedDeckId}
    path={'create'}
  />
  return Root(content)
}

const defaultInitialValues = {
  title: '',
  description: '',
  cards: [
    {
      front: '',
      back: ''
    }
  ]
}