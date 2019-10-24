import React from 'react'
import PropTypes from 'prop-types'
import noRsultImg from '../../../images/no_query_results.png'

import './style.scss'


export default class NoResult extends React.Component {

  static propTypes = {
    text: PropTypes.string
  }

  static defaultProps = {
    text: '没有产品'
  }
  
  render() {
    return (
      <div className='no-result'>
        <img src={noRsultImg} />
        <p className='info'>{this.props.text}</p>
      </div>
    )
  }
}