import React, { useContext } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { Container } from './'
import { DeckContext } from '../DeckContext'

export const LessonsContainer = () => {
  const { deck: { deck } } = useContext(DeckContext)
  const empty = Object.keys(deck).length === 0
  const iterateLessons = () => {
    const lessons = []
    for (let i = 0; i < deck.cards.length; i += 5) {
      lessons.push(deck.cards.slice(i, i + 5))
    }
    console.log(lessons)
    return lessons
  }
  return (
    <Container>
      {!empty && iterateLessons().map((lesson, index) => <LessonContainer key={index} lesson={lesson} index={index}/>)}
    </Container>
  )
}
const LessonContainer = ({ lesson, index }) => {
  return <LessonWrapper>
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
    0 1.73494px 5.20482px rgba(0,0,0,.1),
    0 6.07229px 0 -1px #FFF,
    0 6.07229px 5.20482px rgba(0,0,0,.1),
    0 10.40964px 0 -1px #FFF,
    0 10.40964px 5.20482px rgba(0,0,0,.1)

`
