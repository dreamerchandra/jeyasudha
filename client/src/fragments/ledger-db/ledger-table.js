import React from 'react'
import { floatToMoney } from '../../js/helper/utils'
import { PAID_FOR, PAYMENT_TYPE } from '../../js/LedgerData'

const LedgerTable = ({ data }) => {
  if (!data) return null
  const validData = data.filter(({ netTotal }) => Number(netTotal))
  const creditAmount = validData
    .filter(({ paymentType }) => paymentType === PAYMENT_TYPE.CREDIT)
    .reduce((sum, { netTotal }) => sum + netTotal, 0)
  const cashAmount = validData
    .filter(({ paymentType }) => paymentType === PAYMENT_TYPE.CASH)
    .reduce((sum, { netTotal }) => sum + netTotal, 0)
  return (
    <>
      <table className="db-table">
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
      <div className="db-total">
        <div>Credit Total: Rs. {floatToMoney(creditAmount)}</div>
        <div>Cash Total: Rs. {floatToMoney(cashAmount)}</div>
      </div>
    </>
  )
}

export default LedgerTable
