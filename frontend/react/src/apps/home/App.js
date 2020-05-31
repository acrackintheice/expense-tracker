import React, { useState, useEffect } from 'react'
import Navigation from '../../components/Navigation/Navigation'
import Sidebar from '../../components/Sidebar/Sidebar'
import ErrorContent from '../../components/ErrorContent/ErrorContent'
import ExpenseList from '../../components/ExpenseList/ExpenseList'
import * as UserService from '../../services/UserService'
import GoogleService from '../../services/GoogleService'
import UserContext from '../../context/UserContext'
import { Route, Switch, useHistory } from 'react-router-dom'
import ExpenseForm from '../../components/ExpenseForm/ExpenseForm'
import PrivateRoute from '../../routes/PrivateRoute'
import './app.css'
import TagGrid from '../../components/Tags/TagGrid/TagGrid'

const App = () => {
  const history = useHistory()
  const [message, setMessage] = useState('message.login.required')
  const [googleInfo, setGoogleInfo] = useState(null)
  const [user, setUser] = useState(null)
  const [showMenu, setShowMenu] = useState(true)

  useEffect(() => {
    const setErrorState = (error) => {
      setMessage(error.message)
      history.push('/error')
    }

    const getUser = (info) =>
      UserService.getUserByGoogleId(info.profile.googleId, info.token.id_token)

    if (googleInfo) {
      getUser(googleInfo).then(u => setUser(u)).catch(error => setErrorState(error))
    } else {
      GoogleService.getLocalGoogleInfo().then(info => setGoogleInfo(info)).catch(error => setErrorState(error))
    }
  }, [history, googleInfo])

  const logout = () => {
    GoogleService.clearGoogleInfo()
    setMessage('message.login.required')
    setGoogleInfo(null)
    setUser(null)
    history.push('/error')
  }

  const login = response => {
    GoogleService.setGoogleInfo(response)
    setGoogleInfo({ profile: response.profileObj, token: response.tokenObj })
  }

  const handleMenuToggle = () => {
    setShowMenu(!showMenu)
  }

  return (
    <UserContext.Provider value={{ googleInfo: googleInfo, user: user }}>
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
              <TagGrid />
            </PrivateRoute>
            <PrivateRoute path='/expenses/new'>
              <ExpenseForm />
            </PrivateRoute>
            <PrivateRoute path='/expenses/:id'>
              <ErrorContent message={message} />
            </PrivateRoute>
            <PrivateRoute path='/expenses'>
              <ExpenseList />
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
