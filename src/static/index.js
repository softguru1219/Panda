import React from 'react'
import ReactDOM from 'react-dom'
import {createBrowserHistory} from 'history'

import {authLoginUserSuccess} from './actions/auth'
import {setCompareProducts} from './actions/product'
import Root from './containers/Root/Root'
import configureStore from './store/configureStore'


const initialState = {}
const target = document.getElementById('root')

const history = createBrowserHistory()
const store = configureStore(initialState, history)

const node = (
    <Root store={store} history={history} />
)

const token = sessionStorage.getItem('token')
let user = {}
try {
    user = JSON.parse(sessionStorage.getItem('user'))
} catch (e) {
    // Failed to parse
}

if (token !== null) {
    store.dispatch(authLoginUserSuccess(token, user))
}

const compareProducts = sessionStorage.getItem('compare_products')
if (compareProducts) {
    store.dispatch(setCompareProducts(JSON.parse(compareProducts)))
}

ReactDOM.render(node, target)
