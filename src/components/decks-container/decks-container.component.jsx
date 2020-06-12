import React, {Component} from 'react'

import './cards-container.styles.css'
import RinyCard from '../riny-card/riny-card.component'

class CardsContainer extends Component {
  state = {
    cards: [
      {
        title: 'Unbekannte Wörter B2',
        description: '15.06.20',
        numerOfElements:
      }

    ]
  }

  render() {
    const {cards} = this.state
    return (
      <div className={'cards-container'}>
        {cards.map((card) => <RinyCard/>)}
      </div>
    )
  }
}

export default CardsContainer