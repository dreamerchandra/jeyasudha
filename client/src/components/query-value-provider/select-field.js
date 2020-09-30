import React from 'react'

export default function SelectInput({ setValue, list }) {
  return (
    <select
      onInput={({ target }) => {
        setValue(target.value)
      }}
    >
      <option disabled defaultValue selected>
        -- select an option --
      </option>
      {list.map((item) => (
        <option key={item.id} value={item.value} itemID={item.id} id={item.id}>
          {item.label ? item.label : item.value}
        </option>
      ))}
    </select>
  )
}
