import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
import * as serviceWorker from './serviceWorker'
import { Auth0Provider } from '@auth0/auth0-react'
import 'react-notifications/lib/notifications.css';

// mutation MyMutation {
//   insert_app_user(objects: {google_id: "google-oauth2|114390747087570243371", name: "Eduardo Demeneck", email: "do.demeneck@gmail.com"}, on_conflict: {constraint: app_user_google_id_key, update_columns: [created_at, name, email], where: {google_id: {_eq: "google-oauth2|114390747087570243371"}}}) {
//     returning {
//       id
//     }
//   }
// }

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