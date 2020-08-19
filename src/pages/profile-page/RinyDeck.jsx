import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import defaultCard from '../../res/default-card.png'
import defaultCardNotFinished from '../../res/default-card-not-finished.jpg'
import { ProgressBar } from '../../components'

export const RinyDeck = React.memo(({ deck: { _id, id, title, description, cards, progress } }) => {
  const formatString = (string, max) => {
    return string.length > max ? `${string.slice(0, max).trim()}...` : string
  }
  const formattedTitle = formatString(title, 100)
  const formattedDescription = formatString(description, 150)

  const to = {
    pathname: _id ? `/decks/${_id}` : `/continue/${id}`,
    state: { cards }
  }
  return (
    <Wrapper to={to}>
      <ImgWrapper src={_id ? defaultCard : defaultCardNotFinished} alt="Cover image"/>
      <ContentWrapper>
        <DeckTitle>{formattedTitle}</DeckTitle>
        <DeckDescription>{formattedDescription || 'No description'}</DeckDescription>
        <NumberOfCardsWrapper>
          <FontAwesomeIcon icon={faLayerGroup}/>
          <NumberOfCardsSpan> {cards.length}</NumberOfCardsSpan>
        </NumberOfCardsWrapper>
        {progress && progress !== 0 && <ProgressBar progress={progress} height={'1rem'}/>}
      </ContentWrapper>
    </Wrapper>
  )
})

const Wrapper = styled(Link)`
  height: 13rem;
  display: flex;
  margin-bottom: 2.5rem;
  cursor: pointer;
  text-decoration: none;
  @media (min-width: 768px) {
    height: 15rem;
  }
  @media (min-width: 1024px) {
    height: 18rem;
  }
`
const ImgWrapper = styled.img`
  border-radius: 15px;
  max-height: 100%;
  box-shadow:
   0 0 25px 0 rgba(0, 0, 0, 0.04)
  ,0 1px 5px rgba(0,0,0,.1)
  , 0 6px 0 -1px #fff, 0 6px 5px rgba(0,0,0,.1)
  , 0 10px 0 -1px #fff, 0 10px 5px rgba(0,0,0,.1)
`
const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 3rem;
  margin-top: 1rem;
  align-content: flex-start;
  justify-content: flex-start;
`
const DeckTitle = styled.h1`
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0.05rem;
  color: ${({ theme }) => theme.colors.textColor};
  font-size: 1.4rem;
  @media (min-width: 768px) {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
`
const DeckDescription = styled.h2`
  font-weight: 400;
  color: ${({ theme }) => theme.colors.deckDescription};
  font-size: 1.25rem;
  @media (min-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`
const NumberOfCardsWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.menuTextColor};
  margin-bottom: 1rem;
  @media (min-width: 768px) {
    margin-bottom: 2rem;
  }
`
const NumberOfCardsSpan = styled.span`
  margin-left: 1rem;
`
