import React, { Component } from 'react'
import MainComponentHolder from '../../components/main-component-holder'
import SuggestionHolder from '../../components/suggestion-holder'
import './index.css'
import SuggestionItem from '../../components/user-suggestion-list'
import {
  getQueryForCustomerSearch,
  getCollectionData,
} from '../../js/firebase-query'
import { TYPING_SPEED } from '../../js/common-config'
import debounceFunction from '../../js/helper/debounce'
import Footer from '../../components/footer'
import Notification from '../../components/notification-view'

const SUGGESTION_STATE = {
  IDLE: 'idle',
  FETCHING: 'fetching',
  ERROR: 'error',
}

class Billing extends Component {
  fetchSearchResult = debounceFunction({
    callBack: this._fetchSearchResult,
    delay: TYPING_SPEED.AVERAGE,
    atBegin: false,
  })

  constructor() {
    super()
    this.state = {
      name: '',
      suggestion: {
        state: SUGGESTION_STATE.IDLE,
        list: [],
        show: true,
      },
      // address: '',
      // drive: '',
      // phoneNumber: '',
      // particular: '',
      // unit: '',
      // paid: '',
      // balance: '',
    }
  }

  getInputCb = ({ target: { value } }) => value

  searchCustomerQuery = (keyword) => {
    return getQueryForCustomerSearch(keyword)
  }

  onInputChange = (event) => {
    const name = this.getInputCb(event)
    this.setState({
      name,
    })
    if (name.length >= 3) {
      this.fetchSearchResult(this.searchCustomerQuery(name))
    } else {
      this.setState({
        suggestion: {
          show: false,
        },
      })
    }
  }

  async _fetchSearchResult(query) {
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
    const suggestionItem = await getCollectionData({ query, idKey: 'id' })
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
      name,
    } = this.state
    const loading = suggestionState === SUGGESTION_STATE.FETCHING
    return (
      <>
        <MainComponentHolder>
          <div className="main">
            <p>Customer Name/ID</p>
            <div>
              <input
                type="text"
                value={name}
                onChange={this.onInputChange}
                onKeyUp={this.debouncedSearchCustomer}
                autoComplete="nope"
              />
              {showSuggestion && (
                <SuggestionHolder>
                  <SuggestionItem usersInfo={suggestionList} isLoading={loading} />
                </SuggestionHolder>
              )}
            </div>
            <p>Address</p>
            <input type="text" autoComplete="nope" />
            <p>Driver Name/Vehicle Name</p>
            <input type="text" autoComplete="nope" />
            <p>Phone number</p>
            <input type="text" autoComplete="nope" />
            <p>Particulars</p>
            <input type="text" autoComplete="nope" />
            <p>Unit</p>
            <input type="text" autoComplete="nope" />
            <p>Paid</p>
            <input type="text" autoComplete="nope" />
            <p>Balance</p>
            <input type="text" autoComplete="nope" />
          </div>
        </MainComponentHolder>
        <Footer>
          <button className="btn paper" onClick={this.updateProduct} type="button">
            Update
          </button>
        </Footer>
        <Notification />
      </>
    )
  }
}

export default Billing
