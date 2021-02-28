/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react'
import './index.css'
import Skeleton from 'react-loading-skeleton'

export default function StaffSuggestionList({
  suggestionList,
  isLoading,
  onItemSelected,
}) {
  return (
    <ul>
      {isLoading && (
        <li key="spinner" className="suggestion-item">
          <div>
            <h3>
              <Skeleton width="300px" />{' '}
            </h3>
            <p>
              <Skeleton />
            </p>
          </div>
        </li>
      )}
      {!isLoading &&
        suggestionList &&
        suggestionList.map((staff) => (
          <li key={staff.id} className="suggestion-item">
            <div onClick={() => onItemSelected(staff.id, staff)}>
              <h3 style={{ fontSize: '2rem' }}>
                {staff.name}: {staff.empId}
              </h3>
            </div>
          </li>
        ))}
    </ul>
  )
}
