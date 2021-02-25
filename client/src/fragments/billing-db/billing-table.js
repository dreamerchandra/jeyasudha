import React, { forwardRef } from 'react'
import withSaveAsPdf from '../../components/save-as-pdf-hoc'
import { floatToMoney } from '../../js/helper/utils'

const BillingTable = forwardRef(({ data, onSave, setPdfCss }, ref) => {
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
  const total = data
    .filter(({ billingPriceGrandTotal }) => Number(billingPriceGrandTotal))
    .reduce((sum, { billingPriceGrandTotal }) => sum + billingPriceGrandTotal, 0)
  return (
    <div className="db-table-wrapper">
      <button className="db-table-save paper" type="button" onClick={onSave}>
        Save
      </button>
      <table className="db-table" ref={ref}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Particulars</th>
            <th>Unit</th>
            <th>Grand Total</th>
            <th>Amount Paid</th>
            <th>Create At</th>
          </tr>
        </thead>
        <tbody>
          {data.map(
            ({
              id,
              createdAt,
              phoneNumber,
              address,
              name,
              orders,
              billingPriceGrandTotal,
              amountPaid,
            }) => (
              <tr key={id}>
                <td>{name}</td>
                <td>{address}</td>
                <td>{phoneNumber}</td>
                <td>{orders[0].particular.uniqueName}</td>
                <td>{orders[0].quantity}</td>
                <td>Rs.{floatToMoney(billingPriceGrandTotal)}</td>
                <td>Rs.{floatToMoney(amountPaid)}</td>
                <td>
                  {createdAt &&
                    new Date(createdAt.seconds * 1000).toLocaleString('en-IN')}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <div className="db-total">Total: Rs. {floatToMoney(total)}</div>
    </div>
  )
})
BillingTable.displayName = 'BillingTable'
export default withSaveAsPdf(BillingTable)
