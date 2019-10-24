import React from 'react'
import './style.scss'
import PropTypes from 'prop-types'
import classnames from 'classnames'

export default class CheckBox extends React.Component {

  static propTypes = {
    checked: PropTypes.bool.isRequired,
    label: PropTypes.string,
    update: PropTypes.func.isRequired,
    opt: PropTypes.string.isRequired
  }

  update = (e) => {
    this.props.update({[this.props.opt]: !this.props.checked})
  }
  
  render() {
    let { label, className} = this.props

    const iconClsNames = classnames({
      'fa fa-check': this.props.checked,
      'fa fa-square-o': !this.props.checked,
    })

    const clsNames = className ? `custom-checkbox ${className}` : 'custom-checkbox'

    return (
      <div className={clsNames} onClick={this.update}>
        <i className={iconClsNames} />
        {
          label && <span className='checkbox-label ml-4'>{this.props.label}</span>
        }
      </div>
    )
  }
}