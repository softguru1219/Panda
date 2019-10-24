import React from 'react'
import {push} from 'react-router-redux'
import PolicyComponent from '../../../components/Admin/Policy'


export default class Policy extends React.Component {

  render() {
    return (
      <div className={'membership-page'}>
        <PolicyComponent />
      </div>
    )
  }
}
