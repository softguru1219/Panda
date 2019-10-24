import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import './style.scss'
import ProductSummary from '../ProductSummary'
import Pagination from '../Elems/Pagination'
import NoResult from '../Elems/NoResult'
import {selPagination, selProducts, selQuery, isEnableFetching} from '../../selectors/product'
import {gotoPage} from '../../actions/product'

class ProductList extends React.Component {

  static propTypes = {
    products: PropTypes.array,
    showPagination: PropTypes.bool,
    query: PropTypes.string,
    isEnableFetching: PropTypes.bool,

    fetchProducts: PropTypes.func.isRequired
  }

  static defaultProps = {
    products: [],
    showPagination: true,
  }

  componentWillMount = () => {
    this.props.fetchProducts(this.props.query)
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.query !== this.props.query && this.props.isEnableFetching) {
      this.props.fetchProducts(this.props.query)
    }
  }

  render() {
    return (
      <React.Fragment>
        {
          this.props.products.length != 0
            ? <React.Fragment>
                <div className='row'>
                  {
                    this.props.products.map((prod, idx) => {
                      return (
                        <React.Fragment key={idx}>
                          <div className='prod-wrapper col-md-4 col-sm-6 col-xs-12'>
                            <ProductSummary product={prod} />
                          </div>
                        </React.Fragment>
                      )
                    })
                  }
                </div>
                {
                  this.props.showPagination && 
                  <div className='row'>
                    <div className='col-12 text-center'>
                      <Pagination pagination={this.props.pagination} gotoPage={this.props.gotoPage} />
                    </div>
                  </div>
                }
                </React.Fragment>
          : <NoResult />
        }
      </React.Fragment>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    products: selProducts(state),
    pagination: selPagination(state),
    query: selQuery(state),
    isEnableFetching: isEnableFetching(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    gotoPage: (page) => {
      dispatch(gotoPage(page))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)