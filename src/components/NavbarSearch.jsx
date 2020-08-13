import React, { useContext, useRef, useState } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import pSBC from 'shade-blend-color'

import { SearchContext } from '../utils/SearchContext'

export const NavbarSearch = () => {
  const theme = useContext(ThemeContext)
  const [isFocused, setIsFocused] = useState(false)
  const [search, setSearch] = useContext(SearchContext)
  const searchBox = useRef()

  const handleClear = () => {
    searchBox.current.focus()
    setSearch('')
  }
  return (
    <Wrapper isFocused={isFocused}>
      <NavSearchIcon
        icon={faSearch}
        color={isFocused ? theme.colors.primaryColor : '#FFF'}
      />
      <InputWrapper
        ref={searchBox}
        type="text"
        placeholder={'SEARCH'}
        value={search}
        onChange={() => setSearch(searchBox.current.value)}
        isFocused={isFocused}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {search && (
        <NavCloseIcon
          onClick={handleClear}
          icon={faTimes}
          color={isFocused ? theme.colors.primaryColor : '#FFF'}
        />
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  flex: 1;
  margin-left: 1rem;
  margin-right: 5rem;
  padding: 1rem 0;
  background-color: ${({ isFocused, theme }) => (isFocused ? '#FFF' : pSBC(0.3, theme.colors.primaryColor))};
  border-radius: 10px;
  display: flex;
  transition: all 0.5s;
  @media (min-width: 768px) {
    margin-left: 2rem;
  }
`
const NavSearchIcon = styled(FontAwesomeIcon)`
  font-size: 2rem;
  margin-left: 1rem;
`
const NavCloseIcon = styled(FontAwesomeIcon)`
  font-size: 2rem;
  margin-right: 1rem;
`
const InputWrapper = styled.input`
  flex: auto;
  font-size: 1.5rem;
  margin-left: 1.5rem;
  margin-right: 1.5rem;
  background-color: inherit;
  outline: none;
  border: none;
  color: ${({ isFocused }) => (isFocused ? '#000' : '#FFF')};
  &::placeholder {
    color: #fff;
  }
`
