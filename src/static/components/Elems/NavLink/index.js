import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import classNames from 'classnames'
import './style.scss'


class NavLink extends React.Component {

  static propTypes = {
    push: PropTypes.func.isRequired,
    action: PropTypes.func,
    href: PropTypes.string
  }

  click = (e) => {
    if (this.props.action) {
      this.props.action()
    }
    this.props.push(this.props.href)
  }

  render() {
    const {
      props: {
        children,
        className
      }
    } = this

    let clsNames = classNames({
      'span-link': true,
      [className]: className ? true : false
    })
    
    return (
      <span onClick={this.click} className={clsNames}>
        {children}
      </span>
    )
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => {
  return {
    push: (link) => {
      if (link) dispatch(push(link))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavLink)