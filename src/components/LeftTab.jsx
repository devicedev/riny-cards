import React from 'react'
import styled from 'styled-components'

export const LeftTab = (content) => {
  return <Wrapper>
    {content}
  </Wrapper>
}

const Wrapper = styled.div`
  flex-basis: 25%;
  height: auto;
  margin-bottom: 3rem;
  @media (min-width: 768px) {
    padding-right: 3rem;
    flex-basis: 30%;
  }
  @media (min-width: 1024px) {
    padding-right: 5rem;
  }
  @media (min-width: 1281px) {
    flex-basis: 25%;
  }
`
