import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { Main } from '../../'
import { DeckTab, CardsTab } from './'
import { DeckContext, DeckProvider } from './DeckContext'

import decksService from '../../../../services/decksService'

export const DeckPageWrapper = ({ match }) => {
  const [lesson, setLesson] = useState({})
  const [state, setState] = useState('tabs')
  const { deck: { setDeck }, loading: { setLoading } } = useContext(DeckContext)

  const fetchData = async () => {
    const { id } = match.params
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
  }, [])
  let content
  switch (state) {
    case 'tabs':
      content = <>
        <DeckTab/>
        <CardsTab/>
      </>
      break
    case 'lesson':
      content = <>

      </>
      break
    default:
      content = <></>
      break
  }
  return Main(content)
}
export const DeckPage = (props) => {
  return <DeckProvider>
    <DeckPageWrapper {...props}/>
  </DeckProvider>
}
