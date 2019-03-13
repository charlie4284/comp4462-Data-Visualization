import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import store, { history } from './store'
import './index.css'
import 'semantic-ui-css/semantic.min.css'
import App from './App'
import registerServiceWorker from './serviceWorker'

const target = document.querySelector('#root')

class Index extends React.Component{
  render(){
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App/>
        </ConnectedRouter>
      </Provider>
    )
  }
}

ReactDOM.render(<Index/>, target)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
registerServiceWorker();
// serviceWorker.unregister();
