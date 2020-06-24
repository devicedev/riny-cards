import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Content = ({ children }) => {
  return <Wrapper>{children}</Wrapper>
}
const Wrapper = styled.div`
  display: flex;
  padding: 10rem 15rem 5rem 15rem;
`

export const LoadingIconWrapper = styled(FontAwesomeIcon)`
  align-self: center;
  font-size: 5rem;
  color: ${({ theme }) => theme.colors.primaryColor};
`
