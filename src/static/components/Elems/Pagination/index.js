import React from 'react'
import PropTypes from 'prop-types'
import Pagination from "rc-pagination"
import './style.scss'


export default class CustomPagination extends React.Component {

  static propTypes = {
    gotoPage: PropTypes.func.isRequired,
    pagination: PropTypes.shape({
      pageSize: PropTypes.number,
      page: PropTypes.number,
      count: PropTypes.number,
      totalPages: PropTypes.number
    }).isRequired,
  }

  gotoPage = (page) => {
    this.props.gotoPage(page)
  }

  render() {
    return (
      <React.Fragment>
        {
          this.props.pagination.totalPages > 1 &&
          <Pagination
            showQuickJumper
            defaultPageSize={this.props.pagination.pageSize}
            defaultCurrent={this.props.pagination.page}
            total={this.props.pagination.count}
            onChange={(current, pageSize) => this.gotoPage(current)}
            className="custom-pagination"
          />
        }
      </React.Fragment>
    )
  }
}