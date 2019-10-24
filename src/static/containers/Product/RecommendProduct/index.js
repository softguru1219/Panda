import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import ProductList from '../../../components/ProductList'

import InlineFilter from '../../../components/InlineFilter'

import {fetchRecommendProducts} from '../../../actions/product'
import {selSearchText, currentCategory1} from '../../../selectors/product'


class RecommendProductView extends React.Component {
  static propTypes = {

    fetchRecommendProducts: PropTypes.func.isRequired
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
                <ProductList fetchProducts={this.props.fetchRecommendProducts}/>
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRecommendProducts: (query) => {
      dispatch(fetchRecommendProducts(query))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecommendProductView)
