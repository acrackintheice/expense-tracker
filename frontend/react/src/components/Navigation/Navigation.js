import './navigation.css'
import React, { useState } from 'react'
import { Menu } from 'semantic-ui-react'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import ImageAvatar from './ImageAvatar/ImageAvatar'
import logo from './images/icon-snow.png'
import GoogleService from '../../services/GoogleService'
import { FormattedMessage } from 'react-intl'
import UserContext from '../../context/UserContext'

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

  const createAuthButton = googleInfo =>
    googleInfo ? createLogoutButton() : createLoginButton()

  return (
    <UserContext.Consumer>
      {googleInfo => (
        <Menu>
          <Menu.Item
            className='logo'
            name='ExpenseTracker'
            active={activeItem === 'expenses'}
            onClick={handleItemClick}
          >
            <ImageAvatar image={logo} />
          </Menu.Item>

          <Menu.Menu position='right'>
            {googleInfo && (
              <Menu.Item>
                <ImageAvatar image={googleInfo.profile.imageUrl} />
              </Menu.Item>
            )}
            <Menu.Item>{createAuthButton(googleInfo)}</Menu.Item>
          </Menu.Menu>
        </Menu>
      )}
    </UserContext.Consumer>
  )
}

export default Navigation
