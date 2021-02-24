import React from 'react'
import { useLocation } from 'react-router-dom'
import MainComponentHolder from '../main-component-holder'

export default function BackgroundLogo() {
  const location = useLocation()
  return location.pathname === '/' ? (
    <MainComponentHolder>
      <div className="main-logo-background" />
    </MainComponentHolder>
  ) : null
}
