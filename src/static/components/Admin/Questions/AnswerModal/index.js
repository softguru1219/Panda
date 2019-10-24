import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import ReactModal from 'react-responsive-modal'
import t from 'tcomb-form'
import './style.scss'
import {updateAnswerAPI, updateAnswer, createAnswerAPI} from '../../../../actions/admin/questions'
import {endLoading, showError, startLoading} from '../../../../actions/common'

const Form = t.form.Form

const Answer = t.struct({
  description: t.String,
})

const AnswerFormOptions = {
  fields: {
    description: {
      type: 'textarea',
      attrs: {
        placeholder: 'Answer ...'
      },
      label: 'Answer'
    }
  }
}

class AnswerModal extends React.Component {

  static propTypes = {
    question: PropTypes.object.isRequired,
    closeModal: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  static defaultProps = {
    question: {
      id: '-1'
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      formValues: props.question ? props.question : {
        'description': '',
      },
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.question.id !== prevProps.question.id) {
      this.setState({
        formValues: this.props.question.answer ? this.props.question.answer : {},
      })
    }
  }

  onFormChange = (value) => {
    this.setState({formValues: value})
  }

  save = (e) => {
    this.props.dispatch(startLoading())
    createAnswerAPI(
      {
        ...this.state.formValues,
        question: this.props.question.id
      })
      .then(res => {
        this.props.dispatch(updateAnswer(res.data))
        this.props.dispatch(endLoading())
        this.props.closeModal(true)
      })
      .catch(err => showError(this.props.dispatch, err))
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
            this.props.question.answer ? "View" : "Reply"
          }
        </h4>
        <div className={"form-edit"}>
          <div className={"form-group"}>
            <label className={"control-label"}>Questions:</label>
            <p>{this.props.question.description}</p>
          </div>
          <Form
            ref={(ref) => {
              this.loginForm = ref
            }}
            type={Answer}
            options={AnswerFormOptions}
            value={this.state.formValues}
            onChange={this.onFormChange}/>
          <div className='btn-groups text-right'>
            {
              !this.props.question.answer
                ? <React.Fragment>
                  <button type="button" className="btn btn-default mr-4" onClick={this.save}>
                    Save
                  </button>
                  <button className="btn btn-reset" onClick={e => this.props.closeModal()}>
                    Cancel
                  </button>
                </React.Fragment>
                : <button className="btn btn-default" onClick={e => this.props.closeModal()}>
                  OK
                </button>
            }

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

export default connect(mapStateToProps, mapDispatchToProps)(AnswerModal)