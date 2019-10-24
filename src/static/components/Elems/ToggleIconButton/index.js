import React from 'react'
import PropTypes from 'prop-types'

export default class ToggleIconButton extends React.Component {

  static propTypes = {
    icons: PropTypes.array,
    status: PropTypes.bool.isRequired,
    id: PropTypes.number
  }

  toggle = (e) => {
    if (this.props.status) {
      this.props.action(this.props.parentIds)
    }
    else {
      this.props.action([
        ...this.props.parentIds,
        `${this.props.id}`
      ])
    }
  }

  render() {
    let idx = this.props.status ? 1 : 0
    let classNames = `${this.props.icons[idx]} menu-elem`

    return (
      <button 
        className='btn btn-icon btn-no-border btn-toggle-icon type3 menu-elem'
        onClick={this.toggle} >
        <i className={classNames} />
      </button>
    )
  }
}