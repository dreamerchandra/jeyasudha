import React from 'react';
import BillHeader from './bill-header';
import BillTitle from './bill-title';
import BillInfo from './bill-info';
import BillMaterials from './bill-material';

const BillBody = () => (
  <div className="bill-body">
    <BillHeader />
    <BillTitle />
    <code className='divider'></code>
    <BillInfo />
    <code className='divider'></code>
    <BillMaterials />
  </div>
)

export default BillBody;