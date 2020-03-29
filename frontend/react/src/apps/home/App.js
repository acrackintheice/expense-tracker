import React, { useState, useEffect } from 'react'
import Navigation from '../../components/Navigation/Navigation'
import Sidebar from '../../components/Sidebar/Sidebar'
import ExpenseList from '../../components/ExpenseList/ExpenseList'
import './app.css'
import * as ExpenseService from '../../services/ExpenseService'
import * as UserService from '../../services/UserService'
import GoogleService from '../../services/GoogleService'
import { FormattedMessage } from 'react-intl'
import UserContext from '../../context/UserContext'

const App = () => {
  const [expenses, setExpenses] = useState([])
  const [message, setMessage] = useState('message.login.required')
  const [googleInfo, setGoogleInfo] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    startUser().catch(error => setMessage(error))
  }, [])

  useEffect(() => {
    if (googleInfo) {
      startExpenses()
    } else {
      setExpenses([])
    }
  }, [googleInfo])

  const startUser = () =>
    GoogleService.getGoogleInfo().then(googleInfo => {
      UserService.getUserByGoogleId(
        googleInfo.profile.googleId,
        googleInfo.token.id_token
      ).then(user => {
        setGoogleInfo(googleInfo)
        setUser(user)
      })
    })

  const startExpenses = () =>
    ExpenseService.findAllByGoogleId(
      googleInfo.profile.googleId,
      googleInfo.token.id_token
    ).then(expenses => setExpenses(ExpenseService.sortExpenses(expenses)))

  const logout = () => {
    GoogleService.clearGoogleInfo()
    setMessage('message.login.required')
    setExpenses([])
    setGoogleInfo(null)
    setUser(null)
  }

  const login = response => {
    GoogleService.setGoogleInfo(response)
    startUser()
  }

  const isLoggedIn = () => googleInfo !== null

  const deleteExpense = expense => {
    if (googleInfo) {
      ExpenseService.remove(googleInfo.token.id_token, expense)
        .then(() => setExpenses(expenses.filter(e => e !== expense)))
        .catch(error => alert(error))
    } else {
      alert('error.token.expired')
    }
  }

  const createExpense = async expense => {
    if (googleInfo) {
      const newExpense = await ExpenseService.create(
        expense,
        user,
        googleInfo.token.id_token
      )
      setExpenses([newExpense, ...expenses])
    } else {
      alert('error.token.expired')
    }
  }

  const createMenu = () => {
    if (googleInfo) {
      return createLoggedInMenu()
    }
    return createLoggedOutMenu()
  }

  const createLoggedInMenu = () => (
    <div className='main menu'>
      <Navigation login={login} logout={logout} />
    </div>
  )

  const createLoggedOutMenu = () => (
    <div className='main menu'>
      <Navigation login={login} logout={logout} />
    </div>
  )

  const createSidebar = () => (
    <div className='sidebar'>
      <Sidebar />
    </div>
  )

  const createContent = () => {
    if (!isLoggedIn() || !GoogleService.isGoogleInfoSet()) {
      return createLoggedOutContent()
    } else if (GoogleService.isGoogleInfoExpired()) {
      return createLoggedOutContent()
    } else {
      return createLoggedInContent()
    }
  }

  const createLoggedOutContent = () => (
    <div className='content'>
      <div className='left' />
      <div className='center login-message-parent'>
        <div className='login-message-div'>
          <FormattedMessage
            id={message}
            defaultMessage=''
            description='Information message display'
          />
        </div>
      </div>
      <div className='right' />
    </div>
  )

  const createLoggedInContent = () => (
    <div className='content'>
      <ExpenseList
        delete={deleteExpense}
        create={createExpense}
        expenses={expenses}
      />
    </div>
  )

  return (
    <UserContext.Provider value={googleInfo}>
      <div className='app'>
        {createMenu()}
        {createSidebar()}
        {createContent()}
      </div>
    </UserContext.Provider>
  )
}

export default App
