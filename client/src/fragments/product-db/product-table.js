import React from 'react'
import { floatToMoney } from '../../js/helper/utils'

const ProductTable = ({ data }) => {
  if (!data) return null
  return (
    <table className="db-table">
      <thead>
        <tr>
          <th>Particulars</th>
          <th>Selling Price</th>
          <th>Billing Price</th>
          <th>CGST</th>
          <th>SGST</th>
        </tr>
      </thead>
      <tbody>
        {data.map(
          ({
            id,
            billingPrice,
            cgstPercent,
            sgstPercent,
            govtPrice,
            uniqueName,
          }) => (
            <tr key={id}>
              <td>{uniqueName}</td>
              <td>{govtPrice}</td>
              <td>Rs.{floatToMoney(billingPrice)}</td>
              <td>{cgstPercent}</td>
              <td>{sgstPercent}</td>
            </tr>
          )
        )}
      </tbody>
    </table>
  )
}

export default ProductTable
