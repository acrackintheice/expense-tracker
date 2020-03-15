import React, { useState, useEffect } from 'react'
import Navigation from '../../components/Navigation/Navigation'
import ExpenseList from '../../components/ExpenseList/ExpenseList'
import './app.css'
import * as ExpenseService from '../../services/ExpenseService'
import NewExpense from '../../components/Expense/NewExpense/NewExpense.js'
import GoogleService from '../../services/GoogleService'
import { FormattedMessage } from 'react-intl'

const App = () => {
  const [expenses, setExpenses] = useState([])
  const [message, setMessage] = useState('message.login.required')
  const [userInfo, setUserInfo] = useState(null)
  const [isEditActive, setEditActive] = useState(false)

  useEffect(() => {
    GoogleService.getGoogleInfo()
      .then(info => setUserInfo(info))
      .catch(error => setMessage(error))
  }, [])

  useEffect(() => {
    if (userInfo) {
      const googleId = userInfo.profile.googleId
      const googleToken = userInfo.token.id_token
      ExpenseService.findAllByGoogleId(googleId, googleToken).then(expenses =>
        setExpenses(ExpenseService.sortExpenses(expenses))
      )
    } else {
      setExpenses([])
    }
  }, [userInfo])

  const isLoggedIn = () => userInfo !== null

  const toggleEditActive = () => {
    setEditActive(!isEditActive)
  }

  const logout = () => {
    GoogleService.clearGoogleInfo()
    setMessage('message.login.required')
    setExpenses([])
    setUserInfo(null)
  }

  const login = responseponse => {
    // Sets the google info on local storage
    GoogleService.setGoogleInfo(responseponse)
    GoogleService.getGoogleInfo().then(info => setUserInfo(info))
  }

  const deleteExpense = expense => {
    if (GoogleService.isGoogleInfoSet()) {
      if (!GoogleService.isGoogleInfoExpired()) {
        const googleAccessToken = GoogleService.getToken().id_token
        ExpenseService.remove(googleAccessToken, expense)
          .then(() => setExpenses(expenses.filter(e => e !== expense)))
          .catch(error => alert(error))
      } else {
        alert('error.token.expired')
      }
    } else {
      alert('error.token.invalid')
    }
  }

  const createExpense = async expense => {
    if (GoogleService.isGoogleInfoSet()) {
      if (!GoogleService.isGoogleInfoExpired()) {
        await ExpenseService.create(expense)
        setExpenses([expense, ...expenses])
      } else {
        alert('error.token.expired')
      }
    } else {
      alert('error.token.invalid')
    }
  }

  const createMenu = () => {
    if (userInfo) {
      return createLoggedInMenu()
    }
    return createLoggedOutMenu()
  }

  const createLoggedInMenu = () => (
    <div className='main menu'>
      <Navigation userInfo={userInfo} login={login} logout={logout} />
    </div>
  )

  const createLoggedOutMenu = () => (
    <div className='main menu'>
      <Navigation userInfo={userInfo} login={login} logout={logout} />
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
      {createLeftContent()}
      {createCenterContent()}
      {createRightContent()}
    </div>
  )

  const createRightContent = () => <div className='right' />

  const createLeftContent = () => <div className='left' />

  const createCenterContent = () => (
    <div className='center'>
      <div className='expenses header'>
        <NewExpense
          key={-1}
          isEditActive={isEditActive}
          toggleEditActive={toggleEditActive}
          create={createExpense}
        />
      </div>
      <div className='expenses list'>
        <ExpenseList delete={deleteExpense} expenses={expenses} />
      </div>
    </div>
  )

  return (
    <div className='app'>
      {createMenu()}
      {createContent()}
    </div>
  )
}

export default App
