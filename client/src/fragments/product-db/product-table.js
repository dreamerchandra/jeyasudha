import React, { forwardRef } from 'react'
import withSaveAsPdf from '../../components/save-as-pdf-hoc'
import { floatToMoney } from '../../js/helper/utils'

const ProductTable = forwardRef(({ data, onSave, setPdfCss }, ref) => {
  if (!data) return null
  setPdfCss(`
    table, td, th {
      border: 1px solid black;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
  `)
  return (
    <div className="db-table-wrapper">
      <button className="db-table-save paper" type="button" onClick={onSave}>
        Save
      </button>
      <table className="db-table" ref={ref}>
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
    </div>
  )
})

export default withSaveAsPdf(ProductTable)
