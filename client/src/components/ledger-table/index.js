import React from 'react'
import { floatToMoney } from '../../js/helper/utils'

const LedgerTable = ({ data }) => {
  if (!data) return null
  return (
    <table className="db-table">
      <thead>
        <tr>
          <td>Phone number</td>
          <td>Payment Type</td>
          <td>Paid For</td>
          <td>Amount</td>
          <td>Created At</td>
        </tr>
      </thead>
      <tbody>
        {data.map(
          ({ id, createdAt, paymentType, paidFor, netTotal, phoneNumber }) => (
            <tr id={id}>
              <td>{phoneNumber}</td>
              <td>{paymentType ? 'CASH' : 'CREDIT'}</td>
              <td>{paidFor ? 'MATERIALS' : 'DUE'}</td>
              <td>Rs.{floatToMoney(netTotal)}</td>
              <td>{new Date(createdAt.seconds * 1000).toLocaleString('en-IN')}</td>
            </tr>
          )
        )}
      </tbody>
    </table>
  )
}

export default LedgerTable
