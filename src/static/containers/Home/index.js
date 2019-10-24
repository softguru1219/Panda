import React from 'react'

import HomeSlider from '../../components/Home/HomeSlider'
import {fetchHomeProducts, addAnalysisProductRequest} from '../../actions/product'
import NavLink from "../../components/Elems/NavLink"
import ProductSummary from '../../components/ProductSummary'
import {push} from 'react-router-redux'
import {connect} from 'react-redux'
import {isAdmin} from '../../selectors/auth'
import './style.scss'


const homePageProperties = {
  recommend_products: {
    title: '推荐产品',
    href: '/recommend'
  },
  today_discount_products: {
    title: '今天白菜价',
    href: '/discount/today'
  },
  time_discount_products: {
    title: '时间白菜价',
    href: '/discount/time'
  },
  general_discount_products: {
    title: '一般白菜价',
    href: '/discount/general'
  },
  all_discount_products: {
    title: '全部的白菜价',
    href: '/discount'
  }
}


class HomeView extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      recommend_products: [],
      today_discount_products: [],
      time_discount_products: [],
      general_discount_products: [],
      all_discount_products: []
    }
  }

  componentDidMount() {
    fetchHomeProducts().then(res => {
      this.setState(res.data)
    })
  }

  componentWillMount() {
    if (this.props.isAdmin) {
      this.props.dispatch(push('/admin/dashboard'))
    }
  }

  addAnalysisProduct = (prod, user) => {
    addAnalysisProductRequest(prod, this.props.user).then(res => {
      let newState = {}
      Object.keys(this.state).map(key => {
        newState[key] = this.state[key].map(p => {
          if (prod.id === p.id) {
            p = {
              ...p,
              available_analysis: false
            }
          }
          return p
        })
      })
      this.setState(newState)
    })
  }

  render() {
    return (
      <div className='homepage'>
        <HomeSlider />
        <div className='container-fluid'>
          <div className='row'>
            <div className='product-list col-12'>
              <div className='home-products py-4'>
                <React.Fragment>
                  {
                    Object.keys(homePageProperties).map((key, idx) => {
                      let clsName = key.replace(/_/g, '-')
                      return <React.Fragment key={idx}>
                          {
                            this.state[key].length > 0 &&
                            <div className={`${clsName} products-wrapper`}>
                              <div className="home-products-header clearfix">
                                <h4>{homePageProperties[key].title}<NavLink href={homePageProperties[key].href} className="check-more">查看更多<i className="fa fa-arrow-circle-o-right ml-2"/></NavLink></h4>
                                <span className="ribbon" />
                              </div>
                              <div className="row">
                                {
                                  this.state[key].map((prod, idx) => {
                                    return <div className="prod-wrapper col-md-4 col-sm-6 col-xs-12" key={idx}>
                                      <ProductSummary product={prod} customAddAnalysisProduct={this.addAnalysisProduct} />
                                    </div>
                                  })
                                }
                              </div>
                          </div>
                          }
                      </React.Fragment>
                    })
                  }
                </React.Fragment>
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
    isAdmin: isAdmin(state)
  }
}

export default connect(mapStateToProps)(HomeView)