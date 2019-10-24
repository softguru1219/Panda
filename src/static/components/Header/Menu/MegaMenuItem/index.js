import React from 'react'
import PropTypes from 'prop-types'
import NavLink from '../../../Elems/NavLink'


export default class MegaMenuItem extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    action: PropTypes.func
  }

  static defaultProps = {
    path: undefined
  }

  render() {
    const item = this.props.item


    return (
      <div className="category-item">
        <NavLink href={`/category/${item.id}/`} action={this.props.action}>{item.title}</NavLink>
      </div>
    )
  }
}