import {
  ENABLE_SPINNER,
  DISABLE_SPINNER,

  SHOW_MESSAGE,
  HIDE_MESSAGE,
  SHOW_MODAL,
  HIDE_MODAL,
} from '../constants'

import axios from '../config/api'

export const startLoading = () => {
  return {
    type: ENABLE_SPINNER
  }
}

export const endLoading = () => {
  return {
    type: DISABLE_SPINNER
  }
}

export const showMessage = (message, type = 'danger') => {
  return {
    type: SHOW_MESSAGE,
    statusText: message,
    statusType: type
  }
}

export const hideMessage = () => {
  return {
    type: HIDE_MESSAGE
  }
}

export const showModal = (message, action = '', type = 'danger') => {
  return {
    type: SHOW_MODAL,
    statusText: message,
    statusType: type,
    errAction: action,
  }
}

export const hideModal = () => {
  return {
    type: HIDE_MODAL
  }
}

export const showError = (dispatch, err) => {
  dispatch(endLoading())

  if (err.response.status === 401) {

    dispatch(showModal('请再次登录', 'login'))
  }
  else if (
    typeof err.response === 'object'
    && err.response.data
    && 'message' in err.response.data
  )
    dispatch(showModal(err.response.data.message, err.response.data.action))
  else if (
    typeof err.response === 'object'
    && err.response.data
  ) {
    debugger
    dispatch(showModal(err.response.data[Object.keys(err.response.data)][0]))
  }
  else dispatch(showModal(err.response))
}

export const imageUpload = (url, file) => {
  let formData = new FormData()
  formData.append('file', file)

  return axios().post(url, formData, {
    'content-type': 'multipart/form-data'
  })
}