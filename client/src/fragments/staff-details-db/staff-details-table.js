import React from 'react'
import { floatToMoney } from '../../js/helper/utils'

const StaffDetailsTable = ({ data }) => {
  if (!data) return null
  return (
    <table className="db-table">
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
  )
}

export default StaffDetailsTable
