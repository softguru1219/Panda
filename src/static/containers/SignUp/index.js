import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {push} from 'react-router-redux'

import {register} from '../../actions/auth'
import {showMessage} from '../../actions/common'
import PhoneForm from '../../components/SignUp/PhoneForm'
import Message from '../../components/Elems/Message'
import {isAuthenticated, isAuthenticating, isRegistered} from '../../selectors/auth'
import RegisterFormInfoForm from '../../components/SignUp/RegisterForm'

import './style.scss'


const mapsToMember = {
  'free': 'F',
  'basic': 'B',
  'pro': 'P',
}

class SignUpView extends React.Component {
  static propTypes = {
    push: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isAuthenticating: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    statusText: '',
    location: null
  }

  constructor (props) {
    super(props)
    this.state = {
      member: 'F',
      phone_number: null
    }
  }

  componentWillMount() {
    if (this.props.isAuthenticated) {
      this.props.push('/')
    }
    if (Object.keys(mapsToMember).indexOf(this.props.match.params.member) < 0 )  {
      this.props.push('/member/free')
    }
  }

  register = (value) => {
    this.props.register({
      ...value, 
      member: mapsToMember[this.props.match.params.member],
      phone_number: this.state.phone_number
    })
  }

  updatePhoneNumber = (phoneNumber) => {
    this.setState({
      phone_number: phoneNumber
    })
  }

  render() {
    return(
      <div className='signup-container vertical-align page'>
        <div>
        {
          !this.props.isRegistered
          ? <React.Fragment >
            <h3 className='page-title mb-4'>确认电话号码</h3>
            <Message /> 
            {
              !this.state.phone_number
              ? <PhoneForm 
                updatePhoneNumber={this.updatePhoneNumber} />
              : <RegisterFormInfoForm save={this.register} showError={this.props.showMessage}/>
            }
            </React.Fragment>
          : <p className='info'>您注册成功. 请勾选您的邮箱. 谢谢.</p>
        }
        </div>
      </div>
    ) 
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: isAuthenticated(state),
    isAuthenticating: isAuthenticating(state),
    isRegistered: isRegistered(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    push: (link) => {
      dispatch(push(link))
    },
    register: (value) => {
      dispatch(register(value))
    },
    showMessage: (message, type='danger') => {
      dispatch(showMessage(message, type))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpView)
