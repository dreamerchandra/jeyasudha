import React, { forwardRef } from 'react'
import withSaveAsPdf from '../../components/save-as-pdf-hoc'
import { floatToMoney } from '../../js/helper/utils'

const CustomerTable = forwardRef(({ data, onSave, setPdfCss }, ref) => {
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
  return (
    <div className="db-table-wrapper">
      <button className="db-table-save paper" type="button" onClick={onSave}>
        Save
      </button>
      <table className="db-table" ref={ref}>
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
    </div>
  )
})

export default withSaveAsPdf(CustomerTable)
