import React from 'react'

export default function InputField({ setValue, type = 'string' }) {
  return (
    <input
      onInput={(event) => {
        const { target } = event
        const { value } = target
        if (type === 'number') {
          setValue(Number(value))
        } else {
          setValue(value)
        }
      }}
      type={type}
    />
  )
}
