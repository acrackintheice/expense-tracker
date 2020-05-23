import React, { useState, useEffect } from 'react'
import Navigation from '../../components/Navigation/Navigation'
import Sidebar from '../../components/Sidebar/Sidebar'
import ErrorContent from '../../components/ErrorContent/ErrorContent'
import ExpenseList from '../../components/ExpenseList/ExpenseList'
import * as ExpenseService from '../../services/ExpenseService'
import * as UserService from '../../services/UserService'
import GoogleService from '../../services/GoogleService'
import UserContext from '../../context/UserContext'
import { Route, Switch, useHistory } from 'react-router-dom'
import ExpenseForm from '../../components/ExpenseForm/ExpenseForm'
import PrivateRoute from '../../routes/PrivateRoute'
import './app.css'

const App = () => {
  const history = useHistory()
  const [expenses, setExpenses] = useState([])
  const [message, setMessage] = useState('message.login.required')
  const [googleInfo, setGoogleInfo] = useState(null)
  const [user, setUser] = useState(null)
  const [showMenu, setShowMenu] = useState(true)

  useEffect(() => {
    const setErrorState = (error) => {
      setExpenses([])
      setMessage(error.message)
      history.push('/error')
    }

    const getUser = (info) =>
      UserService.getUserByGoogleId(info.profile.googleId, info.token.id_token)
        .then(u => setUser(u))

    const getExpenses = (info) =>
      ExpenseService.findAllByGoogleId(info.profile.googleId, info.token.id_token)
        .then(exps => setExpenses(ExpenseService.sortExpenses(exps)))
        .then(() => history.push('/expenses'))

    if (googleInfo) {
      getUser(googleInfo).then(() => getExpenses(googleInfo)).catch(error => setErrorState(error))
    } else {
      GoogleService.getLocalGoogleInfo().then(info => setGoogleInfo(info)).catch(error => setErrorState(error))
    }
  }, [history, googleInfo])

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
    setGoogleInfo({ profile: response.profileObj, token: response.profileObj })
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
      const newExp = await ExpenseService.create(expense, user, googleInfo.token.id_token)
      setExpenses(ExpenseService.sortExpenses([newExp, ...expenses]))
    } else {
      alert('error.token.expired')
    }
  }

  const handleMenuToggle = () => {
    setShowMenu(!showMenu)
  }

  return (
    <UserContext.Provider value={googleInfo}>
      <div className={showMenu ? 'app' : 'app mobile'}>
        <Navigation
          handleMenuToggle={handleMenuToggle}
          login={login}
          logout={logout}
        />
        {showMenu && <Sidebar />}
        <div className='content'>
          <Switch>
            <PrivateRoute path='/stats'>
              <div>Stats</div>
            </PrivateRoute>
            <PrivateRoute path='/code'>
              <div>Code</div>
            </PrivateRoute>
            <PrivateRoute path='/tags'>
              <div>github</div>
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
