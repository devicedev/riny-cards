import React from 'react'

import { Main } from '../../'
import { ProfileTab, DecksTab } from './'

export const ProfilePage = () => {
  const tabs = <>
    <ProfileTab/>
    <DecksTab/>
  </>
  return Main(tabs)
}
