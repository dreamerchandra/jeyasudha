import React, { Component } from 'react'
import OutsideClickHandler from 'react-outside-click-handler'
import SuggestionHolder from '../suggestion-holder'
import debounceFunction from '../../js/helper/debounce'
import { TYPING_SPEED } from '../../js/common-config'

const SUGGESTION_STATE = {
  IDLE: 'idle',
  FETCHING: 'fetching',
  ERROR: 'error',
}

export default class SuggestableInput extends Component {
  fetchSearchResult = debounceFunction({
    callBack: this._fetchSearchResult,
    delay: TYPING_SPEED.SLOW,
    atBegin: false,
  })

  constructor() {
    super()
    this.state = {
      suggestion: {
        state: SUGGESTION_STATE.IDLE,
        list: [],
        show: true,
      },
    }
  }

  getInputCb = ({ target: { value } }) => value

  onInputChange = (event) => {
    const name = this.getInputCb(event)
    if (name.length >= 3) {
      this.fetchSearchResult(name)
    }
  }

  setSuggestionVisibility = (shouldVisible) => {
    const {
      suggestion: { list, state },
    } = this.state
    this.setState({
      suggestion: {
        show: shouldVisible,
        list,
        state,
      },
    })
  }

  async _fetchSearchResult(searchString) {
    const {
      suggestion: { list, show },
    } = this.state
    const { fetchDetailsBasedOnSearchString } = this.props
    this.setState({
      suggestion: {
        state: SUGGESTION_STATE.FETCHING,
        list,
        show,
      },
    })
    console.log('PRICE_UPDATE: fetching search result for ', searchString)
    const suggestionItem = await fetchDetailsBasedOnSearchString({
      searchString,
      id: 'id',
    })
    this.setState({
      suggestion: {
        state: SUGGESTION_STATE.IDLE,
        list: suggestionItem,
        show,
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
    const { productRef, onSuggestionItemSelected, SuggestionItem } = this.props
    const loading = suggestionState === SUGGESTION_STATE.FETCHING
    return (
      <OutsideClickHandler
        onOutsideClick={() => this.setSuggestionVisibility(false)}
      >
        <div onFocus={() => this.setSuggestionVisibility(true)}>
          <input type="text" ref={productRef} onChange={this.onInputChange} />
          {showSuggestion && (
            <SuggestionHolder>
              <SuggestionItem
                suggestionList={suggestionList}
                isLoading={loading}
                onItemSelected={onSuggestionItemSelected}
              />
            </SuggestionHolder>
          )}
        </div>
      </OutsideClickHandler>
    )
  }
}
