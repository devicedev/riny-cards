import React from 'react'
import styled from 'styled-components'
import { animated, useSpring } from 'react-spring'

export const ProgressBar = ({ progress, height }) => {
  const fillProps = useSpring({ width: `${progress}%` })
  return (
    <ProgressBarWrapper height={height}>
      <ProgressFill style={fillProps}/>
    </ProgressBarWrapper>
  )
}

const ProgressBarWrapper = styled.div`
  height: ${({ height }) => height};
  background-color: ${({ theme }) => theme.colors.progressBarColor};
  border-radius: 10px;
  overflow: hidden;
`
const ProgressFill = styled(animated.div)`
  height: 100%;
  background-color: ${({ theme }) => theme.colors.progressBarFillColor};
  border-radius: 10px;
`