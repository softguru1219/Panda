import {push} from 'react-router-redux'
import {

} from '../constants'

import axios from '../config/api'

export const fetchUserStatusSearchRequest = (period, page, pageSize=30)  => {
	return axios().get(`user-status/search/?page=${page}&period=${period}&page_size=${pageSize}`)
}

export const fetchUserStatusAnalysisRequest = (period, page) => {
	return axios().get(`user-status/analysis/?page=${page}&period=${period}`)
}

export const fetchUserStatusPieRequest = (year, month) => {
	return axios().get(`user-status/summary/?year=${year}&month=${month}`)
}

export const fetchUserStatusAreaRequest = (year) => {
	return axios().get(`user-status/summary/?year=${year}`)
}