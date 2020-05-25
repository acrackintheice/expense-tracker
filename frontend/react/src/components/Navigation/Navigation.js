import './navigation.css'
import React from 'react'
import { Menu, Icon } from 'semantic-ui-react'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import ImageAvatar from './ImageAvatar/ImageAvatar'
import GoogleService from '../../services/GoogleService'
import { FormattedMessage } from 'react-intl'
import UserContext from '../../context/UserContext'
import PropTypes from 'prop-types'

const Navigation = props => {
  const handleMenuToggle = () => {
    props.handleMenuToggle()
  }
  const handleLoginSuccess = response => props.login(response)
  const handleLoginFailure = response =>
    alert('This was google\'s response on failure: ' + response.details)
  const handleLogout = response => props.logout(response)

  const createLogoutButton = () => (
    <FormattedMessage
      id='label.button.logout'
      defaultMessage='Logout'
      description='Logout button label'
    >
      {label => (
        <GoogleLogout
          clientId={GoogleService.clientId()}
          disabled={false} buttonText={label}
          onLogoutSuccess={handleLogout}
        />
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
          isSignedIn
        />
      )}
    </FormattedMessage>
  )

  const createAuthButton = googleInfo =>
    googleInfo ? createLogoutButton() : createLoginButton()

  return (
    <UserContext.Consumer>
      {googleInfo => (
        <div className='main menu'>
          <Menu>
            <Menu.Item
              className='logo'
              name='ExpenseTracker'
              onClick={handleMenuToggle}
            >
              <Icon name='sidebar' size='large' />
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
        </div>
      )}
    </UserContext.Consumer>
  )
}

Navigation.propTypes = {
  logout: PropTypes.func,
  login: PropTypes.func,
  handleMenuToggle: PropTypes.func
}

export default Navigation
