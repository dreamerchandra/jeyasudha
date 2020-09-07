/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef } from 'react'
import './index.css'

const useInput = () => {
  const inputRef = useRef()
  const errorRef = useRef()
  const inputValue = inputRef.current?.value

  useEffect(() => {
    const inputNode = inputRef.current
    const blurCb = (event) => {
      if (!event.target.validity.valid) {
        inputNode.classList.add('input-error')
        errorRef.current.classList.remove('hide')
      } else {
        inputNode.classList.remove('input-error')
        errorRef.current.classList.add('hide')
      }
    }
    inputNode.addEventListener('blur', blurCb)
    return () => {
      inputNode.removeEventListener('blur', blurCb)
    }
  }, [])

  useEffect(() => {
    inputRef.current.classList.remove('input-error')
    if (inputValue) {
      inputRef.current.classList.add('input-given')
    } else {
      inputRef.current.classList.remove('input-given')
    }
  }, [inputValue])

  return { inputRef, errorRef }
}

export default function Input({
  title,
  inputType = 'title',
  onChange: _onChange,
  errorComponent = 'Invalid/Required',
}) {
  const { inputRef, errorRef } = useInput()
  return (
    <span className="input-group">
      <input
        className="input"
        type={inputType}
        required
        onChange={_onChange}
        ref={inputRef}
      />
      <span className="input-highlight" />
      <span className="input-bar" />
      <label>{title}</label>
      <div className="input-error hide" ref={errorRef}>
        {errorComponent}
      </div>
    </span>
  )
}
