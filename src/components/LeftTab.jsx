import React from 'react'
import styled from 'styled-components'

export const LeftTab = (content) => {
  return <Wrapper>
    {content}
  </Wrapper>
}
const Wrapper = styled.div`
  flex-basis: 25%;
  padding-right: 5rem;
  height: auto;
`
