import axios from '../../config/api'


export const fetchPolicyAPI = () => {
  return axios().get(`/policy/`)
}

export const updatePolicyAPI = (data) => {
  return axios().post('/policy/', data)
}
