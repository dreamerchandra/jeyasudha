import React, { Component, createRef } from 'react'
import MainComponentHolder from '../../components/main-component-holder'
import { getProductDetailBasedOnSearchString } from '../../js/firebase-pricing-query'
import SuggestionItem from '../../components/product-suggestion-list'
import Footer from '../../components/footer'
import { upsertProduct } from '../../js/firebase-pricing-mutation'
import SuggestibleInput from '../../components/suggestable-input'

export default class PriceUpdate extends Component {
  constructor() {
    super()
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
    const uniqueName = this.productRef.current.value
    const actualPrice = this.acutalPriceRef.current.value
    const fixedPrice = this.fixedPriceRef.current.value
    await upsertProduct({
      productDetails: {
        actualPrice: Number(actualPrice),
        fixedPrice: Number(fixedPrice),
        uniqueName,
      },
    })
    console.log('product updated')
  }

  render() {
    return (
      <>
        <MainComponentHolder>
          <div className="main">
            <p>Particulars</p>
            <SuggestibleInput
              productRef={this.productRef}
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
          <button className="btn paper" onClick={this.updateProduct} type="button">
            Update
          </button>
        </Footer>
      </>
    )
  }
}
