import React from 'react'
import { floatToMoney } from '../../js/helper/utils'

const AccountTable = ({ accountData }) => {
  if (!accountData) return null
  return (
    <table className="db-table">
      <thead>
        <tr>
          <td className="db-id">Name</td>
          <td className="db-cus-name">purpose</td>
          <td className="db-ph">Amount</td>
          <td className="db-due">Description</td>
        </tr>
      </thead>
      <tbody>
        {accountData.map(({ id, amount, extraField, purpose, name }) => (
          <tr id={id}>
            <td className="db-id">
              <p>{name}</p>
              <span className="tooltip">{name}</span>
            </td>
            <td>{purpose}</td>
            <td>Rs.{floatToMoney(amount)}</td>
            <td>{extraField || ''}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default AccountTable
