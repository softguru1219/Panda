import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchMemberShipAPI, deleteMemberShipAPI} from '../../../actions/admin/membership'
import ReactTable from 'react-table'
import {push} from 'react-router-redux'
import {isAdmin} from '../../../selectors/auth'
import {endLoading, showError, startLoading} from '../../../actions/common'
import MembershipEditModal from './MembershipEditModal'
import {confirmAlert} from 'react-confirm-alert'
import './style.scss'


class Membership extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAdmin: PropTypes.bool,
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

  fetchMemberShipListAPI = () => {
    this.props.dispatch(startLoading())
    fetchMemberShipAPI(this.state.page, this.state.pageSize, this.state.searchText)
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
    this.fetchMemberShipListAPI()
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (
      prevState.page !== this.state.page ||
      prevState.pageSize !== this.state.pageSize ||
      prevState.sorted !== this.state.sorted
    ) {
      this.fetchMemberShipListAPI()
    }
  }

  changeSearchKey = (e) => {
    this.setState({searchText: e.target.value})
  }

  keyPressSearchKey = (e) => {
    if (e.keyCode === 13) {
      this.fetchMemberShipListAPI()
    }
  }

  addNewMembership = () => {
    this.setState({
      isShowModal: true,
      modalData: undefined
    })
  }

  handleEditModal = (membership) => {
    this.setState({
      isShowModal: true,
      modalData: membership
    })
  }

  closeModal = (isUpdated=false) => {
    this.setState({
      isShowModal: false,
      modalData: undefined
    })

    if (isUpdated) this.fetchMemberShipListAPI()
  }

  handleDelete = (membershipId) => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to delete this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            this.props.dispatch(startLoading())
            deleteMemberShipAPI(membershipId)
              .then(res => {
                this.props.dispatch(endLoading())
                this.fetchMemberShipListAPI()
              })
              .catch(err => {showError(this.props.dispatch, err)})
          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    })
  }

  render() {
    return (
      <div className={"admin-membership"}>
        <div className={"panel"}>
          <div className={"panel-header"}>
            <h4>Membership</h4>
          </div>
          <div className={"panel-actions"}>
            <div className={"row px-2"}>
              <div className={"col-lg-4 col-6"}>
                <input className={"form-control"} value={this.state.searchText} onChange={this.changeSearchKey}
                       onKeyDown={this.keyPressSearchKey} placeholder={'Search...'}/>
              </div>
              <div className={"col-lg-8 col-6 text-right"}>
                <button className={"btn btn-default mr-4"} onClick={this.addNewMembership}>Add New Membership</button>
              </div>
            </div>
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
                  Header: "Chinese Name",
                  accessor: "name"
                },
                {
                  Header: "English Name",
                  accessor: "name_en"
                },
                {
                  Header: "Price",
                  accessor: "price"
                },
                {
                  Header: "Anonymous Requests",
                  accessor: "anonymous_request"
                },
                {
                  Header: "Search Requests",
                  accessor: "search_request"
                },
                {
                  Header: "Analysis Requests",
                  accessor: "analysis_request"
                },
                {
                  Header: "Color",
                  accessor: "color",
                  Cell: ({original}) => {
                    return <div className={"membership-color"} style={{backgroundColor: original.color}} />
                  }
                },
                {
                  Header: "Features",
                  accessor: "features",
                  Cell: ({original}) => {
                    return <ul className={"feature-list"}>
                      {
                        original.features.map((f, idx) => {
                          return <li key={idx}>{f}</li>
                        })
                      }
                    </ul>
                  }
                },
                {
                  Header: 'Actions',
                  Cell: ({original}) => {
                    return <div>
                      <button className={'btn btn-icon btn-default'} onClick={(e) => this.handleEditModal(original)}>
                        <i className={"fa fa-edit"}/>
                      </button>
                      <button className={'btn btn-icon btn-reset'} onClick={(e) => this.handleDelete(original.id)}>
                        <i className={"fa fa-trash-o"}/>
                      </button>
                    </div>
                  }
                }
              ]}
              defaultPageSize={10}
              pageSizeOptions={[10, 20, 30, 60]}
              manual
              onFetchData={(state, instance) => {
                this.setState({
                  page: state.page + 1,
                  pageSize: state.pageSize
                })
              }}
              loading={this.state.loading}
              pages={this.state.totalPages}
              showPaginationTop
              showPaginationBottom
            />
            <MembershipEditModal membership={this.state.modalData} closeModal={this.closeModal}
                                 isShowModal={this.state.isShowModal} isEdit={this.state.modalData !== undefined}/>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Membership)