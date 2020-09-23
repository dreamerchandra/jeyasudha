import React from 'react'
import './index.css'

export default function QueryValueProvider({
  queryDetails,
  setValue,
  onReadyToFetch,
}) {
  const { inputComponent: Component, componentProps } = queryDetails || {}
  return (
    <>
      <div className="query-wrapper">
        {Component ? (
          <Component setValue={setValue} {...componentProps} />
        ) : (
          <input disabled placeholder="👈 Select" />
        )}
        <button type="button" onClick={onReadyToFetch} className="paper">
          <span role="img" aria-label="find">
            🔍
          </span>
        </button>
      </div>
    </>
  )
}

export { default as InputField } from './input-field'
export { default as SelectField } from './select-field'
