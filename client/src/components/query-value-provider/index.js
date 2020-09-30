import React from 'react'
import './index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

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
        <button type="button" onClick={onReadyToFetch}>
          <span role="img" aria-label="find">
            <FontAwesomeIcon icon={faSearch} size="lg" />
          </span>
        </button>
      </div>
    </>
  )
}

export { default as InputField } from './input-field'
export { default as SelectField } from './select-field'
