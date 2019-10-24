import React from 'react'
import PropTypes from 'prop-types'
import PerfectScrollbar from 'react-perfect-scrollbar'
import SubMenuItem from '../SubMenuItem'
import MegaMenu from "../MegaMenu"
import ClassNames from "classnames"
import './style.scss'


export default class SubMenu extends React.Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    path: PropTypes.string,
    action: PropTypes.func.isRequired,
    onMouseOver: PropTypes.func,
    onMouseOut:PropTypes.func,
    prefixHref: PropTypes.string,
  }

  static defaultProps = {
    path: undefined,
    prefixHref: '/category'
  }

  constructor(props) {
    super(props)
    this.state = {
      openChild: false,
      selectedCat: undefined,
      onSubCatWrapper: false
    }
    this.timer = undefined
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.selectedCat && this.state.selectedCat) {
      this.props.onMouseOver()
    }
    else if (prevState.selectedCat && !this.state.selectedCat) {
      this.props.onMouseOut()
    }
  }

  menuItemMouseOver = (cat) => {
    if (this.timer) {
      clearTimeout(this.timer)
    }
    this.setState({
      openChild: true,
      selectedCat: cat
    })
  }

  menuItemMouseOut = () => {
    this.timer = setTimeout(() => {
      let newState = {
        showChild: this.state.onSubCatWrapper,
      }
      if (!newState['showChild']) newState['selectedCat'] = undefined
      this.setState(newState)
    }, 100)
  }

  megaWrapMouseOver = () => {
    this.setState({
      onSubCatWrapper: true,
      showChild: true
    })
  }

  megaWrapMouseOut = () => {
    this.setState({
      onSubCatWrapper: false
    })
  }

  render() {
    const childClsNames = ClassNames({
      "megamenu-wrapper": true,
      "hide": !this.state.openChild
    })
    return (
      <div className="submenu">
        <div className="submenu-wrapper">
          <PerfectScrollbar option={{
            suppressScrollX: true
          }}>
          {
            this.props.items.map((item, idx) => {
              return (
                <SubMenuItem
                  item={item}
                  key={idx}
                  action={this.props.action}
                  onMouseOver={(e) => this.menuItemMouseOver(item)}
                  onMouseOut={(e) => this.menuItemMouseOut()}
                  href={`${this.props.prefixHref}/${item.id}`}
                />
              )
            })
          }
          </PerfectScrollbar>
          <div className={childClsNames} onMouseOver={this.megaWrapMouseOver} onMouseOut={this.megaWrapMouseOut}>
            {
              this.state.selectedCat &&
              <MegaMenu items={this.state.selectedCat.submenu} isOpen={this.state.openChild} action={this.props.action} href={`${this.props.prefixHref}/${this.state.selectedCat.id}`}/>
            }
          </div>
        </div>
      </div>
    )
  }
}