import React, { useContext } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDumbbell } from '@fortawesome/free-solid-svg-icons'

import { Container } from './'
import { DeckContext } from '../../utils/DeckContext'

export const LessonsContainer = () => {
  const { deck: { deck } } = useContext(DeckContext)
  const empty = Object.keys(deck).length === 0
  const iterateLessons = () => {
    const lessons = []
    for (let i = 0; i < deck.cards.length; i += 5) {
      lessons.push(deck.cards.slice(i, i + 5))
    }
    return lessons
  }
  return (
    <Container>
      {!empty && iterateLessons().map((lesson, index) =>
        <LessonContainer
          key={index}
          index={index}
          deckId={deck._id}
        />
      )}
      <TrainingButton to={`/decks/${deck._id}/training`}>
        <TrainingButtonIcon icon={faDumbbell}/>
      </TrainingButton>
    </Container>
  )
}
const LessonContainer = ({ index, deckId }) => {
  return <LessonWrapper to={`/decks/${deckId}/${index}`}>
    {index + 1}
  </LessonWrapper>
}
const LessonWrapper = styled(Link)`
  display: inline-flex;
  text-decoration: none;
  justify-content: center;
  align-items: center;
  height: 16rem;
  cursor: pointer;
  flex-basis: 20%;
  font-weight: bold;
  border-radius: 15px;
  margin: 0 3rem 2rem 0;
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.textColor};
  box-shadow: 
    0 1px 5px rgba(0,0,0,.1),
    0 6px 0 -1px #FFF,
    0 6px 5px rgba(0,0,0,.1),
    0 10px 0 -1px #FFF,
    0 10px 5px rgba(0,0,0,.1)
`
const TrainingButtonIcon = styled(FontAwesomeIcon)`
  justify-content: center;
  align-items: center;
  color: #FFF;
  font-size: 2rem;
`
const TrainingButton = styled(Link)`
  display: flex;
  position: absolute;
  background-color: ${({ theme }) => theme.colors.primaryColor};
  right: -3rem;
  top: -3.5rem;
  border-radius: 50%;
  padding: 2rem 1.8rem;
  cursor: pointer;
  transform: rotate(-45deg);
  box-shadow: 0 0 10px rgba(0,0,0,0.3);
`
