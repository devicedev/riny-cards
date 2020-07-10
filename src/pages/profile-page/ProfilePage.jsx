import React from 'react'

import { Root } from '../../components'
import { ProfileTab, DecksTab } from './'

export const ProfilePage = () => {
  const content = <>
    <ProfileTab/>
    <DecksTab/>
  </>
  return Root(content)
}