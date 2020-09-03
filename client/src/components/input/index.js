import React from 'react'
import './index.css';

export default function Input ({ title, inputType = 'title', onChange = () => { } }) {
  return (
    <span className="input-group">
      <input className="input" type={inputType} required onChange={onChange()} />
      <span className="input-highlight"></span>
      <span className="input-bar"></span>
      <label>{title}</label>
    </span>
  )
}