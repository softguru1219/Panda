import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import t from 'tcomb-form'
import {Email, Password} from '../../../form-fields'

const Form = t.form.Form

const RegisterForm = t.struct({
    username: t.String,
    email: Email,
    name: t.String,
    password: Password,
    confirm_password: Password,
})

const RegisterFormFormOptions = {
    fields: {
        username: {
            attrs: {
                placeholder: '用户名',
            },
            label: '用户名'
        },
        name: {
          attrs: {
            placeholder: '名称',
          },
          label: '名称'
        },
        email: {
          attrs: {
              placeholder: '电话号码',
          },
          label: '电话号码',
          error: '请输入验证邮件'
        },
        password: {
            type: 'password',
            attrs: {
                placeholder: '密码',
            },
            label: '密码',
            error: '密码长度至少需要6个字母数字字符'
        },
        confirm_password: {
          type: 'password',
          attrs: {
              placeholder: '确认密码',
          },
          label: '确认密码',
          error: '密码不匹配'
      }
    }
}


export default class RegisterFormInfoForm extends React.Component {

  static propTypes = {
    save: PropTypes.func.isRequired,
    showError: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      user: {
        avatar: null,
        name: '',
        username: '',
        email: '',
        phone_number: '',
        password: '',
        confirm_password: ''
      },
      isChanged: false,
    }
  }

  save = (e) => {
    e.preventDefault()
    const value = this.userForm.getValue()
    if (value) {
      if (value.confirm_password === value.password) 
        this.props.save(value)
      else {
        this.props.showError('密码不匹配')
      }
    }
  }

  onFormChange = (user) => {
    this.setState({ user: user, isChanged: true })
  }

  render = () => {
    return (
      <form onSubmit={this.save} className='text-left'>
        <Form ref={(ref) => { this.userForm = ref }}
          type={RegisterForm}
          options={RegisterFormFormOptions}
          value={this.state.user}
          onChange={this.onFormChange}
        />
        <div className='btn-groups text-right'>
          <button type="submit" className="btn btn-default mr-4">节约</button>
          <button type="reset" className="btn btn-reset mr-4">重置</button>
        </div>
      </form>
    )
  }
}
