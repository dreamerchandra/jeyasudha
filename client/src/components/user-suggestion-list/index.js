/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react'
import './index.css'
import Skeleton from 'react-loading-skeleton'

export default function UserSuggestionListItem({
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
        suggestionList.map((user) => (
          <li key={user.id} className="suggestion-item">
            <div onClick={() => onItemSelected(user.id, user)}>
              <h3>{user.name}</h3>
              <p>{user.phoneNumber}</p>
            </div>
            <div>
              <h3>Owning Balance</h3>
              <p className={user.overallDue >= 0 ? 'green' : 'red'}>
                {user.overallDue}
              </p>
            </div>
          </li>
        ))}
    </ul>
  )
}
