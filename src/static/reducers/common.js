import {
  ENABLE_SPINNER,
  DISABLE_SPINNER,
  SHOW_MESSAGE,
  HIDE_MESSAGE,
  SHOW_MODAL,
  HIDE_MODAL
} from '../constants'


const initialState = {
  spinnerLoading: false,
  statusText: null,
  statusType: 'danger',
  showModal: false,
  errAction: null
}

export default function commonReducer(state = initialState, action) {
  switch (action.type) {
    case ENABLE_SPINNER:
      return { ...state, spinnerLoading: true}
    case DISABLE_SPINNER:
      return { ...state, spinnerLoading: false }
    case SHOW_MESSAGE:
      return {
        ...state, 
        statusText: action.statusText,
        statusType: action.statusType
      }
    case HIDE_MESSAGE:
      return {
        ...state,
        statusText: null,
        statusType: 'danger',
        errAction: ''
      }
    case SHOW_MODAL:
      return {
        ...state,
        showModal: true,
        statusText: action.statusText,
        statusType: action.statusType,
        errAction: action.errAction,
      }
    case HIDE_MODAL:
      return {
        ...state,
        showModal: false,
        statusText: null,
        statusType: 'danger'
      }
    default:
      return state
  }
}
