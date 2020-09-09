import React from 'react'
import BillHeader from './bill-header'
import BillTitle from './bill-title'
import BillInfo from './bill-info'
import BillMaterials from './bill-material'

const BillBody = ({ billDetails }) => (
  <div className="bill-body">
    <BillHeader />
    <BillTitle />
    <code className="divider" />
    <BillInfo billDetails={billDetails} />
    <code className="divider" />
    <BillMaterials billDetails={billDetails} />
  </div>
)

export default BillBody
