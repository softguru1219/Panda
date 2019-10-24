import React from 'react'
import PropTypes from 'prop-types'
import {RiseLoader} from 'react-spinners'
import classNames from 'classnames'
import logo from '../../../images/logo.png'
import './style.scss'

export default class MovToTop extends React.Component {

  static propTypes = {
    loading: PropTypes.bool
  }

  static defaultProps = {
    loading: false
  }

  render() {
    const clsNames = classNames({
      'show': this.props.loading
    })
    return (
      <div className={clsNames}>
        <div>
          <img src={logo} className='spinner-logo'/>
          <RiseLoader
            sizeUnit='px'
            size={20}
            color={'#fe5c22'}
            loading={this.props.loading} />
        </div>
      </div>
    )
  }
}