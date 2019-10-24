import React from 'react'
import {fetchUserStatusSearchRequest} from '../../../../actions/user_status'
import ReactTable from 'react-table'
import ClassNames from 'classnames'
import './style.scss'


export default class UserStatusDetails extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      count: 0,
      totalPages: -1,
      results: [],
      period: 'month',
      page: 1,
      isShow: false,
      loading: false,
      pageSize: 30
    }
  }

  fetchDetailData = () => {
    this.setState({loading: true})
    fetchUserStatusSearchRequest(this.state.period, this.state.page, this.state.pageSize).then(res => {
      this.setState(res.data)
      this.setState({loading: false})
    })
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.page !== prevState.page || this.state.period !== prevState.period || this.state.pageSize !== prevState.pageSize) {
      this.fetchDetailData()
    }
  }

  componentWillMount = () => {
    this.fetchDetailData()
  }

  changePeriod = (e) => {
    this.setState({
      period: e.target.value
    })
  }

  showDetails = (e) => {
    this.setState({
      isShow: !this.state.isShow
    })
  }

  render() {
    const periodOptions = [
      {
        title: '一天',
        value: 'day'
      },
      {
        title: '月份',
        value: 'month'
      },
      {
        title: '所有',
        value: 'all'
      }
    ]

    const clsNames = ClassNames({
      'hide': !this.state.isShow
    })
    return (
      <div className="user-status-details mt-4">
        <div className="text-center">
          <a className="btn-show-detail" onClick={this.showDetails}>{ this.state.isShow ? '隐藏细节' : '显示详细资料' }</a>
        </div>
        <div className={clsNames}>
          <div className="user-status-search-header py-4">
            <select className="period-select form-control" onChange={this.changePeriod} value={this.state.period}>
              {
                periodOptions.map((p, idx) => {
                  return <option value={p['value']} key={idx}> {p['title']} </option>
                })
              }
            </select>
          </div>
          <div className="user-status-search-body">
            {
              this.state.results &&
              <ReactTable
                data={this.state.results}
                columns={[
                  {
                    Header: "",
                    id: "row",
                    maxWidth: 50,
                    filterable: false,
                    Cell: (row) => {
                      return <div>{row.index + 1}</div>
                    }
                  },
                  {
                    Header: "搜索文本",
                    accessor: "search_key"
                  },

                  {
                    Header: "类别1",
                    accessor: "cat1"
                  },
                  {
                    Header: "类别2",
                    accessor: "cat2"
                  },
                  {
                    Header: "类别3",
                    accessor: "cat3"
                  },
                  {
                    Header: "日期",
                    accessor: "created_at"
                  }
                ]}
                defaultPageSize={10}
                className="-striped -highlight"
                nextText="下一个"
                previousText="上一页"
                noDataText='没有找到数据'
                rowsSelectorText='每页行数'
                pageText='页'
                pageSizeOptions={[10, 20, 30, 60]}
                manual
                loadingText="装载"
                onFetchData = {(state, instance) => {
                  this.setState({
                    page: state.page + 1,
                    pageSize:state.pageSize
                  })
                }}
                loading={this.state.loading}
                pages={this.state.totalPages}
                showPaginationTop
                showPaginationBottom
              />
            }
          </div>
        </div>
      </div>
    )
  }
}