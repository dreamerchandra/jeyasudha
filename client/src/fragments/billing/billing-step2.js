import React, { forwardRef } from 'react'
import CurrencyInput from '../../components/currency-input-field'

const BillingStep2 = forwardRef(({ listOfParticulars, updateRefernceInUI }, ref) => {
  const { particularsRef, unitRef, referenceTotalRef, amountPaidRef } = ref
  return (
    <div className="main">
      <p>Particulars</p>
      <select ref={particularsRef}>
        {listOfParticulars.map((details) => (
          <option key={details.id} value={details.id}>
            {details.uniqueName}
          </option>
        ))}
      </select>
      <p>Unit</p>
      <input
        type="number"
        step="0.01"
        autoComplete="nope"
        ref={unitRef}
        onChange={updateRefernceInUI}
        min={0}
      />
      <p>Grand Total</p>
      <input type="text" autoComplete="nope" ref={referenceTotalRef} disabled />
      <p>Amount Paid</p>
      <CurrencyInput
        autoComplete="nope"
        ref={amountPaidRef}
        defaultValue={0}
        min={0}
        isIndianNumberSystem
      />
    </div>
  )
})

BillingStep2.displayName = 'BillingStep2'

export default BillingStep2
