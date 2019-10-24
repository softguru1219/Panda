import {
  SET_LIKE_PRODUCT_COMMENT,
  SET_UNLIKE_PRODUCT_COMMENT,
  SET_LIKE_BLOG_COMMENT,
  SET_UNLIKE_BLOG_COMMENT,
  ADD_COMMENT_BLOG,
  EDIT_COMMENT_BLOG,

  ADD_COMMENT_PRODUCT,
  EDIT_COMMENT_PRODUCT

} from '../constants'

import axios from '../config/api'

import {showError} from './common'


export const likeComment = (id, commentId, type) => {
  console.log(id, commentId, type)
  return {
    type: type === 'product' ? SET_LIKE_PRODUCT_COMMENT : SET_LIKE_BLOG_COMMENT,
    id: id,
    commentId: commentId,
  }
}


export const setLikeComment = (id, commentId, type = 'product', user) => (dispatch) => {
  axios().post(`like-${type}-comment/`, {comment: commentId, user: user})
    .then(res => {
      dispatch(likeComment(id, commentId, type))
    }).catch(err => {
    showError(dispatch, err)
  })
}

export const unlikeComment = (id, commentId, type) => {
  return {
    type: type === 'product' ? SET_UNLIKE_PRODUCT_COMMENT : SET_UNLIKE_BLOG_COMMENT,
    id: id,
    commentId: commentId,
  }
}

export const setUnLikeComment = (id, commentId, type = 'product', user) => (dispatch) => {
  axios().post(`unlike-${type}-comment/`, {comment: commentId, user: user})
    .then(res => {
      dispatch(unlikeComment(id, commentId, type))
    })
    .catch(err => {
      showError(dispatch, err)
    })
}


export const comment = (id, comment, type) => {
  return {
    type: type == 'product' ? ADD_COMMENT_PRODUCT : ADD_COMMENT_BLOG,
    comment: comment,
    id: id
  }
}

export const addComment = (id, text, type, user) => (dispatch) => {
  axios().post(`${type}-comment/${id}/comment/`, {content: text, user: user, [type]: id})
    .then(res => {
      dispatch(comment(id, res.data, type))
    })
    .catch(err => {
      showError(dispatch, err)
    })
}

export const setComment = (id, comment, type) => {
  return {
    type: type == 'product' ? EDIT_COMMENT_PRODUCT : EDIT_COMMENT_BLOG,
    comment: comment,
    id: id
  }
}

export const editComment = (id, comment, type, user) => dispatch => {
  axios().put(`${type}-comment/${id}/comment/${comment.id}/`, {...comment, user: user, [type]: id, is_edited: true})
    .then(res => {
      dispatch(setComment(id, res.data, type))
    })
    .catch(err => {
      showError(dispatch, err)
    })
}
