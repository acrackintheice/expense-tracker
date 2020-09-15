import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { IntlProvider } from 'react-intl'
import Home from './Home/Home'
import ptMessages from '../translations/pt.json'
import enMessages from '../translations/en.json'
import MyApolloProvider from '../apollo/MyApolloProvider'

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

const language = localeMap[navigator.language.replace('-', '').toLowerCase()] || 'en'

const App = () => {

    return (
        <IntlProvider
            locale={language}
            defaultLocale='en'
            key={language}
            messages={messages[language]}
        >
            <MyApolloProvider>
                <Router>
                    <Home />
                </Router>
            </MyApolloProvider>
        </IntlProvider >
    )
}

export default App