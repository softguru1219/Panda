import React from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'

import {fetchCategories} from '../../../../actions/category'
import {selCategories} from '../../../../selectors/category'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import NavLink from '../../../Elems/NavLink'
import DropDown from "../../../Elems/DropDown"
import DropDownItem from "../../../Elems/DropDown/DropDownItem"
import ItemName from "../ItemName"
import {authLogoutAndRedirect} from '../../../../actions/auth'

import {
  isBrowser,
  isMobile
} from "react-device-detect"

import SubMenu from "../SubMenu"
import classNames from "classnames"
import Search from "../../Search"
import './style.scss'
import MenuSideBar from "../MenuSideBar/index"
import {isAuthenticated} from "../../../../selectors/auth"


class MenuCategory extends React.Component {

  static propTypes = {
    categories: PropTypes.array,
    path: PropTypes.string,
    fetchCategories: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  }

  static defaultProps = {
    categories: [],
    path: undefined
  }

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      showChild: false,
      selectedCat: undefined,
      onSubCatWrapper: false,
      isOpenSideBar: false
    }
    this.subCatWrapperDom = React.createRef()
    this.timer = undefined
    this.sidebarBtnDom = React.createRef()
  }

  componentWillMount() {
    this.props.fetchCategories()
  }

  getToggleElem = () => {
    return (
      <div className={'tab' + (this.state.open ? ' active' : '')}>
        <button type="button" onClick={this.openDropDown}>
          <i className="fa fa-list"/>
        </button>
      </div>
    )
  }

  openDropDown = () => {
    let newState = {
      open: !this.state.open
    }
    if (this.state.open) {
      newState['selectedCat'] = undefined
      newState['showChild'] = false
    }
    this.setState(newState)
  }

  closeDropDown = () => {
    this.setState({
      open: false,
      selectedCat: undefined,
      showChild: false
    })
  }

  dropItemMouseOver = (cat) => {
    if (this.timer) {
      clearTimeout(this.timer)
    }
    this.setState({
      showChild: true,
      selectedCat: cat
    })
  }

  dropItemMouseOut = (e) => {
    this.timer = setTimeout(() => {
      let newState = {
        showChild: this.state.onSubCatWrapper
      }
      if (!newState['showChild']) newState['selectedCat'] = undefined
      this.setState(newState)
    }, 100)
  }

  subCatWrapMouseOver = () => {
    this.setState({
      onSubCatWrapper: true,
      showChild: true
    })
  }

  subCatWrapMouseOut = () => {
    this.setState({
      onSubCatWrapper: false
    })
  }

  openSideBar = (e) => {
    this.setState({
      isOpenSideBar: true
    })
  }

  closeSideBar = (e) => {
    this.setState({
      isOpenSideBar: false
    })
  }

  render() {
    const subCatWrapperClsNames = classNames({
      'subcat-wrapper': true,
      'hide': !this.state.showChild
    })

    return (
      <div className="category-menu">
        <div className="container-fluid">
          {
            isBrowser &&
            <React.Fragment>
              <div className={subCatWrapperClsNames} ref={this.subCatWrapperDom}>
                {
                  this.state.selectedCat &&
                  <SubMenu items={this.state.selectedCat.submenu} action={this.openDropDown}
                           onMouseOver={this.subCatWrapMouseOver} onMouseOut={this.subCatWrapMouseOut}
                           prefixHref={`/category/${this.state.selectedCat.id}`}/>
                }
              </div>
              <div className="category-dropdown">
                <DropDown isOpen={this.state.open} forceCloseFunction={this.closeDropDown} toggle={this.getToggleElem()}
                          className='dd-menu-left' exceptDoms={[this.subCatWrapperDom.current]}>
                  <div>
                    {
                      this.props.categories.map((cat, idx) => {
                        let dropItemClsNames = classNames({
                          'cat-item': true,
                          'hover': this.state.selectedCat && this.state.selectedCat.id === cat.id
                        })
                        return <DropDownItem key={idx} onClick={this.openDropDown}
                                             onMouseOver={(e) => this.dropItemMouseOver(cat)}
                                             onMouseOut={this.dropItemMouseOut}>
                          <ItemName
                            item={cat}
                            icon='fa fa-chevron-right'
                            className={dropItemClsNames}
                            action={this.props.action}
                          />
                        </DropDownItem>
                      })
                    }
                  </div>
                </DropDown>
              </div>
            </React.Fragment>
          }
          {
            isMobile
            && <React.Fragment>
              <button className="btn btn-icon btn-open-sidebar" onClick={this.openSideBar} ref={this.sidebarBtnDom}><i
                className="fa fa-list"/></button>
              <MenuSideBar categories={this.props.categories} closeSideBar={this.closeSideBar}
                           isOpen={this.state.isOpenSideBar} exceptDoms={[this.sidebarBtnDom.current]}/>
            </React.Fragment>
          }
          <div className="category-list">
            {
              isBrowser &&
              <PerfectScrollbar>
                <ul>
                  {
                    this.props.categories.map((cat, idx) => {
                      return <li key={idx}>
                        <NavLink href={`/category/${cat.id}`} className="cat-item"> {cat.title}</NavLink>
                      </li>
                    })
                  }
                </ul>
              </PerfectScrollbar>
            }
            {
              isMobile &&
              <Search/>
            }
          </div>
          {
            isMobile &&
              <React.Fragment>
                {
                  this.props.isAuthenticated
                    ? <span className="menu-login btn btn-icon span-link" onClick={(e) => this.props.authLogout()}><i className="fa fa-sign-out"/></span>
                    : <NavLink href="/login" className="menu-login btn btn-icon"><i className="fa fa-sign-in"/></NavLink>
                }
              </React.Fragment>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    categories: selCategories(state),
    path: state.routing.location ? state.routing.location.path : undefined,
    isAuthenticated: isAuthenticated(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCategories: () => {
      dispatch(fetchCategories())
    },
    authLogout: () => {
      dispatch(authLogoutAndRedirect())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuCategory)