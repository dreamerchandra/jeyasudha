import React, { forwardRef } from 'react'
import withSaveAsPdf from '../../components/save-as-pdf-hoc'
import { floatToMoney } from '../../js/helper/utils'

const AccountTable = forwardRef(({ data, onSave, setPdfCss }, ref) => {
  if (!data) return null
  setPdfCss(`
    table, td, th {
      border: 1px solid black;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
  `)
  const total = data
    .filter(({ amount }) => Number(amount))
    .reduce((sum, { amount }) => sum + amount, 0)
  return (
    <div className="db-table-wrapper">
      <button className="db-table-save paper" type="button" onClick={onSave}>
        Save
      </button>
      <table className="db-table" ref={ref}>
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
    </div>
  )
})

export default withSaveAsPdf(AccountTable)
