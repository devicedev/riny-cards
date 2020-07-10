import httpService from './httpService'

const apiEndpoint = `decks`

function getDecks() {
  return httpService.get(apiEndpoint)
}

function getDeck(id) {
  return httpService.get(`${apiEndpoint}/${id}`)
}

function createDeck(deck) {
  return httpService.post(`${apiEndpoint}`, deck)
}

export default {
  getDecks,
  getDeck,
  createDeck,
}