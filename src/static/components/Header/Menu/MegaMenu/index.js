import React from 'react'
import PropTypes from 'prop-types'
import PerfectScrollbar from 'react-perfect-scrollbar'
import classNames from 'classnames'
import NavLink from '../../../Elems/NavLink'

import './style.scss'

export default class MegaMenu extends React.Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    action: PropTypes.func,
    isOpen: PropTypes.bool,
    href: PropTypes.string,
  }

  static defaultProps = {
    isOpen: false,
    href: '/category'
  }

  click = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  render() {
    const clsNames = classNames({
      'megamenu': true,
      'hide': !this.props.isOpen
    })

    return (
      <div className={clsNames} onClick={this.click}>
        <div className="megamenu-list">
          <PerfectScrollbar>
          {
            this.props.items.map((item, idx) => {
              return (
                <NavLink href={`${this.props.href}/${item.id}/`} action={this.props.action} key={idx} className="megamenu-item">{item.title}</NavLink>
              )
            })
          }
          </PerfectScrollbar>
        </div>
      </div>
    )
  }
}