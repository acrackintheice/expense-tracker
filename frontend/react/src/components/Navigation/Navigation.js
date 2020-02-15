import './navigation.css'
import React, { useState } from 'react'
import { Menu } from 'semantic-ui-react'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import ImageAvatar from './ImageAvatar/ImageAvatar'
import logo from './images/icon-snow.png'
import GoogleService from '../../services/GoogleService'

const Navigation = (props) => {
  const [activeItem, setActiveItem] = useState('home')

  const handleItemClick = (e, { name }) => setActiveItem(name)

  const handleLoginSuccess = response => props.onLoginSuccess(response)

  const handleLoginFailure = response => props.onLoginFail(response)

  const handleLogout = response => this.props.onLogout(response)

  const createLogoutButton = () => (
    <GoogleLogout buttonText='Logout' onLogoutSuccess={handleLogout} />
  )

  const createLoginButton = () => (
    <GoogleLogin
      clientId={GoogleService.clientId()}
      buttonText='Login'
      onSuccess={handleLoginSuccess}
      onFailure={handleLoginFailure}
    />
  )

  const createAuthButton = () => (props.isLoggedIn ? createLogoutButton() : createLoginButton())

  return (
    <Menu>
      <Menu.Item
        className='logo'
        name='ExpenseTracker'
        active={activeItem === 'expenses'}
        onClick={handleItemClick}
      >
        <ImageAvatar image={logo} username='Expense Tracker' classname='' />
      </Menu.Item>

      <Menu.Menu position='right'>
        {props.isLoggedIn && (
          <Menu.Item>
            <ImageAvatar image={GoogleService.getAvatar.image} username={GoogleService.getAvatar.name} />
          </Menu.Item>
        )}
        <Menu.Item>{createAuthButton()}</Menu.Item>
      </Menu.Menu>
    </Menu>
  )
}

export default Navigation
