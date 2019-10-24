import React from 'react'
import PropTypes from 'prop-types'
import ReactReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './style.scss'

export default class DropDown extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    forceCloseFunction: PropTypes.func.isRequired,
    toggle: PropTypes.node.isRequired,
    direction: PropTypes.oneOf(['center', 'right', 'left']),
    className: PropTypes.string,
    exceptDoms: PropTypes.array
  }
  static defaultProps = {
    direction: 'center',
    className: ''
  }

  constructor (props) {
    super(props)
    this.dom = React.createRef()
  }

  componentDidUpdate (prevProps, prevState) {
    if(this.props.isOpen && !prevProps.isOpen) {
      window.addEventListener('click', this.handleClickOutside)
    } else if(!this.props.isOpen && prevProps.isOpen) {
      window.removeEventListener('click', this.handleClickOutside)
    }   
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
    this.props.forceCloseFunction(e)
  }

  // handleKeyDown = (e) => {
  //   let key = e.which || e.keyCode
  //   if(key !== 9) { // tab
  //     return
  //   }
  //
  //   let items = this.dom.current.querySelectorAll('button,a')
  //   let id = e.shiftKey ? 1 : items.length - 1
  //   if(e.target === items[id]) {
  //     this.props.forceCloseFunction(e)
  //   }
  // }
  
  render () {
      let items = this.props.isOpen ? this.props.children : null
      
      return (
        <div className={'dd-menu' + (this.props.className ? ' ' + this.props.className : '')} ref={this.dom}>
          {this.props.toggle}
          <ReactReactCSSTransitionGroup transitionName={'grow-from-' + this.props.direction}
                                        className="dd-menu-items"
                                        transitionAppearTimeout={300}
                                        transitionLeaveTimeout={300}
                                        transitionEnterTimeout={300}
                                        transitionAppear={true}>
            {items}
          </ReactReactCSSTransitionGroup>
        </div>
      )
    }
}
