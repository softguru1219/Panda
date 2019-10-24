import React from 'react'
import PropTypes from 'prop-types'
import {EditorState, convertToRaw, convertFromRaw} from 'draft-js'

import {Editor} from 'react-draft-wysiwyg'
import classNames from 'classnames'

import NavLink from '../../../components/Elems/NavLink'
const images = require.context('../../../images/users', true)

import './style.scss'


export default class ProductComment extends React.Component {

  static propTypes = {
    prodId: PropTypes.number.isRequired,
    comments: PropTypes.array,
    setLikeComment: PropTypes.func.isRequired,
    setUnLikeComment: PropTypes.func.isRequired,
    addComment: PropTypes.func.isRequired,
    editComment: PropTypes.func.isRequired,
    user: PropTypes.string
  }

  constructor(props) {
    super(props)

    this.state = {
      comment: EditorState.createEmpty(),
      editId: -1,
      editComment: null
    }
  }

  setLikeComment = (id) => {
    this.props.setLikeComment(this.props.prodId, id, this.props.user)
  }

  setUnLikeComment = (id) => {
    this.props.setUnLikeComment(this.props.prodId, id, this.props.user)
  }

  writeComment = (editorState) => {
    this.setState({
      comment: editorState
    })
  }

  clearComment = (e) => {
    this.setState({
      comment: EditorState.createEmpty()
    })
  }

  sendComment = (e) => {
    let content = convertToRaw(this.state.comment.getCurrentContent())
    this.props.addComment(this.props.prodId, JSON.stringify(content), this.props.user)
    this.clearComment()
  }

  setEditComment = (comment) => {
    if (comment.user === this.props.user)
      this.setState({
        editId: comment.id,
        editComment: EditorState.createWithContent(convertFromRaw(JSON.parse(comment.content)))
      })
  }

  updateComment = (comment) => {
    if (comment.id === this.state.editId) {
      this.setState({
        editId: -1
      })
      let content = convertToRaw(this.state.editComment.getCurrentContent())
      this.props.editComment(this.props.prodId, {...comment, content: JSON.stringify(content)}, this.props.user)
    }
  }

  onChangeEditComment = (editorState) => {
    this.setState({
      editComment: editorState
    })
  }

  render() {
    let imgPath
    const comments = this.props.comments
    
    return (
      <div className='product-comments'>
        {
          comments && comments.map((comment, idx) => {
            imgPath = comment.user_info && comment.user_info.avatar_url ? images(`./${comment.user_info.avatar_url}`) : images(`./user1.png`)
            const clsNames = classNames({
              'comment': true,
              'editing': this.state.editId === comment.id
            })
            const editComment = comment.user === this.props.user && comment.id === this.state.editId ? this.state.editComment : EditorState.createWithContent(convertFromRaw(JSON.parse(comment.content)))
            return <div className='comment-line' key={idx}>
              <div className='comment-head row'>
                <div className='col'>
                  <NavLink href={`/user/${comment.user}`} className='text-left'>
                    <img src={imgPath} className='user-avatar'/>
                    <span className='user-name ml-4'>{comment.user_info.title}</span>
                  </NavLink>
                </div>
                <div className='col'>
                  <span className='comment-time d-block text-right'>{comment.created_at}</span>
                </div>
              </div>
              <div className={clsNames}>
                {comment.is_edited && <span className='is-eidted'>(编辑)</span>}
                <Editor
                  editorState={editComment}
                  toolbarOnFocus={comment.user === this.props.user}
                  toolbarHidden={comment.user !== this.props.user || comment.id !== this.state.editId}
                  onFocus={e => this.setEditComment(comment)}
                  onBlur={e => this.updateComment(comment)}
                  localization={{
                    locale: 'zh',
                  }}
                  editorClassName='comment-editor'
                  onEditorStateChange={this.onChangeEditComment} />
              </div>
              
              <div className='actions-views my-2'>
                <button className='btn btn-icon type2 mr-1' onClick={(e)=>this.setLikeComment(comment.id)}>
                  <i className='fa fa-thumbs-up' />
                </button>
                <label className='mr-2 sm'>{comment.like}</label>
                <button className='btn btn-icon type2 mr-1' onClick={(e)=>this.setUnLikeComment(comment.id)}>
                  <i className='fa fa-thumbs-down' />
                </button>
                <label className='sm'>{comment.unlike}</label>
              </div>
            </div>
          })
        }
        <div className='user-comment text-right'>
          <Editor
            editorState={this.state.comment}
            onEditorStateChange={this.writeComment}
            wrapperClassName="new-comment-wrapper"
            editorClassName='new-comment-editor'
            localization={{
              locale: 'zh',
            }} />
          <div className='btn-groups mt-3'>
            <button className='btn btn-default mr-4' onClick={this.sendComment} disabled={!this.state.comment}>发送消息</button>
            <button className='btn btn-reset' onClick={(e) => this.clearComment() }>重置</button>
          </div>
        </div>
      </div>
    )
  }
}