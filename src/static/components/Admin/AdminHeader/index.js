import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {isAdmin} from '../../../selectors/auth'
import {push} from 'react-router-redux'
import logo from '../../../images/logo.png'
import ClassNames from 'classnames'
import {authLogoutAndRedirect} from '../../../actions/auth'
import './style.scss'

const mql = window.matchMedia(`(min-width: 992px)`)


class AdminHeader extends React.Component {

  static propTypes = {
    isAdmin: PropTypes.bool,
    toggleSidebar: PropTypes.func.isRequired,
    authLogoutAndRedirect: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      isShowBtnSidebar: false
    }
  }

  componentWillMount() {
    if (!this.props.isAdmin) {
      this.props.dispatch(push('/'))
    }
    mql.addListener(this.mediaQueryChanged)
  }

  componentDidMount() {
    this.mediaQueryChanged()
  }

  componentWillUnmount() {
    mql.removeListener(this.mediaQueryChanged)
  }

  mediaQueryChanged = () => {
    this.setState({isShowBtnSidebar: !mql.matches})
  }

  render() {
    const clsBtnSidebar = ClassNames({
      hide: !this.state.isShowBtnSidebar
    })

    const clsInpSearch = ClassNames({
      'inp-admin-header-search': true,
      'wide': !this.state.isShowBtnSidebar
    })

    return (
      <ul className={"admin-header clearfix"}>
        <li className={"d-lg-none admin-header-brand"}>
          <img src={logo}/>
        </li>
        <li className={clsBtnSidebar}>
          <button className={"btn-open-sidebar btn-icon btn"} onClick={this.props.toggleSidebar}><i
            className={'fa fa-list'}/></button>
        </li>
        <li className={clsInpSearch}>
          <input className={"form-control"} placeholder="Search..." />
        </li>
        <li>
          <button className={"btn btn-icon"} onClick={this.props.authLogoutAndRedirect}><i className={"fa fa-sign-out"} /></button>
        </li>
      </ul>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAdmin: isAdmin(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    authLogoutAndRedirect: (e) => {
      dispatch(authLogoutAndRedirect())
    },
    dispatch
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AdminHeader)