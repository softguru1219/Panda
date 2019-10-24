import {push} from 'react-router-redux'
import {
  AUTH_LOGIN_USER_REQUEST,
  AUTH_LOGIN_USER_FAILURE,
  AUTH_LOGIN_USER_SUCCESS,
  AUTH_LOGOUT_USER,
  SEND_EMAIL,
  READY_CHANGE_EMAIL,
  REGISTER_USER,
  CONFIRM_USER_EMAIL,
} from '../constants'

import axios from '../config/api'

import {showError, showMessage} from './common'


export function authLoginUserSuccess(token, user) {
  sessionStorage.setItem('token', token)
  sessionStorage.setItem('user', JSON.stringify(user))
  return {
    type: AUTH_LOGIN_USER_SUCCESS,
    payload: {
      token,
      user
    }
  }
}

export function authLoginUserFailure() {
  sessionStorage.removeItem('token')
  return {
    type: AUTH_LOGIN_USER_FAILURE
  }
}

export function authLoginUserRequest() {
  return {
    type: AUTH_LOGIN_USER_REQUEST
  }
}

export function authLogout() {
  sessionStorage.removeItem('token')
  sessionStorage.removeItem('user')
  return {
    type: AUTH_LOGOUT_USER
  }
}

export function authLogoutAndRedirect() {
  return (dispatch, state) => {
    dispatch(authLogout())
    dispatch(push('/login'))
    return Promise.resolve() // TODO: we need a promise here because of the tests, find a better way
  }
}

export const authLoginUser = (username, password, redirect) => (dispatch) => {
  dispatch(authLoginUserRequest())
  axios().post('/accounts/login/', {
    username: username,
    password: password
  })
    .then((response) => {
      dispatch(authLoginUserSuccess(response.data.token, response.data.user))
      dispatch(push(redirect))
    })
    .catch(err => {
      showError(dispatch, err)
      dispatch(authLoginUserFailure())
    })
}

export const sendSMS = (phone_number) => {
  return axios().post('/accounts/send-sms/', {phone_number: phone_number})
}

export const phoneVerify = (phone_number, phoneCode) => {
  return axios().post('/accounts/phone-verify/', {phone_number: phone_number, code: phoneCode})
}

export const sendEmailVerificationLink = (email) => {
  return {
    type: SEND_EMAIL,
    email: email
  }
}

export const register = (user) => (dispatch) => {
  axios().post('/accounts/register/', user)
    .then(res => {
      if (res.data) {
        dispatch({
          type: REGISTER_USER,
          data: res.data,
        })
        dispatch(showMessage('您已成功注册', 'success'))
      }
      else {
        dispatch(showMessage('请再试一次'))
      }
    })
    .catch(err => showError(dispatch, err))
}

export const saveUser = (user) => {
  return dispatch({
    type: SAVE_USER,
    data: user,
    statusText: '更新成功.',
    statusType: 'success'
  })
}

export const updateUser = (user) => (dispatch) => {
  let formData = new FormData()
  for (let key in user) {
    formData.append(key, user[key])
  }
  axios().put(`/accounts/user/${user.id}/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(res => {
    dispatch(saveUser(res.data))
  }).catch(err => showError(dispatch, err))
}

export const confirmUserEmail = () => {
  return {
    type: CONFIRM_USER_EMAIL
  }
}

export const readyChangeEmail = () => {
  return {
    type: READY_CHANGE_EMAIL
  }
}

export const checkUserEmailVerification = (activationKey) => (dispatch) => {
  axios().get(`accounts/confirm/email/${activationKey}/`)
    .then(res => {
      dispatch(confirmUserEmail())
    })
    .catch(err => showError(dispatch, err))
}


export const changeEmail = (email, user) => (dispatch) => {
  axios().put(`accounts/user/${user}/`, {
    email: email
  })
    .then(res => {
      dispatch(sendEmailVerificationLink(email))
    })
    .catch(err => showError(dispatch, err))
}
