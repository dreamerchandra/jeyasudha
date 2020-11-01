import React, { useState } from 'react'
import PrintableSurface from '../../components/print-holder'
import { floatToMoney } from '../../js/helper/utils'

const BillingTable = ({ data }) => {
  const [save, setSave] = useState(false)
  if (!data) return null
  return (
    <div className="db-table-wrapper">
      <button className="db-table-save paper" type="button" onClick={setSave}>
        Save
      </button>
      <PrintableSurface shouldShowPrintPreview={save}>
        <table className="db-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Particulars</th>
              <th>Unit</th>
              <th>Grand Total</th>
              <th>Amount Paid</th>
              <th>Create At</th>
            </tr>
          </thead>
          <tbody>
            {data.map(
              ({
                id,
                createdAt,
                phoneNumber,
                address,
                name,
                orders,
                grandTotal,
                amountPaid,
              }) => (
                <tr key={id}>
                  <td>{name}</td>
                  <td>{address}</td>
                  <td>{phoneNumber}</td>
                  <td>{orders[0].particular.uniqueName}</td>
                  <td>{orders[0].quantity}</td>
                  <td>Rs.{floatToMoney(grandTotal)}</td>
                  <td>Rs.{floatToMoney(amountPaid)}</td>
                  <td>
                    {createdAt &&
                      new Date(createdAt.seconds * 1000).toLocaleString('en-IN')}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </PrintableSurface>
    </div>
  )
}

export default BillingTable
