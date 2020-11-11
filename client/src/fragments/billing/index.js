import React, { Component, createRef } from 'react'
import { toast } from 'react-toastify'
import Multistep from '../../components/multistep'
import MainComponentHolder from '../../components/main-component-holder'
import './index.css'
import SuggestionItem from '../../components/user-suggestion-list'
import { getCustomerDetailBasedOnSearchString } from '../../js/firebase-billing-query'
import Footer from '../../components/footer'
import { updateBillingData } from '../../js/firebase-billing-mutation'
import { paymentAdapterForMaterials } from '../../js/billGeneratorAdapter'
import ProductPricingList from '../../js/ProductPricingList'
import LoaderHoc from '../../components/loading'
import Notification from '../../components/notification-view'
import Print from '../print'
import { getGrandTotalFromSubTotal } from '../../js/helper/taxhelper'
import { floatToMoney } from '../../js/helper/utils'
import BillingStep1 from './billing-step1'
import BillingStep2 from './billing-step2'

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
    this.referenceTotalRef = createRef()
    this.amountPaidRef = createRef()
    window.state = this
    this.billStates = {
      GENERATE_ID: 'Generate Bill Id',
      PRINT_BILL: 'PRINT BILL',
    }
    this.state = {
      listOfParticulars: [],
      loadingParticulars: true,
      updatingDetails: false,
      printDetails: { showPrintPreview: false, billDetails: null },
      billState: this.billStates.GENERATE_ID,
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

  isAmountValidToRecord = (recordCb) => {
    const referenceToal = this.calculateReferenceTotal()
    const amountPaid = Number(this.amountPaidRef.current.value)
    if (amountPaid > referenceToal) {
      toast(
        <Notification
          text="Amount paid can't be higher than grand total"
          showSuccessIcon={false}
        />
      )
      return
    }
    recordCb()
  }

  generateBillId = async () => {
    const phoneNumber = this.phNumRef.current.value
    const name = this.nameRef.current.value
    const driverName = this.driveNameRef.current.value
    const userSelectedParticularId = this.particularsRef.current.value
    const unit = Number(this.unitRef.current.value)
    const primaryAddress = this.addressRef.current.value
    const vehicleNumber = this.vehicleRef.current.value
    const amountPaid = this.amountPaidRef.current.value
    const { listOfParticulars } = this.state
    const [selectedParticularDetail] = listOfParticulars.filter(
      (detail) => detail.id === userSelectedParticularId
    )
    const {
      billingData,
      userData,
      ledgerDataForCredit,
      ledgerDataForMaterials,
    } = await paymentAdapterForMaterials({
      name,
      primaryAddress,
      vehicleNumber,
      driverName,
      particularDetails: selectedParticularDetail,
      phoneNumber,
      unit,
      amountPaid,
    })
    if (
      billingData.isFieldsValid() &&
      ledgerDataForCredit.isFieldsValid() &&
      userData.isFieldsValid() &&
      ledgerDataForMaterials.isFieldsValid()
    ) {
      this.billingData = billingData
      this.userData = userData
      this.ledgerDataForCredit = ledgerDataForCredit
      this.ledgerDataForMaterials = ledgerDataForMaterials
      this.setState({ billState: this.billStates.PRINT_BILL })
    } else {
      return toast(<Notification text="Invalid Fields" showSuccessIcon={false} />)
    }
    return null
  }

  recordTransaction = async () => {
    try {
      this.setState({ updatingDetails: true })
      const {
        billingData,
        ledgerDataForCredit,
        userData,
        ledgerDataForMaterials,
      } = this
      if (
        billingData.isFieldsValid() &&
        ledgerDataForCredit.isFieldsValid() &&
        userData.isFieldsValid() &&
        ledgerDataForMaterials.isFieldsValid()
      ) {
        await updateBillingData({
          userData,
          billingData,
          ledgerDataForCredit,
          ledgerDataForMaterials,
        })
      } else {
        this.setState({
          updatingDetails: false,
          billState: this.billStates.GENERATE_ID,
        })
        return toast(<Notification text="Invalid Fields" showSuccessIcon={false} />)
      }
      this.clearValues()
      toast(<Notification text="Updated Successfully" showSuccessIcon />)
      this.setState({
        updatingDetails: false,
        printDetails: { showPrintPreview: true, billDetails: billingData },
        billState: this.billStates.GENERATE_ID,
      })
      console.log('transaction recorded successfully')
    } catch (err) {
      console.error('error while updating data', err)
      this.setState({
        updatingDetails: false,
        billState: this.billStates.GENERATE_ID,
      })
      toast(<Notification text="Invalid field" showSuccessIcon={false} />)
    }
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

  calculateReferenceTotal = () => {
    const userSelectedParticularId = this.particularsRef.current.value
    const { listOfParticulars } = this.state
    const [selectedParticularDetail] = listOfParticulars.filter(
      (detail) => detail.id === userSelectedParticularId
    )
    const units = Number(this.unitRef.current.value)
    const subTotal = selectedParticularDetail.billingPrice * units
    return getGrandTotalFromSubTotal(
      subTotal,
      selectedParticularDetail.cgstPercent,
      selectedParticularDetail.sgstPercent
    )
  }

  updateRefernceInUI = () => {
    this.referenceTotalRef.current.value = floatToMoney(
      this.calculateReferenceTotal()
    )
  }

  clearValues() {
    this.driveNameRef.current.value = ''
    this.phNumRef.current.value = ''
    this.nameRef.current.value = ''
    this.unitRef.current.value = ''
    this.addressRef.current.value = ''
    this.vehicleRef.current.value = ''
    this.referenceTotalRef.current.value = ''
    this.amountPaidRef.current.value = ''
    this.userData = null
    this.billingData = null
    this.ledgerDataForCredit = null
    this.ledgerDataForMaterials = null
    this.phNumRef.current.disabled = false
  }

  renderProceedButton = () => {
    const { billState, updatingDetails } = this.state
    const { billStates } = this
    if (billState === billStates.GENERATE_ID) {
      return (
        <button
          className="btn paper"
          onClick={() => this.isAmountValidToRecord(this.generateBillId)}
          type="button"
          disabled={updatingDetails}
        >
          {billState}
        </button>
      )
    }
    return (
      <button
        className="btn paper"
        onClick={() => this.isAmountValidToRecord(this.recordTransaction)}
        type="button"
        disabled={updatingDetails}
      >
        {billState}
      </button>
    )
  }

  renderStep1 = () => {
    const {
      nameRef,
      addressRef,
      driveNameRef,
      vehicleRef,
      phNumRef,
      onSuggestionItemSelected,
    } = this
    return (
      <BillingStep1
        ref={{ nameRef, addressRef, driveNameRef, vehicleRef, phNumRef }}
        onSuggestionItemSelected={onSuggestionItemSelected}
        getCustomerDetailBasedOnSearchString={getCustomerDetailBasedOnSearchString}
        SuggestionItem={SuggestionItem}
      />
    )
  }

  renderStep2 = () => {
    const {
      particularsRef,
      unitRef,
      referenceTotalRef,
      amountPaidRef,
      updateRefernceInUI,
    } = this
    const { listOfParticulars } = this.state
    return (
      <BillingStep2
        ref={{ particularsRef, unitRef, referenceTotalRef, amountPaidRef }}
        listOfParticulars={listOfParticulars}
        updateRefernceInUI={updateRefernceInUI}
      />
    )
  }

  render() {
    const {
      loadingParticulars,
      printDetails: { showPrintPreview, billDetails },
    } = this.state
    const steps = [
      { name: 'Customer Details', component: this.renderStep1() },
      { name: 'Product Details', component: this.renderStep2() },
    ]
    return (
      <>
        {loadingParticulars && (
          <LoaderHoc>
            <h1>Downloading product list</h1>
          </LoaderHoc>
        )}
        <MainComponentHolder>
          {typeof this.billingData?.numberedBillId === 'number' && (
            <span className="ref">Bill Id: {this.billingData.numberedBillId}</span>
          )}
          <Multistep
            showNavigation
            steps={steps}
            inactiveComponentClassName="hide"
          />
        </MainComponentHolder>
        <Print
          billDetails={billDetails}
          showPrintPreview={showPrintPreview}
          afterPrintCb={() =>
            this.setState({
              printDetails: { showPrintPreview: false, billDetails: [] },
            })
          }
        />
        <Footer>{this.renderProceedButton()}</Footer>
      </>
    )
  }
}

export default Billing
