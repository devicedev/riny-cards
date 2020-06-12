import React, {Component} from 'react'

import './decks-container.styles.css'
import RinyCard from '../riny-card/riny-card.component'

class DecksContainer extends Component {
  state = {
    decks: [
      {
        title: 'Unbekannte Wörter B2',
        description: '15.06.20',
        numerOfElements: 5
      }

    ]
  }

  render() {
    const {decks} = this.state
    return (
      <div className={'decks-container'}>
        {decks.map((deck) => <RinyCard/>)}
      </div>
    )
  }
}

export default DecksContainer