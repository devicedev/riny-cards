import styled from 'styled-components'
import React from 'react'

export const Card = ({ card }) => {
  return <Wrapper>
    {card.front}
  </Wrapper>
}
const Wrapper = styled.div`
  text-align: center;
  flex-basis: 30%;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1), 0 0 25px 0 rgba(0, 0, 0, 0.04);
  padding: 10rem 0;
  border-radius: 15px;
  margin-right: 2rem;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  font-weight: 500;
  color:${({theme}) => theme.colors.textColor}
`
