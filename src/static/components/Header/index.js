import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import VisibilitySensor from 'react-visibility-sensor'

import Menu from './Menu'
import TopBar from './TopBar'
import MiddleContent from './MiddleContent'

import {
  isBrowser,
  isMobile
} from "react-device-detect"

import './style.scss'


class Header extends React.Component {
  static propTypes = {
    path: PropTypes.string
  }

  static defaultProps = {
    path: undefined
  }

  constructor(props) {
    super(props)

    this.state = {
      fixed: false
    }
  }

  setUnFixed = (isVisible) => {
    this.setState({
      fixed: !isVisible
    })
  }

  render() {
    return (
      <div className='header'>
        {
          isBrowser &&
          <TopBar/>
        }
        {
          isBrowser &&
          <VisibilitySensor onChange={this.setUnFixed} scrollCheck={true}>
            <MiddleContent/>
          </VisibilitySensor>
        }
        <Menu path={this.props.path} fixed={this.state.fixed || isMobile}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    path: state.routing.location ? state.routing.location.pathname : undefined
  }
}

export default connect(mapStateToProps)(Header)
