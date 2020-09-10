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
    this.acutalPriceRef = createRef()
    this.fixedPriceRef = createRef()
  }

  getInputCb = ({ target: { value } }) => value

  onSuggestionItemSelected = (itemId, item) => {
    const { uniqueName, fixedPrice, actualPrice } = item
    this.productRef.current.value = uniqueName
    this.fixedPriceRef.current.value = fixedPrice
    this.acutalPriceRef.current.value = actualPrice
  }

  updateProduct = async () => {
    try {
      const uniqueName = this.productRef.current.value
      const actualPrice = this.acutalPriceRef.current.value
      const fixedPrice = this.fixedPriceRef.current.value
      if (!uniqueName) {
        return toast(<Notification text="Missing details" showSuccessIcon={false} />)
      }
      this.setState({
        disableUpdate: true,
      })
      await upsertProduct({
        productDetails: {
          actualPrice: Number(actualPrice),
          fixedPrice: Number(fixedPrice),
          uniqueName,
        },
      })
      console.log('product updated')
      this.acutalPriceRef.current.value = null
      this.fixedPriceRef.current.value = null
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
            <p>Fixed unit price</p>
            <input type="text" ref={this.fixedPriceRef} />
            <p>Actual Unit price</p>
            <input type="text" ref={this.acutalPriceRef} />
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
