import React from 'react'
import './style.scss'
import {selDiscountProducts} from '../../selectors/product'
import {fetchDiscountProducts} from '../../actions/product'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import MiniProduct from '../MiniProduct'


class DiscountProducts extends React.Component {

  static propTypes = {
    products: PropTypes.array,
    fetchDiscountProducts: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.fetchDiscountProducts()
  }

  render() {
    return (
      <div className='discount-products'>
        <h3 className='p-2'><Link to='/discount'>白菜价 <i className='fa fa-angle-double-right' /></Link></h3>
        {
          this.props.products.map((prod, idx) => {
            return <MiniProduct product={prod} key={idx}/>
          })
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: selDiscountProducts(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDiscountProducts: () => {
      dispatch(fetchDiscountProducts())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DiscountProducts)