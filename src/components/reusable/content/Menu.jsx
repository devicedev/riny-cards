import React, { useState } from 'react'
import styled, { css } from 'styled-components'

export const Menu = ({ items }) => {
  const [menuItems, setMenuItems] = useState(items)
  const handleItemClicked = (name) => {
    const oldItems = menuItems.map(item => {
      return { ...item, active: false }
    })
    const activeItem = oldItems.filter(item => item.name === name)[0]
    activeItem.active = true
    setMenuItems(oldItems)
    activeItem.change()
  }
  return (
    <Wrapper>
      {menuItems.map((item) => (
        <MenuItem key={item.name} onClick={handleItemClicked} item={item}/>
      ))}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  border-bottom: .1px solid ${({ theme }) => theme.colors.borderColor};
`

export const MenuItem = ({ item: { name, active }, onClick }) =>
  <MenuItemWrapper active={active} onClick={() => onClick(name)}>{name}</MenuItemWrapper>

const MenuItemWrapper = styled.div`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.menuTextColor};
  font-weight: bold;
  text-transform: uppercase;
  margin-left: 5rem;
  margin-bottom: 3px;
  cursor: pointer;
  padding: 2rem 0 1rem 0;
  text-decoration: none;
  ${({ active }) =>
  active &&
  css`
        border-bottom: 4px solid ${({ theme }) => theme.colors.primaryColor};
        color: ${({ theme }) => theme.colors.primaryColor};
        margin-bottom: -1px;
      `
}
`
