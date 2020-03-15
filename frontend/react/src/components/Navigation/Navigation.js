import './navigation.css'
import React, { useState } from 'react'
import { Menu } from 'semantic-ui-react'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import ImageAvatar from './ImageAvatar/ImageAvatar'
import logo from './images/icon-snow.png'
import GoogleService from '../../services/GoogleService'
import { FormattedMessage } from 'react-intl'

const Navigation = props => {
  const [activeItem, setActiveItem] = useState('home')

  const handleItemClick = (e, { name }) => setActiveItem(name)
  const handleLoginSuccess = response => props.login(response)
  const handleLoginFailure = response =>
    alert("This was google's responseponse on failure: " + response)
  const handleLogout = response => props.logout(response)

  const createLogoutButton = () => (
    <FormattedMessage
      id='label.button.logout'
      defaultMessage='Logout'
      description='Logout button label'
    >
      {label => (
        <GoogleLogout buttonText={label} onLogoutSuccess={handleLogout} />
      )}
    </FormattedMessage>
  )

  const createLoginButton = () => (
    <FormattedMessage
      id='label.button.login'
      defaultMessage='Login'
      description='Login button label'
    >
      {label => (
        <GoogleLogin
          clientId={GoogleService.clientId()}
          buttonText={label}
          onSuccess={handleLoginSuccess}
          onFailure={handleLoginFailure}
        />
      )}
    </FormattedMessage>
  )

  const createAuthButton = () =>
    props.userInfo ? createLogoutButton() : createLoginButton()

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
        {props.userInfo && (
          <Menu.Item>
            <ImageAvatar
              image={GoogleService.getAvatar().image}
            />
          </Menu.Item>
        )}
        <Menu.Item>{createAuthButton()}</Menu.Item>
      </Menu.Menu>
    </Menu>
  )
}

export default Navigation
