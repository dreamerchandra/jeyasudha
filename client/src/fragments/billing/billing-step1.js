import React, { forwardRef } from 'react'
import SuggestibleInput from '../../components/suggestable-input'

const BillingStep1 = forwardRef(
  (
    {
      onSuggestionItemSelected,
      getCustomerDetailBasedOnSearchString,
      SuggestionItemList,
    },
    ref
  ) => {
    const { nameRef, addressRef, driveNameRef, vehicleRef, phNumRef } = ref
    return (
      <div className="main">
        <p>Customer Name/ID</p>
        <SuggestibleInput
          inputRef={nameRef}
          onSuggestionItemSelected={onSuggestionItemSelected}
          SuggestionItemList={SuggestionItemList}
          fetchDetailsBasedOnSearchString={getCustomerDetailBasedOnSearchString}
        />
        <p>Address</p>
        <input type="text" autoComplete="nope" ref={addressRef} />
        <p>Driver Name</p>
        <input type="text" autoComplete="nope" ref={driveNameRef} />
        <p>Vehicle Number</p>
        <input type="text" autoComplete="nope" ref={vehicleRef} />
        <p>Phone number</p>
        <input type="tel" autoComplete="nope" ref={phNumRef} />
      </div>
    )
  }
)

BillingStep1.displayName = 'BillingStep1'

export default BillingStep1
