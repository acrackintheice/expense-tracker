import React, { useState, useEffect } from 'react'
import Navigation from '../../components/Navigation/Navigation'
import Sidebar from '../../components/Sidebar/Sidebar'
import ErrorContent from '../../components/ErrorContent/ErrorContent'
import ExpenseList from '../../components/ExpenseList/ExpenseList'
import './app.css'
import * as ExpenseService from '../../services/ExpenseService'
import * as UserService from '../../services/UserService'
import GoogleService from '../../services/GoogleService'
import UserContext from '../../context/UserContext'
import { Route, Switch, useHistory } from 'react-router-dom'
import ExpenseForm from '../../components/ExpenseForm/ExpenseForm'
import PrivateRoute from '../../routes/PrivateRoute'

const App = () => {
  const history = useHistory()
  const [expenses, setExpenses] = useState([])
  const [message, setMessage] = useState('message.login.required')
  const [googleInfo, setGoogleInfo] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    startApp()
  }, [])

  const startApp = async () => {
    try {
      const info = await startUser()
      await startExpenses(info)
    } catch (error) {
      setExpenses([])
      setMessage(error)
      history.push('/error')
    }
  }

  const startUser = async () => {
    const localGoogleInfo = await GoogleService.getLocalGoogleInfo()
    setGoogleInfo(localGoogleInfo)
    const id = localGoogleInfo.profile.googleId
    const token = localGoogleInfo.token.id_token
    const responseUser = await UserService.getUserByGoogleId(id, token)
    setUser(responseUser)
    return localGoogleInfo
  }

  const startExpenses = async info => {
    try {
      const id = info.profile.googleId
      const token = info.token.id_token
      const expenses = await ExpenseService.findAllByGoogleId(id, token)
      setExpenses(ExpenseService.sortExpenses(expenses))
      history.push('/expenses')
    } catch (error) {
      setMessage(error)
      history.push('/error')
    }
  }

  const logout = () => {
    GoogleService.clearGoogleInfo()
    setMessage('message.login.required')
    setExpenses([])
    setGoogleInfo(null)
    setUser(null)
    history.push('/error')
  }

  const login = response => {
    GoogleService.setGoogleInfo(response)
    startApp()
  }

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
      setExpenses(ExpenseService.sortExpenses([newExpense, ...expenses]))
    } else {
      alert('error.token.expired')
    }
  }



  return (
    <UserContext.Provider value={googleInfo}>
      <div className='app'>
        <Navigation login={login} logout={logout} />
        <Sidebar />
        <div className='content'>
          <Switch>
            <PrivateRoute path='/stats'>
              <div>Stats</div>
            </PrivateRoute>
            <PrivateRoute path='/code'>
              <div>Code</div>
            </PrivateRoute>
            <PrivateRoute path='/expenses/new'>
              <ExpenseForm create={createExpense} />
            </PrivateRoute>
            <PrivateRoute path='/expenses/:id'>
              <ErrorContent message={message} />
            </PrivateRoute>
            <PrivateRoute path='/expenses'>
              <ExpenseList
                delete={deleteExpense}
                create={createExpense}
                expenses={expenses}
              />
            </PrivateRoute>
            <Route path='/error'>
              <ErrorContent message={message} />
            </Route>
          </Switch>
        </div>
      </div>
    </UserContext.Provider>
  )
}

export default App
