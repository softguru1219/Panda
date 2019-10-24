import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import './style.scss'
import {isAuthenticated, isAuthenticating} from '../../selectors/auth'
import NavLink from '../../components/Elems/NavLink'


class MemberShipView extends React.Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    isAuthenticating: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    statusText: '',
    location: null
  }

  componentWillMount() {
    if (this.props.isAuthenticated) {
      this.props.push('/')
    }
  }

  componentDidMount() {
    let styleElem = document.head.appendChild(document.createElement("style"))
    let borderWidth = document.getElementsByClassName('membership-title')[0].offsetWidth / 2

    styleElem.innerHTML = `.membership-container .membership-price::after { border-left: solid ${borderWidth}px transparent border-right: solid ${borderWidth}px transparent}`
  }

  render() {
    return(
      <div className='membership-container  container-fluid'>
        <div className='row'>
          <div className='col-md-4 text-center'>
            <div className='free membership'>
              <p className='membership-title'>免费会员</p>
              <p className='membership-price'>免费</p>
              <ul className='membership-features'>
                <li>您可以要求无限制地比较产品.</li>
                <li>您可以每天10次请求搜索产品.</li>
                <li>你不能要求分析产品.</li>
              </ul>
              <div className='btn-groups'>
                <NavLink href='/member/free' className='btn'>免费注册</NavLink>
              </div>
            </div>
          </div>
          <div className='col-md-4 text-center'>
            <div className='basic membership'>
              <p className='membership-title'>基本会员</p>
              <p className='membership-price'>29.9 &yen;</p>
              <ul className='membership-features'>
                <li>您可以要求无限制地比较产品.</li>
                <li>您可以要求搜索产品没有限制.</li>
                <li>您可以每月30次请求分析产品.</li>
              </ul>
              <div className='btn-groups'>
                <NavLink href='/member/basic' className='btn' >免费注册</NavLink>
              </div>
            </div>
          </div>
          <div className='col-md-4 text-center'>
            <div className='pro membership'>
              <p className='membership-title'>免费会员</p>
              <p className='membership-price'>49.9 &yen;</p>
              <ul className='membership-features'>
                <li>您可以要求无限制地比较产品.</li>
                <li>您可以要求搜索产品没有限制.</li>
                <li>您可以无限制地请求分析产品.</li>
              </ul>
              <div className='btn-groups'>
                <NavLink href='/member/pro' className='btn'>免费注册</NavLink>
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
    isAuthenticated: isAuthenticated(state),
    isAuthenticating: isAuthenticating(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    push: (link) => {
      dispatch(push(link))
    }
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MemberShipView)
