import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import DropzoneWithPreview from '../../Elems/DropzoneWithPreview'
import UserInfoForm from './UserInfoForm'
import PhoneForm from '../../SignUp/PhoneForm'
import Message from '../../Elems/Message'
import {currentUser} from '../../../selectors/auth'
import {updateUser} from '../../../actions/auth'
import {showMessage} from '../../../actions/common'
const images = require.context('../../../images/users/')

import './style.scss'


class UserInfo extends React.Component {

  static propTypes = {
    user: PropTypes.shape({
      id: PropTypes.string,
      avatar_url: PropTypes.string,
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phone_number: PropTypes.string.isRequired
    }).isRequired,
    updateUser: PropTypes.func.isRequired,
    showError: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      avatar: null,
      phone_number: null,
      new_image: null
    }
  }

  imageChange = (file) => {
    this.setState({
      new_image: file
    })
  }

  save = (user) => {
    let newUser = user

    // check the avatar is changed.
    if (this.state.new_image) {
      newUser = {
        ...newUser,
        avatar: this.state.new_image
      }
    }

    if (this.state.phone_number) {
      newUser = {
        ...newUser,
        phone_number: this.state.phone_number
      }
    }

    this.props.updateUser(newUser)
  }

  
  updatePhoneNumber = (phoneNumber) => {
    this.setState({
      phone_number: phoneNumber
    })
  }

  render() {
    let imagePath = this.props.user.avatar_url ? images(`./${this.props.user.avatar_url}`) : images('./user1.png')
    return (
      <div className='user-info'>
        <Message />
        <div className='avatar mb-4'>
          <DropzoneWithPreview imageUrl={imagePath} onChange={this.imageChange}/>
        </div>
        <div className='phone-number clearfix'>
          <label>电话号码</label>
          <PhoneForm updatePhoneNumber={this.updatePhoneNumber}/>
        </div>
        <UserInfoForm user={this.props.user} save={this.save} showError={this.props.showError} />
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    user: currentUser(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      updateUser: (user) => {
        dispatch(updateUser(user))
      },
      showError: (statusText) => {
        dispatch(showMessage(statusText))
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo)
export {UserInfo as UserInfoNotConnected}
