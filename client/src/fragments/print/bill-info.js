import React from 'react'

const BillInfo = ({ billDetails }) => (
  <div className="bill-info">
    <span>
      <h6>Bill Number</h6>
      <p>{billDetails.billId}</p>
    </span>
    <span>
      <h6>Date</h6>
      <p>{new Date(billDetails.createdAt).getDate()}</p>
    </span>
    <span>
      <h6>Name/ID</h6>
      <p>{billDetails.name}</p>
    </span>
    <span>
      <h6>Time</h6>
      <p>{new Date(billDetails.createdAt).getTime()}</p>
    </span>
    <span>
      <h6>Address</h6>
      <p>{billDetails.address}</p>
    </span>
    <span>
      <h6>Vehicle Number/Driver Name</h6>
      <p>{billDetails.vehicleNumber}</p>
    </span>
  </div>
)

export default BillInfo
