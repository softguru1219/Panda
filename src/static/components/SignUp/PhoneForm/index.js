import React from 'react'
import PropTypes from 'prop-types'
import PhoneInput from 'react-phone-number-input/react-responsive-ui'

import {sendSMS, phoneVerify} from '../../../actions/auth'

import './style.scss'


export default class PhoneForm extends React.Component {

  static propTypes = {
    updatePhoneNumber: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      phone_number: '',
      phoneCode: '',
      isSendSMS: false
    }
  }

  sendSMS = (e) => {
    sendSMS(this.state.phone_number)
      .then((res) => {
          if (res.data.status) {
            this.setState({
              isSendSMS: true
            })
          }

      })
  }

  phoneVerify = (e) => {
    phoneVerify(this.state.phone_number, this.state.phoneCode)
      .then(res => {
        if (res.data.status) {
          this.props.updatePhoneNumber(this.state.phone_number)
        }
      })
  }

  getPhoneCode = (e) => {
    this.setState({
      phoneCode: e.target.value
    })
  }
  
  getPhoneNumber = (phone_number) => {
    this.setState({
      phone_number: phone_number
    })
  }

  render() {
    return (
      <div className='form-phone'>
        <div className={'form-group'}>
          <div className='inline-input mr-4'>
            <PhoneInput
              value={ this.state.phone_number }
              onChange={ this.getPhoneNumber }
              country='CN'
              placeholder='输入电话号码'/>
          </div>
          <button className={'btn btn-default'}  onClick={this.sendSMS} disabled={!this.state.phone_number} type='button'>发送</button>
        </div>
        <div className={'form-group ' + (this.state.isSendSMS ? 'show' : 'hide')}>
          <div className='inline-input mr-4'>
            <input className={'form-control phone-code'} value={this.state.phoneCode} onChange={this.getPhoneCode}/>
          </div>
          <button className={'btn btn-default'}  onClick={this.phoneVerify} disabled={!this.state.phoneCode} type='button'>验证</button>
        </div>
      </div>
    )
  }
}
