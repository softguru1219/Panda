import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import ProductList from '../../../components/ProductList'

import InlineFilter from '../../../components/InlineFilter'
import SidebarFilter from '../../../components/SidebarFilter'

import {setSearch, fetchProducts} from '../../../actions/product'
import {selSearchText, currentCategory1} from '../../../selectors/product'


class SearchProductView extends React.Component {
  static propTypes = {
    searchText: PropTypes.string,
    category1: PropTypes.string,

    setSearch: PropTypes.func.isRequired,
    fetchProducts: PropTypes.func.isRequired
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.match.params.searchText !== prevProps.match.params.searchText 
      || this.props.match.params.catId !== prevProps.match.params.catId
      ) {
        let searchText = ''
        let categoryId1 = ''
        if (this.props.match.params.searchText) searchText = this.props.match.params.searchText
        if (this.props.match.params.catId) categoryId1 = this.props.match.params.catId
        this.props.setSearch(searchText, categoryId1)
    }
  }

  componentWillMount() {
    let searchText = ''
    let categoryId1 = ''
    if (this.props.match.params.searchText) searchText = this.props.match.params.searchText
    if (this.props.match.params.catId) categoryId1 = this.props.match.params.catId
    this.props.setSearch(searchText, categoryId1)
  }

  render() {
    return (
      <div className='category-page py-4'>
        <div className='container-fluid'>
          <div className='row'>
            {/*<div className='sidebar col-lg-3 col-md-4 col-sm-12 mb-4 '>*/}
              {/*<SidebarFilter />*/}
            {/*</div>*/}
            <div className='product-list'>
              <InlineFilter />
              <div className='home-products py-4'>
                <ProductList fetchProducts={this.props.fetchProducts}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    searchText: selSearchText(state),
    category1: currentCategory1(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSearch: (searchText, cat1) => {
      dispatch(setSearch(searchText, cat1))
    },
    fetchProducts: (query) => {
      dispatch(fetchProducts(query))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchProductView)
export {SearchProductView as SearchProductViewNotConnected}
