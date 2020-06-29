import React from 'react'

import { Root } from '../../components'
import { ProfileTab, DecksTab } from './'

export const ProfilePage = () => {
  const tabs = <>
    <ProfileTab/>
    <DecksTab/>
  </>
  return Root(tabs)
}