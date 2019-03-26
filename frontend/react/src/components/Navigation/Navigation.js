import React from 'react';
import { Menu } from 'semantic-ui-react'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import ImageAvatar from './ImageAvatar/ImageAvatar';
import blueExpIcon from './images/blue-exp-round.ico'
import GoogleService from '../../services/GoogleService';

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: 'home',
    };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  handleLoginSuccess = (response) => {
    this.props.onLoginSuccess(response);
  }

  handleLoginFailure = (response) => {
    this.props.onLoginFail(response);
  }

  handleLogout = (response) => {
    this.props.onLogout(response);
  }

  render() {
    const { activeItem } = this.state.activeItem;

    let userAvatarImageUrl = ''
    let userAvatarName = ''

    if (GoogleService.isGoogleInfoSet())
      if (!GoogleService.isGoogleInfoExpired()) {
        const googleProfile = GoogleService.getProfile();
        userAvatarImageUrl = googleProfile.imageUrl
        userAvatarName = googleProfile.name
      }

    let loginButton = <GoogleLogout
      buttonText="Logout"
      onLogoutSuccess={this.handleLogout}>
    </GoogleLogout>;

    let logoutButton = <GoogleLogin
      clientId={GoogleService.clientId()}
      buttonText="Login"
      onSuccess={this.handleLoginSuccess}
      onFailure={this.handleLoginFailure} />;

    let authButton = this.props.isLoggedIn ? loginButton : logoutButton;

    return (
      <Menu size='small'>
        <Menu.Item>
          <ImageAvatar image={blueExpIcon} />
        </Menu.Item>
        <Menu.Item name='ExpenseTracker' active={activeItem === 'expenses'} onClick={this.handleItemClick} />

        <Menu.Menu position='right'>
          {
            this.props.isLoggedIn &&
            <Menu.Item>
              <ImageAvatar image={userAvatarImageUrl} username={userAvatarName} />
            </Menu.Item>
          }
          <Menu.Item>
            {authButton}
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}


export default (Navigation);