import React from 'react'
import { useHistory, useParams } from 'react-router-dom'

import unfinishedDecksService from '../../services/unfinishedDecksService'

import { Root } from '../../components'
import { CreateContinueUpdate } from '../ccu-page/CreateContinueUpdate'

import { onDelete, submitCreate, submitUpdate } from '../'

export const ContinuePage = () => {
  const { id: unfinishedDeckId } = useParams()
  const history = useHistory()

  const unfinishedDeck = unfinishedDecksService.getUnfinishedDeck(unfinishedDeckId)

  const handleSubmit = unfinishedDeck.path === 'create' ? submitCreate(unfinishedDeckId, history) : submitUpdate(unfinishedDeckId, history)
  const handleDelete = onDelete(unfinishedDeckId, history, unfinishedDeck.path)

  const content = <CreateContinueUpdate
    onSubmit={handleSubmit}
    initialValues={unfinishedDeck}
    unfinishedDeckId={unfinishedDeckId}
    onDelete={handleDelete}
    path={unfinishedDeck.path}
  />
  return Root(content)
}
