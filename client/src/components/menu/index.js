/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import './index.css'

const Menu = ({ className, onClick }) => {
  return (
    <div className={className} onClick={onClick} role="button" tabIndex={-1}>
      <div className="menu">
        <div className="bar1" />
        <div className="bar2" />
        <div className="bar3" />
      </div>
    </div>
  )
}

export default Menu
