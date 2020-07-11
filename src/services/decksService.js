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

function updateDeck(id, deck) {
  return httpService.put(`${apiEndpoint}/${id}`, deck)
}

export default {
  getDecks,
  getDeck,
  createDeck,
  updateDeck
}