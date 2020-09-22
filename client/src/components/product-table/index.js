import React from 'react'
import { floatToMoney } from '../../js/helper/utils'

const ProductTable = ({ data }) => {
  if (!data) return null
  return (
    <table className="db-table">
      <thead>
        <tr>
          <td>Particulars</td>
          <td>Selling Price</td>
          <td>Billing Price</td>
          <td>CGST</td>
          <td>SGST</td>
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
