import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Editor} from 'react-draft-wysiwyg'
import {EditorState, convertToRaw, convertFromRaw} from 'draft-js'
import {isAdmin} from '../../../selectors/auth'
import {fetchPolicyAPI, updatePolicyAPI} from '../../../actions/admin/policy'
import {endLoading, showError, startLoading} from '../../../actions/common'


class Questions extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAdmin: PropTypes.bool
  }

  constructor(props) {
    super(props)

    this.state = {
      editPolicy: null,
      isFetched: false
    }
  }

  componentDidMount = () => {
    this._isMounted = true
  }

  fetchPolicy = () => {
    this.props.dispatch(startLoading())
    fetchPolicyAPI()
      .then(res => {
        this.props.dispatch(endLoading())
        if (this._isMounted && res.data)
          this.setState({
            editPolicy: EditorState.createWithContent(convertFromRaw(JSON.parse(res.data.text))),
            isFetched: true
          })
      })
      .catch(err => showError(this.props.dispatch, err))
  }

  componentWillMount = () => {
    if (!this.props.isAdmin) {
      this.props.dispatch(push('/'))
    }
    this.fetchPolicy()
  }

  onChangeEditPolicy = (editorState) => {
    this.setState({
      editPolicy: editorState,
      isFetched: false
    })
  }

  update = (e) => {
    this.props.dispatch(startLoading())
    const text = convertToRaw(this.state.editPolicy.getCurrentContent())
    updatePolicyAPI({text: JSON.stringify(text)})
      .then(res => {
        this.props.dispatch(endLoading())
      })
      .catch(err => showError(this.props.dispatch, err))
  }

  render() {

    return (
      <div className={"policy panel"}>
        <div className={"panel-header"}>
          <h4>Policy</h4>
        </div>
        <div className={"panel-actions px-4 text-right"}>
          <button className={"btn btn-default"} onClick={this.update} disabled={this.state.isFetched}>Save</button>
        </div>
        <div className={"panel-body"}>
          <Editor
            editorState={this.state.editPolicy}
            localization={{
              locale: 'cn',
            }}
            editorClassName='comment-editor'
            onEditorStateChange={this.onChangeEditPolicy}/>
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