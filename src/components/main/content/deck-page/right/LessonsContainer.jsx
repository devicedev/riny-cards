import React, { useContext } from 'react'
import { LoadingIconWrapper } from '../../../../reusable/'
import { DeckContext } from '../DeckContext'
import { ContainerWrapper, LoadingIconWrapperCards } from './CardsTab'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

export const LessonsContainer = () => {
  const { deck: { deck }, loading: { loading } } = useContext(DeckContext)
  return (
    <>
      {loading ? (
        <LoadingIconWrapperCards> <LoadingIconWrapper icon={faSpinner} pulse/></LoadingIconWrapperCards>
      ) : (
        <ContainerWrapper>
          Some Lessons
        </ContainerWrapper>
      )}
    </>
  )
}
