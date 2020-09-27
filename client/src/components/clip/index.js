import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import './index.css'

export default function Clip({ label, onDelete = () => {} }) {
  return (
    <div className="clip-wrapper">
      <p>{label}</p>
      <FontAwesomeIcon icon={faTimes} onClick={() => onDelete(label)} size="lg" />
    </div>
  )
}
