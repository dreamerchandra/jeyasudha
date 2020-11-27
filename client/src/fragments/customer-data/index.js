import React, { Component, createRef } from 'react'
import { toast } from 'react-toastify'
import MainComponentHolder from '../../components/main-component-holder'
import UserSuggestionListItem from '../../components/user-suggestion-list'
import { getCustomerDetailBasedOnSearchString } from '../../js/firebase-billing-query'
import SuggestibleInput from '../../components/suggestable-input'
import Footer from '../../components/footer'
import { paymentAdapterForCustomer } from '../../js/billGeneratorAdapter'
import { PAYMENT_TYPE, PAID_FOR } from '../../js/LedgerData'
import { updateCustomerDue } from '../../js/firebase-billing-mutation'
import Notification from '../../components/notification-view'

export default class CustomerData extends Component {
  constructor() {
    super()
    this.nameRef = createRef()
    this.phoneNumRef = createRef()
    this.addressRef = createRef()
    this.dueRef = createRef()
    this.state = {
      updatingDetails: false,
    }
  }

  onSuggestionItemSelected = (itemId, item) => {
    console.log('selected item', itemId)
    const { phoneNumber, name, primaryAddress, overallDue } = item
    this.nameRef.current.value = name
    this.phoneNumRef.current.value = phoneNumber
    this.phoneNumRef.current.disabled = true
    this.addressRef.current.value = primaryAddress
    this.dueRef.current.placeholder = `Current due: ${overallDue}`
  }

  recordTransaction = async () => {
    try {
      const name = this.nameRef.current.value
      const phoneNumber = this.phoneNumRef.current.value
      const primaryAddress = this.addressRef.current.value
      const amount = this.dueRef.current.value
      const { ledgerData, userData } = paymentAdapterForCustomer({
        name,
        primaryAddress,
        phoneNumber,
        typeOfPayment: PAYMENT_TYPE.CREDIT,
        paidFor: PAID_FOR.DUE,
        grandTotal: amount,
      })
      this.setState({ updatingDetails: true })
      if (ledgerData.isFieldsValid() && userData.isFieldsValid()) {
        await updateCustomerDue({ userData, ledgerData })
      } else {
        this.setState({ updatingDetails: false })
        return toast(<Notification text="Invalid Field" showSuccessIcon={false} />)
      }
      this.setState({ updatingDetails: false })
      toast(<Notification text="Updated Successfully" showSuccessIcon />)
      this.clearValues()
    } catch (err) {
      console.log('error while updating customer data', err)
      this.setState({ updatingDetails: false })
      toast(<Notification text="Invalid Fields" showSuccessIcon={false} />)
    }
    return null
  }

  clearValues() {
    this.nameRef.current.value = ''
    this.addressRef.current.value = ''
    this.dueRef.current.value = ''
    this.phoneNumRef.current.value = ''
    this.dueRef.current.placeholder = ''
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
              SuggestionItemList={UserSuggestionListItem}
              fetchDetailsBasedOnSearchString={getCustomerDetailBasedOnSearchString}
            />
            <p>Phone number</p>
            <input ref={this.phoneNumRef} />
            <p>Address</p>
            <input ref={this.addressRef} />
            <p>Due</p>
            <input ref={this.dueRef} />
          </div>
        </MainComponentHolder>
        <Footer>
          <button
            className="btn paper"
            onClick={this.recordTransaction}
            type="button"
            disabled={updatingDetails}
          >
            Update Due
          </button>
        </Footer>
      </>
    )
  }
}
