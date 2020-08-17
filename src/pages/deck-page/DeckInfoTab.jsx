import React, { useContext } from 'react'
import styled from 'styled-components'
import dateFormat from 'dateformat'
import { faEdit, faShareSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useHistory } from 'react-router-dom'

import defaultCardBig from '../../res/default-card-big.png'
import profile from '../../res/profile.jpg'

import { LeftTab } from '../../components'
import { DeckContext } from '../../utils'

export const DeckInfoTab = () => {
  const { deck: { deck } } = useContext(DeckContext)
  const history = useHistory()
  const createdAt = deck.createdAt && dateFormat(deck.createdAt, 'dd/mm/yyyy')
  const updatedAt = deck.updatedAt && dateFormat(deck.updatedAt, 'dd/mm/yyyy')
  const handleEdit = () => {
    history.push(`/update/${deck._id}`)
  }
  const content = <Wrapper>
    <DeckDetailsWrapper>
      <DeckImageWrapper>
        <DeckImage src={defaultCardBig} alt={'Deck cover image'}/>
        <Timestamp>
          {createdAt} - {updatedAt}
        </Timestamp>
      </DeckImageWrapper>
      <DeckTextWrapper>
        <DeckTitle>{deck.title}</DeckTitle>
        <DeckDescription>{deck.description || 'No description'}</DeckDescription>
      </DeckTextWrapper>
    </DeckDetailsWrapper>
    <ProfileContainerWrapper>
      <ProfileContainer>
        <AuthorIcon src={profile}/>
        <AuthorName to={'/user'}>
          {deck && deck.author && deck.author.name}
        </AuthorName>
      </ProfileContainer>
      <ButtonsContainer>
        <Button onClick={handleEdit} icon={faEdit}/>
        <Button icon={faShareSquare}/>
      </ButtonsContainer>
    </ProfileContainerWrapper>
  </Wrapper>
  return LeftTab(content)
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  @media (min-width: 1024px) {
    align-items: flex-start;
  }
`
const DeckDetailsWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  @media (min-width: 1024px) {
    flex-direction: column;
    width: initial;
  }
`
const DeckImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const DeckImage = styled.img`
  height: 15rem;
  border-radius: 15px;
  box-shadow: 0 0 35px rgba(0,0,0,.1);
  @media (min-width: 1024px) {
    width: 100%;
    flex: 1;
  }
`
const DeckTextWrapper = styled.div`
  margin-left: 2rem;
  display: flex;
  flex-direction: column;
  @media (min-width: 1024px) {
    margin-left: 0;
  }
`
const DeckTitle = styled.div`
  font-size: 2rem;
  font-weight: 500;
  line-height: 3.5rem;
  color: ${({ theme }) => theme.colors.textColor};
  margin-top: 1rem;
  @media (min-width: 1024px) {
    margin-top: 2rem;
    font-size: 2.2rem;
  }
`
const DeckDescription = styled.div`
  margin-top: 1rem;
  color: ${({ theme }) => theme.colors.deckDescription};
  font-size: 1.25rem;
  @media (min-width: 1024px) {
    font-size: 1.5rem;
  }
`
const ProfileContainerWrapper = styled.div`
  width: 100%;
  display: flex;
  @media (min-width: 1024px) {
    flex-direction: column;
  }
`
const ProfileContainer = styled.div`
  display: flex;
  margin-top: 1rem;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`
const AuthorIcon = styled.img`
  height: 5rem;
  border-radius: 50%;
  border: 2px solid #FFF;
`
const AuthorName = styled(Link)`
  font-size: 1.5rem;
  text-decoration: none;
  margin-left: 1rem;
  color: ${({ theme }) => theme.colors.primaryColor}
`
const Timestamp = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.deckDescription};
  text-align: center;
  width: 100%;
  margin-top: .5rem;
`
const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media (min-width: 1024px) {
    margin-top: 1.5rem;
    justify-content: flex-start;
  }
`
const Button = styled(FontAwesomeIcon)`
  border-radius: 10px;
  margin-right: .5rem;
  padding: .7rem .3rem .7rem .7rem;
  border: 2px solid ${({ theme }) => theme.colors.primaryColor};
  font-size: 3.5rem;
  color: ${({ theme }) => theme.colors.primaryColor}; 
`
