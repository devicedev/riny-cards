import httpService from './httpService'
import {apiUrl} from '../config'

const apiEndpoint = `${apiUrl}decks`

export function getDecks() {
  return httpService.get(apiEndpoint)
}