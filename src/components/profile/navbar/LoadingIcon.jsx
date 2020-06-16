import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

export const LoadingIcon = () => {
  const theme = useContext(ThemeContext)
  return (
    <IconWrapper>
      <FontAwesomeIcon icon={faSpinner} size={'5x'} color={theme.colors.primaryColor}  pulse/>
    </IconWrapper>
  )
}
const IconWrapper = styled.div`
  text-align: center;
`