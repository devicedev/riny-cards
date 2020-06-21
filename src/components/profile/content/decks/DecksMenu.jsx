import React, { useState } from 'react'
import styled from 'styled-components'

import { MenuItem } from '.'

export const DecksMenu = () => {
  const [items] = useState(initialDecksMenuItems)
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
  border-bottom: .1px solid ${({theme}) => theme.colors.menuTextColor};
`
const initialDecksMenuItems = [
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
