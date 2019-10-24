import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Helmet} from 'react-helmet'
import ClassNames from 'classnames'

import ProductImage from '../../../components/ProductDetail/ProductImage'
import PriceHistory from '../../../components/ProductDetail/PriceHistory'
import './style.scss'

import {
  getProduct, 
  setLikeProduct, 
  setUnLikeProduct, 
  addProductToCompare,
  addAnalysisProduct
} from '../../../actions/product'

import {
  addComment, 
  setLikeComment, 
  setUnLikeComment,
  editComment,
} from '../../../actions/comment'
import {getViewProduct, selCompareProducts} from '../../../selectors/product'
import Rating from 'react-rating'
import {currentUserId} from '../../../selectors/auth'

class ProductDetail extends React.Component {
  static propTypes = {
    getProduct: PropTypes.func.isRequired,
    setLikeProduct: PropTypes.func.isRequired,
    setUnLikeProduct: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    compareProducts: PropTypes.array.isRequired,
    user: PropTypes.string
  }

  componentWillMount() {
    this.props.getProduct(this.props.match.params.id)
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.props.getProduct(this.props.match.params.id)
    }
  }

  render() {
    let product = this.props.product
    const priceQuantityCls = ClassNames({
      'available': product.quantity > 0,
      'prod-quantity mb-4': true
    })
    return (
      <React.Fragment>
        {
          'id' in product && 
          <div className='container product-detail py-4'>
            <Helmet>
              <title>{product.title}</title>
              <meta content={product.keywords} name='keywords'/>
              <meta content={product.product_description} name='description'/>
            </Helmet>
            <div className='prod-summary'>
              <div className='row'>
                <div className='col-lg-6 col-md-12 mb-4'>
                  <ProductImage images={product.image_links} videos={product.viedo_links} brand={product.brand} brand_logo ={product.brand_logo } />
                </div>
                <div className='col-lg-6 col-md-12 prod-info mb-4'>
                  {
                    product.discount_until
                    && <div className="discount-until mb-4">
                      折扣直到: <strong>{product.discount_until}</strong>
                    </div>
                  }

                  <h4 className='prod-title'> {product.title} </h4>
                  <div className='price-wrapper clearfix mb-4'>
                    <dl>
                      <dt>价格</dt>
                      <dd><span className='current-price mr-2'><em>&yen;</em><span>{product.sailing_price}</span></span></dd>
                    </dl>
                    {
                      product.original_price && product.sailing_price !== product.original_price &&
                      <dl>
                        <dt>旧价格</dt>
                        <dd><del className='old-price'><em>&yen;</em><span>{product.original_price}</span></del></dd>
                      </dl>
                    }
                  </div>
                  {
                    product.review_count > 0 &&
                    <div className='reviews mb-4'>
                      <Rating
                        readonly={true}
                        initialRating={product.review_score}
                        emptySymbol="fa fa-star-o"
                        fullSymbol="fa fa-star"
                        fractions={2} />
                        <span className='average-rating ml-2'>{product.review_score}</span>
                        {
                          product.review_count && <span className='total-reviews ml-2'>({product.review_count})</span>
                        }
                    </div>
                  }

                  {
                    product.color_and_sizes &&
                    <React.Fragment>
                      <ul className='color_and_sizes mb-2'>
                      {
                        Object.keys(product.color_and_sizes).filter(key => key === 'image').map((key, idx) => {
                          return <li className='img-item list-inline-item sm' key={idx}>
                            <img src={product.color_and_sizes[key]} />
                          </li>
                        })
                      }
                      </ul>
                      <ul className='color_and_sizes mb-2'>
                      {
                        Object.keys(product.color_and_sizes).filter(key => key !== 'image').map((key, idx) => {
                          return <li className='list-inline-item sm' key={idx}>
                            <label>{key} :</label> <span>{product.color_and_sizes[key]}</span>
                          </li>
                        })
                      }
                      </ul>
                    </React.Fragment>
                  }

                  <p className='prod-desc mb-2'>{product.product_description}</p>

                  <p className={priceQuantityCls}>
                    数量: <strong>{product.quantity > 0 ? product.quantity : '无货'}</strong>
                  </p>

                  <div className='btn-groups'>
                    <a className='btn btn-default' href={product.url} target='_blank'><i className='fa fa-eye mr-2' />直达链接</a>
                    {
                      this.props.compareProducts.filter(prod => prod.id === product.id).length === 0 &&
                      <button className='btn btn-default' onClick={e => this.props.addProductToCompare(product)}><i className='fa fa-line-chart mr-2'/>对比</button>
                    }
                    {
                      product.available_analysis &&
                      <button className='btn btn-default' onClick={e => this.props.addAnalysisProduct(product)}><i className='fa fa-industry mr-2'/>分析</button>
                    }
                  </div>
                  {
                    product.price_history &&
                      <React.Fragment>
                        <div className="price-history-header clearfix">
                          <h4>价格历史</h4>
                          <span className="ribbon" />
                        </div>
                        <PriceHistory priceHistory={product.price_history} />
                      </React.Fragment>
                  }

                  {
                    Object.keys(product.item_properties).length > 0 &&
                      <React.Fragment>
                        <div className="item-properties-header clearfix">
                          <h4>细节</h4>
                          <span className="ribbon" />
                        </div>
                        <ul className='item-properties'>
                        {
                          Object.keys(product.item_properties).map((key, idx) => {
                            return <li key={idx} className='row row-eq-height' >
                                <label className='col-lg-3 col-sm-4 col-6'>{key} :</label>
                                <span className='col-lg-9 col-sm-8 col-6'>{product.item_properties[key]}</span>
                              </li>
                          })
                        }
                        </ul>
                      </React.Fragment>
                  }
                </div>
              </div>
            </div>
          </div>
        }
        
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    product: getViewProduct(state),
    compareProducts: selCompareProducts(state),
    user: currentUserId(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProduct: (prodId) => {
      dispatch(getProduct(prodId))
    },
    setLikeProduct: (prodId, user) => {
      dispatch(setLikeProduct(prodId, user))
    },
    setUnLikeProduct: (prodId, user) => {
      dispatch(setUnLikeProduct(prodId, user))
    },
    setUnLikeComment: (prodId, commentId, user) => {
      dispatch(setUnLikeComment(prodId, commentId, 'product', user))
    },
    setLikeComment: (prodId, commentId, user) => {
      dispatch(setLikeComment(prodId, commentId, 'product', user))
    },
    addComment: (prodId, text, user) => {
      dispatch(addComment(prodId, text, 'product', user))
    },
    editComment: (prodId, comment, user) => {
      dispatch(editComment(prodId, comment, 'product', user))
    },
    addProductToCompare: (product) => {
      dispatch(addProductToCompare(product))
    },
    addAnalysisProduct: (product) => {
      dispatch(addAnalysisProduct(product))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail)
