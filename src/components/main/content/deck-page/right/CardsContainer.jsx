import React, { useContext } from 'react'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import { Card } from './'
import { DeckContext } from '../DeckContext'
import { LoadingIconWrapper } from '../../../../reusable/content'
import { ContainerWrapper, LoadingIconWrapperCards } from './CardsTab'

export const CardsContainer = () => {
  const { deck: { deck }, loading: { loading } } = useContext(DeckContext)
  return (
    <>
      {loading ? (
        <LoadingIconWrapperCards> <LoadingIconWrapper icon={faSpinner} pulse/></LoadingIconWrapperCards>
      ) : (
        <ContainerWrapper>
          {deck.cards.map((card, index) => <Card key={index} card={card}/>)}
        </ContainerWrapper>
      )}
    </>
  )
}

