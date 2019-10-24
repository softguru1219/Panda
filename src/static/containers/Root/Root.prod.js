import React from 'react'
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'react-router-redux'
import PropTypes from 'prop-types'

import routes from '../../routes'
import App from '../../app'

export default class Root extends React.Component {
    static propTypes = {
        store: PropTypes.shape().isRequired,
        history: PropTypes.shape().isRequired
    }

    componentWillMount() {
        this.unlisten = this.props.history.listen((location, action) => {
            this.props.store.dispatch(formatQuery())
            this.props.store.dispatch(emptyProducts())
        })
    }
    componentWillUnmount() {
        this.unlisten()
    }

    render() {
        return (
            <div>
                <Provider store={this.props.store}>
                    <App>
                        <ConnectedRouter history={this.props.history}>
                            {routes}
                        </ConnectedRouter>
                    </App>
                </Provider>
            </div>
        )
    }
}
