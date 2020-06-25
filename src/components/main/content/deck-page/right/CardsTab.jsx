import React, {  useState } from 'react'
import styled from 'styled-components'

import {Menu, RightTab } from '../../../../reusable/'
import { CardsContainer, LessonsContainer } from './'

export const CardsTab = () => {
  const [activeTab, setActiveTab] = useState(<CardsContainer/>)
  const handleOnChange = (component) => setActiveTab(component)
  const content = <>
    <CardsMenu onChange={handleOnChange}/>
    {activeTab}
  </>
  return RightTab(content)
}

const CardsMenu = ({ onChange }) => {
  const cardsMenuItems = [
    {
      name: 'Lessons',
      change: () => onChange(<LessonsContainer/>),
      active: false
    },
    {
      name: 'Cards',
      change: () => onChange(<CardsContainer/>),
      active: true
    }
  ]
  return (
    <Menu items={cardsMenuItems}/>
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
