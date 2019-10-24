import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'


export default class UserInfoForm extends React.Component {

  static propTypes = {
    save: PropTypes.func.isRequired,
    showError: PropTypes.func.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string,
      avatar: PropTypes.string,
      name: PropTypes.string,
      username: PropTypes.string,
      email: PropTypes.string,
      phone_number: PropTypes.string
    })
  }

  static defaultProps = {
    user: {
      avatar: '',
      name: '',
      username: '',
      email: '',
      phone_number: ''
    }
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
      },
      isPhoneNumberChanged: false,
    }
  }

  save = (e) => {
    e.preventDefault()
    let updatedValue = {
      id: this.state.user.id
    }

    Object.keys(this.state.user).map(key => {
      if (this.state.user[key] !== this.props.user[key]) {
        updatedValue[key] = this.state.user[key]
      }
    })
    this.props.save(updatedValue)
  }

  onFormChange = (key, val) => {
    this.setState({ 
      user: {
        ...this.state.user,
        [key]: val
      }
    })
  }

  componentWillMount = (prevProps) => {
    if (prevProps && JSON.stringify(prevProps.user) !== JSON.stringify(this.props.user) ) {
      this.setState({
        user: {
          ...this.state.user,
          ...this.props.user
        }
      })
    }
  }

  componentDidMount = () => {
    if (this.props.user) {
      this.setState({
        user: {
          ...this.state.user,
          ...this.props.user
        }
      })
    }
  }

  render() {
    return (
      <form onSubmit={this.save}>
        <div className='row mb-4 align-items-center'>
          <div className='col-md-3 text-right'>
            <label>用户名</label>
          </div>
          <div className='col-md-9'>
            <input className='form-control' value={this.state.user.username} readOnly/>
          </div>
        </div>
        <div className='row mb-4 align-items-center'>
          <div className='col-md-3 text-right'>
            <label>名称</label>
          </div>
          <div className='col-md-9'>
            <input className='form-control' value={this.state.user.name} onChange={e=>this.onFormChange('name', e.target.value)} placeholder='名称'/>
          </div>
        </div>
        <div className='row mb-4 align-items-center'>
          <div className='col-md-3 text-right'>
            <label>电话号码</label>
          </div>
          <div className='col-md-9'>
            <input className='form-control' value={this.state.user.email} onChange={e=>this.onFormChange('email', e.target.value)} placeholder='电话号码'/>
          </div>
        </div>
        <div className='btn-groups text-right'>
          <button type="submit" className="btn btn-default mr-4">节约</button>
          <button type="reset" className="btn btn-reset mr-4">重置</button>
        </div>
      </form>
    )
  }
}