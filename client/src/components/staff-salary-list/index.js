import React from 'react'
import { convertFirebaseTimeStampToString } from '../../js/firebase-helper'
import { floatToMoney } from '../../js/helper/utils'

const StaffSalaryTable = ({ data }) => {
  if (!data) return null
  return (
    <table className="db-table">
      <thead>
        <tr>
          <th>Emp ID</th>
          <th>Name</th>
          <th>payCycle</th>
          <th>salary</th>
          <th>Working Days</th>
          <th>Deductions</th>
          <th>Net Salary</th>
          <th>Credited At</th>
          <th>Cycle Start Date</th>
        </tr>
      </thead>
      <tbody>
        {data.map(
          ({
            id,
            empId,
            name,
            payCycle,
            salary,
            workingDays,
            deductions,
            netSalary,
            createdAt: creditedAt,
            payCycleStart,
          }) => (
            <tr key={id}>
              <td>{empId}</td>
              <td>{name}</td>
              <td>{payCycle ? 'WEEK' : 'MONTHLY'}</td>
              <td>Rs.{floatToMoney(salary)}</td>
              <td>{workingDays}</td>
              <td>Rs.{floatToMoney(deductions)}</td>
              <td>Rs.{floatToMoney(netSalary)}</td>
              <td>{convertFirebaseTimeStampToString(creditedAt)}</td>
              <td>{convertFirebaseTimeStampToString(payCycleStart)}</td>
            </tr>
          )
        )}
      </tbody>
    </table>
  )
}

export default StaffSalaryTable
