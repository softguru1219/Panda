import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import './style.scss'
import {isAdmin} from '../../../selectors/auth'
import {fetchDataStatusAPI} from '../../../actions/product'
import {showError, startLoading, endLoading} from '../../../actions/common'
import PieChartElem from '../../Elems/PieChartElem'


class DataStatus extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAdmin: PropTypes.bool,
  }

  constructor(props) {
    super(props)

    this.state = {
      data: []
    }
  }

  fetchDataAPI = () => {
    startLoading()
    fetchDataStatusAPI().then(res => {
      endLoading()
      if (this._isMounted)
        this.setState({
          data: res.data
        })
    }).catch(err => showError(this.props.dispatch, err))
  }

  componentDidMount = () => {
    this._isMounted = true
  }

  componentWillMount = () => {
    if (!this.props.isAdmin) {
      this.props.dispatch(push('/'))
    }
    this.fetchDataAPI()
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (
      prevState.page !== this.state.page ||
      prevState.pageSize !== this.state.pageSize ||
      prevState.sorted !== this.state.sorted
    ) {
      this.fetchDataAPI()
    }
  }

  render() {
    return (
      <div className={"data-status"}>
        <div className={"row"}>
          {
            Object.keys(this.state.data).map((key, idx) => {
              return <div className={"col-6 "} key={idx}>
                <div className={"panel"}>
                  <div className={"panel-header"}>
                    <h4>{key}</h4>
                  </div>
                  <div className={"panel-body"}>
                    <PieChartElem data={this.state.data[key]}/>
                  </div>
                </div>
              </div>
            })
          }
        </div>
      </div>
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
    dispatch,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataStatus)