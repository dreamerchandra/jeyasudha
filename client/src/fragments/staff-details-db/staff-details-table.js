import React, { forwardRef } from 'react'
import withSaveAsPdf from '../../components/save-as-pdf-hoc'
import { floatToMoney } from '../../js/helper/utils'

const StaffDetailsTable = forwardRef(({ data, onSave, setPdfCss }, ref) => {
  setPdfCss(`
    table, td, th {
      border: 1px solid black;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
  `)
  if (!data) return null
  return (
    <div className="db-table-wrapper">
      <button className="db-table-save paper" type="button" onClick={onSave}>
        Save
      </button>
      <table className="db-table" ref={ref}>
        <thead>
          <tr>
            <th>Emp ID</th>
            <th>Name</th>
            <th>payCycle</th>
            <th>salary</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ empId, name, payCycle, salary, id }) => (
            <tr key={id}>
              <td>{empId}</td>
              <td>{name}</td>
              <td>{payCycle ? 'WEEK' : 'MONTHLY'}</td>
              <td>Rs.{floatToMoney(salary)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
})

export default withSaveAsPdf(StaffDetailsTable)
