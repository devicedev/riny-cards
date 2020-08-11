import React from 'react'

import { Root } from '../../components'
import { DecksTab, ProfileTab } from './'

export const ProfilePage = () => {
  const content = <>
    <ProfileTab/>
    <DecksTab/>
  </>
  return Root(content)
}