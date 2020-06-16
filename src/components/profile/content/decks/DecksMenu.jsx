import React, { useState } from 'react'
import styled from 'styled-components'

import { MenuItem } from '.'

export const DecksMenu = () => {
  const [items] = useState(initialState)
  return (
    <Wrapper>
      {items.map((item) => (
        <MenuItem key={item.name} item={item} />
      ))}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid #c5c5c5;
`
const initialState = [
  {
    name: 'Decks',
    active: true,
  },
  {
    name: 'Followers',
    active: false,
  },
  {
    name: 'Following',
    active: false,
  },
]
