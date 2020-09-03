import React from 'react';
import './index.css';

const BillingFooter = () => (
  <>
    <button className="btn paper">Cash</button>
    <button className="btn paper">Credit</button>
    <button className="btn paper">Print</button>
  </>
)

const Footer = () => (
  <footer className="footer">
    <BillingFooter />
  </footer>
)

export default Footer;