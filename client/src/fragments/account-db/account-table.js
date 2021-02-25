import React from 'react'
import { floatToMoney } from '../../js/helper/utils'

const AccountTable = ({ data }) => {
  if (!data) return null
  const total = data
    .filter(({ amount }) => Number(amount))
    .reduce((sum, { amount }) => sum + amount, 0)
  return (
    <>
      <table className="db-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>purpose</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ id, amount, createdAt, extraField, purpose, name }) => (
            <tr key={id}>
              <td>{name}</td>
              <td>{purpose}</td>
              <td>Rs.{floatToMoney(amount)}</td>
              <td>{extraField || ''}</td>
              <td>
                {createdAt &&
                  new Date(createdAt.seconds * 1000).toLocaleString('en-IN')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="db-total">Total: Rs. {floatToMoney(total)}</div>
    </>
  )
}

export default AccountTable
