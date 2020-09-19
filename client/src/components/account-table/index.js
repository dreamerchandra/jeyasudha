import React from 'react'
import { floatToMoney } from '../../js/helper/utils'

const AccountTable = ({ accountData }) => {
  if (!accountData) return null
  return (
    <table className="db-table">
      <thead>
        <tr>
          <td>Name</td>
          <td>purpose</td>
          <td>Amount</td>
          <td>Created At</td>
          <td>Description</td>
        </tr>
      </thead>
      <tbody>
        {accountData.map(({ id, amount, createdAt, extraField, purpose, name }) => (
          <tr key={id}>
            <td>{name}</td>
            <td>{purpose}</td>
            <td>Rs.{floatToMoney(amount)}</td>
            <td>
              {createdAt &&
                new Date(createdAt.seconds * 1000).toLocaleString('en-IN')}
            </td>
            <td>{extraField || ''}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default AccountTable
