import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import { Menu, RightTab, LoadingIcon } from '../../components'
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

const CardsMenu = ({ onChange }) => {
  const { deck: { deck }, loading: { loading } } = useContext(DeckContext)
  const cardsName = `Cards${loading ? '' : ` (${deck.cards.length})`}`
  const initialCardMenuItems = [
    {
      name: 'Lessons',
      change: () => onChange(<LessonsContainer/>),
      active: true
    },
    {
      name: cardsName,
      change: () => onChange(<CardsContainer/>),
      active: false
    }
  ]
  const [menuItems, setMenuItems] = useState(initialCardMenuItems)
  useEffect(() => {
    setMenuItems(initialCardMenuItems)
  }, [loading])
  return (
    <Menu items={menuItems} updateMenuItems={setMenuItems}/>
  )
}

export const Container = ({ children }) => {
  const { loading: { loading } } = useContext(DeckContext)
  return <>
    {loading ? (
      <LoadingIconWrapperCards> <LoadingIcon icon={faSpinner} pulse/></LoadingIconWrapperCards>
    ) : (
      <ContainerWrapper>
        {children}
      </ContainerWrapper>
    )}
  </>
}
export const Wrapper = styled.div`
  display: inline-flex;
  position: relative;
  padding: 4rem 7rem;
  height: auto;
  flex-wrap: wrap;
  text-align: center;
  max-width: 100%;
`
export const ContainerWrapper = styled(Wrapper)`
  justify-content: flex-start;
`
export const LoadingIconWrapperCards = styled(Wrapper)`
  justify-content: center;
`
