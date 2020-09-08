import React from 'react'
import './index.css'
import Tick from '../../assert/tick.png'
import Wrong from '../../assert/wrong.png'

export default function Notification({ text, showSuccessIcon }) {
  return (
    <div className="notification-wrapper">
      <div className="notification">
        <img src={showSuccessIcon ? Tick : Wrong} alt="" />
        <p>{text}</p>
      </div>
    </div>
  )
}
