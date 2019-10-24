import React from 'react'
import {fetchUserListAPI} from '../../../actions/admin/user'
import {push} from 'react-router-redux'
import NavLink from '../../Elems/NavLink'
import Sidebar from "react-sidebar"
import PropTypes from 'prop-types'
import logo from '../../../images/logo.png'

import './style.scss'

const mql = window.matchMedia(`(min-width: 992px)`)

export default class AdminSidebar extends React.Component {

  static propTypes = {
    isSidebarOpen: PropTypes.bool,
    sidebarOpen: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      isToggle: false
    }
  }

  componentDidMount() {
    this.mediaQueryChanged()
  }

  componentWillMount() {
    mql.addListener(this.mediaQueryChanged)
  }

  componentWillUnmount() {
    mql.removeListener(this.mediaQueryChanged)
  }

  onSetSidebarOpen = (open) => {
    this.props.sidebarOpen(open)
  }

  mediaQueryChanged = () => {
    this.setState({
      isToggle: !mql.matches
    })
  }

  render() {
    return (
      <Sidebar
        sidebar={
          <ul className={'admin-sidebar-content'}>
            <li className={"admin-header-brand"}>
              <img src={logo}/>
              <span className={"d-inline-block ml-4"}>PANDA</span>
            </li>
            <li>
              <NavLink href={"/admin/dashboard"}>
                <i className={"fa fa-tachometer"} /> Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink href={"/admin/user-list"}>
                <i className={"fa fa-users"} /> Users
              </NavLink>
            </li>
            <li>
              <NavLink href={"/admin/data-status"}>
                <i className={"fa fa-database"} /> Data Status
              </NavLink>
            </li>
            <li>
              <NavLink href={"/admin/membership"}>
                <i className={"fa fa-users"} /> Membership
              </NavLink>
            </li>
            <li>
              <NavLink href={"/admin/questions"}>
                <i className={"fa fa-question"} /> Questions
              </NavLink>
            </li>
            <li>
              <NavLink href={"/settings"}>
                  <i className={"fa fa-cogs"} /> Settings
              </NavLink>
            </li>
            <li>
              <NavLink href={"/admin/policy"}>
                <i className={"fa fa fa-id-card-o"} /> Policy
              </NavLink>
            </li>
          </ul>
        }
        open={this.props.isSidebarOpen || !this.state.isToggle}
        docked={!this.state.isToggle}
        onSetOpen={this.onSetSidebarOpen}>
        {this.props.children}
      </Sidebar>
    )
  }
}
