import React from 'react'
import { useHistory } from 'react-router-dom'
import { v4 } from 'uuid'

import { Root } from '../../components'
import { CreateContinueUpdate } from '../ccu-page/CreateContinueUpdate'
import { onDelete, submitCreate } from '../'

export const CreatePage = () => {
  const unfinishedDeckId = v4()
  const history = useHistory()

  const handleSubmit = submitCreate(unfinishedDeckId, history)
  const handleDelete = onDelete(unfinishedDeckId, history, 'create')

  const content = <CreateContinueUpdate
    onSubmit={handleSubmit}
    initialValues={defaultInitialValues}
    unfinishedDeckId={unfinishedDeckId}
    onDelete={handleDelete}
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