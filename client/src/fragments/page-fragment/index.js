import React from 'react';
import NavBar from '../nav';
import Header from '../../components/header';
import Print from '../print';
import Footer from '../footer';
import AuthenticatedView from '../../components/authenticated-view';

const PageFragment = ({ children }) => {
  return (
    <AuthenticatedView >
      <Header />
      <NavBar />
      <>{children}</>
      <Print />
      <Footer />
    </AuthenticatedView >
  )
}


export default PageFragment;
