import React from 'react'
import './style.scss'
import {hideMessage} from '../../../actions/common'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import classnames from 'classnames'

class Message extends React.Component {

  static propTypes = {
    statusText: PropTypes.string,
    statusType: PropTypes.string,
    hideMessage: PropTypes.func.isRequired
  }

  componentWillUnmount = () => {
    this.props.hideMessage()
  }

  componentWillMount = () => {
    this.props.hideMessage()
  }

  render() {
    let iconClassNames = classnames({
      'fa-exclamation-triangle': this.props.statusType === 'danger',
      'fa-check': this.props.statusType === 'success',
      'fa mr-2': true
    })
    return (
      <div className={`message alert alert-${this.props.statusType}` + (this.props.statusText ? ' show' : ' hide')}>
          <i className={iconClassNames} />{this.props.statusText}
          <span className='message-close' onClick={e => this.props.hideMessage()}>
            <i className='fa fa-close'/>
          </span>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    statusText: state.common.statusText,
    statusType: state.common.statusType
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    hideMessage: () => {
      dispatch(hideMessage())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Message)