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
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [isEditActive, setEditActive] = useState(false)

  useEffect(() => {
    if (GoogleService.isGoogleInfoSet()) {
      if (!GoogleService.isGoogleInfoExpired()) {
        setLoggedIn(true)
        getExpenses(
          GoogleService.getToken().id_token,
          GoogleService.getProfile().googleId
        )
      } else {
        setMessage('error.session.expired')
      }
    } else {
      setMessage('message.login.required')
    }
  }, [])

  const toggleEditActive = () => {
    setEditActive(!isEditActive)
  }

  const logout = () => {
    setLoggedIn(false)
    setExpenses([])
    setMessage('message.login.required')
    GoogleService.clearGoogleInfo()
  }

  const login = responseponse => {
    // Sets the google info on local storage
    GoogleService.setGoogleInfo(responseponse)
    setLoggedIn(true)
    setLoading(true)
    // Gets the all expenses for the logged in user
    getExpenses(
      responseponse.tokenObj.id_token,
      responseponse.profileObj.googleId
    )
  }

  const getExpenses = (googleAccessToken, googleId) => {
    ExpenseService.getAllByUser(googleId, googleAccessToken)
      .then(response => response.json())
      .then(response => {
        setLoading(false)
        setExpenses(
          response.sort((a, b) => new Date(b.date) - new Date(a.date))
        )
      })
      .catch(error => {
        alert(error)
        setLoading(false)
      })
  }

  const deleteExpense = expense => {
    if (GoogleService.isGoogleInfoSet) {
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
    const response = await ExpenseService.create(expense)
    expense.url = response.headers.get('location')
    setExpenses([expense, ...expenses])
  }

  const createMenu = () => (
    <div className='app-menu'>
      <Navigation isLoggedIn={isLoggedIn} login={login} logout={logout} />
    </div>
  )

  const createContent = () => {
    if (isLoading) {
      return createLoadingContent()
    } else if (!isLoggedIn) {
      return createLoggedOut()
    } else {
      return createLoggedInContent()
    }
  }

  const createLoadingContent = () => (
    <div className='app-content'>Loading...</div>
  )

  const createLoggedOut = () => (
    <div className='app-content login-message-parent'>
      <div className='login-message-div'>
        <FormattedMessage
          id={message}
          defaultMessage=''
          description='Information message display'
        />
      </div>
    </div>
  )

  const createLoggedInContent = () => (
    <div className='app-content'>
      <div className='expense-header new'>
        <NewExpense
          key={-1}
          isEditActive={isEditActive}
          toggleEditActive={toggleEditActive}
          create={createExpense}
        />
      </div>
      <div className='expense-list'>
        <ExpenseList
          create={createExpense}
          delete={deleteExpense}
          expenses={expenses}
          isLoggedIn={isLoggedIn}
          isLoading={isLoading}
          isEditActive={isEditActive}
          toggleEditActive={toggleEditActive}
        />
      </div>
    </div>
  )

  return (
    <div className='app'>
      {createMenu()}
      <div className='blank' />
      {createContent()}
      <div className='app-summary' />
    </div>
  )
}

export default App
