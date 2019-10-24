import axios from '../../config/api'
import {
  SET_SEARCH_SUGGESTIONS,
  SET_SEARCH,
  SET_CURRENT_CATEGORY,
} from '../../constants'
import {showError, showMessage} from '../common'


export const setSuggestions = (data) => {
  return {
    type: SET_SEARCH_SUGGESTIONS,
    data
  }
}

export const clearSuggestions = () => {
  return setSuggestions([])
}

export const fetchSuggestions = key => dispatch => {
  axios().get(`/suggestion?q=${key}`)
    .then(res => {
      if (res.status) {
        dispatch(setSuggestions(res.data))
        dispatch(showMessage(res.data.message))
      }
      else {
        dispatch(showMessage(res.data.message))
      }
    })
    .catch(err => showError(dispatch, err))
}
