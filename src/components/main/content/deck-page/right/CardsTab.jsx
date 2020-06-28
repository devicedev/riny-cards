import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import { LoadingIconWrapper, Menu, RightTab } from '../../../../reusable/'
import { CardsContainer, LessonsContainer } from './'
import { DeckContext } from '../DeckContext'

export const CardsTab = ({ onLessonClicked }) => {
  const [activeTab, setActiveTab] = useState(<LessonsContainer onLessonClicked={onLessonClicked}/>)
  const handleOnChange = (component) => setActiveTab(component)
  const content = <>
    <CardsMenu onChange={handleOnChange} onLessonClicked={onLessonClicked}/>
    {activeTab}
  </>
  return RightTab(content)
}

const CardsMenu = ({ onChange, onLessonClicked }) => {
  const { deck: { deck }, loading: { loading } } = useContext(DeckContext)
  const cardsName = `Cards${loading ? '' : ` (${deck.cards.length})`}`
  const initialCardMenuItems = [
    {
      name: 'Lessons',
      change: () => onChange(<LessonsContainer onLessonClicked={onLessonClicked}/>),
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
  return (
    <>
      {loading ? (
        <LoadingIconWrapperCards> <LoadingIconWrapper icon={faSpinner} pulse/></LoadingIconWrapperCards>
      ) : (
        <ContainerWrapper>
          {children}
        </ContainerWrapper>
      )}
    </>
  )
}
export const Wrapper = styled.div`
  display: inline-flex;
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
