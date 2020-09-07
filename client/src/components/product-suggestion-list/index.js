/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import React from 'react'
import './index.css'
import Skeleton from 'react-loading-skeleton'

export default function SuggestionItem({ productInfo, isLoading, onItemSelected }) {
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
        productInfo.map((product) => (
          <li key={product.id} className="suggestion-item">
            <div onClick={() => onItemSelected(product.id, product)} role="listitem">
              <h3>{product.uniqueName}</h3>
              <p>Fixed price: {product.fixedPrice}</p>
            </div>
            <div>
              <h3>Actual Pricing</h3>
              <p className="green">{product.actualPrice}</p>
            </div>
          </li>
        ))}
    </ul>
  )
}
