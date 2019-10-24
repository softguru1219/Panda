import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {push} from 'react-router-redux'

import './style.scss'
import {checkUserEmailVerification, readyChangeEmail} from '../../actions/auth'
import {confirmedEmail, isAuthenticated} from '../../selectors/auth'


class ConfirmEmailView extends React.Component {
  static propTypes = {
    confirmedEmail: PropTypes.bool,
    isAuthenticated: PropTypes.bool,

    checkUserEmailVerification: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  }

  componentWillMount = () => {
    if (this.props.confirmedEmail) {
      if (this.props.isAuthenticated)
        this.props.push('/')
      else this.props.push('/login')
    }
    else if (this.props.match.params.activationKey) this.props.checkUserEmailVerification(this.props.match.params.activationKey)
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.confirmedEmail !== this.props.confirmedEmail && this.props.confirmedEmail) {
      if (this.props.isAuthenticated) this.props.push('/')
      else this.props.push('/login')
    }
  }

  componentDidMount = () => {
    if (this.props.confirmedEmail) this.props.push('/login')
  }

  changeEmail = (e) => {
    this.props.readyChangeEmail()
    this.props.push('/verify-email')
  }

  render() {
    return (
      <div className='confirm-email vertical-align page text-center'>
      {
        !this.props.confirmedEmail 
        && this.props.match.params.activationKey 
        && <div className=''>
          <p className='mb-4'>抱歉，激活密钥无效. 请再次检查您的电子邮件.</p>
          <div className='btn-groups'>
            <button className='btn btn-default' onClick={this.changeEmail}>更改电子邮件</button>
          </div>
        </div>
      }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    confirmedEmail: confirmedEmail(state),
    isAuthenticated: isAuthenticated(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    push: (link) => {
      dispatch(push(link))
    },
    checkUserEmailVerification: (key) => {
      dispatch(checkUserEmailVerification(key))
    },
    readyChangeEmail: () => {
      dispatch(readyChangeEmail())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmEmailView)
export {ConfirmEmailView as ConfirmEmailViewNotConnected}
