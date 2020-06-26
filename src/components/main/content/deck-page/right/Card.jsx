import styled from 'styled-components'
import React, { useState } from 'react'

export const Card = ({ card }) => {
  const [flipped, setFlipped] = useState(false)
  const degree = flipped ? '180deg' : '0'
  const style = { transform: `rotateY(${degree})` }
  const handleOnClick = () => setFlipped(!flipped)
  return <Wrapper>
    <CardWrapper
      onClick={handleOnClick}
      style={style}>
      <Front>
        <Text>
          {card.front}
        </Text>
      </Front>
      <Back>
        <Text>
        {card.back}
        </Text>
      </Back>
    </CardWrapper>
  </Wrapper>
}
const Wrapper = styled.div`
  flex-basis: 30%;
  padding: 10rem 0;
  height: 23rem;
  margin: 0 2rem 3rem 0;
  font-size: 2.5rem;
  font-weight: 500;
  line-height: 3.5rem;
  position: relative;
  color: ${({ theme }) => theme.colors.textColor};
`
const CardWrapper = styled.div`
  transform-style: preserve-3d;
  transition: .4s all ease;
  width: 100%;
  height: 100%;
  border-radius: 25px;
  box-shadow: 0 3px 10px 0 rgba(0,0,0,.18);
  top: 0;
  left: 0;
  position: absolute;
`
const Parent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  backface-visibility: hidden;
  padding: 2rem;
  width: 100%;
  height: 100%;
  position: absolute;
`
const Front = styled(Parent)`
`
const Text = styled.div`
  word-wrap: break-word;
  width: 100%;
`
const Back = styled(Parent)`
  transform: rotateY(180deg);
`
