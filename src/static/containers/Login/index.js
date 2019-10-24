import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {isAuthenticated, isAuthenticating} from '../../selectors/auth'
import * as actionCreators from '../../actions/auth'
import Message from '../../components/Elems/Message'
import t from 'tcomb-form'

import './style.scss'


const Form = t.form.Form

const Login = t.struct({
  username: t.String,
  password: t.String
})

const LoginFormOptions = {
  fields: {
    username: {
      attrs: {
        placeholder: '用户名 / 电话号码',
      },
      label: '用户名 / 电话号码'
    },
    password: {
      type: 'password',
      attrs: {
        placeholder: '密码',
      },
      label: '密码'
    }
  }
}

class LoginView extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isAuthenticating: PropTypes.bool.isRequired,
    actions: PropTypes.shape({
      authLoginUser: PropTypes.func.isRequired
    }).isRequired,
    location: PropTypes.shape({
      search: PropTypes.string.isRequired
    }),
    wishListProducts: PropTypes.array
  }

  static defaultProps = {
    statusText: '',
    location: null
  }

  constructor(props) {
    super(props)

    const redirectRoute = this.props.location ? this.extractRedirect(this.props.location.search) || '/' : '/'
    this.state = {
      formValues: {
        username: '',
        password: ''
      },
      redirectTo: redirectRoute
    }
  }

  componentWillMount() {
    if (this.props.isAuthenticated) {
      this.props.dispatch(push('/'))
    }
  }

  onFormChange = (value) => {
    this.setState({ formValues: value })
  }

  extractRedirect = (string) => {
    const match = string.match(/next=(.*)/)
    return match ? match[1] : '/'
  }

  login = (e) => {
    e.preventDefault()
    const value = this.loginForm.getValue()
    if (value) {
      this.props.actions.authLoginUser(value.username, value.password, this.state.redirectTo)
    }
  }

  render() {
    return (
      <div className="login-container vertical-align page">
        <div>
          <h3 className='page-title'>请登录</h3>
          <div className="login margin-top-medium text-left">
            <Message />
            <form onSubmit={this.login}>
              <Form ref={(ref) => { this.loginForm = ref }}
                type={Login}
                options={LoginFormOptions}
                value={this.state.formValues}
                onChange={this.onFormChange}
              />
              <div className='btn-groups text-right'>
                <button disabled={this.props.isAuthenticating}
                  type="submit"
                  className="btn btn-default mr-4"
                >
                  登 录
                </button>
                <Link className="btn btn-default" to='/signup'>
                  免费注册
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: isAuthenticated(state),
    isAuthenticating: isAuthenticating(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    actions: bindActionCreators(actionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginView)
export { LoginView as LoginViewNotConnected }
