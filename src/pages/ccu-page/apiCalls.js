import unfinishedDecksService from '../../services/unfinishedDecksService'
import decksService from '../../services/decksService'
import { toast } from 'react-toastify'

export const submitCreate = (unfinishedDeckId, history) => (deck) => {
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
}

export const submitUpdate = (id, history) => (deck) => {
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
}

export const onDelete = (id, history, path) => async () => {
  try {
    unfinishedDecksService.removeUnfinishedDeck(id)
    if (path === 'update') {
      await decksService.deleteDeck(id)
    }
    history.replace(`/`)
  } catch ({ response }) {
    if (response && response.data) {
      toast.error(response.data)
    }
  }
}