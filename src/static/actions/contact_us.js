import axios from '../config/api'

export const createQuestionAPI = (question) => {
	return axios().post('questions/create/', question)
}