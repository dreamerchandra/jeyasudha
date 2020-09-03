import React from 'react';
import BillBody from './bill-body';
import './print/index.css';

const PrintContainer = () => (
  <div className="print-container">
    <h1>Bill Structure</h1>
    <BillBody />
  </div>
)



const Print = () => (
  <section className="print" style={{ display: 'none' }}>
    <PrintContainer />
  </section>
)


export default Print