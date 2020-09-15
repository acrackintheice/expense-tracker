import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
import * as serviceWorker from './serviceWorker'
import { Auth0Provider } from '@auth0/auth0-react'

ReactDOM.render(
  <Auth0Provider
    domain="acrackintheice.us.auth0.com"
    clientId="zPZw0PIMxDoy0QOrimoBLo6DWqeEEh1x"
    redirectUri={window.location.origin}
    useRefreshTokens={true}
    audience="hasura"
  >
    <App />
  </Auth0Provider>
  , document.getElementById('root'))

serviceWorker.unregister()