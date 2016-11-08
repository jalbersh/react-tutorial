import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, combineReducers, applyMiddleware} from 'redux'

import App from './components/App'
import rootReducer from './reducers/rootReducer'
import dispatchAsync from './utils/dispatchAsync'

const store = createStore(
  combineReducers(rootReducer),
  applyMiddleware(dispatchAsync)
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('content')
)
