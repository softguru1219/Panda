import React from 'react'
import {push} from 'react-router-redux'
import MembershipComponent from '../../../components/Admin/Membership'


export default class Membership extends React.Component {

  render() {
    return (
      <div className={'membership-page'}>
        <MembershipComponent />
      </div>
    )
  }
}
