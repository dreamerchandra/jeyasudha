import React, { forwardRef } from 'react'
import withSaveAsPdf from '../../components/save-as-pdf-hoc'
import { floatToMoney, sort } from '../../js/helper/utils'

const StaffLoanTable = forwardRef(({ data, onSave, setPdfCss }, ref) => {
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
            <th>Emp ID</th>
            <th>Loan Amount</th>
            <th>Loan Type</th>
            <th>EMI Amount</th>
            <th>Pending Amount</th>
          </tr>
        </thead>
        <tbody>
          {sort(data, 'lenderEmpId').map(
            ({ lenderEmpId, emiAmount, pendingAmount, type, amount, id }) => (
              <tr key={id}>
                <td>{lenderEmpId}</td>
                <td>Rs.{floatToMoney(amount)}</td>
                <td>{type ? 'ADVANCE' : 'EMI'}</td>
                <td>{emiAmount ? `Rs.${floatToMoney(emiAmount)}` : 'NA'}</td>
                <td>Rs.{floatToMoney(pendingAmount)}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  )
})

export default withSaveAsPdf(StaffLoanTable)
