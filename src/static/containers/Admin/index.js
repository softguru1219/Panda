import React from 'react'
import {connect} from 'react-redux'
import {isAdmin} from '../../selectors/auth'
import {push} from 'react-router-redux'



class AdminView extends React.Component {

  componentWillMount = () => {
    if (this.props.isAdmin) this.props.push('/admin/dashboard')
  }

  render() {
    return (
      <div/>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAdmin: isAdmin(state)
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    push: (link) => {
      dispatch(push(link))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminView)