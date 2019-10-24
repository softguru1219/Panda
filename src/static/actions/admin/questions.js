import axios from '../../config/api'


export const fetchQuestionListAPI = (page, searchText, pageSize, sorted) => {
  return axios().get(`/questions/list/?page=${page}&search=${searchText}&page_size=${pageSize}&ordering=${sorted}`)
}

export const updateQuestionAPI = (question) => {
  return axios().put(`/questions/manage/${question.id}/`, question)
}

export const createQuestionAPI = (question) => {
  return axios().post('/questions/create/', question)
}

export const fetchAnswerListAPI = (page, searchText, pageSize, sorted) => {
  return axios().get(`/questions/answer/?page=${page}&search=${searchText}&page_size=${pageSize}&ordering=${sorted}`)
}

export const createAnswerAPI = (answer) => {
  return axios().post('/questions/answer/', answer)
}
