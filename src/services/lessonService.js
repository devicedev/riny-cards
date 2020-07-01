import httpService from './httpService'

const apiEndpoint = 'lessons'

function get(deckId,index) {
  return httpService.get(`${apiEndpoint}/${deckId}/${index}`)
}

export default { get }