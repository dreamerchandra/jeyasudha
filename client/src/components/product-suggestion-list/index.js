/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import React from 'react'
import './index.css'
import Skeleton from 'react-loading-skeleton'

export default function SuggestionItem({
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
        suggestionList.map((suggestionItem) => (
          <li key={suggestionItem.id} className="suggestion-item">
            <div
              onClick={() => onItemSelected(suggestionItem.id, suggestionItem)}
              role="listitem"
            >
              <h3>{suggestionItem.uniqueName}</h3>
              <p>Selling price: {suggestionItem.govtPrice}</p>
            </div>
            <div>
              <h3>Billing Price</h3>
              <p className="green">{suggestionItem.billingPrice}</p>
            </div>
          </li>
        ))}
    </ul>
  )
}
