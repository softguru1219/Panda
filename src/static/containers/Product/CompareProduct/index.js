import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Rating from 'react-rating'

import {selCompareProducts, selComparePriceHistory} from '../../../selectors/product'
import {removeAllCompareProducts, removeCompareProduct, viewCompareProduct} from '../../../actions/product'
import NoResult from '../../../components/Elems/NoResult'
import NavLink from '../../../components/Elems/NavLink'
import {imageBasePath} from "../../../config/images"
import PriceHistory from '../../../components/ProductDetail/PriceHistory'

import './style.scss'


const subTitles = {
  'item_properties': '规格',
  'color_and_sizes': '变种',
}

class CompareProductView extends React.Component {
  static propTypes = {
    removeProduct: PropTypes.func.isRequired,
    removeAll: PropTypes.func.isRequired,
    products: PropTypes.array,
    priceHistory: PropTypes.array
  }

  static defaultProps = {
    products: []
  }

  componentWillMount = () => {
    this.props.viewCompareProduct(this.props.products.map(prod => prod.id))
  }

  componentDidUpdate = (prevProps) => {
    if (JSON.stringify(prevProps.products) !== JSON.stringify(this.props.products)) {
      this.props.viewCompareProduct(this.props.products.map(prod => prod.id))
    }
  }

  render() {
    let color_and_sizes = []
    let item_properties = []
    this.props.products.map(prod => {
      if ('color_and_sizes' in prod && prod.color_and_sizes) {
        color_and_sizes = Array.from(new Set([...color_and_sizes, ...Object.keys(prod.color_and_sizes).filter(key => key !== 'image')]))
      }
      if ('item_properties' in prod && prod.item_properties)
        item_properties = Array.from(new Set([...item_properties, ...Object.keys(prod.item_properties)]))
    })
    let fields = {
      'color_and_sizes': color_and_sizes,
      'item_properties': item_properties
    }

    let colors = ['#8884d8', '#1184d8', '#888ddd']

    let priceHistoryData = this.props.products.map((prod, idx) => {
      return {
        'dataKey': `prod${prod.id}`,
        'color': colors[idx],
        'name': `产品${prod.id}`
      }
    })

    const columnClassName = `text-center col-${12 / (this.props.products.length + 1)}`
    return (
      <div className='container-fluid p-4 compare-product-list'>
      {
        this.props.products.length !== 0 
        ? <React.Fragment>
          <h3 className='page-title mb-4'>
            比较产品
          </h3>
          {/* START IMAGE */}
          <div className='row'>
            <div className={columnClassName}>
              图片:
            </div>
            {
              this.props.products.map((prod, idx) => {
                
                return <div className={columnClassName} key={idx}>
                {
                  prod.image_links && 
                  <img src={`${imageBasePath}/${prod.image_links[0]}`} className='prod-img'/>
                }
                </div>
              })
            }
          </div>
          {/* END IMAGE */}
          {/* START TITLE */}
          <div className='row'>
            <div className={columnClassName}>
              标题:
            </div>
            {
              this.props.products.map((prod, idx) => {
                return <div className={columnClassName} key={idx}>
                  <p>{prod.title}</p>
                </div>
              })
            }
          </div>
          {/* END TITLE */}
          {/* START VIEw BUTTON*/}
          <div className="row">
            <div className={columnClassName} />
            {
              this.props.products.map((prod, idx) => {
                return <div className={columnClassName} key={idx}>
                  <NavLink className="btn btn-default mt-4" href={`/product/${prod.id}`} key={idx}>
                    <i className="fa fa-eye mr-2" /> 视图
                  </NavLink>
                </div>
              })
            }
          </div>
          {/* END VIEw BUTTON*/}
          {/* START REVIEW SCORE*/}
          {
            <div className='row'>
              <div className={columnClassName}>
                评论:
              </div>
              {
                this.props.products.map((prod, idx) => {
                  return <div className={columnClassName + ' reviews'} key={idx}>
                    {
                      prod.review_score &&
                      <React.Fragment>
                        <Rating 
                          readonly={true} 
                          initialRating={prod.review_score}
                          emptySymbol="fa fa-star-o"
                          fullSymbol="fa fa-star"
                          fractions={2} />
                          <span className='average-rating ml-2'>{prod.review_score}</span>
                      </React.Fragment>
                    }
                  </div>
                })
              }
            </div>
          }
          {/* END REVIEW SCORE*/}

          {/* START REVIEW COUNT*/}
          {
            <div className='row'>
              <div className={columnClassName}>
                审核计数:
              </div>
              {
                this.props.products.map((prod, idx) => {
                  return <div className={columnClassName + ' reviews'} key={idx}>
                    {
                      prod.review_count &&
                      <span className='total-reviews'>{prod.review_count} 个</span>
                    }
                  </div>
                })
              }
            </div>
          }
          {/* END REVIEW COUNT*/}

          {/* START PRICE */}
          <div className='row'>
            <div className={columnClassName}>
              价钱:
            </div>
            {
              this.props.products.map((prod, idx) => {
                return <div className={columnClassName} key={idx}>
                  <span className='current-price'><em>&yen;</em><span>{prod.sailing_price}</span></span>
                </div>
              })
            }
          </div>
          {/* END PRICE */}

          {/* START OLD PRICE */}
          <div className='row'>
            <div className={columnClassName}>
              旧价格:
            </div>
            {
              this.props.products.map((prod, idx) => {
                return <div className={columnClassName} key={idx}>
                  {
                    prod.original_price &&
                    <del className='old-price'>&yen;{prod.original_price}</del>
                  }
                </div>
              })
            }
          </div>
          {/* END OLD PRICE */}
          {/* END LIKE */}
          <div className='row'>
            <div className={columnClassName}>
              喜欢:
            </div>
            {
              this.props.products.map((prod, idx) => {
                return <div className={columnClassName} key={idx}>
                  {prod.like}
                </div>
              })
            }
          </div>
          {/* END LIKE */}
          {/* START UNLIKE */}
          <div className='row'>
            <div className={columnClassName}>
              不像:
            </div>
            {
              this.props.products.map((prod, idx) => {
                return <div className={columnClassName} key={idx}>
                  {prod.unlike}
                </div>
              })
            }
          </div>
          {/* END UNLIKE */}
          {/* START COMMENT NUMBER */}
          <div className='row'>
            <div className={columnClassName}>
              讨论:
            </div>
            {
              this.props.products.map((prod, idx) => {
                return <div className={columnClassName} key={idx}>
                  {prod.comment_count}
                </div>
              })
            }
          </div>
          {/* END COMMENT NUMBER */}
          {
            Object.keys(fields).map((k1, idx1) => {
              return <React.Fragment key={idx1}>
                <h5 className='sub-title'>{subTitles[k1]}</h5>
                {
                  fields[k1].map((k2, idx2) => {
                    return (
                      <div className='row' key={idx2}>
                        <div className={columnClassName}>
                          {k2}
                        </div>
                        {
                          this.props.products.map((prod, idx3) => {
                            return (
                              <div className={columnClassName} key={idx3}>
                                {prod[k1] && prod[k1][k2] ? prod[k1][k2] : 'X'}
                              </div>
                            )
                          })
                        }
                      </div>
                    )
                  })
                }
              </React.Fragment>
            })
          }
          {
            this.props.priceHistory &&
            <div className="row">
              <div className="col-sm-12">
                <PriceHistory priceHistory={this.props.priceHistory} data={priceHistoryData}/>
              </div>
            </div>
          }
        </React.Fragment>
        : <NoResult />
      }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: selCompareProducts(state),
    priceHistory: selComparePriceHistory(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      removeProduct: (prodId) => {
        dispatch(removeCompareProduct(prodId))
      }, 
      removeAll: (e) => {
        dispatch(removeAllCompareProducts())
      },
      viewCompareProduct: (prodIds) => {
        dispatch(viewCompareProduct(prodIds))
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompareProductView)
