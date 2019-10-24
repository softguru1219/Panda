import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import authReducer from './auth'
import headerReducer from './header'
import commonReducer from './common'
import productReducer from './product'
import blogReducer from './blog'
import categoryReducer from './category'

export default combineReducers({
  header: headerReducer,
  auth: authReducer,
  common: commonReducer,
  product: productReducer,
  category: categoryReducer,
  blog: blogReducer,
  routing: routerReducer,
})
