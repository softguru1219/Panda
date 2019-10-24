import axios from 'axios'

export default () => {
  let headers = {}
  if (sessionStorage.getItem('token')) {
    headers['Authorization'] = `Token ${sessionStorage.getItem('token')}`
  }
  return axios.create({
    baseURL: '/api/v1/',
    headers: headers
  })
}