import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'

const Button = ({ content, ...rest }) => {
  return <Wrapper
    {...rest}
  >
    {content}
  </Wrapper>
}
const Wrapper = styled.button`
  width: ${({ width }) => width};
  margin-left: ${({ marginLeft }) => marginLeft};
  margin-right: ${({ marginRight }) => marginRight};
  margin-top: ${({ marginTop }) => marginTop};
  margin-bottom: ${({ marginBottom }) => marginBottom};
  font-size: ${({ fontSize }) => fontSize};
  background-color: ${({ backgroundColor }) => backgroundColor};
  font-weight: bold;
  font-family: inherit;
  color: ${({ color }) => color};
  border: ${({ border }) => border};
  text-transform: uppercase;
  border-radius: 10px;
  padding: 1rem 0;
  cursor: pointer;
  outline: none;
  &:hover {
    filter: brightness(95%);
  }
  &:disabled {
    background-color: ${({ theme }) => theme.colors.menuTextColor};
  }
`
Button.defaultProps = {
  width: '100%',
  marginTop: '2rem'
}

export const FullButton = ({ children, content, fontSize = 'inherit', ...rest }) => {
  const theme = useContext(ThemeContext)
  return <Button
    color={'#FFF'}
    border={'none'}
    content={content || children}
    backgroundColor={theme.colors.primaryColor}
    fontSize={fontSize}
    {...rest}
  />
}

export const EmptyButton = ({ children, content, ...rest }) => {
  const theme = useContext(ThemeContext)
  return <Button
    color={theme.colors.primaryColor}
    border={`2px solid ${theme.colors.primaryColor}`}
    content={content || children}
    backgroundColor={'#FFF'}
    {...rest}
  />
}