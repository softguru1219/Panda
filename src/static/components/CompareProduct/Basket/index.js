import React from 'react'
import './style.scss'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {selCompareProducts} from '../../../selectors/product'
import {removeAllCompareProducts, removeCompareProduct} from '../../../actions/product'
import NavLink from '../../Elems/NavLink'
import {imageBasePath} from "../../../config/images"


class Basket extends React.Component {

  static propTypes = {
    compareProducts: PropTypes.array,
    removeAll: PropTypes.func.isRequired,
    removeProduct: PropTypes.func.isRequired
  }

  static defaultProps = {
    loading: false
  }

  removeAll = (e) => {
    this.props.removeAll()
  }

  removeProduct = (prodId) => {
    this.props.removeProduct(prodId)
  }

  render() {
    let imgPath = ''
    let prods = this.props.compareProducts.map((prod, idx) => {
      imgPath = prod.image_links ? prod.image_links[0] : prod.img
      return (
        <div className='col-sm-3 col-12' key={idx}>
          <div className='compare-product'>
            <div className='prod-img'>
              <img src={`${imageBasePath}/${imgPath}`} />
              <span className='prod-seller'>{prod.seller_ch}</span>
            </div>
            <button className='compare-product-hover' onClick={(e) => this.removeProduct(prod.id)}><i className='fa fa-close' /></button>
          </div>
        </div>
      )
    })
    
    for (let i = 0; i < 3 - this.props.compareProducts.length; i ++) {
      prods.push(
        <div className='col-sm-3 col-12' key={3-i}><div className='compare-product' /> </div>
      )
    }
    

    return (
      <div className={ 'compare-basket' + (this.props.compareProducts.length !== 0 ? ' show' : ' hide')}>
        <div className='container-fluid'>
          <h5 className='mb-3'>比较篮子</h5>
          <div className='row'>
            {prods}
            <div className='col-sm-3 col-12'>
              <NavLink href={'/compare'} className='btn btn-default mb-1 btn-full-width btn-small'>视图</NavLink>
              <button className='btn btn-reset btn-full-width btn-small' onClick={this.removeAll}>移除所有</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      compareProducts: selCompareProducts(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      removeAll: () => {
        dispatch(removeAllCompareProducts())
      },
      removeProduct: (prodId) => {
        dispatch(removeCompareProduct(prodId))
      }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Basket)