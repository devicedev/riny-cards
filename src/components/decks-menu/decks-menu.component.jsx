import React, {Component} from 'react'

import MenuItem from '../menu-item/menu-item.component'

import './cards-menu.styles.css'

class CardsMenu extends Component {
  state = {
    items: [
      {
        key: 1,
        name: 'Decks',
        active: true
      }, {
        key: 2,
        name: 'Followers',
        active: false

      }, {
        key: 3,
        name: 'Following',
        active: false
      }
    ]
  }

  render() {
    const {items} = this.state
    return (
      <div className={'cards-menu'}>
        {items.map((item) => <MenuItem key={item.key} item={item}/>)}
      </div>
    )
  }
}

export default CardsMenu
