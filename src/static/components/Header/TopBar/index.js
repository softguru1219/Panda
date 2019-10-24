import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import NavLink from '../../Elems/NavLink'
import {authLogoutAndRedirect} from '../../../actions/auth'
import {isAuthenticated, currentUser, isAdmin} from '../../../selectors/auth'

import './style.scss'


class TopBar extends React.Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object,
    isAdmin: PropTypes.bool,
    authLogout: PropTypes.func.isRequired
  }

  static defaultProps = {
    isAuthenticated: false
  }


  render() {
    return (
      <div className='topbar'>
        <div className='container-fluid'>
          <div className="clearfix">
            <ul className='toplinks left'>
              <li className='toplinks-item'><NavLink href='/analysis'><i
                className={`fa fa-industry mr-2`}/>分析产品</NavLink></li>
              <li className='toplinks-item'><NavLink href='/contact-us'><i
                className={`fa fa-phone mr-2`}/>联系我们</NavLink></li>
            </ul>
            <ul className='toplinks right'>
              {
                this.props.isAuthenticated
                  ? <React.Fragment>
                    <li className='toplinks-item'><NavLink href='/account'>
                      <i className='fa fa-user mr-2'/>{this.props.user.username}</NavLink></li>
                    <li className='toplinks-item'><span onClick={(e) => this.props.authLogout()} className='span-link'><i
                      className={`fa fa-sign-out mr-2`}/> 登出</span></li>
                  </React.Fragment>
                  : <React.Fragment>
                    <li className='toplinks-item'><NavLink href='/login'>
                      <i className='fa fa-sign-in mr-2'/>亲，请登录</NavLink></li>
                    <li className='toplinks-item'><NavLink href='/signup'>
                      <i className='fa fa-user-plus mr-2'/>免费注册</NavLink></li>
                  </React.Fragment>
              }
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: isAuthenticated(state),
    user: currentUser(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    authLogout: () => {
      dispatch(authLogoutAndRedirect())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBar)