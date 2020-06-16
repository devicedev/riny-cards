import React from 'react'
import styled, { css } from 'styled-components'

export const MenuItem = ({ item: { name, active } }) => (
  <Wrapper active={active}>{name}</Wrapper>
)
const Wrapper = styled.div`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.menuTextColor};
  font-weight: bold;
  padding-top: 2rem;
  padding-bottom: 1rem;
  text-transform: uppercase;
  margin-bottom: -2px;
  margin-left: 5rem;
  cursor:pointer;
  ${(props) =>
    props.active &&
    css`
      border-bottom: 4px solid ${({theme}) => theme.colors.primaryColor};
      color: ${({theme}) => theme.colors.primaryColor};
    `}
`
