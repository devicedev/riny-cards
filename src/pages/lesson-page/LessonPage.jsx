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

let timeout

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
      timeout = setTimeout(() => {
        setFail(false)
        lesson.push(lesson[index])
        setLesson(lesson => lesson)
        calcProgress(progress => progress - (.2 / lesson.length) * 100)
        setQuestions(newQuestions)
        setIndex(state => state + 1)
      }, waitTime)
    }
  }

  const transitions = useTransition(index, p => p, {
    from: { opacity: 0, transform: `translate3d(${index === 0 ? 0 : 99.99}%,0,0)` },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-100%,0,0)' },
    onStart: (_, phase) => phase === 'enter' && setShouldFocus(index === 0),
    onRest: (_, phase) => phase === 'leave' && setShouldFocus(true)
  })

  const content = <Wrapper>
    {isLoading ?
      <LoadingIcon style={{ fontSize: '10rem' }} icon={faSpinner} pulse/>
      : <>
        <ProgressBarContainer>
          <ProgressBarCloseIcon onClick={handleCloseModal} icon={faTimes}/>
          <ProgressBarWrapper>
            <ProgressBar progress={progress} height={'1rem'}/>
          </ProgressBarWrapper>
        </ProgressBarContainer>
        <CardsSlider>
          {transitions.map(({ item, props, key }) => {
            const card = lesson[item]
            let component
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
                />
                break
              default:
                component = <RinyCardFB
                  key={key}
                  style={props}
                  card={card}
                  onNext={handleOnNext}
                  shouldFocus={shouldFocus}
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
  const scale = 100
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

  return <RinyCardWrapper type={card.type} style={style} tabIndex={0} ref={divRef}
                          onKeyDown={shouldFocus ? handleOnKeyDown : null}>
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
        <FullButton onClick={handleButtonClick} width={'25%'} fontSize={'1.5rem'}>Continue</FullButton>
        <SpaceLabel>Press <SpecialSpan>ENTER</SpecialSpan> to continue</SpaceLabel>
      </>
      :
      <SpaceLabel>Click card or press <SpecialSpan>SPACE</SpecialSpan> to flip</SpaceLabel>
    }
  </RinyCardWrapper>
}
const RinyCardCH = ({ style, card, onNext, shouldFocus }) => {
  const [choices, setChoices] = useState(card.choices.map((choice) => ({
    choice,
    clicked: false,
    correct: choice === card.back
  })))

  const cardStyle = calcCardStyle(card.front.length, 100)

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

  return <RinyCardWrapper style={style} tabIndex={0} ref={divRef} onKeyDown={shouldFocus ? handleOnKeyDown : null}>
    <CardCH style={cardStyle}>
      {card.front}
    </CardCH>
    <RinyCardChoiceContainer>
      {choices.map(({ choice, clicked, correct }, index) =>
        <RinyCardChoiceWrapper
          style={calcCardStyle(choice.length, 50)}
          clicked={clicked}
          correct={correct}
          key={index}
          last={index === card.choices.length - 1}
          onClick={() => handleOnClick(index)}
        >
          <RinyCardChoiceSpanWrapper>
            <RinyCardChoiceSpan>
              {index + 1}
            </RinyCardChoiceSpan>
          </RinyCardChoiceSpanWrapper>
          <RinyCardChoiceText className={'riny-card-choice'}>
            {choice}
          </RinyCardChoiceText>
        </RinyCardChoiceWrapper>
      )}
    </RinyCardChoiceContainer>
  </RinyCardWrapper>
}
const RinyCardFB = ({ style, card, onNext, shouldFocus, fail, valueProp }) => {
  const [answer, setAnswer] = useState('')
  const [loaded, setLoaded] = useState(false)

  const inputRef = useRef()

  const value = valueProp || fail ? card.back : answer
  const cardStyle = calcCardStyle(card.front.length, 100)

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
  }, [shouldFocus])

  return <RinyCardWrapper style={style}>
    <CardFB style={cardStyle}>
      {card.front}
    </CardFB>
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
          Press <SpecialSpanFB>R</SpecialSpanFB> to mark as right
        </ContinueLabel>
        }
        <IdkButton onClick={loaded ? handleIdkClick : null}>I don't know</IdkButton>
      </IdkButtonWrapper>
    </TextFieldContainer>
  </RinyCardWrapper>
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
        <FullButton marginRight={'0.5rem'} onClick={onQuit}>Quit</FullButton>
        <EmptyButton marginLeft={'0.5rem'} onClick={onClose}>Cancel</EmptyButton>
      </ButtonsContainer>
    </CloseModalWrapper>
  </CloseModalOverlay>
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
const ProgressBarContainer = styled.div`
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
const ProgressBarWrapper = styled.div`
  flex: 1;
  margin-left: 3rem;
`
const CardsSlider = styled.div`
  flex-basis: 90%;
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
  ${({ type }) => type !== 'STANDARD' ? css`
      justify-content: center;
      padding: 5rem 10rem 12rem 10rem;
  ` : css`
      justify-content: flex-start;
      flex-direction: column;
  `};
`

const NewCardLabel = styled.span`
  color: ${({ theme }) => theme.colors.progressBarFillColor};
  text-transform: uppercase;
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
`
const CardSTD = styled.div`
  width: 25%;
  height: 65%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: 500;
  position: relative;
  color: ${({ theme }) => theme.colors.textColor};
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
const SpaceLabel = styled.span`
  margin-top: 2rem;
  font-size: 1.5rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.menuTextColor}
`

const CardCH = styled.div`
  background-color: #FFF;
  border-radius: 30px;
  flex-basis: 30%;
  height: 100%;
  box-shadow: 0 3px 10px 0 rgba(0,0,0,.18);
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  padding: 2rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.textColor}
`
const RinyCardChoiceContainer = styled.div`
  flex-basis: 70%;
  height: 100%;
  margin-left: 4rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-size: 2rem;
  padding: 1rem;
`
const RinyCardChoiceWrapper = styled.div`
  flex-basis: 33% ;
  display: flex;
  width: 100%;
  margin-bottom: ${({ last }) => last ? '0' : '2rem'};
  ${({ clicked, correct }) => {
  if (!clicked) {
    return css`
        &:hover {
          & > .riny-card-choice {
            border: solid 3px ${({ theme }) => theme.colors.primaryColor};
          }
        }
      `
  } else if (clicked && !correct) {
    return css`
            opacity: .5;
            & > .riny-card-choice {
              border: solid 3px ${({ theme }) => theme.colors.menuTextColor};
              color: ${({ theme }) => theme.colors.menuTextColor}
            }
      `
  } else if (clicked && correct) {
    return css`
         & > .riny-card-choice {
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

const CardFB = styled.div`
  background-color: #FFF;
  border-radius: 30px;
  flex-basis: 30%;
  height: 100%;
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
const CloseModalIconWrapper = styled.div`
  width: 100%;
  text-align: right;
`
const CloseModalIcon = styled(FontAwesomeIcon)`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.menuTextColor};
`
