import React from 'react'
import ReactDOM from 'react-dom'
import App from './apps/home/App'
import './index.css'
import * as serviceWorker from './serviceWorker'
import { IntlProvider } from 'react-intl'
import ptMessages from './translations/pt.json'
import enMessages from './translations/en.json'
import { BrowserRouter as Router } from 'react-router-dom'

const messages = {
  pt: ptMessages,
  en: enMessages
}

const localeMap = {
  ptbr: 'pt',
  pt: 'pt',
  enus: 'en',
  en: 'en'
}

const language =
  localeMap[navigator.language.replace('-', '').toLowerCase()] || 'en'

ReactDOM.render(
  <IntlProvider
    locale={language}
    defaultLocale='en'
    key={language}
    messages={messages[language]}
  >
    <Router>
      <App />
    </Router>
  </IntlProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
