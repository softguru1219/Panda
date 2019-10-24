import {
    SET_EASY_SEARCH_KEYS,
    SET_SEARCH_SUGGESTIONS
} from '../../constants'

const initialState = {
    suggestions: ['移动', 'iphone XS', '小米 8', 'iphone x', '白酒'],
    easySearchText: ['移动', 'iphone XS', '小米 8', 'iphone x', '白酒']
}

export default function searchReducer(state=initialState, action) {
    switch(action.type) {

      case SET_EASY_SEARCH_KEYS:
        return {
          ...state,
          isLoading: true,
          easySearchText: action.easySearchText
        }
      
      case SET_SEARCH_SUGGESTIONS:
        return {
          ...state,
          suggestions: action.data
        }

      default:
        return state
    }
}