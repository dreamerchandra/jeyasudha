import React from 'react'
import { floatToMoney } from '../../js/helper/utils'

const StaffLoanTable = ({ data }) => {
  if (!data) return null
  return (
    <table className="db-table">
      <thead>
        <tr>
          <td>Emp ID</td>
          <td>Loan Amount</td>
          <td>Loan Type</td>
          <td>EMI Amount</td>
          <td>Pending Amount</td>
        </tr>
      </thead>
      <tbody>
        {data.map(({ lenderEmpId, emiAmount, pendingAmount, type, amount, id }) => (
          <tr key={id}>
            <td>{lenderEmpId}</td>
            <td>Rs.{floatToMoney(amount)}</td>
            <td>{type ? 'ADVANCE' : 'EMI'}</td>
            <td>{emiAmount ? `Rs.${floatToMoney(emiAmount)}` : 'NA'}</td>
            <td>Rs.{floatToMoney(pendingAmount)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default StaffLoanTable
