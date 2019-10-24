import React from 'react'
import PropTypes from 'prop-types'
import NavLink from '../../../Elems/NavLink'


export default class ItemName extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    icon: PropTypes.string,
    className: PropTypes.string,
    action: PropTypes.func
  }

  static defaultProps = {
    href: undefined,
    icon: undefined,
  }

  render() {
    const item = this.props.item

    return (
      <span className={this.props.className}>
        <NavLink href={this.props.href ? this.props.href : `/category/${item.id}`} action={this.props.action}>
          {item.title}
        </NavLink>
        { this.props.icon && <i className={this.props.icon} /> }
      </span>
    )
  }
}