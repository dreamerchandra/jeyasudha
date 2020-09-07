import React from 'react'
import NavBar from '../nav'
import Header from '../../components/header'
import Print from '../print'
import AuthenticatedView from '../../components/authenticated-view'

const PageFragment = ({ children }) => {
  return (
    <AuthenticatedView>
      <Header />
      <NavBar />
      <>{children}</>
      <Print />
    </AuthenticatedView>
  )
}

export default PageFragment
