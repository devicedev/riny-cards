import React from 'react'
import styled, { css } from 'styled-components'

export const Menu = ({ items, updateMenuItems }) => {
  const handleItemClicked = (name) => {
    const oldItems = items.map(item => {
      return { ...item, active: false }
    })
    const activeItem = oldItems.filter(item => item.name === name)[0]
    activeItem.active = true
    updateMenuItems(oldItems)
    activeItem.change()
  }
  return (
    <Wrapper>
      {items.map((item) => (
        <MenuItem key={item.name} onClick={handleItemClicked} item={item}/>
      ))}
    </Wrapper>
  )
}
export const MenuItem = ({ item: { name, active }, onClick }) =>
  <MenuItemWrapper
    active={active}
    onClick={() => onClick(name)}>{name}
  </MenuItemWrapper>

const Wrapper = styled.div`
  display: flex;
  border-bottom: .1px solid ${({ theme }) => theme.colors.borderColor};
  justify-content: center;
  @media (min-width: 1024px) {
    justify-content: flex-start;
  }
`

const MenuItemWrapper = styled.div`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.menuTextColor};
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 3px;
  cursor: pointer;
  padding: 2rem 0 1rem;
  text-decoration: none;
  ${({ active }) =>
    active && css`
      border-bottom: 4px solid ${({ theme }) => theme.colors.primaryColor};
      color: ${({ theme }) => theme.colors.primaryColor};
      margin-bottom: -1px;
    `
  };
  flex: 1;
  text-align: center;
  margin-left: 2rem;
  &:last-child{
    margin-right: 2rem;
  }
  @media (min-width: 768px) {
   margin-left: 5rem;
   &:last-child{
     margin-right: 5rem;
   }  
  }
  @media (min-width: 1024px) {
    flex: initial;
    &:last-child{
      margin-right: 0;
    }
  }
`
