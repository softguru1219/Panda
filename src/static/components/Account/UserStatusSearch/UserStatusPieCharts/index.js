import React from 'react'

import {fetchUserStatusPieRequest} from '../../../../actions/user_status'
import PieChartElem from '../../../Elems/PieChartElem'

export default class UserStatusPieCharts extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      activeIndex: 0,
      data: undefined
    }
  }

  componentWillMount = () => {
    let today = new Date()
    fetchUserStatusPieRequest(today.getFullYear(), today.getMonth() + 1).then(res => {
      this.setState({data: res.data})
    })
  }

  render() {
    return (
      <React.Fragment>
        {
          this.state.data &&
          <div className={"pie-user-status"} style={{"height": "300px"}}>
            <PieChartElem data={this.state.data}/>
          </div>
        }
      </React.Fragment>
    )
  }
}