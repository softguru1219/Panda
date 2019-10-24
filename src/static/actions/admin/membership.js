import axios from '../../config/api'

export const fetchMemberShipAPI = (page, pageSize, searchText) => {
  return axios().get(`accounts/membership/?page=${page}&page_size=${pageSize}&search=${searchText}`)
}

export const addMemberShipAPI = (membership) => {
  return axios().post('accounts/membership/', membership)
}

export const deleteMemberShipAPI = (memberShipId) => {
  return axios().delete(`accounts/membership/${memberShipId}/`)
}

export const updateMemberShipAPI = (membership) => {
  return axios().put(`accounts/membership/${membership.id}/`, membership)
}

export const fetchMembershipSummaryAPI = () => {
  return axios().get('accounts/summary-membership/')
}
