import React, { Component, createRef } from 'react'
import MainComponentHolder from '../../components/main-component-holder'
import { getProductDetailBasedOnSearchString } from '../../js/firebase-pricing-query'
import SuggestionHolder from '../../components/suggestion-holder'
import SuggestionItem from '../../components/product-suggestion-list'
import debounceFunction from '../../js/helper/debounce'
import { TYPING_SPEED } from '../../js/common-config'
import Footer from '../../components/footer'
import { upsertProduct } from '../../js/firebase-pricing-mutation'

const SUGGESTION_STATE = {
  IDLE: 'idle',
  FETCHING: 'fetching',
  ERROR: 'error',
}

export default class PriceUpdate extends Component {
  fetchSearchResult = debounceFunction({
    callBack: this._fetchSearchResult,
    delay: TYPING_SPEED.SLOW,
    atBegin: false,
  })

  constructor() {
    super()
    this.state = {
      uniqueName: '',
      suggestion: {
        state: SUGGESTION_STATE.IDLE,
        list: [],
        show: false,
      },
      fixedPrice: null,
      actualPrice: null,
    }
    this.productRef = createRef()
    this.acutalPriceRef = createRef()
    this.fixedPriceRef = createRef()
  }

  getInputCb = ({ target: { value } }) => value

  onInputChange = (event) => {
    const name = this.getInputCb(event)
    this.setState({
      uniqueName: name,
    })
    if (name.length >= 3) {
      this.fetchSearchResult(name)
    } else {
      this.setState({
        suggestion: {
          show: false,
        },
      })
    }
  }

  onSuggestionItemSelected = (itemId, item) => {
    const { uniqueName, fixedPrice, actualPrice } = item
    this.setState(() => {
      const suggestion = {
        state: SUGGESTION_STATE.IDLE,
        list: [],
        show: false,
      }
      return { suggestion, uniqueName, fixedPrice, actualPrice }
    })
    this.productRef.current.value = uniqueName
    this.fixedPriceRef.current.value = fixedPrice
    this.acutalPriceRef.current.value = actualPrice
  }

  updateProduct = async () => {
    const { actualPrice, fixedPrice, uniqueName } = this.state
    await upsertProduct({
      productDetails: {
        actualPrice: Number(actualPrice),
        fixedPrice: Number(fixedPrice),
        uniqueName,
      },
    })
    console.log('product updated')
  }

  onFixedPriceChange = (event) => {
    this.setState({
      fixedPrice: this.getInputCb(event),
    })
  }

  onActualPriceChange = (event) => {
    this.setState({
      actualPrice: this.getInputCb(event),
    })
  }

  async _fetchSearchResult(searchString) {
    const {
      suggestion: { list },
    } = this.state

    this.setState({
      suggestion: {
        state: SUGGESTION_STATE.FETCHING,
        list,
        show: true,
      },
    })
    console.log('PRICE_UPDATE: fetching search result for ', searchString)
    const suggestionItem = await getProductDetailBasedOnSearchString({
      searchString,
      id: 'id',
    })
    this.setState({
      suggestion: {
        state: SUGGESTION_STATE.IDLE,
        list: suggestionItem,
        show: true,
      },
    })
  }

  render() {
    const {
      suggestion: {
        state: suggestionState,
        show: showSuggestion,
        list: suggestionList,
      },
    } = this.state
    const loading = suggestionState === SUGGESTION_STATE.FETCHING
    return (
      <>
        <MainComponentHolder>
          <div className="main">
            <p>Particulars</p>
            <div>
              <input
                type="text"
                ref={this.productRef}
                onChange={this.onInputChange}
              />
              {showSuggestion && (
                <SuggestionHolder>
                  <SuggestionItem
                    productInfo={suggestionList}
                    isLoading={loading}
                    onItemSelected={this.onSuggestionItemSelected}
                  />
                </SuggestionHolder>
              )}
            </div>
            <p>Fixed unit price</p>
            <input
              type="text"
              ref={this.fixedPriceRef}
              onChange={this.onFixedPriceChange}
            />
            <p>Actual Unit price</p>
            <input
              type="text"
              ref={this.acutalPriceRef}
              onChange={this.onActualPriceChange}
            />
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
