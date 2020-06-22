import React  from 'react'
import styled from 'styled-components'

import { MenuItem } from './'

export const Menu = ({items}) => {
  return (
    <Wrapper>
      {items.map((item) => (
        <MenuItem key={item.name} item={item} />
      ))}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: .1px solid ${({theme}) => theme.colors.borderColor};
`