import { isEqual } from 'lodash'

const { REACT_APP_UNFINISHED_DECKS_KEY } = process.env

function retrieveUnfinishedDecks() {
  const localStorageUnfinishedDecks = localStorage.getItem(REACT_APP_UNFINISHED_DECKS_KEY)
  return JSON.parse(localStorageUnfinishedDecks) || []
}

function storeUnfinishedDecks(unfinishedDecks) {
  localStorage.setItem(REACT_APP_UNFINISHED_DECKS_KEY, JSON.stringify(unfinishedDecks))
}

function saveUnfinishedDeck(id, deck) {
  let unfinishedDecks = retrieveUnfinishedDecks()
  formatUnfinishedDeck(deck, id)
  for (const unfinishedDeck of unfinishedDecks) {
    if (isEqual(unfinishedDeck, deck))
      return
  }
  let exists = unfinishedDecks.find((unfinishedDeck) => unfinishedDeck.id === deck.id)
  if (exists)
    unfinishedDecks = unfinishedDecks.map((unfinishedDeck) => unfinishedDeck.id === deck.id ? deck : unfinishedDeck)
  else
    unfinishedDecks.push(deck)
  storeUnfinishedDecks(unfinishedDecks)
}

function formatUnfinishedDeck(deck, id) {
  if (!deck.title) {
    deck.title = `Unnamed deck ${new Date().toJSON().slice(0, 10).replace(/-/g, '/')}`
  }
  deck.id = id
  deck.createdAt = new Date()
  deck.cards = deck.cards.filter((card, index) => card.front || card.back || index === 0)
}


function getUnfinishedDeck(id) {
  const unfinishedDecks = retrieveUnfinishedDecks()
  return unfinishedDecks.find(unfinishedDeck => unfinishedDeck.id === id) || null
}

function getUnfinishedDecks() {
  const unfinishedDecks = retrieveUnfinishedDecks()
  return unfinishedDecks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

function removeUnfinishedDeck(id) {
  const unfinishedDecks = retrieveUnfinishedDecks()
  const index = unfinishedDecks.map((unfinishedDeck) => unfinishedDeck.id).indexOf(id)
  unfinishedDecks.splice(index, 1)
  storeUnfinishedDecks(unfinishedDecks)
}

function mapToInitialValues({ title, description, cards }) {
  return {
    title,
    description,
    cards
  }
}

export default {
  saveUnfinishedDeck,
  getUnfinishedDeck,
  getUnfinishedDecks,
  removeUnfinishedDeck,
  mapToInitialValues
}