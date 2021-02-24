import React from 'react'
import { floatToMoney } from '../../js/helper/utils'

const CustomerTable = ({ data }) => {
  if (!data) return null
  return (
    <table className="db-table">
      <thead>
        <tr>
          <th>Customer Name</th>
          <th>Address</th>
          <th>Phone number</th>
          <th>Overall due</th>
        </tr>
      </thead>
      <tbody>
        {data.map(({ id, name, phoneNumber, overallDue, primaryAddress }) => (
          <tr id={id}>
            <td>{name}</td>
            <td>{primaryAddress}</td>
            <td>{phoneNumber}</td>
            <td>Rs.{floatToMoney(overallDue)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default CustomerTable
