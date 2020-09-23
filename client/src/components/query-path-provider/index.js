import React from 'react'

export default function QueryPathProvider({ setOption, options }) {
  return (
    <select
      onInput={({ target }) => {
        const [selectedOption] = options.filter(
          (option) => option.id === Number(target.value)
        )
        setOption(selectedOption)
      }}
    >
      <option disabled defaultValue selected>
        -- select an type --
      </option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.displayName}
        </option>
      ))}
    </select>
  )
}
