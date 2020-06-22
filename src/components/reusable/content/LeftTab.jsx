import React from 'react'
import styled from 'styled-components'

export const LeftTab = (content) => {
  return <Wrapper>
    {content}
  </Wrapper>
}
const Wrapper = styled.div`
  flex: 1;
  padding-right: 7rem;
  height: auto;
`
