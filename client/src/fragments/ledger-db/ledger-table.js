import React, { forwardRef } from 'react'
import withSaveAsPdf from '../../components/save-as-pdf-hoc'
import { floatToMoney } from '../../js/helper/utils'
import { PAID_FOR, PAYMENT_TYPE } from '../../js/LedgerData'

const LedgerTable = forwardRef(({ data, onSave, setPdfCss }, ref) => {
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
  const validData = data.filter(({ netTotal }) => Number(netTotal))
  const creditAmount = validData
    .filter(({ paymentType }) => paymentType === PAYMENT_TYPE.CREDIT)
    .reduce((sum, { netTotal }) => sum + netTotal, 0)
  const cashAmount = validData
    .filter(({ paymentType }) => paymentType === PAYMENT_TYPE.CASH)
    .reduce((sum, { netTotal }) => sum + netTotal, 0)
  return (
    <div className="db-table-wrapper">
      <button className="db-table-save paper" type="button" onClick={onSave}>
        Save
      </button>
      <table className="db-table" ref={ref}>
        <thead>
          <tr>
            <th>Phone number</th>
            <th>Payment Type</th>
            <th>Paid For</th>
            <th>Amount</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {data.map(
            ({ id, createdAt, paymentType, paidFor, netTotal, phoneNumber }) => (
              <tr id={id}>
                <td>{phoneNumber}</td>
                <td>{paymentType === PAYMENT_TYPE.CREDIT ? 'CREDIT' : 'CASH'}</td>
                <td>{paidFor === PAID_FOR.DUE ? 'DUE' : 'MATERIALS'}</td>
                <td>Rs.{floatToMoney(netTotal)}</td>
                <td>{new Date(createdAt.seconds * 1000).toLocaleString('en-IN')}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <div className="db-total" style={{ top: 0 }}>
        <div>Total: Rs. {floatToMoney(cashAmount + creditAmount)}</div>
        <div>Paid: Rs. {floatToMoney(cashAmount)}</div>
        <div>Balance: Rs. {floatToMoney(creditAmount)}</div>
      </div>
    </div>
  )
})

export default withSaveAsPdf(LedgerTable)
