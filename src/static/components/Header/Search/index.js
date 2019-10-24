import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import {selEasySearchText, selSuggestions} from  '../../../selectors/header/search'
import {fetchSuggestions, clearSuggestions} from '../../../actions/header/search'
import {selSearchText, currentCategory1} from  '../../../selectors/product'
import {setSearch} from  '../../../actions/product'
import {selRootCategories} from '../../../selectors/category'
import Autosuggest from 'react-autosuggest'
import {
  isBrowser
} from "react-device-detect"

import './style.scss'


class Search extends React.Component {
  static propTypes = {
    easySearchText: PropTypes.array,
    suggestions: PropTypes.array,
    searchText: PropTypes.string,
    path: PropTypes.string,
    category1: PropTypes.string,
    rootCategories: PropTypes.array,
    push: PropTypes.func.isRequired,
    setSearch: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      searchText: '',
      inpSearchStatus: false,
      suggestions: [],
      category1: ''
    }
  }

  componentDidMount = () => {
    this.setState({
      suggestions: this.props.suggestions,
      searchText: this.props.searchText
    })
  }

  componentDidUpdate = (prevProps) => {
    if (JSON.stringify(prevProps.suggestions) !== JSON.stringify(this.props.suggestions)) {
      this.setState({
        suggestions: this.props.suggestions
      })
    }

    if (prevProps.searchText !== this.props.searchText || this.props.category1 !== prevProps.category1) {
      this.setState({
        searchText: this.props.searchText,
        category1: this.props.category1
      })
    }
  }

  getSuggestionValue = suggestion => suggestion

  renderSuggestion = suggestion => (
    <div>
      {suggestion}
    </div>
  )

  getSearchKey = (e, {value}) => {
    this.setState({
      searchText: e.target.value
    })
  }

  easySearch = (key) => {
    this.setState({
      searchText: key
    })
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.props.suggestions
    })
  }
 
  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    // this.props.clearSuggestions()
  }

  onSuggestionSelected = (e, {suggestionValue}) => {
    this.setState({
      searchText: suggestionValue
    })
  }

  shouldRenderSuggestions = (value) => {
    return value && value.trim().length > 0
  }

  search = (e) => {
    e.preventDefault()
    this.props.push(`/search/${this.state.category1}/${this.state.searchText}`)
    // this.props.push(`/search/?search=${this.state.searchText}`)
  }

  setCurrentCategory = (e) => {
    this.setState({
      category1: e.target.value
    })
  }

  keyPress = (e) => {
    if(e.key === 'Enter'){
      this.search(e)
    }
  }

  render() {

    return (
      <div className='search-container text-center'>
        <div className={'inp-search'} >
          <button className='fa fa-search btn-search' onClick={this.search}/>
          {
            isBrowser &&
            <select className='sel-category' onChange={this.setCurrentCategory} value={this.state.category1}>
              <option value=''>类别</option>
              {
                this.props.rootCategories.map((cat, idx) =>{
                  return <option key={idx} value={cat.id}> {cat.title} </option>
                })
              }
            </select>
          }

          <Autosuggest
            suggestions={this.props.suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            shouldRenderSuggestions={this.shouldRenderSuggestions}
            onSuggestionSelected={this.onSuggestionSelected}
            inputProps={{
              placeholder: '请输入您想比较的商品名称或型号.',
              value: this.state.searchText,
              onChange: this.getSearchKey,
              onKeyPress: this.keyPress
            }}
          />
        </div>
        <ul className='easy-search list-inline mt-2'>
          {
            this.props.easySearchText.map((key, idx) => {
              return <li key={idx}><span onClick={(e) => this.easySearch(key)}>{key}</span></li>
            })
          }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    path: state.routing.location ? state.routing.location.pathname : undefined,
    suggestions: selSuggestions(state),
    easySearchText: selEasySearchText(state),
    searchText: selSearchText(state),
    rootCategories: selRootCategories(state),
    category1: currentCategory1(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    push : (url) => {
      dispatch(push(url))
    },
    fetchSuggestions: (key) => {
      dispatch(fetchSuggestions(key))
    },
    clearSuggestions: () => {
      dispatch(clearSuggestions())
    },
    setSearch: (text, catId) => {
      dispatch(setSearch(text, catId))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Search)