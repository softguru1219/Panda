import React from 'react'
import {push} from 'react-router-redux'
import UserListComponent from '../../../components/Admin/UserList'


export default class UserList extends React.Component {

  render() {
    return (
      <div className={'user-list-page'}>
        <UserListComponent />
      </div>
    )
  }
}
