import React from 'react';
import MainComponentHolder from '../../components/main-component-holder';
import './index.css';

const Billing = () => (
  <MainComponentHolder>
    <div className="main">
      <p>Customer Name/ID</p>
      <input type="text"></input>
      <p>Address</p>
      <input type="text"></input>
      <p>Driver Name/Vehicle Name</p>
      <input type="text"></input>
      <p>Particulars</p>
      <input type="text"></input>
      <p>Unit</p>
      <input type="text"></input>
      <p>Paid</p>
      <input type="text"></input>
      <p>Balance</p>
      <input type="text"></input>
    </div>
  </MainComponentHolder>
)

export default Billing;
