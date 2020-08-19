import React, { useEffect, useRef, useState } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleRight, faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'
import { animated, useSpring, useTransition } from 'react-spring'

import lessonService from '../../services/lessonService'
import { calcCardStyle } from '../../utils'

import { EmptyButton, FullButton, LoadingIcon, ProgressBar, Root } from '../../components'
import { useMediaQuery } from 'react-responsive'

export const LessonPage = () => {
  const { params: { id, lesson: lessonIndex } } = useRouteMatch()
  const history = useHistory()

  const [isClosedModal, setIsClosedModal] = useState(true)
  const handleCloseModal = () => setIsClosedModal(state => !state)
  const handleQuitCloseModal = () => history.push(`/decks/${id}`)

  const [isLoading, setIsLoading] = useState(true)

  const [lesson, setLesson] = useState([])
  const [questions, setQuestions] = useState([])
  const [index, setIndex] = useState(0)
  const [shouldFocus, setShouldFocus] = useState(false)
  const [fail, setFail] = useState(false)
  const [value, setValue] = useState('')
  const [pageTimeout, setPageTimeout] = useState()

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
    return () => clearTimeout(pageTimeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        progressUpdate = (1.5 / lesson.length) * 100
      } else {
        progressUpdate = (1 / lesson.length) * 100
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
    else
      setValue('')

    const newQuestions = [...questions, question]
    clearTimeout(pageTimeout)

    if (correct) {
      setFail(false)
      setQuestions(newQuestions)

      if (index < lesson.length - 1) {
        calcProgress(null, newQuestions, question)
        setIndex(state => state + 1)
        setPageTimeout(setTimeout(() => {
          setValue('')
        }, 100))
      } else {
        calcProgress(100)
        setValue(back)
        const sendQuestions = async () => {
          try {
            const fbQuestions = newQuestions.filter((question) => question.type !== 'STANDARD' && question.type !== 'CHOICE')
            await lessonService.send(id, fbQuestions)
          } catch ({ response }) {
            if (response && response.data)
              toast.error(response.data)
          }
        }
        sendQuestions().then(() => {
          history.push(`/decks/${id}`)
        })
      }
    } else {
      setFail(true)
      setPageTimeout(setTimeout(() => {
        setFail(false)
        lesson.push(lesson[index])
        setLesson(lesson => lesson)
        calcProgress(progress => progress - (.2 / lesson.length) * 100)
        setQuestions(newQuestions)
        setIndex(state => state + 1)
      }, waitTime))
    }
  }

  const transitions = useTransition(index, p => p, {
    from: { opacity: 0, transform: `translate3d(${index === 0 ? 0 : 99.99}%,0,0)` },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-100%,0,0)' },
    onStart: (_, phase) => phase === 'enter' && setShouldFocus(index === 0),
    onRest: (_, phase) => phase === 'leave' && setShouldFocus(true)
  })
  const isTouchable = useMediaQuery({ maxWidth: 1023 })
  const progressBarHeight = isTouchable ? '1.5rem' : '1rem'

  const isMobile = useMediaQuery({ maxWidth: 425 })
  const isTablet = useMediaQuery({ maxWidth: 768 })
  const isSmallLaptop = useMediaQuery({ maxWidth: 1024 })
  let args
  if (isMobile) {
    args = [100]
  } else if (isTablet) {
    args = [100, 3, 5]
  } else if (isSmallLaptop) {
    args = [80]
  } else {
    args = [90]
  }
  const content = <Wrapper>
    {isLoading ?
      <LessonPageIcon icon={faSpinner} pulse/>
      : <>
        <ProgressBarContainer>
          <ProgressBarCloseIcon onClick={handleCloseModal} icon={faTimes}/>
          <ProgressBarWrapper>
            <ProgressBar progress={progress} height={progressBarHeight}/>
          </ProgressBarWrapper>
        </ProgressBarContainer>
        <CardsSlider>
          {transitions.map(({ item, props, key }) => {
            const card = lesson[item]
            let component
            const cardStyle = calcCardStyle(card.front.length, ...args)
            switch (card.type) {
              case 'STANDARD':
                component = <RinyCardSTD
                  key={key}
                  style={props}
                  card={card}
                  onNext={handleOnNext}
                  shouldFocus={shouldFocus}
                />
                break
              case 'CHOICE':
                component = <RinyCardCH
                  key={key}
                  style={props}
                  card={card}
                  onNext={handleOnNext}
                  shouldFocus={shouldFocus}
                  cardStyle={cardStyle}
                />
                break
              default:
                component = <RinyCardFB
                  key={key}
                  style={props}
                  card={card}
                  onNext={handleOnNext}
                  shouldFocus={shouldFocus}
                  cardStyle={cardStyle}
                  fail={fail}
                  valueProp={value}
                />
                break
            }
            return component
          })}
        </CardsSlider>
        {!isClosedModal && <CloseModal onClose={handleCloseModal} onQuit={handleQuitCloseModal}/>}</>
    }
  </Wrapper>
  return Root(content)
}

const RinyCardSTD = ({ style, card, onNext, shouldFocus }) => {
  const [firstFlipped, setFirstFlipped] = useState(false)
  const [flipped, setFlipped] = useState(false)

  const divRef = useRef()

  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(900px) rotateY(${flipped ? -180 : 0}deg)`,
    config: { mass: 5, tension: 600, friction: 80 }
  })
  const scale = 90
  const frontCardStyle = {
    opacity: opacity.interpolate(o => 1 - o * 3),
    transform,
    ...calcCardStyle(card.front.length, scale)
  }
  const backCardStyle = {
    opacity,
    transform: transform.interpolate(t => `${t} rotateY(-180deg)`),
    ...calcCardStyle(card.back.length, scale)
  }

  const handleCardClick = () => {
    setFirstFlipped(true)
    setFlipped(flipped => !flipped)
  }
  const handleButtonClick = () => onNext('', true)
  const handleOnKeyDown = ({ keyCode }) => {
    if (keyCode === 32) {
      handleCardClick()
    } else if (keyCode === 13 && firstFlipped) {
      handleButtonClick()
    }
  }

  useEffect(() => {
    divRef.current.focus()
  }, [])

  const isTouchable = useMediaQuery({ maxWidth: 1023 })

  return <RinyCardWrapperSTD
    style={style}
    tabIndex={0}
    ref={divRef}
    onKeyDown={shouldFocus ? handleOnKeyDown : null}
  >
    <NewCardLabel>New Card</NewCardLabel>
    <CardSTD onClick={handleCardClick}>
      <CardSide style={frontCardStyle}>
        {card.front}
      </CardSide>
      <CardSide style={backCardStyle}>
        {card.back}
      </CardSide>
    </CardSTD>
    {firstFlipped ?
      <>
        <LessonPageContinueFullButton onClick={handleButtonClick}>Continue</LessonPageContinueFullButton>
        {!isTouchable && <SpaceLabel>Press <SpecialSpan>ENTER</SpecialSpan> to continue</SpaceLabel>}
      </>
      :
      <SpaceLabel>Click card {!isTouchable && <>or press <SpecialSpan>SPACE</SpecialSpan></>} to flip</SpaceLabel>
    }
  </RinyCardWrapperSTD>
}
const RinyCardCH = ({ style, card, onNext, shouldFocus, cardStyle }) => {
  const [choices, setChoices] = useState(card.choices.map((choice) => ({
    choice,
    clicked: false,
    correct: choice === card.back
  })))

  let choiceScale

  const isMobile = useMediaQuery({ maxWidth: 425 })
  const isTablet = useMediaQuery({ maxWidth: 768 })
  const isSmallLaptop = useMediaQuery({ maxWidth: 1024 })

  if (isMobile) {
    choiceScale = 40
  } else if (isTablet) {
    choiceScale = 60
  } else if (isSmallLaptop) {
    choiceScale = 80
  } else {
    choiceScale = 80
  }

  const divRef = useRef()

  const handleOnClick = (index) => {
    const updatedChoices = [...choices]
    if (updatedChoices[index]) {
      updatedChoices[index].clicked = true
      setChoices(updatedChoices)
      updatedChoices[index].correct && onNext(updatedChoices[index].choice)
    }
  }
  const handleOnKeyDown = ({ keyCode }) => [49, 50, 51].find(okKeyCode => okKeyCode === keyCode) && handleOnClick(keyCode - 49)

  useEffect(() => {
    divRef.current.focus()
  }, [])

  return <RinyCardWrapperCHFB style={style} tabIndex={0} ref={divRef} onKeyDown={shouldFocus ? handleOnKeyDown : null}>
    <Card style={cardStyle}>
      {card.front}
    </Card>
    <RinyCardChoiceContainer>
      {choices.map(({ choice, clicked, correct }, index) => {
          return <RinyCardChoiceWrapper
            style={calcCardStyle(choice.length, choiceScale)}
            clicked={clicked}
            correct={correct}
            key={index}
            onClick={() => handleOnClick(index)}
          >
            <RinyCardChoiceSpanWrapper>
              <RinyCardChoiceSpan>
                {index + 1}
              </RinyCardChoiceSpan>
            </RinyCardChoiceSpanWrapper>
            <RinyCardChoiceText>
              {choice}
            </RinyCardChoiceText>
          </RinyCardChoiceWrapper>
        }
      )}
    </RinyCardChoiceContainer>
  </RinyCardWrapperCHFB>
}
const RinyCardFB = ({ style, card, onNext, shouldFocus, cardStyle, fail, valueProp }) => {
  const [answer, setAnswer] = useState('')
  const [loaded, setLoaded] = useState(false)

  const inputRef = useRef()

  const value = valueProp || fail ? card.back : answer

  const handleChange = (e) => !fail && setAnswer(e.currentTarget.value)
  const handleKeyDown = ({ key }) => {
    if (key === 'Enter' && !answer)
      return
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
  const handleIdkClick = () => onNext('')

  useEffect(() => {
    if (shouldFocus) {
      if (!fail) {
        inputRef.current.focus()
      }
      setLoaded(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldFocus])

  const isTouchable = useMediaQuery({ maxWidth: 1023 })

  return <RinyCardWrapperCHFB style={style}>
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
          readOnly={!loaded || fail || valueProp}
          onKeyDown={loaded && shouldFocus ? handleKeyDown : null}
          onChange={loaded ? handleChange : null}
          ref={inputRef}
          placeholder={'Enter the answer...'}
        />
        {!fail && <NextButton icon={faArrowCircleRight} onClick={loaded ? handleNexClick : null}/>}
      </CardInputWrapper>
      <IdkButtonWrapper fail={fail}>
        {fail &&
        <ContinueLabel onClick={loaded ? handleLabelClick : null}>
          {!isTouchable ? <> Press <SpecialSpanFB>R</SpecialSpanFB> </> : <>Click </>}
          to mark as right
        </ContinueLabel>
        }
        <IdkButton onClick={loaded ? handleIdkClick : null}>I don't know</IdkButton>
      </IdkButtonWrapper>
    </TextFieldContainer>
  </RinyCardWrapperCHFB>
}
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
        <ModalFullButton onClick={onQuit}>Quit</ModalFullButton>
        <ModalEmptyButton onClick={onClose}>Cancel</ModalEmptyButton>
      </ButtonsContainer>
    </CloseModalWrapper>
  </CloseModalOverlay>
}

const Wrapper = styled.div`
  height: calc(84vh - 4rem);
  width: 100%;
  border-radius: 15px;
  background-color: #FFF;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1), 0 0 25px 0 rgba(0, 0, 0, 0.04);
`
const LessonPageIcon = styled(LoadingIcon)`
  font-size: 10rem;
`
const ProgressBarContainer = styled.div`
  display: flex;
  flex-basis: 10%;
  padding: 2rem 5rem;
  align-items: center;
  justify-content: center;
`
const ProgressBarCloseIcon = styled(FontAwesomeIcon)`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.menuTextColor};
  @media (min-width: 768px) {
    font-size: 2rem;
  }
`
const ProgressBarWrapper = styled.div`
  flex: 1;
  margin-left: 1.5rem;
  @media (min-width: 768px){
    margin-left: 3rem;
  }
`
const CardsSlider = styled.div`
  flex: 1;
  position: relative;
  width: 100%;
  overflow-x: hidden;
`
const RinyCardWrapper = styled(animated.div)`
  position: absolute;
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  will-change: transform, opacity;
  outline: none;
`

const RinyCardWrapperSTD = styled(RinyCardWrapper)`
  flex-direction: column;
  padding: 0 12vw 2rem;
  justify-content: flex-start;
  @media (min-width: 425px){
    padding: 0 18vw 2rem;
  }
  @media (min-width: 768px) {
    padding: 0 22vw 2rem;
  }
  @media (min-width: 1024px){
    padding: 0 24vw 2rem;
  }
  @media (min-width: 1400px){
    padding: 0 26vw 2rem;
  }
`
const NewCardLabel = styled.span`
  color: ${({ theme }) => theme.colors.progressBarFillColor};
  text-transform: uppercase;
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
`
const CardSTD = styled.div`
  width: 100%;
  height: 35vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: 500;
  position: relative;
  color: ${({ theme }) => theme.colors.textColor};
  @media (min-width: 768px) {
    height: 40vh;
  }
`
const CardSide = styled(animated.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  box-shadow: 0 3px 10px 0 rgba(0,0,0,.18);
  padding: 2rem;
  width: 100%;
  height: 100%;
  position: absolute;
  will-change: transform, opacity;
  word-break: break-word;
`
const SpecialSpan = styled.span`
  border-radius: 5px;
  border: 2px solid ${({ theme }) => theme.colors.menuTextColor};
  padding: .4rem;
`
const LessonPageContinueFullButton = styled(FullButton)`
  width: 100%;
  font-size: 1.5rem;
`
const SpaceLabel = styled.span`
  margin-top: 2rem;
  font-size: 1.5rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.menuTextColor}
`

const RinyCardWrapperCHFB = styled(RinyCardWrapper)`
  flex-direction: column;
  justify-content: flex-start;
  padding: 2rem;
  @media (min-width: 1024px) {
    justify-content: center;
    flex-direction: row;
    padding: 10rem 5rem 22rem;
  }
  @media (min-width: 1281px){
    padding: 7rem 10rem 17rem;
  }
`

const Card = styled.div`
  background-color: #FFF;
  border-radius: 30px;
  min-height: 35vh;
  width: 70vw;
  box-shadow: 0 3px 10px 0 rgba(0,0,0,.18);
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  padding: 2rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.textColor};
  @media (min-width: 768px){
    min-height: 40vh;
    width: 40vw;
  }
  @media (min-width: 1024px){
    flex-basis: 35%;
    height: 100%;
  }
  @media (min-width: 1281px){
    flex-basis: 30%;
  }
`
const RinyCardChoiceContainer = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  margin-top: 4rem;
  justify-content: center;
  flex-direction: column;
  font-size: 2rem;
  padding: 0 1rem 2rem;
  @media (min-width: 1024px){
    height: 100%;
    margin: 0 0 0 4rem;
    padding: 2rem;
  }
`
const RinyCardChoiceWrapper = styled.div`
  flex-basis: 33%;
  display: flex;
  width: 100%;
  margin-bottom: 2rem;
  &:last-child{
    margin-bottom: 0;
  }
  ${({ clicked, correct }) => {
  if (!clicked) {
    return css`
      &:hover {
        ${RinyCardChoiceText} {
          border: solid 3px ${({ theme }) => theme.colors.primaryColor};
        }
      }
    `
  } else if (clicked && !correct) {
    return css`
      opacity: .5;
      ${RinyCardChoiceText} {
        border: solid 3px ${({ theme }) => theme.colors.menuTextColor};
        color: ${({ theme }) => theme.colors.menuTextColor}
      }
    `
  } else if (clicked && correct) {
    return css`
       ${RinyCardChoiceText} {
          border: solid 3px ${({ theme }) => theme.colors.primaryColor};
       }
    `
  }
}};
`
const RinyCardChoiceSpanWrapper = styled.div`
  flex-basis: 5%;
`
const RinyCardChoiceSpan = styled.span`
  border-radius: 5px;
  border: 2px solid ${({ theme }) => theme.colors.borderColor};
  padding: .35rem .7rem;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.menuTextColor}
`
const RinyCardChoiceText = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 2rem;
  border-radius: 15px;
  color: ${({ theme }) => theme.colors.primaryColor};
  font-weight: 500;
  border: solid 3px ${({ theme }) => theme.colors.primaryColorLight};
  padding: 1rem;
`

const TextFieldContainer = styled.div`
  flex: 1;
  display: flex;
  width: 70vw;
  justify-content: center;
  align-items: flex-end;
  flex-direction: column;
  font-size: 2rem;
  @media (min-width: 768px){
    width: 60vw;
  }
  @media (min-width: 1024px){
    margin: 0 0 0 4rem;
  }
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
  margin-right: 1rem;
  color: ${({ theme }) => theme.colors.menuTextColor}
`
const SpecialSpanFB = styled.span`
  border-radius: 5px;
  border: 2px solid ${({ theme }) => theme.colors.menuTextColor};
  padding: .4rem .8rem;
`
const IdkButton = styled.div`
  color: ${({ theme }) => theme.colors.primaryColor};
  text-transform: uppercase;
  cursor: pointer;
  font-weight: 600;
  font-size: 1.3rem;
  letter-spacing: .05rem;
`

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
const ModalFullButton = styled(FullButton)`
  margin-right: .5rem;
`
const ModalEmptyButton = styled(EmptyButton)`
  margin-left: .5rem;
`
const CloseModalIconWrapper = styled.div`
  width: 100%;
  text-align: right;
`
const CloseModalIcon = styled(FontAwesomeIcon)`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.menuTextColor};
`
