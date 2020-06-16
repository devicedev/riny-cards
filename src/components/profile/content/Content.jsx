import React from 'react'
import styled from 'styled-components'

import { ProfileTab } from './profile'
import { DecksTab } from './decks'

export const Content = () => {
  return (
    <Wrapper>
      <ProfileTab/>
      <DecksTab/>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  display: flex;
  padding: 10rem 15rem;
`
