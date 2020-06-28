import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import defaultCard from '../../../../../res/default-card.png'

export const RinyDeck = ({ deck: { _id, name, description, cards } }) => {
  const to = {
    pathname: `/decks/${_id}`,
    state: { cards }
  }
  return (
    <Wrapper to={to}>
      <ImgWrapper src={defaultCard} alt="Cover image"/>
      <ContentWrapper>
        <DeckName>{name}</DeckName>
        <DeckDescription>{description}</DeckDescription>
        <NumberOfCardsWrapper>
          <FontAwesomeIcon icon={faLayerGroup}/>
          <NumberOfCardsSpan> {cards.length}</NumberOfCardsSpan>
        </NumberOfCardsWrapper>
      </ContentWrapper>
    </Wrapper>
  )
}
const Wrapper = styled(Link)`
  height: 17rem;
  display: flex;
  margin-bottom: 2.5rem;
  cursor: pointer;
  text-decoration: none;
`
const ImgWrapper = styled.img`
  border-radius: 1.5rem;
  max-height: 100%;
  box-shadow:
   0 0 25px 0 rgba(0, 0, 0, 0.04)
  ,0 1px 5px rgba(0,0,0,.1)
  , 0 6px 0 -1px #fff, 0 6px 5px rgba(0,0,0,.1)
  , 0 10px 0 -1px #fff, 0 10px 5px rgba(0,0,0,.1)
`
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 3rem;
  align-content: flex-start;
  justify-content: flex-start;
`
const DeckName = styled.h1`
  font-weight: 500;
  letter-spacing: 0.05rem;
  color: ${({ theme }) => theme.colors.textColor};
  margin: 0 0 1.2rem 0;
`
const DeckDescription = styled.h2`
  font-weight: 400;
  color: #898989;
  margin: 0 0 1.2rem 0;
`
const NumberOfCardsWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.menuTextColor};
`
const NumberOfCardsSpan = styled.span`
  margin-left: 1rem;
`
