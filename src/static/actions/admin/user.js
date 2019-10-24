import axios from '../../config/api'


import {
  UPDATE_USER,
} from '../../constants'


export const fetchUserListAPI = (page, searchText, pageSize, sorted) => {
  return axios().get(`/accounts/manage/?page=${page}&search=${searchText}&page_size=${pageSize}&ordering=${sorted}`)
}

export const updateUser = (user) => {
  return {
    type: UPDATE_USER,
    user: user
  }
}

export const fetchNewUsersStatus = (period) => {
  return axios().get(`/accounts/new-users-status/?period=${period}`)
}

export const updateUserAPI = (user) => {
  return axios().put(`/accounts/manage/${user.id}/`, user)
}

export const createUserAPI = (user) => {
  return axios().post('/accounts/manage/', user)
}


export const deleteUserAPI = (userId) => {
  return axios().delete(`/accounts/manage/${userId}/`)
}
