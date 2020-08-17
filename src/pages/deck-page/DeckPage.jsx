import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import decksService from '../../services/decksService'

import { Root } from '../../components'
import { CardsTab, DeckInfoTab } from './'
import { DeckContext, DeckProvider } from '../../utils/DeckContext'

export const DeckPageWrapper = () => {
  const { deck: { setDeck }, loading: { setLoading } } = useContext(DeckContext)
  const { id } = useParams()
  const fetchData = async () => {
    try {
      const { data } = await decksService.getDeck((id))
      setDeck(data)
    } catch ({ response }) {
      if (response && response.data)
        toast.error(response.data)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const content = <Wrapper>
    <DeckInfoTab/>
    <CardsTab/>
  </Wrapper>
  return Root(content)
}
export const DeckPage = () => {
  return <DeckProvider>
    <DeckPageWrapper/>
  </DeckProvider>
}

const Wrapper = styled.div`
  min-height: calc(84vh - 4rem);
  display: flex;
  flex-direction: column;
  @media (min-width: 1024px) {
    flex-direction: row;
  }
`
