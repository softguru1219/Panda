import {
    AUTH_LOGIN_USER_REQUEST,
    AUTH_LOGIN_USER_SUCCESS,
    AUTH_LOGIN_USER_FAILURE,
    AUTH_LOGOUT_USER,
    SEND_EMAIL,
    REGISTER_USER,
    SHOW_AUTH_ERROR,
    CONFIRM_USER_EMAIL,    
    READY_CHANGE_EMAIL,
} from '../constants'


const initialState = {
    token: null,
    isAuthenticated: false,
    isAuthenticating: false,
    isSendEmailVerifyLinked: false,
    emailVerified: false,
    isRegistered: false,
    user: {
        phone_number: '',
        id: '',
        user_name: null,
        email: '',
        name: '',
        avatar: '',
        confirmed_email: false
    }
}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case AUTH_LOGIN_USER_REQUEST:
            return Object.assign({}, state, {
                isAuthenticating: true,
                statusText: null
            })

        case AUTH_LOGIN_USER_SUCCESS:
            return Object.assign({}, state, {
                isAuthenticating: false,
                isAuthenticated: true,
                token: action.payload.token,
                user: action.payload.user,
                statusText: '您已成功登录.'
            })

        case AUTH_LOGIN_USER_FAILURE:
            return Object.assign({}, state, {
                isAuthenticating: false,
                isAuthenticated: false,
                token: null,
                user_name: null
            })

        case AUTH_LOGOUT_USER:
            return Object.assign({}, state, {
                isAuthenticated: false,
                token: null,
                user_name: null,
                statusText: 'You have been successfully logged out.'
            })

        case SEND_EMAIL:
            return {
                ...state,
                isSendEmailVerifyLinked: true,
                user: {
                    ...state.user,
                    email: action.email
                }
            }

        case REGISTER_USER:
            return {
                ...state,
                isRegistered: true,
                user: Object.assign(state.user, action.data)
            }

        case SHOW_AUTH_ERROR:
            return {
                ...state,
                statusText: action.statusText,
                statusType: action.statusType
            }

        case CONFIRM_USER_EMAIL:
            return {
                ...state,
                user: {
                    ...state.user,
                    confirmed_email: true
                }
            }
        
        case READY_CHANGE_EMAIL:
            return {
                ...state,
                isSendEmailVerifyLinked: false
            }

        default:
            return state
    }
}

