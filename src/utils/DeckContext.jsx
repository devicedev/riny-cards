import React, { createContext, useState } from 'react'

export const DeckContext = createContext(null)

export const DeckProvider = ({ children }) => {
  const [deck, setDeck] = useState({})
  const [loading, setLoading] = useState(true)
  return <DeckContext.Provider value={{ deck: { deck, setDeck }, loading: { loading, setLoading } }}>
    {children}
  </DeckContext.Provider>
}
