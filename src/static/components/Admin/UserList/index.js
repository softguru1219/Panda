import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchUserListAPI, deleteUserAPI, createUserAPI} from '../../../actions/admin/user'
import ReactTable from 'react-table'
import withFixedColumns from 'react-table-hoc-fixed-columns'
import {push} from 'react-router-redux'
import {confirmAlert} from 'react-confirm-alert'

import UserEditModal from './UserEditModal'
import './style.scss'
import {isAdmin} from '../../../selectors/auth'
import {endLoading, showError, startLoading} from '../../../actions/common'

const ReactTableFixedColumns = withFixedColumns(ReactTable)


class UserList extends React.Component {

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

  fetchUserList = () => {
    this.props.dispatch(startLoading())
    fetchUserListAPI(this.state.page, this.state.searchText, this.state.pageSize, this.state.sorted)
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
    this.fetchUserList()
  }

  checkboxCell = cellInfo => {
    return <input checked={cellInfo.value} type={"checkbox"} readOnly={true}/>
  }

  changeSearchKey = (e) => {
    this.setState({searchText: e.target.value})
  }

  keyPressSearchKey = (e) => {
    if (e.keyCode === 13) {
      this.fetchUserListAPI()
    }
  }

  addNewUser = () => {
    this.setState({
      modalData: undefined,
      isShowModal: true,
    })
  }

  handleEditModal = (user) => {
    this.setState({
      modalData: user,
      isShowModal: true
    })
  }

  handleDelete = (userId) => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to delete this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            this.props.dispatch(startLoading())
            deleteUserAPI(userId)
              .then(res => {
                this.props.dispatch(endLoading())
                this.fetchUserList()
              })
              .catch(err => showError(this.props.dispatch, err))
          }
        },
        {
          label: 'No',
          onClick: () => {
          }
        }
      ]
    })
  }

  closeModal = (isUpdated=false) => {
    this.setState({
      isShowModal: false
    })

    if (isUpdated) this.fetchUserList()
  }

  render() {
    return (
      <div className={"user-list panel"}>
        <div className={"panel-header"}>
          <h4>Users</h4>
        </div>
        <div className={"panel-actions"}>
          <div className={"row px-2"}>
            <div className={"col-lg-4 col-6"}>
              <input className={"form-control"} value={this.state.searchText} onChange={this.changeSearchKey}
                     onKeyDown={this.keyPressSearchKey} placeholder={'Search...'}/>
            </div>
            <div className={"col-lg-8 col-6 text-right"}>
              <button className={"btn btn-default mr-4"} onClick={this.addNewUser}>Add New User</button>
            </div>
          </div>
        </div>
        <div className={"panel-body"}>
          <ReactTableFixedColumns
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
                Header: "UserName",
                accessor: "username"
              },
              {
                Header: "Name",
                accessor: "name"
              },
              {
                Header: "Email",
                accessor: "email"
              },
              {
                Header: "Phone Number",
                accessor: "phone_number",
                sortable: false
              },
              {
                Header: "Admin",
                accessor: "is_superuser",
                Cell: this.checkboxCell
              },
              {
                Header: "Membership",
                accessor: 'membership'
              },
              {
                Header: "Active",
                accessor: "is_active",
                Cell: this.checkboxCell
              },
              {
                Header: "Last Login",
                accessor: "last_login"
              },
              {
                Header: "Created At",
                accessor: "date_joined"
              },
              {
                Header: 'Actions',
                Cell: ({original}) => {
                  return <div>
                    <button className={'btn btn-icon btn-default'} onClick={() => this.handleEditModal(original)}>
                      <i className={"fa fa-edit"}/>
                    </button>
                    <button className={'btn btn-icon btn-reset'} onClick={() => this.handleDelete(original.id)}>
                      <i className={"fa fa-trash-o"}/>
                    </button>
                  </div>
                },
                fixed: 'right'
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
          <UserEditModal closeModal={this.closeModal} isShowModal={this.state.isShowModal} user={this.state.modalData}
                         isEdit={this.state.modalData !== undefined}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserList)