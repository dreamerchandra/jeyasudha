import React from 'react'
import { floatToMoney, sort } from '../../js/helper/utils'

const StaffLoanTable = ({ data }) => {
  if (!data) return null
  return (
    <table className="db-table">
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
  )
}

export default StaffLoanTable
