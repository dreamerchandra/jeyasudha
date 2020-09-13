import React, { Component, createRef } from 'react'
import cx from 'classnames'
import { toast } from 'react-toastify'
import MainComponentHolder from '../../components/main-component-holder'
import { getProductDetailBasedOnSearchString } from '../../js/firebase-pricing-query'
import SuggestionItem from '../../components/product-suggestion-list'
import Footer from '../../components/footer'
import { upsertProduct } from '../../js/firebase-pricing-mutation'
import SuggestibleInput from '../../components/suggestable-input'
import Notification from '../../components/notification-view'

export default class PriceUpdate extends Component {
  constructor() {
    super()
    this.state = {
      disableUpdate: false,
    }
    this.productRef = createRef()
    this.billingPriceRef = createRef()
    this.govtPriceRef = createRef()
    this.cgstPercent = createRef()
    this.sgstPercent = createRef()
  }

  getInputCb = ({ target: { value } }) => value

  onSuggestionItemSelected = (itemId, item) => {
    const { uniqueName, billingPrice, govtPrice } = item
    this.productRef.current.value = uniqueName
    this.govtPriceRef.current.value = govtPrice
    this.billingPriceRef.current.value = billingPrice
  }

  updateProduct = async () => {
    try {
      const uniqueName = this.productRef.current.value
      const billingPrice = this.billingPriceRef.current.value
      const govtPrice = this.govtPriceRef.current.value
      const cgst = this.cgstPercent.current.value
      const sgst = this.sgstPercent.current.value
      if (!uniqueName) {
        return toast(<Notification text="Missing details" showSuccessIcon={false} />)
      }
      this.setState({
        disableUpdate: true,
      })
      await upsertProduct({
        productDetails: {
          billingPrice: Number(billingPrice),
          govtPrice: Number(govtPrice),
          cgstPercent: Number(cgst),
          sgstPercent: Number(sgst),
          uniqueName,
        },
      })
      console.log('product updated')
      this.billingPriceRef.current.value = null
      this.govtPriceRef.current.value = null
      this.productRef.current.value = null
      this.setState({
        disableUpdate: false,
      })
      toast(<Notification text="Product updated" showSuccessIcon />)
    } catch (err) {
      console.error('error while updating pricing', err)
      this.setState({
        disableUpdate: false,
      })
      toast(<Notification text="Invalid Fields" showSuccessIcon={false} />)
    }
    return null
  }

  render() {
    const { disableUpdate } = this.state
    const updateButtonCx = cx('btn paper', {
      'disabled-btn': disableUpdate,
    })
    return (
      <>
        <MainComponentHolder>
          <div className="main">
            <p>Particulars</p>
            <SuggestibleInput
              inputRef={this.productRef}
              onSuggestionItemSelected={this.onSuggestionItemSelected}
              SuggestionItem={SuggestionItem}
              fetchDetailsBasedOnSearchString={getProductDetailBasedOnSearchString}
            />
            <p>Government Price</p>
            <input type="text" ref={this.govtPriceRef} />
            <p>Billing Price</p>
            <input type="text" ref={this.billingPriceRef} />
            <p>CGST percentage</p>
            <input type="text" ref={this.cgstPercent} defaultValue={5} />
            <p>SGST percentage</p>
            <input type="text" ref={this.sgstPercent} defaultValue={5} />
          </div>
        </MainComponentHolder>
        <Footer>
          <button
            className={updateButtonCx}
            onClick={this.updateProduct}
            type="button"
            disabled={disableUpdate}
          >
            {disableUpdate ? 'Updating' : 'Update'}
          </button>
        </Footer>
      </>
    )
  }
}
