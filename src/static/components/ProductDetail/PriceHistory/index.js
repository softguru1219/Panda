import React from 'react'
import PropTypes from 'prop-types'
import {LineChart,CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Line} from 'recharts'
import './style.scss'

export default class PriceHistory extends React.Component {

  static propTypes = {
    priceHistory: PropTypes.array.isRequired,
    data: PropTypes.array
  }

  static defaultProps = {
    data: [{
      'dataKey': 'sailing_price',
      'name': '价格',
      'color': '#8884d8'
    }]
  }

  render() {
    return (
      <div className='price-history'>
        <ResponsiveContainer height="80%" width="100%">
          <LineChart data={this.props.priceHistory}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <XAxis dataKey="created_at" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip
              labelFormatter={function(value) {
                return `加入日期: ${value}`
              }}
            />
            {
              this.props.data.map((datum, idx) => {
                return <Line type="monotone" dataKey={datum.dataKey} stroke={datum.color} name={datum.name} key={idx}/>
              })
            }
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
  }
}