import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {push} from 'react-router-redux'

import './style.scss'
import {changeEmail} from '../../actions/auth'
import {isAuthenticated, currentUserId, isSendEmailVerifyLinked} from '../../selectors/auth'


class ChangeEmailView extends React.Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    user: PropTypes.string,

    push: PropTypes.func.isRequired,
  }

  constructor(props)  {
    super(props)

    this.state = {
      email: ''
    }
  }

  componentWillMount = () => {
    if (!this.props.isAuthenticated) {
       this.props.push('/login?next=/verify-email/')
    }
  }

  changeEmail = (e) => {
    this.setState({
      email: e.target.value
    })
  }

  updateEmail = (e) => {
    this.props.updateEmail(this.state.email, this.props.user)
  }

  render() {
    return (
      <div className='verify-email vertical-align page text-center'>
      {
        !this.props.isSendEmailVerifyLinked 
        ? <div className='text-left'>
          <div className='form-group mb-4'>
            <input className='form-control' value={this.state.email} onChange={this.changeEmail} placeholder='电子邮件'/>
          </div>
          <div className='btn-groups'>
            <button onClick={this.updateEmail} className='btn btn-default'>更新邮箱</button>
          </div>
        </div>
        : <div>
          <p>刚刚发过电子邮件 请检查您的电子邮箱.</p>
        </div>
      }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: isAuthenticated(state),
    user: currentUserId(state),
    isSendEmailVerifyLinked: isSendEmailVerifyLinked(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    push: (link) => {
      dispatch(push(link))
    },
    updateEmail: (email, user) => {
      dispatch(changeEmail(email, user))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeEmailView)
export {ChangeEmailView as ChangeEmailViewNotConnected}
