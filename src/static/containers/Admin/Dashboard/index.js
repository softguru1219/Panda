import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {isAdmin} from '../../../selectors/auth'
import {push} from 'react-router-redux'
import {authLogoutAndRedirect} from '../../../actions/auth'
import {fetchNewUsersStatus} from '../../../actions/admin/user'
import {LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Line, Tooltip} from 'recharts'
import {showError} from '../../../actions/common'
import './style.scss'
import {fetchDataStatusAPI} from '../../../actions/product'
import PieChartElem from '../../../components/Elems/PieChartElem/index'


class Dashboard extends React.Component {

  static propTypes = {
    isAdmin: PropTypes.bool,
    showError: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      newUsersStatus: [],
      period: 7,
      scrapingData: []
    }
  }

  componentDidMount() {
    this._isMounted = true
  }

  componentWillMount() {
    if (!this.props.isAdmin) {
      this.props.dispatch(push('/'))
    }
    this.fetchUserStatusData()
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.period !== prevState.period) {
      this.fetchUserStatusData()
    }
  }

  fetchUserStatusData = () => {
    fetchNewUsersStatus(this.state.period)
      .then(res => {
        if (this._isMounted)
          this.setState({
            newUsersStatus: res.data
          })
      })
      .catch(err => this.props.showError(err))

    fetchDataStatusAPI('all')
      .then(res => {
        if (this._isMounted)
          this.setState({
            scrapingData: res.data
          })
      })
      .catch(err => this.props.showError(err))
  }

  changePeriod = (e) => {
    this.setState({
      period: e.target.value
    })
  }

  render() {
    return (
      <div className={'dashboard-page'}>
        <div className={"row"}>
          <div className={"col-md-6"}>
            <div className={"new-users-status panel"}>
              <div className={"new-users-status-header panel-header"}>
                <h4>New Users Chart</h4>
              </div>
              <div className={"panel-actions"}>
                <div className={"row px-2"}>
                  <div className={"col-6"}>
                    <select className={"form-control"} value={this.state.period} onChange={this.changePeriod}>
                      <option value="7">Last 7days</option>
                      <option value="30">Last 30days</option>
                    </select>
                  </div>
                  <div className={"col-6"}>
                    <input type="text" className="form-control" placeholder="Set Period" onChange={this.changePeriod}
                           value={this.state.period}/>
                  </div>
                </div>
              </div>
              <div className={"panel-body"}>
                {
                  this.state.newUsersStatus.length > 0 &&
                  <ResponsiveContainer height="80%" width="100%">
                    <LineChart data={this.state.newUsersStatus}>
                      <Tooltip/>
                      <XAxis dataKey="name"/>
                      <YAxis/>
                      <CartesianGrid strokeDasharray="3 3"/>
                      <Line type="monotone" dataKey="value" stroke="#8884d8" name={"User Count"}/>
                    </LineChart>
                  </ResponsiveContainer>
                }
              </div>
            </div>
          </div>
          <div className={"col-md-6"}>
            <div className={"panel"}>
              <div className={"panel-header"}>
                <h4>Data Status</h4>
              </div>
              <div className={"panel-body"} style={{height: "300px"}}>
                <PieChartElem data={this.state.scrapingData}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAdmin: isAdmin(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showError: (err) => {
      if (err.response.status === 401)
        dispatch(authLogoutAndRedirect())
      showError(dispatch, err)
    },
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)