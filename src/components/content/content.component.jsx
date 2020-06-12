import React from 'react'
import ProfileTab from '../profile-tab/profile-tab.component'
import DecksTab from '../decks-tab/decks-tab.component'

import './content.styles.css'

const Content = () => {
  return (
    <div className={"content"}>
      <ProfileTab />
      <DecksTab />

    </div>
  )
}

export default Content
