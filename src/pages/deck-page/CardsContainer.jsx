import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { useSpring, animated } from 'react-spring'

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
  const handleOnClick = () => setFlipped(state => !state)
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateY(${flipped ? -180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 }
  })
  const scale = 50
  const frontCardStyle = {
    opacity: opacity.interpolate(o => 1 - o * 3),
    transform,
    ...calcCardStyle(card.front.length, scale)
  }
  const backCardStyle = {
    opacity,
    transform: transform.interpolate(t => `${t} rotateY(-180deg)`),
    ...calcCardStyle(card.back.length, scale)
  }
  return <CardWrapper
    onClick={handleOnClick}
  >
    <CardSide style={frontCardStyle}>
      {card.front}
    </CardSide>
    <CardSide style={backCardStyle}>
      {card.back}
    </CardSide>
  </CardWrapper>
}
const CardWrapper = styled.div`
  flex-basis: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 23rem;
  margin: 0 2rem 3rem 0;
  font-weight: 500;
  position: relative;
  color: ${({ theme }) => theme.colors.textColor};
`
const CardSide = styled(animated.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  box-shadow: 0 3px 10px 0 rgba(0,0,0,.18);
  padding: 2rem;
  width: 100%;
  height: 100%;
  position: absolute;
  will-change: transform, opacity;
  word-break: break-all;
`