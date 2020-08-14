import React, { useContext } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDumbbell } from '@fortawesome/free-solid-svg-icons'

import { Container } from './'
import { DeckContext } from '../../utils/DeckContext'
import { ProgressBar } from '../../components'

import lockedLesson from '../../res/locked-lesson.jpg'
import completedLesson from '../../res/completed-lesson.png'

export const LessonsContainer = () => {
  const { deck: { deck } } = useContext(DeckContext)
  const empty = Object.keys(deck).length === 0
  return (
    <Container>
      {!empty && deck.parts.map((part, index) =>
        part.locked ?
          <LockedLessonWrapper key={index}>
            <Image src={lockedLesson}/>
          </LockedLessonWrapper>
          :
          <LessonWrapperLink key={index} to={`/decks/${deck._id}/${index}`}>
            <LessonWrapperLinkContainer completed={part.progress === 100}>
              {part.progress === 100 ?
                <Image src={completedLesson}/> :
                <>
                  <LessonIndex center={part.progress === 0}>
                    {index + 1}
                  </LessonIndex>
                  {part.progress !== 0 &&
                  <ProgressBarWrapper>
                    <ProgressBar progress={part.progress} height={'1.5rem'}/>
                  </ProgressBarWrapper>
                  }
                </>
              }
            </LessonWrapperLinkContainer>
          </LessonWrapperLink>
      )}
      {!empty && !deck.parts.some(part => part.progress !== 100) &&
      <TrainingButton to={`/decks/${deck._id}/training`}>
        <TrainingButtonIcon icon={faDumbbell}/>
      </TrainingButton>
      }
    </Container>
  )
}

const LockedLessonWrapper = styled.div`
  height: 16rem;
  flex-basis: 20%;
  margin: 0 3rem 2rem 0;
  background-color: #eaedf2;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 
    0 1px 5px rgba(0,0,0,.1),
    0 6px 0 -1px #eaedf2,
    0 6px 5px rgba(0,0,0,.1),
    0 10px 0 -1px #eaedf2,
    0 10px 5px rgba(0,0,0,.1);
  &:nth-child(4n){
    margin: 0 0 2rem 0;
  }
`
const LessonWrapperLink = styled(Link)`
  text-decoration: none;
  height: 16rem;
  cursor: pointer;
  flex-basis: 20%;
  font-weight: bold;
  margin: 0 3rem 2rem 0;
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.textColor};
  &:nth-child(4n){
    margin: 0 0 2rem 0;
  }
`
const LessonWrapperLinkContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 
    0 1px 5px rgba(0,0,0,.1),
    0 6px 0 -1px ${({ completed }) => completed ? '#ffd600' : '#FFF'},
    0 6px 5px rgba(0,0,0,.1),
    0 10px 0 -1px ${({ completed }) => completed ? '#ffd600' : '#FFF'},
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
const Image = styled.img`
  width: 100%;
  height: 100%;
`
const LessonIndex = styled.span`
  margin-bottom: ${({ center }) => center ? '6.5rem' : '4.5rem'};
`
const ProgressBarWrapper = styled.div`
  width: 100%;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  margin-bottom: 2rem;
`

