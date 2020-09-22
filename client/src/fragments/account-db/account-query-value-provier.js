import React from 'react'
import { accountPurposeList } from '../account/account-hooks'
import './index.css'

function InputField({ setValue, type = 'string' }) {
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

function SelectInput({ setValue }) {
  return (
    <select
      onInput={({ target }) => {
        setValue(target.value)
      }}
    >
      <option disabled defaultValue selected>
        -- select an option --
      </option>
      {accountPurposeList.map((details) => (
        <option
          key={details.id}
          value={details.value}
          itemID={details.id}
          id={details.id}
        >
          {details.value}
        </option>
      ))}
    </select>
  )
}
export default function AccountQueryValueProvider({
  setValue,
  fieldValue,
  onReadyToFetch,
}) {
  return (
    <>
      <div className="query-wrapper">
        <p>Enter appropriate value</p>
        {fieldValue === 'name' && <InputField setValue={setValue} />}
        {fieldValue === 'amount' && <InputField setValue={setValue} type="number" />}
        {fieldValue === 'purpose' && <SelectInput setValue={setValue} />}
        <button type="button" onClick={onReadyToFetch}>
          Fetch details
        </button>
      </div>
    </>
  )
}
