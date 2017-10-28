import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from './store'
import registerServiceWorker from './registerServiceWorker';

import App from './containers/app'
import NavBar from './containers/navbar'
import Footer from './containers/footer'

import { MuiThemeProvider } from 'material-ui/styles'
import { mainTheme } from './styles/theme'
import './index.css'

const target = document.querySelector('#root')

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MuiThemeProvider theme={mainTheme}>
        <NavBar />
        <App />
        <Footer />
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>,
  target
)
registerServiceWorker();