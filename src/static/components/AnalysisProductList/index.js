import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import PerfectScrollbar from 'react-perfect-scrollbar'

import {selProducts, selPagination} from '../../selectors/product'
import {isAuthenticated, currentUserId} from '../../selectors/auth'
import {
  fetchAnalysisProducts,
  removeAnalysisProduct,
  removeMultiAnalysisProducts,
  gotoPage
} from '../../actions/product'

import {imageBasePath} from "../../config/images"

import NavLink from '../Elems/NavLink'
import CheckBox from '../Elems/Checkbox'
import Pagination from '../Elems/Pagination'
import NoResult from '../Elems/NoResult'
import './style.scss'


class AnalysisProductList extends React.Component {

  static propTypes = {
    products: PropTypes.array,
    isAuthenticated: PropTypes.bool,
    userId: PropTypes.string.isRequired,
    pagination: PropTypes.object.isRequired,

    fetchAnalysisProducts: PropTypes.func.isRequired,
    removeAnalysisProduct: PropTypes.func.isRequired, 
    removeMultiAnalysisProducts: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      checked_items: []
    }
  }

  componentWillMount() {
    if (this.props.isAuthenticated)
      this.props.fetchAnalysisProducts()
  }

  removeAnalysisProduct = (prodId) => {
    if (this.props.isAuthenticated) this.props.removeAnalysisProduct(prodId)
    else this.props.removeAnalysis(prodId)
  }

  checkChange = (obj, prodId) => {
    this.setState({
      checked_items: obj[prodId]
      ? [...this.state.checked_items, prodId] 
      : this.state.checked_items.filter(prod => prod !== prodId),
      actionMulti: false,
      actionSingle: -1
    })
  }

  selectAll = (obj) => {
    this.setState({
      checked_items: obj['all'] ? this.props.products.map(prod => prod.id.toString()) : []
    })
  }

  checkStatus = (prodId) => {
    return this.state.checked_items.filter(id => id == prodId.toString()).length == 1
  }

  removeSelectedItems = (e) => {
    this.props.removeMultiAnalysisProducts(this.state.checked_items)
  }

  removeAnalytsis = (prodId) => {
    this.props.removeAnalysisProduct(prodId, this.props.userId)
  }

  render() {
    return (
      <div className='analysis-products'>
        <React.Fragment>
          <div className='btn-groups text-right'>
            <button className='btn btn-default' onClick={this.removeSelectedItems}><i className='fa fa-trash mr-1'/>去掉</button>
          </div>
          <div className="analysis-header">
            <div className='row align-items-center text-center analysis-item'>
                <div className='col-sm-1 col-2'>
                  <CheckBox checked={ this.props.products.length === this.state.checked_items.length } opt={'all'} update={this.selectAll} className={'cb-wish'}/>
                </div>
                <div className='col-sm-8 d-sm-block d-none'>
                  <div className='row'>
                    <div className='col-sm-4 d-sm-block d-none prod-img'>产品形象</div>
                    <div className='col-sm-4 d-sm-block d-none prod-title'>产品名称</div>
                    <div className='col-sm-4 d-sm-block d-none prod-price'>产品价格</div>
                  </div>
                </div>

              <div className='col-6 d-sm-none d-block prod-price'>产品</div>
              <div className='col-sm-3 col-4 d-sm-block actions'>行动</div>
            </div>
          </div>
          <div className="analysis-body">
            {
              this.props.products
              ? <PerfectScrollbar option={{suppressScrollX: true}}>
                {
                  this.props.products.map((prod, idx) => {
                    let imgPath = `${imageBasePath}/${prod.img}`
                    return (
                      <div className='row align-items-center text-center analysis-item' key={idx}>
                        <div className='col-sm-1 col-2'>
                          <CheckBox checked={this.checkStatus(prod.id)} opt={prod.id.toString()} update={obj => this.checkChange(obj, prod.id.toString())} className={'cb-wish'}/>
                        </div>
                        <div className='col-sm-8 col-5'>
                          <div className='row align-items-center'>
                            <div className='col-sm-4 col-12 prod-img mb-3'>
                              <img src={imgPath}/>
                            </div>
                            <div className='col-sm-4 col-12 mb-3'>
                              <div className="prod-title">{prod.title}</div>
                            </div>
                            <div className='col-sm-4 col-12 prod-price mb-3'>
                              <span className='current-price'>
                                &yen;{prod.sailing_price}
                              </span>
                              {
                                 prod.original_price && prod.sailing_price != prod.original_price &&
                                <del className='ml-2 old-price'>
                                  &yen;{prod.original_price}
                                </del>
                              }
                            </div>
                          </div>
                        </div>
                        <div className='col-sm-3 col-5 actions mb-4'>
                          <NavLink className='btn btn-icon type1' href={`/product/${prod.id}`}>
                              <i className='fa fa-eye'/>
                          </NavLink>
                          <button className='btn btn-icon type1' onClick={e => this.removeAnalysisProduct(prod.id)}>
                            <i className='fa fa-trash'/>
                          </button>
                        </div>
                      </div>
                    )
                  })
                }
                </PerfectScrollbar>
                : <NoResult/>
            }
          </div>
          <div className="row">
            <div className="col-sm-12 text-center">
              <Pagination gotoPage={this.props.gotoPage} pagination={this.props.pagination} />
            </div>
          </div>
        </React.Fragment>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: selProducts(state),
    isAuthenticated: isAuthenticated(state),
    userId: currentUserId(state),
    pagination: selPagination(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAnalysisProducts: (query='') => {
      dispatch(fetchAnalysisProducts(query))
    },
    removeAnalysisProduct: (prod, user) => {
      dispatch(removeAnalysisProduct(prod, user))
    },
    removeMultiAnalysisProducts: (prodIds, user) => {
      dispatch(removeMultiAnalysisProducts(prodIds, user))
    },
    gotoPage: (page) => {
      dispatch(gotoPage(page))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnalysisProductList)