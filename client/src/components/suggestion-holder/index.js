import React from 'react'
import './index.css'

export default function SuggestionHolder({ children }) {
  return (
    <div className="suggestion-wrapper">
      <div className="suggestion-holder">
        <>{children}</>
      </div>
    </div>
  )
}
