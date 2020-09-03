import React from 'react';
import './index.css'

const MainComponentHolder = ({ children }) => {
  return (
    <main className="main-container">
      <>{children}</>
    </main>
  )
}

export default MainComponentHolder;