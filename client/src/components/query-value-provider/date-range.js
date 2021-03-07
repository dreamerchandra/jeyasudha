import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faForward } from '@fortawesome/free-solid-svg-icons'

export default function DateRange({ setValue }) {
  useEffect(() => {
    setValue({
      from: new Date(),
      to: new Date(),
    })
  }, [])

  const onInput = (key) => (event) => {
    const { value } = event.target
    setValue((pre) => ({
      ...pre,
      [key]: new Date(value),
    }))
  }

  return (
    <div className="date-range">
      <input
        placeholder="Enter query string"
        type="date"
        onInput={onInput('from')}
      />
      <div role="img" aria-label="to" className="date-range-icon">
        <FontAwesomeIcon icon={faForward} size="lg" />
      </div>
      <input placeholder="Enter query string" type="date" onInput={onInput('to')} />
    </div>
  )
}
