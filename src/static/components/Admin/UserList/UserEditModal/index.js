import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import ReactModal from 'react-responsive-modal'
import t from 'tcomb-form'

import {updateUserAPI, updateUser, createUserAPI} from '../../../../actions/admin/user'
import {fetchMembershipSummaryAPI} from '../../../../actions/admin/membership'
import {endLoading, showError, startLoading} from '../../../../actions/common'

const Form = t.form.Form


const Gender = t.enums({
  M: 'Male',
  F: 'Female'
})

const User = t.struct({
  username: t.String,
  phone_number: t.String,
  name: t.String,
  email: t.String,
  password: t.String,
  gender: Gender,
  is_active: t.Boolean,
  is_admin: t.Boolean,
  confirmed_email: t.Boolean,
})

const UserFormOptions = {
  fields: {
    username: {
      attrs: {
        placeholder: 'User Name...',
        autoComplete: "false"
      },
      label: 'User Name'
    },
    name: {
      attrs: {
        placeholder: 'Name...',
      },
      label: 'Name...'
    },
    phone_number: {
      attrs: {
        placeholder: 'Phone Number...',
      },
      label: 'Phone Number'
    },
    password: {
      type: 'password',
      attrs: {
        placeholder: 'Password...',
        autoComplete: "false"
      },
      label: 'Password'
    }
  }
}

class UserEditModal extends React.Component {

  static propTypes = {
    user: PropTypes.object,
    closeModal: PropTypes.func.isRequired,
    isEdit: PropTypes.bool,
    dispatch: PropTypes.func.isRequired
  }

  static defaultProps = {
    isEdit: true,
    user: {
      id: '-1'
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      formValues: props.user ? props.user : {
        username: '',
        name: '',
        password: '',
        email: '',
        phone_number: '',
        is_active: false,
        is_admin: false
      },
      memberships: [],
      member: ""
    }
  }

  componentDidMount = () => {
    this.props.dispatch(startLoading())
    fetchMembershipSummaryAPI()
      .then(res => {
        this.props.dispatch(endLoading())
        this.setState({
          memberships: res.data.results
        })
      })
      .catch(err => showError(this.props.dispatch, err))
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.user ) {
      if (!prevProps.user || (prevProps.user && this.props.user.id !== prevProps.user.id)) {
        this.setState({
          formValues: this.props.user,
          member: this.props.user.member
        })
      }
    }
  }

  onFormChange = (value) => {
    this.setState({formValues: value})
  }

  saveAPI = () => {
    let data = {
      ...this.state.formValues,
      member: this.state.member
    }
    return this.props.isEdit ? updateUserAPI(data) : createUserAPI(data)
  }

  save = (e) => {
    this.props.dispatch(startLoading())
    this.saveAPI()
      .then(res => {
        this.props.dispatch(updateUser(res.data))
        this.props.dispatch(endLoading())
        this.props.closeModal(true)
      })
      .catch(err => showError(this.props.dispatch, err))
  }

  onChangeMembership = (e) => {
    this.setState({
      member: e.target.value
    })
  }

  render() {
    return (
      <ReactModal
        open={this.props.isShowModal}
        onClose={this.props.closeModal}
        center
        showCloseIcon={false}
        classNames={
          {modal: "edit-modal"}
        }
        closeOnEsc={true}>
        <h4>
          {
            this.props.isEdit ? "Edit" : "Create"
          }
        </h4>
        <div className={"form-edit"}>
          <Form
            ref={(ref) => {
              this.loginForm = ref
            }}
            type={User}
            options={UserFormOptions}
            value={this.state.formValues}
            onChange={this.onFormChange}/>

          <div className={"form-group"}>
            <label className={"control-label"}>Membership</label>
            <select className={"form-control"} onChange={this.onChangeMembership} value={this.state.member}>
              <option></option>
              {
                this.state.memberships.map((m, idx) => {
                  return <option value={m.id} key={idx}>{m.name_en}</option>
                })
              }
            </select>
          </div>
          <div className='btn-groups text-right'>
            <button type="button" className="btn btn-default mr-4" onClick={this.save}>
              Save
            </button>
            <button className="btn btn-reset" onClick={e => this.props.closeModal()}>
              Cancel
            </button>
          </div>
        </div>
      </ReactModal>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserEditModal)