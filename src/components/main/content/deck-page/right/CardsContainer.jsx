import React, { useContext } from 'react'
import styled from 'styled-components'
import { LoadingIconWrapper } from '../../../../reusable/content'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import { DeckContext } from '../DeckContext'
import { Card } from './'


export const CardsContainer = () => {
  const { deck: { deck }, loading: { loading } } = useContext(DeckContext)
  return (
    <Wrapper>
      {loading ? (
        <LoadingIconWrapperAbsolute icon={faSpinner} pulse/>
      ) : (
        <>
          {deck.cards.map((card, index) => <Card key={index} card={card}/>)}
        </>
      )}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  display: inline-flex;
  padding: 4rem 7rem;
  height: auto;
  flex-wrap: wrap;
  text-align: center;
  position: relative;
`
const LoadingIconWrapperAbsolute = styled(LoadingIconWrapper)`
  position: absolute;
  left: 47%
`
