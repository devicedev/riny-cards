import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'

const Button = ({ content, width, fontSize, backgroundColor, fontWeight, color, border, disabled, marginLeft, marginRight, onClick }) => {
  return <Wrapper
    onClick={onClick}
    marginLeft={marginLeft}
    marginRight={marginRight}
    width={width}
    disabled={disabled}
    fontSize={fontSize}
    backgroundColor={backgroundColor}
    fontWeight={fontWeight}
    color={color}
    border={border}
  >
    {content}
  </Wrapper>
}
const Wrapper = styled.button`
  width: ${({ width }) => width};
  margin-left: ${({ marginLeft }) => marginLeft};
  margin-right: ${({ marginRight }) => marginRight};
  font-size: ${({ fontSize }) => fontSize};
  background-color: ${({ backgroundColor }) => backgroundColor};
  font-weight: ${({ fontWeight }) => fontWeight};
  color: ${({ color }) => color};
  border: ${({ border }) => border};
  text-transform: uppercase;
  border-radius: 10px;
  margin-top: 2rem;
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
  width: '100%'
}

export const FullButton = ({ children, content, disabled, marginRight, marginLeft, onClick, fontSize = 'inherit' }) => {
  const theme = useContext(ThemeContext)
  return <Button
    onClick={onClick}
    fontWeight={'bold'}
    fontSize={fontSize}
    color={'#fff'}
    border={'none'}
    disabled={disabled}
    content={content || children}
    marginRight={marginRight}
    marginLeft={marginLeft}
    backgroundColor={theme.colors.primaryColor}
  />
}

export const EmptyButton = ({ children, content, disabled, marginRight, marginLeft, onClick, fontSize }) => {
  const theme = useContext(ThemeContext)
  return <Button
    onClick={onClick}
    fontWeight={'bold'}
    color={theme.colors.primaryColor}
    border={`2px solid ${theme.colors.primaryColor}`}
    disabled={disabled}
    content={content || children}
    marginRight={marginRight}
    marginLeft={marginLeft}
    backgroundColor={'#FFF'}
    fontSize={fontSize}
  />
}