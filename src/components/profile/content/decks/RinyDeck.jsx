import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons'

import defaultCard from '../../../../res/default-card.png'

export const RinyDeck = ({ deck: { name, description, cards } }) => {
  const theme = useContext(ThemeContext)
  return (
    <Wrapper>
      <ImgWrapper src={defaultCard} alt="Cover image"/>
      <ContentWrapper>
        <h1>{name}</h1>
        <h2>{description}</h2>
        <NumberOfCardsWrapper>
          <FontAwesomeIcon
            size={'lg'}
            color={theme.colors.menuTextColor}
            icon={faLayerGroup}
          />
          <span> {cards.length}</span>
        </NumberOfCardsWrapper>
      </ContentWrapper>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  height: 17rem;
  display: flex;
  margin-bottom: 2.5rem;
  cursor: pointer;
`
const ImgWrapper = styled.img`
  border-radius: 1.5rem;
  max-height: 100%;
  box-shadow:
   0 0 25px 0 rgba(0, 0, 0, 0.04)
  ,0 1.73494px 5.20482px rgba(0,0,0,.1)
  , 0 6.07229px 0 -1px #fff, 0 6.07229px 5.20482px rgba(0,0,0,.1)
  , 0 10.40964px 0 -1px #fff, 0 10.40964px 5.20482px rgba(0,0,0,.1)
`
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 3rem;
  align-content: flex-start;
  justify-content: flex-start;
  h1,
  h2 {
    margin: 0 0 1.2rem 0;
  }
  h1 {
    font-weight: 500;
    color: ${({ theme }) => theme.colors.textColor};
  }
  h2 {
    font-weight: 400;
    color: ${({ theme }) => theme.colors.menuTextColor};
  }
`
const NumberOfCardsWrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    font-size: 1.5rem;
    margin-left: 1rem;
    color: ${({ theme }) => theme.colors.menuTextColor};
  }
`
