import React, { useState, useEffect } from 'react'
import { useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'
import { animated, useTransition } from 'react-spring'

import lessonService from '../../services/lessonService'
import { calcCardStyle } from '../../utils'

import { LoadingIcon, Root } from '../../components'

export const LessonPage = () => {
  const { params: { id, lesson: lessonIndex } } = useRouteMatch()
  const [isClosedModal, setIsClosedModal] = useState(true)
  const handleClose = () => {
    setIsClosedModal(true)
  }
  const [isLoading, setIsLoading] = useState(true)

  const [lesson, setLesson] = useState([])
  const [index, setIndex] = useState(0)
  const currentCard = lesson[index]

  const fetchLesson = async () => {
    try {
      const { data: lesson } = await lessonService.get(id, lessonIndex)
      setLesson(lesson)
    } catch ({ response }) {
      if (response && response.data)
        toast.error(response.data)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchLesson()
  }, [])

  const handleOnNext = (answer) => {
    setIndex(index + 1)
  }
  const rinyCards = isLoading ? [] : lesson.map((card) => ({ style }) =>
    <RinyCard
      card={card}
      style={style}
      onNext={handleOnNext}
    />
  )
  const transitions = useTransition(index, p => p, {
    from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-100%,0,0)' }
  })

  const content = <Wrapper>
    {isLoading ?
      <LoadingIcon style={{ fontSize: '10rem' }} icon={faSpinner} pulse/>
      : <>
        <ProgressBarContainer onClose={handleClose}/>
        <CardsSlider>
          {transitions.map(({ item, props, key }) => {
            const RinyCard = rinyCards[item]
            return <RinyCard key={key} style={props}/>
          })}
        </CardsSlider>
        {!isClosedModal && <CloseModal/>}</>
    }
  </Wrapper>
  return Root(content)
}
const Wrapper = styled.div`
  height: 70vh;   
  border-radius: 15px;
  background-color: #FFF;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1), 0 0 25px 0 rgba(0, 0, 0, 0.04);
`
const ProgressBarContainer = ({ onClose }) => {
  return <ProgressBarWrapper>
    <ProgressBarCloseIcon onClick={onClose} icon={faTimes}/>
    <ProgressBar/>
  </ProgressBarWrapper>
}
const ProgressBarWrapper = styled.div`
  display: flex;
  flex-basis: 10%;
  padding: 2rem 5rem;
  align-items: center;
  justify-content: center;
`
const ProgressBarCloseIcon = styled(FontAwesomeIcon)`
   font-size: 2rem;
   color: ${({ theme }) => theme.colors.menuTextColor};
`
const ProgressBar = styled.div`
  flex: 1;
  height: .8rem;
  margin-left: 3rem;
  background-color: ${({ theme }) => theme.colors.progressBarColor};
  border-radius: 10px;
`
const CardsSlider = styled.div`
  flex-basis: 90%;
  display: flex;
  position: relative;
  width: 100%;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
`
const RinyCard = ({ card, onNext, style }) => {
  const [answer, setAnswer] = useState('')
  const cardStyle = calcCardStyle(card.front.length, 20)
  const handleKeyDown = (e) => e.key === 'Enter' ? onNext(answer) : null
  return <RinyCardWrapper style={style}>
    <Card style={cardStyle}>
      {card.front}
    </Card>
    <TextFieldContainer>
      <CardInputWrapper>
        <CardInput
          type={'text'}
          name={'answer'}
          autoComplete={'off'}
          value={answer}
          onChange={(e) => setAnswer(e.currentTarget.value)}
          onKeyDown={handleKeyDown}
          placeholder={'Enter the answer...'}
        />
        <NextButton icon={faArrowCircleRight} onClick={() => onNext(answer)}/>
      </CardInputWrapper>
      <IdkButton onClick={() => onNext('')}>I don't know</IdkButton>
    </TextFieldContainer>
  </RinyCardWrapper>
}
const RinyCardWrapper = styled(animated.div)`
  position: absolute;
  display: flex;
  height: 100%;
  width: 100%;
  will-change: transform, opacity;
  padding: 5rem 10rem 12rem 10rem;
  opacity: 0;
`
const Card = styled.div`
  background-color: #FFF;
  border-radius: 30px;
  flex-basis: 30%;
  box-shadow: 0 2px 20px 0 rgba(0,0,0,.1);
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textColor}
`
const TextFieldContainer = styled.div`
  flex-basis: 70%;
  margin-left: 4rem;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-direction: column;
  font-size: 2rem;
`
const CardInputWrapper = styled.div`
  width: 100%;
  border-bottom: 2px ${({ theme }) => theme.colors.primaryColor} solid;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  padding-bottom: .5rem;
`
const CardInput = styled.input`
  outline: none;
  border: none;
  padding: 0.7rem .5rem;
  font-size: inherit;
  font-family: inherit;
  font-weight: 500;
  flex: 1;
  color: #000;
  &::placeholder {
    color: #7d7d7d;
  }
`
const NextButton = styled(FontAwesomeIcon)`
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.primaryColor};
  cursor: pointer;
`
const IdkButton = styled.div`
  color: ${({ theme }) => theme.colors.primaryColor};
  text-transform: uppercase;
  cursor: pointer;
  font-weight: 600;
  font-size: 1.3rem;
  letter-spacing: .05rem;
`
const CloseModal = styled.div`
  
`
