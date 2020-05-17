import React from 'react'
import ReactDOM from 'react-dom'
import App from '../apps/home/App'
import { MemoryRouter, Route } from 'react-router'
import { IntlProvider } from 'react-intl'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <IntlProvider locale='en' defaultLocale='en'>
      <MemoryRouter initialEntries={['/home']}>
        <Route path='/home'>
          <App />
        </Route>
      </MemoryRouter>
    </IntlProvider>,
    div
  )
})
