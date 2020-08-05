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
    <DeckImage src={defaultCardBig} alt={'Deck cover image'}/>
    <Timestamp>
      {createdAt} - {updatedAt}
    </Timestamp>
    <DeckTitle>{deck.title}</DeckTitle>
    <DeckDescription>{deck.description || 'No description'}</DeckDescription>
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
  </Wrapper>
  return LeftTab(content)
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`
const DeckImage = styled.img`
  flex: 1;
  width: 100%;
  border-radius: 25px;
  box-shadow: 0 0 35px rgba(0,0,0,.1);
`
const DeckTitle = styled.div`
  font-size: 2.2rem;
  font-weight: 500;
  line-height: 3.5rem;
  color: ${({ theme }) => theme.colors.textColor};
  margin-top: 2rem;
`
const DeckDescription = styled.div`
  font-size: 1.5rem;
  margin-top: 1rem;
  color: ${({ theme }) => theme.colors.deckDescription};
`
const ProfileContainer = styled.div`
  display: flex;
  margin-top: 1rem;
  align-items: center;
`
const AuthorIcon = styled.img`
  width: 20%;
  border-radius: 50%;
  border: 2px solid #FFF;
`
const AuthorName = styled(Link)`
  flex: 1;
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
  margin-top: 1.5rem;
`
const Button = styled(FontAwesomeIcon)`
  border-radius: 10px;
  margin-right: .5rem;
  padding: .7rem .3rem .7rem .7rem;
  border: 2px solid ${({ theme }) => theme.colors.primaryColor};
  font-size: 3.5rem;
  color: ${({ theme }) => theme.colors.primaryColor}; 
`
