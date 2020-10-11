import React from 'react'
import { convertFirebaseTimeStampToString } from '../../js/firebase-helper'
import { floatToMoney } from '../../js/helper/utils'

const StaffSalaryTable = ({ data }) => {
  if (!data) return null
  return (
    <table className="db-table">
      <thead>
        <tr>
          <td>Emp ID</td>
          <td>Name</td>
          <td>payCycle</td>
          <td>salary</td>
          <td>Working Days</td>
          <td>Deductions</td>
          <td>Net Salary</td>
          <td>Credited At</td>
          <td>Cycle Start Date</td>
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
