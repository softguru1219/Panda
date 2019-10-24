import React from 'react'
import PropTypes from 'prop-types'
import ItemName from '../ItemName'
import NavLink from '../../../Elems/NavLink'


export default class SubMenuItem extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    action: PropTypes.func,
    onMouseOver: PropTypes.func,
    onMouseOut: PropTypes.func,
    href: PropTypes.string
  }

  static defaultProps = {
    href: undefined,
  }

  render() {
    const item = this.props.item
    return (
      <div className="submenu-item" onMouseOver={this.props.onMouseOver} onMouseOut={this.props.onMouseOut}>
        {
          'submenu' in item 
          ? <React.Fragment>
              <ItemName 
                item={item}
                icon='fa fa-chevron-right'
                className="subcat-item"
                action={this.props.action}
                href={this.props.href}
              />
            </React.Fragment>
          : <NavLink href={this.props.href} className='item-name'><i className={`fa ${item.icon} mr-2`} />{item.title}</NavLink>
        }
      </div>
    )
  }
}