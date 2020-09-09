import React, { Component, createRef } from 'react'
import { toast } from 'react-toastify'
import MainComponentHolder from '../../components/main-component-holder'
import './index.css'
import SuggestionItem from '../../components/user-suggestion-list'
import { getCustomerDetailBasedOnSearchString } from '../../js/firebase-billing-query'
import Footer from '../../components/footer'
import SuggestibleInput from '../../components/suggestable-input'
import { updateBillingData } from '../../js/firebase-billing-mutation'
import { paymentAdapterForCashMode } from '../../js/billGeneratorAdapter'
import ProductPricingList from '../../js/ProductPricingList'
import LoaderHoc from '../../components/loading'
import { PAYMENT_TYPE } from '../../js/LedgerData'
import Notification from '../../components/notification-view'
import Print from '../print'

class Billing extends Component {
  constructor() {
    super()
    this.nameRef = createRef()
    this.addressRef = createRef()
    this.driveNameRef = createRef()
    this.phNumRef = createRef()
    this.particularsRef = createRef()
    this.unitRef = createRef()
    this.vehicleRef = createRef()
    this.state = {
      listOfParticulars: [],
      loadingParticulars: true,
      updatingDetails: false,
      printDetails: { showPrintPreview: false, billDetails: null },
    }
  }

  componentDidMount() {
    this.setState({ loadingParticulars: true })
    ProductPricingList.fetchFromFirestore().then((priceList) => {
      this.setState({
        listOfParticulars: priceList,
        loadingParticulars: false,
      })
    })
  }

  recordTransaction = async (typeOfPayment) => {
    this.setState({ updatingDetails: true })
    const phoneNumber = this.phNumRef.current.value
    const name = this.nameRef.current.value
    const driverName = this.driveNameRef.current.value
    const userSelectedParticularId = this.particularsRef.current.value
    const unit = Number(this.unitRef.current.value)
    const primaryAddress = this.addressRef.current.value
    const vehicleNumber = this.vehicleRef.current.value
    const { listOfParticulars } = this.state
    const [selectedParticularDetail] = listOfParticulars.filter(
      (detail) => detail.id === userSelectedParticularId
    )
    const { billingData, ledgerData, userData } = paymentAdapterForCashMode({
      name,
      primaryAddress,
      vehicleNumber,
      driverName,
      particularDetails: selectedParticularDetail,
      phoneNumber,
      unit,
      typeOfPayment,
    })
    if (
      billingData.isFieldsValid() &&
      ledgerData.isFieldsValid() &&
      userData.isFieldsValid()
    ) {
      await updateBillingData({
        userData,
        billingData,
        ledgerData,
      })
    } else {
      this.setState({ updatingDetails: false })
      return toast(<Notification text="Invalid Fields" showSuccessIcon={false} />)
    }
    this.clearValues()
    toast(<Notification text="Updated Successfully" showSuccessIcon />)
    this.setState({ updatingDetails: false })
    if (billingData.shouldGenerateBill()) {
      this.setState({
        printDetails: { showPrintPreview: true, billDetails: billingData },
      })
    }
    console.log('transaction recorded successfully')
    return null
  }

  getInputCb = ({ target: { value } }) => value

  onSuggestionItemSelected = (itemId, item) => {
    console.log('selected item', itemId)
    const { phoneNumber, name, driverName, vehicleNumber, primaryAddress } = item
    this.nameRef.current.value = name
    this.phNumRef.current.value = phoneNumber
    this.phNumRef.current.disabled = true
    this.driveNameRef.current.value = driverName
    this.vehicleRef.current.value = vehicleNumber
    this.addressRef.current.value = primaryAddress
  }

  clearValues() {
    this.driveNameRef.current.value = ''
    this.phNumRef.current.value = ''
    this.nameRef.current.value = ''
    this.unitRef.current.value = ''
    this.addressRef.current.value = ''
    this.vehicleRef.current.value = ''
  }

  render() {
    const {
      loadingParticulars,
      listOfParticulars,
      updatingDetails,
      printDetails: { showPrintPreview, billDetails },
    } = this.state
    return (
      <>
        {loadingParticulars && (
          <LoaderHoc>
            <h1>Downloading product list</h1>
          </LoaderHoc>
        )}
        <MainComponentHolder>
          <div className="main">
            <p>Customer Name/ID</p>
            <SuggestibleInput
              inputRef={this.nameRef}
              onSuggestionItemSelected={this.onSuggestionItemSelected}
              SuggestionItem={SuggestionItem}
              fetchDetailsBasedOnSearchString={getCustomerDetailBasedOnSearchString}
            />
            <p>Address</p>
            <input type="text" autoComplete="nope" ref={this.addressRef} />
            <p>Driver Name</p>
            <input type="text" autoComplete="nope" ref={this.driveNameRef} />
            <p>Vehicle Number</p>
            <input type="text" autoComplete="nope" ref={this.vehicleRef} />
            <p>Phone number</p>
            <input type="text" autoComplete="nope" ref={this.phNumRef} />
            <p>Particulars</p>
            <select ref={this.particularsRef}>
              {listOfParticulars.map((details) => (
                <option key={details.id} value={details.id}>
                  {details.uniqueName}
                </option>
              ))}
            </select>
            <p>Unit</p>
            <input type="text" autoComplete="nope" ref={this.unitRef} />
          </div>
        </MainComponentHolder>
        {showPrintPreview && <Print billDetails={billDetails} />}
        <Footer>
          <button
            className="btn paper"
            onClick={() => this.recordTransaction(PAYMENT_TYPE.CASH)}
            type="button"
            disabled={updatingDetails}
          >
            Cash
          </button>
          <button
            className="btn paper"
            onClick={() => this.recordTransaction(PAYMENT_TYPE.CREDIT)}
            type="button"
            disabled={updatingDetails}
          >
            Credit
          </button>
        </Footer>
      </>
    )
  }
}

export default Billing
