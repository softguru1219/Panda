import React from 'react'
import PropTypes from 'prop-types'
import menuItems from '../../../config/menu'
import MenuItem from './MenuItem'
import MenuCategory from './MenuCategory'
import ClassNames from 'classnames'
import './style.scss'


export default class Menu extends React.Component {
  static propTypes = {
    path: PropTypes.string,
    fixed: PropTypes.bool
  }

  static defaultProps = {
    path: undefined,
    fixed: false
  }

  constructor(props) {
    super(props)
  }

  render() {

    const menuClassNames = ClassNames({
      "fixed": this.props.fixed,
      "menu": true
    })

    return (
      <div className={menuClassNames}>
        <div className="special-menu">
          <div className='container-fluid'>
            <div className="menu-list-wrapper text-center">
              <div className='menu-list row'>
                {
                  menuItems.map((item, idx) => {
                    return <MenuItem item={item} key={idx} index={idx + 1}/>
                  })
                }
              </div>
            </div>
          </div>
        </div>
        <MenuCategory/>
      </div>

    )
  }
}