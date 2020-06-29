import React, { useContext } from 'react'
import styled from 'styled-components'

import { Container } from './'
import { DeckContext } from '../../utils/DeckContext'

export const LessonsContainer = ({ onLessonClicked }) => {
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
          lesson={lesson}
          index={index}
          onLessonClicked={onLessonClicked}
        />
      )}
    </Container>
  )
}
const LessonContainer = ({ lesson, index, onLessonClicked }) => {
  return <LessonWrapper onClick={() => onLessonClicked(lesson)}>
    {index + 1}
  </LessonWrapper>
}
const LessonWrapper = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 16rem;
  cursor: pointer;
  flex-basis: 20%;
  font-weight: bold;
  border-radius: 1.5rem;
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
