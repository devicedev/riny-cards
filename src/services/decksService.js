import httpService from './httpService'

const apiEndpoint = `decks`

function getDecks() {
  return httpService.get(apiEndpoint)
}

function getDeck(id) {
  return httpService.get(`${apiEndpoint}/${id}`)
}

export default {
  getDecks,
  getDeck
}