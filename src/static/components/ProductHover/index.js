import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  addProductToCompare, addAnalysisProduct
} from '../../actions/product'
import {canCompare, canAddWish} from '../../selectors/product'
import { currentUserId} from '../../selectors/auth'


class ProductHover extends React.Component {

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
  }

  addProductToCompare = (e) => {
    this.props.addProductToCompare(this.props.product)
  }

  addAnalysis = (e) => {
    this.props.addAnalysisProduct(this.props.product, this.props.user)
  }

  render() {
    const product = this.props.product
    return (
      <div className='product-hover vertical-align'>
          <div className='text-center'>
            <div>
              <Link className='btn btn-default mb-4' to={`/product/${product.id}`}><i className='fa fa-eye mr-2'/>查看产品</Link>
            </div>
            {
              this.props.canCompare && 
              <div>
                <button className='btn btn-default mb-4' onClick={this.addProductToCompare}><i className='fa fa-bar-chart mr-2'/>比较产品</button>
              </div>
            }
            {
              // this.props.canAddWish && 
              <div><button className='btn btn-default' onClick={this.addAnalysis}><i className='fa fa-industry mr-2'/>分析产品</button></div>
            }
          </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    canCompare: canCompare(ownProps.product.id)(state),
    canAddWish: canAddWish(ownProps.product.id)(state),
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductHover)