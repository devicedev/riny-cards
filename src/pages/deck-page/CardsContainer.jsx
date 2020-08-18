import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { animated, useSpring } from 'react-spring'

import { calcCardStyle, DeckContext } from '../../utils'
import { Container } from './'
import { SearchContext } from '../../utils/SearchContext'

export const CardsContainer = () => {
  const { deck: { deck } } = useContext(DeckContext)
  const [searchedCards, setSearchedCards] = useState([])
  const [search] = useContext(SearchContext)

  const empty = Object.keys(deck).length === 0

  useEffect(() => {
    if (search) {
      const lowerSearch = search.toLowerCase()
      setSearchedCards(deck.cards.filter(card => card.front.toLowerCase().includes(lowerSearch) || card.back.toLowerCase().includes(lowerSearch)))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  const cardsMap = search ? searchedCards : deck.cards
  return <Container>
    {!empty && (
      cardsMap.length === 0 ?
        <NoCardsSpan>There are no cards available</NoCardsSpan>
        :
        cardsMap.map((card, index) => <Card key={index} card={card}/>)
    )}
  </Container>
}

const Card = React.memo(({ card }) => {
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
  return <CardWrapper onClick={handleOnClick}>
    <CardSide style={frontCardStyle}>
      {card.front}
    </CardSide>
    <CardSide style={backCardStyle}>
      {card.back}
    </CardSide>
  </CardWrapper>
})

const NoCardsSpan = styled.span`
  font-size: 2rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textColor}
`

const CardWrapper = styled.div`
  flex-basis: 100%;
  display: flex;
  justify-content: center;
  height: 30rem;
  align-items: center;
  font-weight: 500;
  position: relative;
  color: ${({ theme }) => theme.colors.textColor};
  margin: 2rem;
  padding: .2rem;
  @media (min-width: 375px) {
    height: 35rem;
  }
  @media (min-width: 425px) {
    margin: 2rem 5rem;
  }
  @media (min-width: 525px) {
    margin: 2rem 10rem;
  }

  @media (min-width: 576px){
    margin: 0 2rem 3rem 0;
  }
  @media (min-width: 576px) and (max-width: 767px){
    flex-basis: 47%;
    height: 30rem;
    &:nth-child(2n){
      margin: 0 0 3rem 0;
    }  
  }
  @media (min-width: 768px) and (max-width: 1023px),(min-width: 1281px) {
    flex-basis: 30%;
    height: 25rem;
    &:nth-child(3n){
      margin: 0 0 3rem 0;
    }
  }
  @media (min-width: 1024px) and (max-width: 1281px){
    flex-basis: 47%;
    height: 25rem;
    &:nth-child(2n){
      margin: 0 0 3rem 0;
    }
  }
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
  word-break: break-word;
`