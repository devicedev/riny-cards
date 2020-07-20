import httpService from './httpService'

const apiEndpoint = 'lessons'

function get(deckId, index) {
  return httpService.get(`${apiEndpoint}/${deckId}/${index}`)
}

function send(deckId, questions) {
  return httpService.post(`${apiEndpoint}/${deckId}`, {questions})
}

export default { get, send }