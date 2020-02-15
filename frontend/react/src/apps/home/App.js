import React, { useState, useEffect } from 'react'
import Navigation from '../../components/Navigation/Navigation'
import ExpenseList from '../../components/ExpenseList/ExpenseList'
import './app.css'
import ExpenseService from '../../services/ExpenseService'
import GoogleService from '../../services/GoogleService'

const App = () => {
  const [expenses, setExpenses] = useState([])

  const [message, setMessage] = useState(
    'You must be logged in order to see content'
  )

  const [isLoggedIn, setLoggedIn] = useState(false)

  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    if (GoogleService.isGoogleInfoSet()) {
      if (!GoogleService.isGoogleInfoExpired()) {
        setLoggedIn(true)
        getExpenses(
          GoogleService.getToken().id_token,
          GoogleService.getProfile().googleId
        )
      } else {
        setMessage(
          'Your current session has expired, re-login in order to access your expense list'
        )
      }
    } else {
      setMessage('You must be logged in order to see content')
    }
  }, [])

  const handleLogout = () => {
    setLoggedIn(false)
    setExpenses([])
    setMessage('You must be logged in order to see content')
    GoogleService.clearGoogleInfo()
  }

  const onLoginSuccess = responseponse => {
    // Sets the google info on local storage
    GoogleService.setGoogleInfo(responseponse)
    setLoggedIn(true)
    // Gets the all expenses for the logged in user
    getExpenses(
      responseponse.tokenObj.id_token,
      responseponse.profileObj.googleId
    )
  }

  const onLoginFailure = responseponse => {
    console.log("This was google's responseponse on failure:")
    console.log(responseponse)
  }

  const getExpenses = (googleAccessToken, googleId) => {
    setLoading(true)
    ExpenseService.getAllByUser(googleId, googleAccessToken)
      .then(response => handleErrors(response))
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

  const handleExpenseDelete = expense => {
    if (GoogleService.isGoogleInfoSet) {
      if (!GoogleService.isGoogleInfoExpired()) {
        const googleAccessToken = GoogleService.getToken().id_token
        ExpenseService.delete(googleAccessToken, expense)
          .then(response => handleErrors(response))
          .then(() => setExpenses(expenses.filter(e => e !== expense)))
          .catch(error => alert(error))
      } else {
        alert(
          'Unable to perform backend request because the current access token has already expired'
        )
      }
    } else {
      alert('Unable to perform fetch, invalid access token')
    }
  }

  const handleExpenseSave = async expense => {
    if (GoogleService.isGoogleInfoSet) {
      if (!GoogleService.isGoogleInfoExpired()) {
        const googleProfile = GoogleService.getProfile()
        const googleAccessToken = GoogleService.getToken().id_token

        expense.user.name = googleProfile.name
        expense.user.email = googleProfile.email
        expense.user.googleId = googleProfile.googleId

        return ExpenseService.create(googleAccessToken, expense)
          .then(response => handleErrors(response))
          .then(response => {
            expense.url = response.headers.get('location')
            const newExpenses = expenses
            newExpenses.unshift(expense)
            setExpenses(newExpenses)
          })
          .catch(error => {
            error
              .json()
              .then(errors => {
                if (errors.location) {
                  alert('Error at field Location: ' + errors.location)
                }
              })
              .catch(() => {
                alert('Json parsing error on expense creation')
              })
          })
      } else {
        alert(
          'Unable to perform backend request because the current access token has already expired'
        )
      }
    } else {
      alert('Unable to perform fetch, invalid access token')
    }
  }

  const handleErrors = response => {
    if (response.ok) {
      return response
    } else {
      throw response
    }
  }

  const createMenu = () => (
    <div className='app-menu'>
      <Navigation
        isLoggedIn={isLoggedIn}
        onLoginSuccess={onLoginSuccess}
        onLoginFail={onLoginFailure}
        onLogout={handleLogout}
      />
    </div>
  )

  const createContent = () => {
    if (isLoading) {
      return <div className='app-content'>Loading...</div>
    } else if (!isLoggedIn) {
      return (
        <div className='app-content login-message-parent'>
          <div className='login-message-div'> {message} </div>
        </div>
      )
    } else {
      return (
        <div className='app-content'>
          <ExpenseList
            onSave={handleExpenseSave}
            onDelete={handleExpenseDelete}
            expenses={expenses}
            isLoggedIn={isLoggedIn}
            isLoading={isLoading}
          />
        </div>
      )
    }
  }

  return (
    <div className='app'>
      {createMenu()}
      {createContent()}
      <div className='app-summary'> </div>
    </div>
  )
}

export default App
