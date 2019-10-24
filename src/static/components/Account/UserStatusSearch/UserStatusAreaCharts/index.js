import React from 'react'

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'

import {fetchUserStatusAreaRequest} from '../../../../actions/user_status'


export default class UserStatusAreaCharts extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      activeIndex: 0,
      data: undefined
    }

  }

  componentWillMount = () => {
    let today = new Date()
    fetchUserStatusAreaRequest(today.getFullYear()).then(res => {
      this.setState({data: res.data})
    })
  }

  render() {
    return (
      <React.Fragment>
        {
          this.state.data &&
          <ResponsiveContainer height={200} width="100%">
            <AreaChart
              data={this.state.data}
              margin={{
                top: 10, right: 30, left: 0, bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" name="次数"/>
            </AreaChart>
          </ResponsiveContainer>
        }
      </React.Fragment>
    )
  }
}