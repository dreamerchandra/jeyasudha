import React from 'react'
import { floatToMoney } from '../../js/helper/utils'

const LedgerTable = ({ data }) => {
  if (!data) return null
  return (
    <table className="db-table">
      <thead>
        <tr>
          <th>Phone number</th>
          <th>Payment Type</th>
          <th>Paid For</th>
          <th>Amount</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody>
        {data.map(
          ({ id, createdAt, paymentType, paidFor, netTotal, phoneNumber }) => (
            <tr id={id}>
              <td>{phoneNumber}</td>
              <td>{paymentType ? 'CREDIT' : 'CASH'}</td>
              <td>{paidFor ? 'DUE' : 'MATERIALS'}</td>
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
