import React from 'react'
import {connect} from 'react-redux'

import VerticalTabs from '../../components/Elems/VerticalTabs'
import UserInfo from '../../components/Account/UserInfo'
import AnalysisProductList from '../../components/AnalysisProductList'

import {isAuthenticated} from '../../selectors/auth'

import './style.scss'
import MemeberShip from '../../components/Account/MemeberShip'
import UserStatusSearch from '../../components/Account/UserStatusSearch/index'


class AccountView extends React.Component {
  
  componentWillMount = () => {
    if (!this.props.isAuthenticated) this.props.push('/login?next=/account//')
  }

  render() {
    return (
      <div className='container-fluid py-4 account-page'>
        <VerticalTabs>
          <div label='我的信息' icon='fa fa-user'>
            <UserInfo />
          </div>
          <div label='分析产品' icon='fa fa-industry'>
            <AnalysisProductList />
          </div>
          <div label='搜索状态' icon="fa fa-pie-chart">
            <UserStatusSearch />
          </div>
          <div label='会籍' icon='fa fa-credit-card'>
            <MemeberShip />
          </div>
        </VerticalTabs>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: isAuthenticated(state)
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    push: (link) => {
      dispatch(push(link))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountView)