import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import decksService from '../../services/decksService'

import { Root } from '../../components'
import { DeckTab, CardsTab } from './'
import { DeckContext, DeckProvider } from '../../utils/DeckContext'

export const DeckPageWrapper = ({ match }) => {
  const [lesson, setLesson] = useState({})
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
  const handleLessonClicked = (lesson) => setLesson(lesson)
  const content = Object.keys(lesson).length !== 0 ?
    <>

    </> : <>
      <DeckTab/>
      <CardsTab onLessonClicked={handleLessonClicked}/>
    </>
  return Root(content)
}
export const DeckPage = (props) => {
  return <DeckProvider>
    <DeckPageWrapper {...props}/>
  </DeckProvider>
}