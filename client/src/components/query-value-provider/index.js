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
        <p>Enter appropriate value</p>
        {Component && <Component setValue={setValue} {...componentProps} />}
        <button type="button" onClick={onReadyToFetch}>
          Fetch details
        </button>
      </div>
    </>
  )
}

export { default as InputField } from './input-field'
export { default as SelectField } from './select-field'
