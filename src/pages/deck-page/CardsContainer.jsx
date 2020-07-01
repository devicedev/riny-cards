import React, { useContext, useState } from 'react'
import styled from 'styled-components'

import { DeckContext, calcCardStyle } from '../../utils'
import { Container } from './'

export const CardsContainer = () => {
  const { deck: { deck } } = useContext(DeckContext)
  const empty = Object.keys(deck).length === 0
  return <Container>
    {!empty && deck.cards.map((card, index) => <Card key={index} card={card}/>)}
  </Container>
}

const Card = ({ card }) => {
  const [flipped, setFlipped] = useState(false)
  const degree = flipped ? '180deg' : '0'
  const style = { transform: `rotateY(${degree})` }
  const handleOnClick = () => setFlipped(!flipped)
  const scale = 50
  const frontCardStyle = calcCardStyle(card.front.length, scale)
  const backCardStyle = calcCardStyle(card.back.length, scale)
  return <CardWrapper>
    <AnimatedCardWrapper
      onClick={handleOnClick}
      style={style}>
      <Front style={frontCardStyle}>
        <Text>
          {card.front}
        </Text>
      </Front>
      <Back style={backCardStyle}>
        <Text>
          {card.back}
        </Text>
      </Back>
    </AnimatedCardWrapper>
  </CardWrapper>
}
const CardWrapper = styled.div`
  flex-basis: 30%;
  padding: 10rem 0;
  height: 23rem;
  margin: 0 2rem 3rem 0;
  font-weight: 500;
  position: relative;
  color: ${({ theme }) => theme.colors.textColor};
`
const AnimatedCardWrapper = styled.div`
  transform-style: preserve-3d;
  transition: .4s all ease;
  width: 100%;
  height: 100%;
  border-radius: 25px;
  box-shadow: 0 3px 10px 0 rgba(0,0,0,.18);
  top: 0;
  left: 0;
  position: absolute;
`
const Parent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  backface-visibility: hidden;
  padding: 2rem;
  width: 100%;
  height: 100%;
  position: absolute;
`
const Front = styled(Parent)`
`
const Text = styled.div`
  word-wrap: break-word;
  width: 100%;
`
const Back = styled(Parent)`
  transform: rotateY(180deg);
`