import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import NavLink from '../../../Elems/NavLink'
import './style.scss'

export default class MenuItem extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired
  }

  render() {
    const item = this.props.item

    const clsName = `index${this.props.index}`

    let classNames = classnames({
      'menu-item col': true,
      [clsName]: true
    })

    return (
      <div className={classNames}>
        <NavLink href={item.path} className='item-name'><i className={`fa ${item.icon} mr-2`} />{item.title}</NavLink>
        <span className="ribbon" />
      </div>
    )
  }
}