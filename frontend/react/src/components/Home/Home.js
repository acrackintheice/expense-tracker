import React, { useState } from 'react'
import Navigation from '../Navigation/Navigation'
import Sidebar from '../Sidebar/Sidebar'
import ErrorContent from '../ErrorContent/ErrorContent'
import ExpenseList from '../ExpenseList/ExpenseList'
import { Route, Switch } from 'react-router-dom'
import ExpenseForm from '../ExpenseForm/ExpenseForm'
import PrivateRoute from '../../routes/PrivateRoute'
import Tags from '../Tags/Tags'
import {NotificationContainer} from 'react-notifications';
import './home.css'

const Home = () => {
  const [message] = useState('message.login.required')
  const [showMenu, setShowMenu] = useState(true)

  const handleMenuToggle = () => {
    setShowMenu(!showMenu)
  }

  return (
    <div className={showMenu ? 'app' : 'app mobile'}>
      <Navigation handleMenuToggle={handleMenuToggle} />
      {showMenu && <Sidebar />}
      <div className='content'>
        <Switch>
          <PrivateRoute path='/stats'>
            <div>Stats</div>
          </PrivateRoute>
          <PrivateRoute path='/code'>
            <div>Code</div>
          </PrivateRoute>
          <PrivateRoute path='/settings'>
            <div>Settings</div>
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
          <PrivateRoute>
            <ExpenseList />
          </PrivateRoute>
        </Switch>
      </div>
      <NotificationContainer/>
    </div>
  )
}

export default Home
