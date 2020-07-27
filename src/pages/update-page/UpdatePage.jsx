import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useHistory, useParams } from 'react-router-dom'

import decksService from '../../services/decksService'

import { Root } from '../../components'
import { CreateContinueUpdate } from '../ccu-page/CreateContinueUpdate'
import { onDelete, submitUpdate } from '../'

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

  const handleSubmit = submitUpdate(id, history)
  const handleDelete = onDelete(id, history, 'update')

  const content = <CreateContinueUpdate
    onSubmit={handleSubmit}
    initialValues={updateDeck}
    unfinishedDeckId={id}
    loading={isLoading}
    onDelete={handleDelete}
    path={'update'}
    updatePath={'update'}
  />
  return Root(content)
}