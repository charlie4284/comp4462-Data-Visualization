import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import rootReducer from './rootReducer'
import thunk from 'redux-thunk'

export const history = createBrowserHistory()

const initialState = {}

const store = createStore(
  rootReducer(history), // root reducer with router state
  initialState,
  compose(
    applyMiddleware(
      routerMiddleware(history), // for dispatching history actions
      thunk
    ),
  ),
)

export default store