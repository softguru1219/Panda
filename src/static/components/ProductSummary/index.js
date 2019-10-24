import React from 'react'
import PropTypes from 'prop-types'
import NavLink from "../Elems/NavLink"
import arrow from "../../images/icons/arrow.png"
import heart from "../../images/icons/heart.png"
import {connect} from 'react-redux'
import {
  addProductToCompare, addAnalysisProduct
} from '../../actions/product'
import {canCompare} from '../../selectors/product'
import { currentUserId} from '../../selectors/auth'

import {imageBasePath} from "../../config/images"
import './style.scss'

class ProductSummary extends React.Component {

  static propTypes = {
    product: PropTypes.shape({
      id: PropTypes.number.isRequired,
      img: PropTypes.string,
      title: PropTypes.string.isRequired,
      sailing_price: PropTypes.number.isRequired,
      original_price: PropTypes.number,
      comment_count: PropTypes.number.isRequired,
      like: PropTypes.number.isRequired,
      unlike: PropTypes.number.isRequired,
      seller_ch: PropTypes.string.isRequired,
      brand: PropTypes.string,
      brand_logo: PropTypes.string,
    }),
    canCompare: PropTypes.bool,
    addProductToCompare: PropTypes.func.isRequired,
    addAnalysisProduct: PropTypes.func.isRequired,
    customAddAnalysisProduct: PropTypes.func,
  }

  addProductToCompare = (e) => {
    this.props.addProductToCompare(this.props.product)
  }

  addAnalysis = (e) => {
    if (this.props.customAddAnalysisProduct && this.props.user) this.props.customAddAnalysisProduct(this.props.product, this.props.user)
    else this.props.addAnalysisProduct(this.props.product, this.props.user)
  }

  render() {
    let product = this.props.product
    const imageSrc = `${imageBasePath}/${product.img}`
    return (
      <div className='product product-summary clearfix'>
        <NavLink className='product-img' href={`/product/${product.id}`}>
          <img src={imageSrc}/>
          <span className='prod-seller'>{product.seller_ch}</span>
        </NavLink>
        <div className="product-content">
          <div className="btn-groups text-center">
            <button className="btn btn-add-wishlist" onClick={this.addAnalysis} disabled={!product.available_analysis}>
              <span className="btn-img text-center">
                <img src={heart} />
              </span>
              <span className="btn-title">
                加人分析
              </span>
            </button>
              <button className="btn btn-add-compare" onClick={this.addProductToCompare} disabled={!this.props.canCompare}>
              <span className="btn-img text-center">
                <img src={arrow} />
              </span>
              <span className="btn-title">
                加人对比
              </span>
            </button>
          </div>
          <div className='prod-summary'>
            <div className="title-wrapper">
              <h4 className='mb-1'>{product.title}</h4>
            </div>
            <p className='price mb-2'>
              <span className='current-price'>
                &yen;{product.sailing_price}
              </span>
              {
                product.original_price &&
                <del className='ml-2 old-price'>
                  &yen;{product.original_price}
                </del>
              }
            </p>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    canCompare: canCompare(ownProps.product.id)(state),
    user: currentUserId(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addProductToCompare: (prod) => {
      dispatch(addProductToCompare(prod))
    },
    addAnalysisProduct: (prod, user) => {
      dispatch(addAnalysisProduct(prod, user))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductSummary)