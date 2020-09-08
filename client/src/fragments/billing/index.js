import React, { Component, createRef } from 'react'
import MainComponentHolder from '../../components/main-component-holder'
import './index.css'
import SuggestionItem from '../../components/user-suggestion-list'
import { getCustomerDetailBasedOnSearchString } from '../../js/firebase-billing-query'
import Footer from '../../components/footer'
import SuggestibleInput from '../../components/suggestable-input'
import { updateBillingData } from '../../js/firebase-billing-mutation'
import { billGeneratorAdapterForCashMode } from '../../js/billGeneratorAdapter'
import ProductPricingList from '../../js/ProductPricingList'
import LoaderHoc from '../../components/loading'

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

  updateAsCash = async () => {
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
    const { billingData, ledgerData, userData } = billGeneratorAdapterForCashMode({
      name,
      primaryAddress,
      vehicleNumber,
      driverName,
      particularDetails: selectedParticularDetail,
      phoneNumber,
      unit,
    })
    await updateBillingData({
      userData,
      billingData,
      ledgerData,
    })
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

  render() {
    const { loadingParticulars, listOfParticulars } = this.state
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
                <option value={details.id}>{details.uniqueName}</option>
              ))}
            </select>
            <p>Unit</p>
            <input type="text" autoComplete="nope" ref={this.unitRef} />
          </div>
        </MainComponentHolder>
        <Footer>
          <button className="btn paper" onClick={this.updateAsCash} type="button">
            Cash
          </button>
          <button className="btn paper" onClick={this.updateProduct} type="button">
            Credit
          </button>
        </Footer>
      </>
    )
  }
}

export default Billing
