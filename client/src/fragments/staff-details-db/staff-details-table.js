import React from 'react'
import { floatToMoney } from '../../js/helper/utils'

const StaffDetailsTable = ({ data }) => {
  if (!data) return null
  return (
    <table className="db-table">
      <thead>
        <tr>
          <td>Emp ID</td>
          <td>Name</td>
          <td>payCycle</td>
          <td>salary</td>
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
