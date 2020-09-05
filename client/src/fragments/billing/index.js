import React, { Component } from 'react';
import MainComponentHolder from '../../components/main-component-holder';
import SuggestionHolder from '../../components/suggestion-holder';
import './index.css';
import SuggestionItem from '../../components/suggestion-item';
import { getQueryForCustomerSearch, getCollectionData } from '../../js/firebase-query';
import { TYPING_SPEED } from '../../js/common-config';
import debounceFunction from '../../js/helper/debounce';

const SUGGESTION_STATE = {
  IDLE: 'idle',
  FETCHING: 'fetching',
  ERROR: 'error'
}

class Billing extends Component {
  state = {
    name: '',
    suggestion: {
      state: SUGGESTION_STATE.IDLE,
      list: [],
      show: false,
    },
    address: '',
    drive: '',
    phoneNumber: '',
    particular: '',
    unit: '',
    paid: '',
    balance: '',
  }

  getInputCb = ({ target: { value } }) => value;

  searchCustomerQuery = (keyword) => {
    return getQueryForCustomerSearch(keyword)
  }

  async _fetchSearchResult (query) {
    this.setState({
      suggestion: {
        state: SUGGESTION_STATE.FETCHING,
        list: this.state.suggestion.list,
        show: true,
      }
    })
    const suggestionItem = await getCollectionData({ query, idKey: 'id' });
    this.setState({
      suggestion: {
        state: SUGGESTION_STATE.IDLE,
        list: suggestionItem,
        show: true,
      }
    })
  }

  fetchSearchResult = debounceFunction({
    callBack: this._fetchSearchResult,
    delay: TYPING_SPEED.AVERAGE,
    atBegin: false,
  })

  onInputChange = (event) => {
    const name = this.getInputCb(event);
    this.setState({
      name
    })
    if (name.length >= 3) {
      this.fetchSearchResult(this.searchCustomerQuery(name));
    } else {
      this.setState({
        suggestion: {
          show: false,
        }
      })
    }
  }

  render () {
    const loading = this.state.suggestion.state === SUGGESTION_STATE.FETCHING;
    return (
      <MainComponentHolder>
        <div className="main">
          <p>Customer Name/ID</p>
          <div>
            <input type="text" value={this.state.name} onChange={this.onInputChange} onKeyUp={this.debouncedSearchCustomer}></input>
            {this.state.suggestion.show && <SuggestionHolder>
              <SuggestionItem usersInfo={this.state.suggestion.list} isLoading={loading} />
            </SuggestionHolder>}
          </div>
          <p>Address</p>
          <input type="text"></input>
          <p>Driver Name/Vehicle Name</p>
          <input type="text"></input>
          <p>Phone number</p>
          <input type="text"></input>
          <p>Particulars</p>
          <input type="text"></input>
          <p>Unit</p>
          <input type="text"></input>
          <p>Paid</p>
          <input type="text"></input>
          <p>Balance</p>
          <input type="text"></input>
        </div>
      </MainComponentHolder >
    )
  }
}

export default Billing;
