import './navigation.css'
import React from 'react'
import { Menu, Icon, Button } from 'semantic-ui-react'
import ImageAvatar from './ImageAvatar/ImageAvatar'
import PropTypes from 'prop-types'
import { useAuth0 } from "@auth0/auth0-react";

const Navigation = ({ handleMenuToggle }) => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0()

  return (
    <div className='main menu'>
      <Menu>
        <Menu.Item
          className='logo'
          name='ExpenseTracker'
          onClick={() => handleMenuToggle()}
        >
          <Icon name='sidebar' size='large' />
        </Menu.Item>
        <Menu.Menu position='right'>
          {isAuthenticated && (
            <Menu.Item>
              <ImageAvatar image={user.picture} />
            </Menu.Item>
          )}
          <Menu.Item>
            <div>
              {!isAuthenticated && (
                <Button color='grey' content='Login' icon='sign in' size='tiny' labelPosition='right' onClick={() => loginWithRedirect({})}>
                </Button>
              )}
              {isAuthenticated && <Button color='grey' labelPosition='right' content='Logout' size='tiny' icon='sign out' onClick={() => logout()}>
              </Button>}
            </div>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </div>
  )
}

Navigation.propTypes = {
  handleMenuToggle: PropTypes.func
}

export default Navigation
