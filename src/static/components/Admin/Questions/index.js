import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import ReactTable from 'react-table'
import {push} from 'react-router-redux'
import {confirmAlert} from 'react-confirm-alert'
import ClassNames from 'classnames'

import {fetchQuestionListAPI} from '../../../actions/admin/questions'
import AnswerModal from './AnswerModal'
import {isAdmin} from '../../../selectors/auth'
import {endLoading, showError, startLoading} from '../../../actions/common'
import './style.scss'


class Questions extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAdmin: PropTypes.bool
  }

  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      pageSize: 10,
      searchText: '',
      page: 1,
      sorted: '',
      selectedUsers: {},
      isShowModal: false,
      modalData: undefined,
      results: []
    }
  }

  componentDidMount = () => {
    this._isMounted = true
  }

  fetchQuestions = () => {
    this.props.dispatch(startLoading())
    fetchQuestionListAPI(this.state.page, this.state.searchText, this.state.pageSize, this.state.sorted)
      .then(res => {
        this.props.dispatch(endLoading())
        if (this._isMounted)
          this.setState(res.data)
      })
      .catch(err => showError(this.props.dispatch, err))
  }

  componentWillMount = () => {
    if (!this.props.isAdmin) {
      this.props.dispatch(push('/'))
    }
    this.fetchQuestions()
  }

  checkboxCell = cellInfo => {
    return <input checked={cellInfo.value} type={"checkbox"} readOnly={true}/>
  }

  changeSearchKey = (e) => {
    this.setState({searchText: e.target.value})
  }

  keyPressSearchKey = (e) => {
    if (e.keyCode === 13) {
      this.fetchQuestions()
    }
  }


  handleEditModal = (user) => {
    this.setState({
      modalData: user,
      isShowModal: true
    })
  }

  closeModal = (isUpdated=false) => {
    this.setState({
      isShowModal: false
    })

    if (isUpdated) this.fetchQuestions()
  }

  render() {
    return (
      <div className={"question-list panel"}>
        <div className={"panel-header"}>
          <h4>Questions</h4>
        </div>
        <div className={"panel-body"}>
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
                Header: "Title",
                accessor: "title"
              },
              {
                Header: "Description",
                accessor: "description"
              },
              {
                Header: "Email",
                accessor: "email"
              },
              {
                Header: "Created At",
                accessor: "created_at"
              },
              {
                Header: 'Actions',
                Cell: ({original}) => {
                  let classNames = ClassNames({
                    'fa': true,
                    'fa-mail-reply': original.answer === undefined,
                    'fa-eye': original.answer !== undefined
                  })
                  return <div>
                    <button className={'btn btn-icon btn-default'} onClick={() => this.handleEditModal(original)}>
                      <i className={classNames}/>
                    </button>
                  </div>
                }
              }
            ]}
            defaultPageSize={this.state.pageSize}
            className="-striped -highlight"
            pageSizeOptions={[10, 20, 30, 60]}
            manual
            onFetchData={(state, instance) => {
              this.setState({
                page: state.page + 1,
                pageSize: state.pageSize,
                sorted: state.sorted.length > 0 ? (state.sorted[0].desc ? '' : '-' ) + state.sorted[0].id : ''
              })
            }}
            loading={this.state.loading}
            pages={this.state.totalPages}
            showPaginationTop
            showPaginationBottom
            minRows={0}/>
          <AnswerModal closeModal={this.closeModal} isShowModal={this.state.isShowModal} question={this.state.modalData} />
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
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Questions)