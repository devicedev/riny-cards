import React from 'react'
import styled from 'styled-components'

import { Root } from '../../components'
import { DecksTab, ProfileTab } from './'

export const ProfilePage = () => {
  const content = <Wrapper>
    <ProfileTab/>
    <DecksTab/>
  </Wrapper>
  return Root(content)
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`
