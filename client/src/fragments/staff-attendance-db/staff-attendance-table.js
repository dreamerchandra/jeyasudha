import React from 'react'
import { convertFirebaseTimeStampToString } from '../../js/firebase-helper'

const StaffAttendDanceTable = ({ data }) => {
  if (!data) return null
  return (
    <table className="db-table">
      <thead>
        <tr>
          <th>Emp ID</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody>
        {data.map(({ absent, createdAt, id }) => (
          <tr key={id}>
            <td>{absent.toString()}</td>
            <td>{convertFirebaseTimeStampToString(createdAt)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default StaffAttendDanceTable
