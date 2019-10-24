import React from 'react'
import {connect} from 'react-redux'
import t from 'tcomb-form'
import PropTypes from 'prop-types'

import {createQuestionAPI} from '../../actions/contact_us'
import Message from '../../components/Elems/Message'
import {Email} from '../../form-fields'
import {endLoading, showError, showModal, startLoading} from '../../actions/common'

const Form = t.form.Form

const ContactUs = t.struct({
  title: t.String,
  email: Email,
  description: t.String,
})

const ContactUsFormOptions = {
  fields: {
    title: {
      attrs: {
        placeholder: '标题',
      },
      label: '标题'
    },
    email: {
      attrs: {
        placeholder: '你的邮件',
      },
      label: '你的邮件',
      error: '请输入验证邮件'
    },
    description: {
      type: 'textarea',
      attrs: {
        placeholder: '密码',
      },
      label: '描述'
    }
  }
}

class ContactUsView extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      formValues: {
        title: '',
        email: '',
        description: ''
      }
    }
  }

  onFormChange = (value) => {
    this.setState({ formValues: value })
  }

  contact = (e) => {
    e.preventDefault()
    const value = this.contactForm.getValue()
    if (value) {
      this.props.dispatch(startLoading())
      createQuestionAPI(value)
        .then(res => {
          this.props.dispatch(endLoading())
          this.props.dispatch(showModal('成功提交.', 'success'))
          this.setState({formValues: {}})
        })
        .catch(err => showError(this.props.dispatch, err))
    }
  }
  

  reset = (e) => {
    this.setState({
      formValues: null
    })
  }

  render() {
    return (
      <div className="vertical-align page">
        <div>
          <h4 className="page-title">联系我们</h4>
          <Message />
          <form onSubmit={this.contact}>
            <Form ref={(ref) => { this.contactForm = ref }}
              type={ContactUs}
              options={ContactUsFormOptions}
              value={this.state.formValues}
              onChange={this.onFormChange}
            />
            <div className='btn-groups text-right mt-4'>
              <button
                type="submit"
                className="btn btn-default mr-4"
              >
                发送
              </button>
              <button className="btn btn-reset" onClick={this.reset} type='button'>
                重启
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactUsView)