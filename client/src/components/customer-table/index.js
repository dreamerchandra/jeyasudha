import React from 'react'
import { floatToMoney } from '../../js/helper/utils'

const CustomerTable = ({ customerData }) => {
  if (!customerData) return null
  return (
    <table className="db-table">
      <thead>
        <tr>
          <td className="db-id">Address</td>
          <td className="db-cus-name">Customer Name</td>
          <td className="db-ph">Phone number</td>
          <td className="db-due">Overall due</td>
        </tr>
      </thead>
      <tbody>
        {customerData.map(
          ({ id, name, phoneNumber, overallDue, primaryAddress }) => (
            <tr id={id}>
              <td className="db-id">
                <p>{primaryAddress}</p>
                <span className="tooltip">{primaryAddress}</span>
              </td>
              <td>{name}</td>
              <td>{phoneNumber}</td>
              <td>Rs.{floatToMoney(overallDue)}</td>
            </tr>
          )
        )}
      </tbody>
    </table>
  )
}

export default CustomerTable