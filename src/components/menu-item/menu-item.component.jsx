import React from 'react'

import './menu-item.styles.css'

const MenuItem = ({item: {name, active}}) => {
  const activeClass = active ? 'menu-item-active' : ''
  return (
    <div className={`menu-item ${activeClass}`}>
      {name}
    </div>
  )
}

export default MenuItem
