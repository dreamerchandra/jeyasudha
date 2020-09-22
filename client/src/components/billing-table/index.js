import React from 'react'
import { floatToMoney } from '../../js/helper/utils'

const BillingTable = ({ data }) => {
  if (!data) return null
  return (
    <table className="db-table">
      <thead>
        <tr>
          <td>Name</td>
          <td>Address</td>
          <td>Phone Number</td>
          <td>Particulars</td>
          <td>Unit</td>
          <td>Grand Total</td>
          <td>Amount Paid</td>
          <td>Create At</td>
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
  )
}

export default BillingTable
