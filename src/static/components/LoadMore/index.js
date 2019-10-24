import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {showLoadMore, selPagination} from '../../selectors/product'

import './style.scss'

class LoadMore extends React.Component {

  static propTypes = {
    loadMore: PropTypes.func.isRequired,
    pagination: PropTypes.object.isRequired
  }

  loadMore = (e) => {
    this.props.loadMore(this.props.pagination.page + 1)
  }

  render() {
    return (
      <React.Fragment>
        {
          this.props.show &&
          <div className='load-more mt-4'>
            <button className='btn btn-default btn-load-more' onClick={this.loadMore}>更多优惠信息</button>
          </div>
        }
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    show: showLoadMore(state),
    pagination: selPagination(state)
  }
}

export default connect(mapStateToProps)(LoadMore)