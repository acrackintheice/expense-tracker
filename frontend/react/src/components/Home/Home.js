import React, { useState } from 'react'
import Navigation from '../Navigation/Navigation'
import Sidebar from '../Sidebar/Sidebar'
import ErrorContent from '../ErrorContent/ErrorContent'
import ExpenseList from '../ExpenseList/ExpenseList'
import { Route, Switch } from 'react-router-dom'
import ExpenseForm from '../ExpenseForm/ExpenseForm'
import PrivateRoute from '../../routes/PrivateRoute'
import { useAuth0 } from "@auth0/auth0-react";
import './home.css'
import Tags from '../Tags/Tags'

const Home = () => {
  const { isAuthenticated } = useAuth0()
  const [message] = useState('message.login.required')
  const [showMenu, setShowMenu] = useState(true)

  const handleMenuToggle = () => {
    setShowMenu(!showMenu)
  }

  return (
    <div className={showMenu ? 'app' : 'app mobile'}>
      <Navigation
        handleMenuToggle={handleMenuToggle}
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
            <Tags />
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
          <Route>
            {isAuthenticated && <ExpenseList />}
            {!isAuthenticated && <ErrorContent message={message} />}
          </Route>
        </Switch>
      </div>
    </div>
  )
}

export default Home
