import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import MainPage from './pages'
import initializeFirebase from './js/firebase-init'

initializeFirebase()

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <MainPage />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
