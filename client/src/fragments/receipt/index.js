import React, { Component, createRef } from 'react'
import { toast } from 'react-toastify'
import MainComponentHolder from '../../components/main-component-holder'
import SuggestibleInput from '../../components/suggestable-input'
import SuggestionItem from '../../components/user-suggestion-list'
import { getCustomerDetailBasedOnSearchString } from '../../js/firebase-billing-query'
import Footer from '../../components/footer'
import { paymentAdapterForCustomer } from '../../js/billGeneratorAdapter'
import { PAYMENT_TYPE, PAID_FOR } from '../../js/LedgerData'
import { updateCustomerDue } from '../../js/firebase-billing-mutation'
import Notification from '../../components/notification-view'

export default class Receipt extends Component {
  constructor() {
    super()
    this.state = {
      updatingDetails: false,
    }
    this.nameRef = createRef()
    this.phoneNumRef = createRef()
    this.descriptionRef = createRef()
    this.amountRef = createRef()
  }

  onSuggestionItemSelected = (itemId, item) => {
    console.log('selected item', itemId)
    const { phoneNumber, name } = item
    this.nameRef.current.value = name
    this.phoneNumRef.current.value = phoneNumber
    this.phoneNumRef.current.disabled = true
  }

  recordTransaction = async () => {
    const name = this.nameRef.current.value
    const phoneNumber = this.phoneNumRef.current.value
    const amount = this.amountRef.current.value
    const { ledgerData, userData } = paymentAdapterForCustomer({
      name,
      phoneNumber,
      typeOfPayment: PAYMENT_TYPE.CASH,
      amount,
      paidFor: PAID_FOR.DUE,
    })
    this.setState({ updatingDetails: true })
    if (ledgerData.isFieldsValid() && userData.isFieldsValid()) {
      await updateCustomerDue({ userData, ledgerData })
    } else {
      toast(<Notification text="Invalid Field" showSuccessIcon={false} />)
    }
    this.setState({ updatingDetails: false })
    toast(<Notification text="Updated Successfully" showSuccessIcon />)
    return this.clearValues()
  }

  clearValues() {
    this.nameRef.current.value = ''
    this.phoneNumRef.current.value = ''
    this.phoneNumRef.current.disabled = false
    this.amountRef.current.value = ''
  }

  render() {
    const { updatingDetails } = this.state
    return (
      <>
        <MainComponentHolder>
          <div className="main">
            <p>Name</p>
            <SuggestibleInput
              inputRef={this.nameRef}
              onSuggestionItemSelected={this.onSuggestionItemSelected}
              SuggestionItem={SuggestionItem}
              fetchDetailsBasedOnSearchString={getCustomerDetailBasedOnSearchString}
            />
            <p>Phone number</p>
            <input ref={this.phoneNumRef} />
            <p>Description</p>
            <input ref={this.descriptionRef} />
            <p>Amount Paid</p>
            <input ref={this.amountRef} />
          </div>
        </MainComponentHolder>
        <Footer>
          <button
            className="btn paper"
            onClick={this.recordTransaction}
            type="button"
            disabled={updatingDetails}
          >
            Update Payment
          </button>
        </Footer>
      </>
    )
  }
}
