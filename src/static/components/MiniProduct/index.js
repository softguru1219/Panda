import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import ProductHover from '../ProductHover'


export default class MiniProduct extends React.Component {

  static propTypes = {
    product: PropTypes.shape({
      id: PropTypes.number.isRequired,
      img: PropTypes.string,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      comment_count: PropTypes.number.isRequired,
      like: PropTypes.number.isRequired,
      unlike: PropTypes.number.isRequired,
      seller_ch: PropTypes.string.isRequired,
      brand: PropTypes.string,
      brand_log: PropTypes.string
    })
  }

  render() {
    const product = this.props.product
    return (
      <div className='mini-product product'>
        <div className='product-img mb-2' >
          <div><img src={product.img}/></div>
          <div className='action-view'>
            <span className='mr-2'><i className='fa fa-comment' /> {product.comment_count} </span>
            <span className='mr-2'><i className='fa fa-thumbs-up' /> {product.like} </span>
            <span><i className='fa fa-thumbs-down' /> {product.unlike} </span>
          </div>
          <span className='prod-seller'>{product.seller_ch}</span>
          {
            ! product.brand_logo 
            ? <span className='prod-brand'>{product.brand}</span>
            : <img className='prod-brand' src={product.brand_logo}/>
          }
        </div>
        <h4 className='mb-2'>{product.title}</h4>
        <p className='current-price sm'>
          &yen;{product.price}
        </p>
        <ProductHover product={product} />
      </div>
    )
  }
}
