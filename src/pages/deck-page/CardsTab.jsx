import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import { LoadingIcon, Menu, RightTab } from '../../components'
import { CardsContainer, LessonsContainer } from './'
import { DeckContext } from '../../utils/DeckContext'

export const CardsTab = () => {
  const [activeTab, setActiveTab] = useState(<LessonsContainer/>)
  const handleOnChange = (component) => setActiveTab(component)
  const content = <>
    <CardsMenu onChange={handleOnChange}/>
    {activeTab}
  </>
  return RightTab(content)
}
export const Container = ({ children }) => {
  const { loading: { loading } } = useContext(DeckContext)
  return <>
    {loading ? (
      <Wrapper justify={'center'}><LoadingIcon icon={faSpinner} pulse/></Wrapper>
    ) : (
      <Wrapper justify={'flex-start'}>
        {children}
      </Wrapper>
    )}
  </>
}
const Wrapper = styled.div`
  flex: 1;
  width: 100%;
  flex-direction: row;
  display: inline-flex;
  position: relative;
  justify-content: ${({ justify }) => justify};
  flex-wrap: wrap;
  text-align: center;
  align-items: center;
  align-content: flex-start;
  padding: 2rem 3rem;
  @media (min-width: 768px) {
    padding: 4rem 5rem;
  }
`
const CardsMenu = ({ onChange }) => {
  const { deck: { deck }, loading: { loading } } = useContext(DeckContext)
  const cardsName = `Cards${loading ? '' : ` (${deck.cards ? deck.cards.length : ''})`}`
  const initialCardMenuItems = [
    {
      name: 'Lessons',
      change: () => onChange(<LessonsContainer/>),
      active: true
    },
    {
      name: cardsName,
      change: () => !loading && onChange(<CardsContainer/>),
      active: false
    }
  ]
  const [menuItems, setMenuItems] = useState(initialCardMenuItems)
  useEffect(() => {
    setMenuItems(initialCardMenuItems)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])
  return (
    <Menu items={menuItems} updateMenuItems={setMenuItems}/>
  )
}

