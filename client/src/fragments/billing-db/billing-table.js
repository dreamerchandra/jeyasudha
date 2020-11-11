import React, { forwardRef } from 'react'
import withSaveAsPdf from '../../components/save-as-pdf-hoc'
import { floatToMoney } from '../../js/helper/utils'

const BillingTable = forwardRef(({ data, onSave }, ref) => {
  if (!data) return null
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
    </div>
  )
})
BillingTable.displayName = 'BillingTable'
export default withSaveAsPdf(BillingTable)
