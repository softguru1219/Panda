import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {gotoPage, setSorts} from '../../actions/product'
import {selSorts, selPagination} from '../../selectors/product'
import {product_sorts} from "../../config/sorts"
import ClassNames from 'classnames'
import './style.scss'

class InlineFilter extends React.Component {

  static propTypes = {
    sorts: PropTypes.object.isRequired,
    setSorts: PropTypes.func.isRequired,
    gotoPage: PropTypes.func.isRequired,
    pagination: PropTypes.object
  }

  setSort = (field) => {
    let sorts = this.props.sorts
    let temp = sorts[field]
    Object.keys(this.props.sorts).map(st => {
      sorts[st] = st !== field ? 0 : (temp + 2) % 3 - 1
    })
    this.props.setSorts(sorts)
  }

  render() {
    let sorts = this.props.sorts
    return (
      <div className='inline-filter clearfix'>
        <ul className='sort'>
          {
            Object.keys(sorts).map((st, idx) => {
              let sort = sorts[st]
              let sortClsName = ClassNames({
                'fa': true,
                'fa-sort-up': sort === 1,
                'fa-sort': sort === 0,
                'fa-sort-down': sort === -1
              })
              let btnClsName = ClassNames({
                'btn btn-no-border btn-icon-text type2 lg': true,
                'active': sort !== 0
              })
              return <li key={idx}>
                <button onClick={(e) => this.setSort(st)} className={btnClsName}>
                  <span>{product_sorts[st]}</span>
                  <i className={sortClsName} />
                </button>
              </li>
            })
          }
          {
            this.props.pagination && this.props.pagination.totalPages > 1 &&
            <li className="pagination-info">
              <button className="btn btn-icon" disabled={this.props.pagination.page === 1} onClick={(e) => {this.props.gotoPage(this.props.pagination.page - 1)}}>
                <i className="fa fa-chevron-left" />
              </button>
              <span className="current">{this.props.pagination.page}</span> / <span className="last">{this.props.pagination.totalPages}</span>
              <button className="btn btn-icon" disabled={this.props.pagination.page === this.props.pagination.totalPages}  onClick={(e) => {this.props.gotoPage(this.props.pagination.page + 1)}}>
                <i className="fa fa-chevron-right" />
              </button>
            </li>
          }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    sorts: selSorts(state),
    pagination: selPagination(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSorts: (sorts) => {
      dispatch(setSorts(sorts))
    },
    gotoPage: (page) => {
      dispatch(gotoPage(page))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InlineFilter)