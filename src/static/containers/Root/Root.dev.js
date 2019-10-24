import React from 'react'
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'react-router-redux'
import PropTypes from 'prop-types'

import routes from '../../routes'
import DevTools from './DevTools'
import App from '../../app'
import {formatQuery} from '../../actions/product'


export default class Root extends React.Component {
  static propTypes = {
    store: PropTypes.shape().isRequired,
    history: PropTypes.shape().isRequired
  }

  componentWillMount() {
    this.unlisten = this.props.history.listen((location, action) => {
      this.props.store.dispatch(formatQuery())
    })
  }

  componentWillUnmount() {
    this.unlisten()
  }

  render() {
    return (
      <div>
        <Provider store={this.props.store}>
          <div>
            <App>
              <ConnectedRouter history={this.props.history}>
                {routes}
              </ConnectedRouter>
            </App>
            <DevTools/>
          </div>
        </Provider>
      </div>
    )
  }
}
