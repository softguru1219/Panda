import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import './style.scss'
import ProductList from '../../../components/ProductList'

import InlineFilter from '../../../components/InlineFilter'
import SidebarFilter from '../../../components/SidebarFilter'

import {fetchDiscountProducts} from '../../../actions/product'


class DiscountProductsView extends React.Component {
  static propTypes = {
    fetchDiscountProducts: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div className='discount-product-page py-4'>
        <div className='container-fluid'>
          <div className='row'>
            {/*<div className='sidebar col-lg-3 col-md-4 col-sm-12 mb-4 '>*/}
              {/*<SidebarFilter />*/}
            {/*</div>*/}
            <div className='product-list'>
              <InlineFilter />
              <div className='home-products py-4'>
                <ProductList fetchProducts={this.props.fetchDiscountProducts}  />
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
    fetchDiscountProducts: (query) => {
      dispatch(fetchDiscountProducts(query))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DiscountProductsView)
export {DiscountProductsView as DiscountProductsViewNotConnected}
