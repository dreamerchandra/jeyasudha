import React from 'react'

export default function InputField({ setValue, type = 'string', onReadyToFetch }) {
  return (
    <input
      placeholder="Enter query string"
      onInput={(event) => {
        const { target } = event
        const { value } = target
        if (type === 'number') {
          setValue(Number(value))
        } else {
          setValue(value)
        }
      }}
      onKeyPress={(event) => {
        if (event.key === 'Enter' && onReadyToFetch instanceof Function) {
          onReadyToFetch()
        }
      }}
      type={type}
    />
  )
}
