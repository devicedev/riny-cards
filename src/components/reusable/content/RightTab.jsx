import React from 'react'
import styled from 'styled-components'

export const RightTab = (content) => {
  return (
    <Wrapper>
      {content}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  flex: 3;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1), 0 0 25px 0 rgba(0, 0, 0, 0.04);
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  background-color: #FFF;
`
