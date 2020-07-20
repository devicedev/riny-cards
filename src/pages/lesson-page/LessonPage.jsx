import React, { useEffect, useRef, useState } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleRight, faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'
import { animated, useSpring, useTransition } from 'react-spring'

import lessonService from '../../services/lessonService'
import { calcCardStyle } from '../../utils'

import { EmptyButton, FullButton, LoadingIcon, Root } from '../../components'

let timeout

export const LessonPage = () => {
  const { params: { id, lesson: lessonIndex } } = useRouteMatch()
  const history = useHistory()
  const [isClosedModal, setIsClosedModal] = useState(true)
  const handleCloseModal = () => {
    setIsClosedModal(state => !state)
  }
  const handleQuitCloseModal = () => {
    history.push(`/decks/${id}`)
  }
  const [isLoading, setIsLoading] = useState(true)

  const [lesson, setLesson] = useState([])
  const [questions, setQuestions] = useState([])
  const [index, setIndex] = useState(0)
  const [shouldFocus, setShouldFocus] = useState(false)

  const [fail, setFail] = useState(false)
  const [value, setValue] = useState('')

  const [progress, setProgress] = useState(0)

  const fetchLesson = async () => {
    try {
      const { data: lesson } = await lessonService.get(id, lessonIndex)
      setLesson(lesson)
    } catch ({ response }) {
      if (response && response.data)
        toast.error(response.data)
      history.replace(`/decks/${id}`)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchLesson()
    return () => clearTimeout(timeout)
  }, [])

  const calcProgress = (updateCb, newQuestions, question) => {
    let progressUpdateCb
    if (newQuestions && question) {
      const result = newQuestions.find(incorrectQuestion =>
        !incorrectQuestion.correct &&
        incorrectQuestion.card === question.card &&
        incorrectQuestion.type === question.type
      )
      let progressUpdate
      if (result) {
        progressUpdate = 12
      } else {
        progressUpdate = 10
      }
      progressUpdateCb = progress => progress + progressUpdate
    } else {
      progressUpdateCb = updateCb
    }
    setProgress(progressUpdateCb)
  }

  const handleOnNext = (answer, right = false) => {
    const { _id, back, type } = lesson[index]
    const waitTime = 1500
    const correct = back === answer || right
    const question = {
      card: _id,
      type,
      correct
    }
    if (right)
      setValue(back)
    const newQuestions = [...questions, question]
    clearTimeout(timeout)
    if (correct) {
      setFail(false)
      setQuestions(newQuestions)
      if (index < lesson.length - 1) {
        calcProgress(null, newQuestions, question)
        setIndex(state => state + 1)
        timeout = setTimeout(() => {
          setValue('')
        }, 100)
      } else {
        calcProgress(100)
        const sendQuestions = async () => {
          try {
            await lessonService.send(id, newQuestions)
          } catch ({ response }) {
            if (response && response.data)
              toast.error(response.data)
          }
        }
        const waitTime = 500
        timeout = setTimeout(() => {
          sendQuestions()
          history.push(`/decks/${id}`)
        }, waitTime)
      }
    } else {
      setFail(true)
      timeout = setTimeout(() => {
        setFail(false)
        lesson.push(lesson[index])
        setLesson(lesson => lesson)
        calcProgress(progress => progress - 2)
        setQuestions(newQuestions)
        setIndex(state => state + 1)
      }, waitTime)
    }
  }
  const transitions = useTransition(index, p => p, {
    from: { opacity: 0, transform: `translate3d(${index === 0 ? 0 : 100}%,0,0)` },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-100%,0,0)' },
    onStart: (_, phase) => phase === 'enter' && setShouldFocus(index === 0),
    onRest: (_, phase) => phase === 'leave' && setShouldFocus(true)
  })

  const content = <Wrapper>
    {isLoading ?
      <LoadingIcon style={{ fontSize: '10rem' }} icon={faSpinner} pulse/>
      : <>
        <ProgressBarContainer onClose={handleCloseModal} progress={progress}/>
        <CardsSlider>
          {transitions.map(({ item, props, key }) => {
            const card = lesson[item]
            return <RinyCard
              key={key}
              style={props}
              card={card}
              onNext={handleOnNext}
              shouldFocus={shouldFocus}
              fail={fail}
              valueProp={value}
            />
          })}
        </CardsSlider>
        {!isClosedModal && <CloseModal onClose={handleCloseModal} onQuit={handleQuitCloseModal}/>}</>
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

const ProgressBarContainer = ({ onClose, progress }) => {
  const fillProps = useSpring({ width: `${progress}%` })
  return <ProgressBarWrapper>
    <ProgressBarCloseIcon onClick={onClose} icon={faTimes}/>
    <ProgressBar>
      <Progress style={fillProps}/>
    </ProgressBar>
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
const Progress = styled(animated.div)`
  height: 100%;
  background-color: ${({ theme }) => theme.colors.progressBarFillColor};
  border-radius: 10px;
`

const RinyCard = ({ card, onNext, style, shouldFocus, fail, valueProp }) => {
  const [answer, setAnswer] = useState('')
  const inputRef = useRef()
  const value = valueProp || fail ? card.back : answer
  const cardStyle = calcCardStyle(card.front.length, 100)
  const handleChange = (e) => !fail && setAnswer(e.currentTarget.value)
  const handleKeyDown = ({ key }) => {
    if (fail) {
      if (key === 'r' || key === 'R') {
        return onNext(card.back, true)
      }
    } else if (key === 'Enter') {
      return onNext(answer)
    }
  }
  const handleLabelClick = () => onNext(card.back, true)
  const handleNexClick = () => onNext(answer)
  useEffect(() => {
    if (shouldFocus && !fail)
      inputRef.current.focus()
  }, [shouldFocus])

  return <RinyCardWrapper style={style}>
    <Card style={cardStyle}>
      {card.front}
    </Card>
    <TextFieldContainer>
      <CardInputWrapper disabled={fail}>
        <CardInput
          type={'text'}
          name={'answer'}
          autoComplete={'off'}
          value={value}
          readOnly={fail || valueProp}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          ref={inputRef}
          placeholder={'Enter the answer...'}
        />
        {!fail && <NextButton icon={faArrowCircleRight} onClick={handleNexClick}/>}
      </CardInputWrapper>
      <IdkButtonWrapper fail={fail}>
        {fail && <ContinueLabel onClick={handleLabelClick}>Press R to mark as right</ContinueLabel>}
        <IdkButton onClick={() => onNext('')}>I don't know</IdkButton>
      </IdkButtonWrapper>
    </TextFieldContainer>
  </RinyCardWrapper>
}
const CardsSlider = styled.div`
  flex-basis: 90%;
  display: flex;
  position: relative;
  width: 100%;
  overflow-x: hidden;
`
const RinyCardWrapper = styled(animated.div)`
  position: absolute;
  display: flex;
  height: 100%;
  width: 100%;
  will-change: transform, opacity;
  padding: 5rem 10rem 12rem 10rem;
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
  padding: 2rem;
  text-align: center;
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
  border-bottom: 2px ${({ disabled, theme }) => disabled ? 'red' : theme.colors.primaryColor} solid;
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
const IdkButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: ${({ fail }) => fail ? 'space-between' : 'flex-end'};
  align-items: center;
`
const ContinueLabel = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.menuTextColor}
`
const IdkButton = styled.div`
  color: ${({ theme }) => theme.colors.primaryColor};
  text-transform: uppercase;
  cursor: pointer;
  font-weight: 600;
  font-size: 1.3rem;
  letter-spacing: .05rem;
`

const CloseModal = ({ onClose, onQuit }) => {
  return <CloseModalOverlay>
    <CloseModalWrapper>
      <CloseModalIconWrapper onClick={onClose}>
        <CloseModalIcon icon={faTimes}/>
      </CloseModalIconWrapper>
      <CloseModalQuestion>
        Are you sure you want to quit?
      </CloseModalQuestion>
      <ButtonsContainer>
        <FullButton marginRight={'0.5rem'} onClick={onQuit}>Quit</FullButton>
        <EmptyButton marginLeft={'0.5rem'} onClick={onClose}>Cancel</EmptyButton>
      </ButtonsContainer>
    </CloseModalWrapper>
  </CloseModalOverlay>
}
const CloseModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.3);
  z-index: 100;
`
const CloseModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 1.5rem 2rem;
  width: 36rem;
  background-color: #FFF;
  border-radius: 15px;
  transform: translateX(-50%) translateY(-50%);
`
const CloseModalQuestion = styled.div`
  color: ${({ theme }) => theme.colors.menuTextColor};
  letter-spacing: .1rem;
  font-size: 1.5rem;
`
const ButtonsContainer = styled.div`
  display: flex;
  font-size: 1.3rem;
`
const CloseModalIconWrapper = styled.div`
  width: 100%;
  text-align: right;
`
const CloseModalIcon = styled(FontAwesomeIcon)`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.menuTextColor};
`
