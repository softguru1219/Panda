import React from 'react'
// import PerfectScrollbar from 'react-perfect-scrollbar'

import PropTypes from 'prop-types'
import NavLink from '../../../Elems/NavLink'
import classNames from "classnames"
import logo from "../../../../images/logo.png"
import './style.scss'


export default class MenuSideBar extends React.Component {

  static propTypes = {
    categories: PropTypes.array.isRequired,
    isOpen: PropTypes.bool,
    closeSideBar: PropTypes.func.isRequired,
    exceptDoms: PropTypes.array
  }

  static defaultProps = {
    categories: [],
    isOpen: false
  }

  constructor(props) {
    super(props)
    this.state = {
      selRootCat: undefined,
      selSecCat: undefined,
    }
    // window.addEventListener('click', this.handleClickOutside)
    this.dom = React.createRef()
  }

  componentWillUnMount = () => {
    window.removeEventListener('click', this.handleClickOutside)
  }

  handleClickOutside = (e) => {
    let doms = this.props.exceptDoms
    if (doms && doms.length > 0)
      doms.push(this.dom.current)
    else {
      doms = [this.dom.current]
    }
    for (let dom in doms) {
      let children = doms[dom].getElementsByTagName('*')

      for(let x in children) {
        if(children[x] === e.target) { return }
      }
    }
    this.props.closeSideBar(e)
  }

  back = (nth) => {
    let newState = {}
    if (nth === 0) newState['selRootCat'] = undefined
    else if (nth === 1) newState['selSecCat'] = undefined
    this.setState(newState)
  }

  selectCategory = (cat) => {
    let newState = {}
    if (this.state.selRootCat) {
      newState['selSecCat'] = cat
    }
    else newState['selRootCat'] = cat

    this.setState(newState)
  }

  render() {
    const catSideBarClsNames = classNames({
      'category-sidebar': true,
      'open': this.props.isOpen
    })

    let categories
    let prefixHref

    if (this.state.selSecCat && this.state.selRootCat) {
      categories = this.state.selSecCat.submenu
      prefixHref = `/category/${this.state.selRootCat.id}/${this.state.selSecCat.id}`
    }
    else if (this.state.selRootCat) {
      categories = this.state.selRootCat.submenu
      prefixHref = `/category/${this.state.selRootCat.id}`
    }
    else {
      categories = this.props.categories
      prefixHref = '/category/'
    }

    return (
      <div className={catSideBarClsNames} ref={this.dom}>
        <div className="sidebar-header clearfix">
          <img src={logo} className="menu-brand"/>
          <button className="btn btn-icon btn-close" onClick={this.props.closeSideBar}><i className="fa fa-times"/></button>
        </div>
        <ul className="menu-breadcrumb">
          <li onClick={(e) => this.back(0)}>
            <i className="fa fa-home" />
          </li>
          {
            this.state.selRootCat &&
            <React.Fragment>
              <li> / </li>
              <li onClick={(e) => this.back(1)}>{this.state.selRootCat.title}</li>
            </React.Fragment>
          }
          {
            this.state.selSecCat &&
            <React.Fragment>
              <li> / </li>
              <li onClick={(e) => this.back(2)}>{this.state.selSecCat.title}</li>
            </React.Fragment>
          }
        </ul>
        <div className="category-sidebar-wrapper">
          {
            categories.map((cat, idx) => {
              return <div className="sidebar-item" key={idx}>
                <NavLink href={`${prefixHref}/${cat.id}`} action={this.props.closeSideBar}>{cat.title}</NavLink>
                {
                  cat.submenu && <button className="btn btn-icon" onClick={e => this.selectCategory(cat)}><i className="fa fa-chevron-right" /></button>
                }
              </div>
            })
          }
        </div>
      </div>
    )
  }
}
