import React, { createContext, useMemo, useState } from 'react'

export const SearchContext = createContext(null)

export const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState('')
  const providerValue = useMemo(() => [search, setSearch], [search, setSearch])
  return <SearchContext.Provider value={providerValue}>
    {children}
  </SearchContext.Provider>
}