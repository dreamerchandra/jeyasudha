import React from 'react'
import './index.css'
import Skeleton from 'react-loading-skeleton'
/**
 * @typedef {Object} UserInfo
 * @property {String} name
 * @property {String} primaryAddress
 * @property {String} phoneNumber
 * @property {String} vehicleNumber
 * @property {String} id
 * @property {Number} overallDue
 */

/**
 *
 * @param {{usersInfo: UserInfo[], isLoading: Boolean}} param0
 */
export default function SuggestionItem({ usersInfo, isLoading }) {
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
        usersInfo.map((user) => (
          <li key={user.id} className="suggestion-item">
            <div>
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
