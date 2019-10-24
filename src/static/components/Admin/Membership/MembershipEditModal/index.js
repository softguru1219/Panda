import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import ReactModal from 'react-responsive-modal'
import t from 'tcomb-form'
import {SketchPicker} from 'react-color'

import {addMemberShipAPI, updateMemberShipAPI} from '../../../../actions/admin/membership'
import {endLoading, showError, startLoading} from '../../../../actions/common'

import './style.scss'

const Form = t.form.Form

const Membership = t.struct({
  name: t.String,
  name_en: t.String,
  price: t.Number,
  anonymous_request: t.Number,
  search_request: t.Number,
  analysis_request: t.Number
})

const MembershipFormOptions = {
  fields: {
    name: {
      attrs: {
        placeholder: 'Chinese Name...',
        autoComplete: "false"
      },
      label: 'Chinese Name'
    },
    name_en: {
      attrs: {
        placeholder: 'English Name...',
      },
      label: 'English Name...'
    },
    anonymous_request: {
      label: 'Anonymous Request'
    },
    search_request: {
      label: 'Search Request'
    },
    analysis_request: {
      label: 'Analysis Request'
    }
  }
}

class MembershipEditModal extends React.Component {

  static propTypes = {
    membership: PropTypes.object,
    closeModal: PropTypes.func.isRequired,
    isEdit: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    isShowModal: PropTypes.bool,
  }

  static defaultProps = {
    isEdit: true,
    membership: {
      id: '-1'
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      formValues: {},
      features: [],
      color: '',
      isShowColorPicker: false
    }
    this.colorPickerDom = React.createRef()

  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.membership) {
      if (!prevProps.membership || (prevProps.membership && this.props.membership.id !== prevProps.membership.id))
        this.setState({
          formValues: this.props.membership,
          features: this.props.membership.features && this.props.membership.features.length !== 0 ? this.props.membership.features : [],
          color: this.props.membership.color
        })
    }
  }

  componentDidMount() {
    window.addEventListener('click', this.handleClickOutside)
  }

  componentWillUnMount = () => {
    window.removeEventListener('click', this.handleClickOutside)
  }

  handleClickOutside = (e) => {
    if (this.colorPickerDom.current === e.target || !this.colorPickerDom.current) return
    let children = this.colorPickerDom.current.getElementsByTagName('*')


    for (let x in children) {
      if (children[x] === e.target) {
        return
      }
    }

    this.closeColorPicker()
  }

  onFormChange = (value) => {
    this.setState({formValues: value})
  }

  saveAPI = () => {
    let data = {
      ...this.state.formValues,
      features: this.state.features,
      color: this.state.color
    }
    return this.props.isEdit ? updateMemberShipAPI(data) : addMemberShipAPI(data)
  }

  save = (e) => {
    this.props.dispatch(startLoading())
    this.saveAPI()
      .then(res => {
        this.props.dispatch(endLoading())
        this.props.closeModal(true)
      })
      .catch(err => showError(this.props.dispatch, err))
  }

  changeFeature = (idx, t) => {
    this.setState({
      features: this.state.features.map((f, i) => {
        if (i === idx) {
          return t
        }
        return f
      })
    })
  }

  addNewFeature = (e) => {
    this.setState({
      features: this.state.features && this.state.features.length !== 0 ? [
        ...this.state.features,
        ''
      ] : ['']
    })
  }

  handleChangeComplete = (color) => {
    this.setState({color: color.hex, isShowColorPicker: false})
  }

  showColorPicker = (e) => {
    this.setState({
      isShowColorPicker: true
    })
  }

  closeColorPicker = (e) => {
    this.setState({
      isShowColorPicker: false
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
          {modal: "edit-modal membership-edit-modal"}
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
            type={Membership}
            options={MembershipFormOptions}
            value={this.state.formValues}
            onChange={this.onFormChange}/>

          <div className={"form-group"}>
            <div className={"btn-color-picker"} style={{backgroundColor: this.state.color}}
                 onClick={this.showColorPicker} ref={this.colorPickerDom}>
              {
                this.state.isShowColorPicker &&
                <div className={"color-picker"}>
                  <SketchPicker color={this.state.color} onChangeComplete={this.handleChangeComplete}/>
                </div>
              }
            </div>
          </div>
          <label className={"control-label"}>Features</label>

          <div className={"splitter"}/>

          <div className={"form-group"}>
            <div className={"btn-groups text-right"}>
              <button type="button" className="btn btn-default sm mr-4" onClick={this.addNewFeature}>
                Add New Feature
              </button>
            </div>
            {
              this.state.features && this.state.features.length !== 0 &&
              <React.Fragment>
                {
                  this.state.features.map((feature, idx) => {
                    return <input key={idx} className={"form-control mt-3"} value={feature}
                                  onChange={(e) => this.changeFeature(idx, e.target.value)}/>
                  })
                }
              </React.Fragment>
            }
          </div>

          <div className={"splitter"}/>

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

export default connect(mapStateToProps, mapDispatchToProps)(MembershipEditModal)