import React from 'react'
import { floatToMoney } from '../../js/helper/utils'

const CustomerTable = ({ data }) => {
  if (!data) return null
  return (
    <table className="db-table">
      <thead>
        <tr>
          <td>Address</td>
          <td>Customer Name</td>
          <td>Phone number</td>
          <td>Overall due</td>
        </tr>
      </thead>
      <tbody>
        {data.map(({ id, name, phoneNumber, overallDue, primaryAddress }) => (
          <tr id={id}>
            <td>{primaryAddress}</td>
            <td>{name}</td>
            <td>{phoneNumber}</td>
            <td>Rs.{floatToMoney(overallDue)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default CustomerTable
