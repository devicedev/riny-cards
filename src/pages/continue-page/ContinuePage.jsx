import React from 'react'
import { useHistory, useParams } from 'react-router-dom'

import unfinishedDecksService from '../../services/unfinishedDecksService'

import { Root } from '../../components'
import { CreateContinueUpdate } from '../ccu-page/CreateContinueUpdate'

import { createSubmit, updateSubmit } from '..'

export const ContinuePage = () => {
  const { id: unfinishedDeckId } = useParams()
  const history = useHistory()

  const unfinishedDeck = unfinishedDecksService.getUnfinishedDeck(unfinishedDeckId)

  const handleSubmit = unfinishedDeck.path === 'create' ? createSubmit(unfinishedDeckId, history) : updateSubmit(unfinishedDeckId, history)

  const content = <CreateContinueUpdate
    onSubmit={handleSubmit}
    initialValues={unfinishedDeck}
    unfinishedDeckId={unfinishedDeckId}
    path={unfinishedDeck.path}
  />
  return Root(content)
}
