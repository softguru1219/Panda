import React from 'react'
import './style.scss'
import UserStatusPieCharts from './UserStatusPieCharts'
import UserStatusAreaCharts from './UserStatusAreaCharts/index'
import UserStatusDetails from './UserStatusDetails/index'


export default class UserStatusSearch extends React.Component {


  render() {

    return (
      <div className="user-status-search">
        <div className="user-status-summary clearfix">
          <div className="col-md-6 col-lg-5">
            <UserStatusPieCharts/>
          </div>
          <div className="col-md-6 col-lg-7">
            <UserStatusAreaCharts/>
          </div>
        </div>
        <UserStatusDetails/>
      </div>
    )
  }
}