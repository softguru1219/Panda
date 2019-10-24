import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {RiseLoader} from 'react-spinners'
import classNames from 'classnames'
import logo from '../../../images/logo.png'
import {isLoadingSpinner} from '../../../selectors/common'
import './style.scss'

class Spinner extends React.Component {

  static propTypes = {
    loading: PropTypes.bool
  }

  static defaultProps = {
    loading: false
  }

  render() {
    const clsNames = classNames({
      'sweet-loading vertical-align': true,
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

const mapStateToProps = (state) => {
  return {
      loading: isLoadingSpinner(state)
  }
}

export default connect(mapStateToProps)(Spinner)