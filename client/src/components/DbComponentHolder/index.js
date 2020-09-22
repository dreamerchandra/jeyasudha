import React from 'react'
import './index.css'

export default function DbComponentHolder({ children }) {
  return (
    <main className="db-container">
      <>{children}</>
    </main>
  )
}
