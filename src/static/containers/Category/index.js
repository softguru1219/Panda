import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import ProductList from '../../components/ProductList'

import InlineFilter from '../../components/InlineFilter'
import SidebarFilter from '../../components/SidebarFilter'

import {setCategory, fetchProducts} from '../../actions/product'
import {currentCategory1, currentCategory2, currentCategory3 } from '../../selectors/product'


class CategoryView extends React.Component {
  static propTypes = {
    category1: PropTypes.string,
    category2: PropTypes.string,
    category3: PropTypes.string,

    setCategory: PropTypes.func.isRequired,
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.match.params.categoryId1 !== prevProps.match.params.categoryId1
      || this.props.match.params.categoryId2 !== prevProps.match.params.categoryId2
      ||this.props.match.params.categoryId3 !== prevProps.match.params.categoryId3
      ) {
        let cat1 = ''
        let cat2 = ''
        let cat3 = ''
    
        if (this.props.match.params.categoryId1) cat1 = this.props.match.params.categoryId1
        if (this.props.match.params.categoryId2) cat2 = this.props.match.params.categoryId2
        if (this.props.match.params.categoryId1) cat3 = this.props.match.params.categoryId3
        this.props.setCategory(cat1, cat2, cat3)
    }

  }

  componentWillMount() {
    let cat1 = ''
    let cat2 = ''
    let cat3 = ''

    if (this.props.match.params.categoryId1) cat1 = this.props.match.params.categoryId1
    if (this.props.match.params.categoryId2) cat2 = this.props.match.params.categoryId2
    if (this.props.match.params.categoryId1) cat3 = this.props.match.params.categoryId3
    this.props.setCategory(cat1, cat2, cat3)
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
                <ProductList fetchProducts={this.props.fetchProducts} />
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
    category1: currentCategory1(state),
    category2: currentCategory2(state),
    category3: currentCategory3(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCategory: (cat1, cat2, cat3) => {
      dispatch(setCategory(cat1, cat2, cat3))
    },
    fetchProducts: (query) => {
      dispatch(fetchProducts(query))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryView)
export {CategoryView as CategoryViewNotConnected}
