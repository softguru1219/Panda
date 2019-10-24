import {createSelector} from 'reselect'

export const isAuthenticated = state => state.auth.isAuthenticated
export const isAuthenticating = state => state.auth.isAuthenticating
export const getToken = state => state.auth.token
export const currentUser = state => state.auth.user
export const isRegistered = state => state.auth.isRegistered
export const isSendEmailVerifyLinked = state => state.auth.isSendEmailVerifyLinked
export const confirmedEmail = state => state.auth.user.confirmed_email

export const currentUserId = createSelector(
  currentUser,
  (user) => user.id
)

export const isAdmin = createSelector(
  currentUser,
  (user) => {
    if (user)
      return user.is_superuser
    else return false
  }
)