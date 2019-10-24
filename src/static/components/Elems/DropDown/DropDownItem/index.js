import React from 'react'
import PropTypes from 'prop-types'


export default class DropDownItem extends React.Component {
  static propTypes = {
    className: PropTypes.string
  }

  static defaultProps = {
    className: ''
  }

  render () {
    let { children } = this.props
    return (
      <div {...this.props}>
        {children}
      </div>
    )
  }
}
