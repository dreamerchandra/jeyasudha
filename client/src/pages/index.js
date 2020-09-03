import React from 'react';
import './index.css';
import NavBar from '../fragments/nav';
import Header from '../components/header';
import Billing from '../fragments/billing';
import Print from '../fragments/print';
import Footer from '../fragments/footer';

const MainPage = () => (
  <>
    <Header />
    <NavBar />
    <Billing />
    <Print />
    <Footer />
  </>
)


export default MainPage;
