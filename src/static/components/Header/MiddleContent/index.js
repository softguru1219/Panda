import React from 'react'

import NavLink from '../../Elems/NavLink'
import logo from '../../../images/logo.png'
import Search from '../Search'
import './style.scss'


export default class MiddleContent extends React.Component {
  render() {
    return (
      <div className='middle-content text-center'>
        <div className='d-inline-block clearfix'>
          <div className="brand">
            <NavLink href='/'>
              <img src={logo}/>
            </NavLink>
          </div>
          <Search/>
          <div className="header-links">
            <NavLink className="header-link" href="/analysis">
              <i className="fa fa-angellist"/>
              <span>分析产品</span>
            </NavLink>
            <NavLink className="header-link" href="/discount">
              <i className="fa fa-gift"/>
              <span>白菜价</span>
            </NavLink>
            <NavLink className="header-link" href="/recommend">
              <i className="fa fa-forumbee"/>
              <span>推荐</span>
            </NavLink>
          </div>
        </div>
      </div>
    )
  }
}
