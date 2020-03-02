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
  // const [googleUser, setGoogleUser] = useState(false)
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
    GoogleService.clearGoogleInfo()
    setLoggedIn(false)
    setExpenses([])
    setMessage('message.login.required')
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
    if (GoogleService.isGoogleInfoSet()) {
      if (!GoogleService.isGoogleInfoExpired()) {
        const googleAccessToken = GoogleService.getToken().id_token
        ExpenseService.getAllByUser(googleId, googleAccessToken)
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
      } else {
        alert('error.token.expired')
      }
    } else {
      alert('error.token.invalid')
    }
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
        const response = await ExpenseService.create(expense)
        expense.url = response.headers.get('location')
        setExpenses([expense, ...expenses])
      } else {
        alert('error.token.expired')
      }
    } else {
      alert('error.token.invalid')
    }
  }

  const createMenu = () => {
    if (GoogleService.isGoogleInfoSet()) {
      if (!GoogleService.isGoogleInfoExpired()) {
        return createLoggedInMenu()
      }
    }
    return createLoggedOutMenu()
  }

  const createLoggedInMenu = () => (
    <div className='main menu'>
      <Navigation isLoggedIn={true} login={login} logout={logout} />
    </div>
  )

  const createLoggedOutMenu = () => (
    <div className='main menu'>
      <Navigation isLoggedIn={false} login={login} logout={logout} />
    </div>
  )

  const createContent = () => {
    if (isLoading) {
      return createLoadingContent()
    } else if (!isLoggedIn || !GoogleService.isGoogleInfoSet()) {
      return createLoggedOutContent()
    } else if (GoogleService.isGoogleInfoExpired()) {
      return createLoggedOutContent()
    } else {
      return createLoggedInContent()
    }
  }

  const createLoadingContent = () => (
    <div className='content'>
      <div className='left' />
      <div className='center'>Loading...</div>
      <div className='right' />
    </div>
  )

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
      {createContent()}
    </div>
  )
}

export default App
