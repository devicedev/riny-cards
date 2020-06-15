import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { RinyDeck } from '.'

import { getDecks } from '../../../../services/decksService'

export const DecksContainer = () => {
  const [decks, setDecks] = useState(decksInitialState)
  /*useEffect(() => {
    const fetchData = async () => {
      const { data } = await getDecks()
      console.log(JSON.stringify(data.slice(0, 15)))
      setDecks(data.slice(0, 15))
    }
    fetchData()
  }, [])*/
  return (
    <Wrapper>
      {decks.map((deck) => <RinyDeck key={deck._id} deck={deck}/>)}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  padding: 4rem 5rem;
  display:flex;
  flex-direction: column;
`
const decksInitialState = [{
  'language': 'en',
  'cards': ['5ee6a05c11b54e2a57b087c5', '5ee6a05c11b54e2a57b087c7'],
  '_id': '5ee6a05c11b54e2a57b087c4',
  'name': 'Unbekannte Wörter B2',
  'description': '15.06.20',
  'coverImage': '',
  'deleted': false,
  'createdAt': '2020-06-12T15:08:09.000Z',
  'updatedAt': '2020-06-14T22:10:36.593Z',
  'imported': true,
  '__v': 1
}, {
  'language': 'en',
  'cards': [],
  '_id': '5ee6a05c11b54e2a57b087cb',
  'name': 'Unbekannte Wörter B2',
  'description': '12.06.20',
  'coverImage': '',
  'deleted': false,
  'createdAt': '2020-06-10T06:37:44.000Z',
  'updatedAt': '2020-06-14T22:10:38.104Z',
  'imported': true,
  '__v': 1
}, {
  'language': 'en',
  'cards': [],
  '_id': '5ee6a05e11b54e2a57b08817',
  'name': 'Ubekannte Wörte B2',
  'description': '09.06.20',
  'coverImage': '',
  'deleted': false,
  'createdAt': '2020-06-07T05:00:13.000Z',
  'updatedAt': '2020-06-14T22:10:39.551Z',
  'imported': true,
  '__v': 1
}, {
  'language': 'en',
  'cards': [],
  '_id': '5ee6a05f11b54e2a57b08863',
  'name': 'Unbekannte Wörter B2',
  'description': '06.06.20',
  'coverImage': '',
  'deleted': false,
  'createdAt': '2020-06-03T12:27:05.000Z',
  'updatedAt': '2020-06-14T22:10:41.081Z',
  'imported': true,
  '__v': 1
}, {
  'language': 'en',
  'cards': [],
  '_id': '5ee6a06111b54e2a57b088af',
  'name': 'Unbekannte Wörter B2',
  'description': '03.06.20',
  'coverImage': '',
  'deleted': false,
  'createdAt': '2020-05-29T06:20:27.000Z',
  'updatedAt': '2020-06-14T22:10:42.522Z',
  'imported': true,
  '__v': 1
}, {
  'language': 'en',
  'cards': [],
  '_id': '5ee6a06211b54e2a57b088fb',
  'name': 'Unbekannte Wörter B2',
  'description': '30.05.20',
  'coverImage': '',
  'deleted': false,
  'createdAt': '2020-05-28T13:55:47.000Z',
  'updatedAt': '2020-06-14T22:10:43.983Z',
  'imported': true,
  '__v': 1
}, {
  'language': 'en',
  'cards': [],
  '_id': '5ee6a06411b54e2a57b08947',
  'name': 'Unbekannte Wörter B2',
  'description': '27.05.20',
  'coverImage': '',
  'deleted': false,
  'createdAt': '2020-05-23T18:00:23.000Z',
  'updatedAt': '2020-06-14T22:10:45.440Z',
  'imported': true,
  '__v': 1
}, {
  'language': 'en',
  'cards': [],
  '_id': '5ee6a06511b54e2a57b08993',
  'name': 'Unbekannte Wörter B2',
  'description': '24.05.20',
  'coverImage': '',
  'deleted': false,
  'createdAt': '2020-05-21T17:05:40.000Z',
  'updatedAt': '2020-06-14T22:10:46.885Z',
  'imported': true,
  '__v': 1
}, {
  'language': 'en',
  'cards': [],
  '_id': '5ee6a06611b54e2a57b089df',
  'name': 'Unbekannte Wörter B2',
  'description': '21.05.20',
  'coverImage': '',
  'deleted': false,
  'createdAt': '2020-05-21T17:02:49.000Z',
  'updatedAt': '2020-06-14T22:10:48.314Z',
  'imported': true,
  '__v': 1
}, {
  'language': 'en',
  'cards': [],
  '_id': '5ee6a06811b54e2a57b08a2b',
  'name': 'Unbekannte Wörter B2',
  'description': '18.05.20',
  'coverImage': '',
  'deleted': false,
  'createdAt': '2020-05-18T12:31:58.000Z',
  'updatedAt': '2020-06-14T22:10:49.741Z',
  'imported': true,
  '__v': 1
}, {
  'language': 'en',
  'cards': [],
  '_id': '5ee6a06911b54e2a57b08a77',
  'name': 'Unbekannte Wörter B2',
  'description': '15.05.20',
  'coverImage': '',
  'deleted': false,
  'createdAt': '2020-05-14T10:40:44.000Z',
  'updatedAt': '2020-06-14T22:10:51.164Z',
  'imported': true,
  '__v': 1
}, {
  'language': 'en',
  'cards': [],
  '_id': '5ee6a06b11b54e2a57b08ac3',
  'name': 'Unbekannte Wörter B2',
  'description': '12.05.20',
  'coverImage': '',
  'deleted': false,
  'createdAt': '2020-05-11T07:51:07.000Z',
  'updatedAt': '2020-06-14T22:10:52.646Z',
  'imported': true,
  '__v': 1
}, {
  'language': 'en',
  'cards': [],
  '_id': '5ee6a06c11b54e2a57b08b0f',
  'name': 'Unbekannte Wörter B2',
  'description': '09.05.20',
  'coverImage': '',
  'deleted': false,
  'createdAt': '2020-05-06T14:18:47.000Z',
  'updatedAt': '2020-06-14T22:10:54.097Z',
  'imported': true,
  '__v': 1
}, {
  'language': 'en',
  'cards': [],
  '_id': '5ee6a06e11b54e2a57b08b5b',
  'name': 'Unbekannte Wörter B2',
  'description': '06.05.20',
  'coverImage': '',
  'deleted': false,
  'createdAt': '2020-05-05T08:57:29.000Z',
  'updatedAt': '2020-06-14T22:10:55.515Z',
  'imported': true,
  '__v': 1
}, {
  'language': 'en',
  'cards': [],
  '_id': '5ee6a06f11b54e2a57b08ba7',
  'name': 'Unbekannte Wörter B2',
  'description': '03.05.20',
  'coverImage': '',
  'deleted': false,
  'createdAt': '2020-04-30T07:55:43.000Z',
  'updatedAt': '2020-06-14T22:10:56.971Z',
  'imported': true,
  '__v': 1
}]