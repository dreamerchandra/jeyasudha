import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import NavBar from '../nav'
import Header from '../../components/header'
import AuthenticatedView from '../../components/authenticated-view'
import './index.css'

const PageFragment = ({ children }) => {
  return (
    <AuthenticatedView>
      <NavBar />
      <div className="main-body-holder">
        <Header />
        <>{children}</>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        closeOnClick
      />
    </AuthenticatedView>
  )
}

export default PageFragment
