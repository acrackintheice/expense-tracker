import React from 'react';
import { Menu } from 'semantic-ui-react'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import ImageAvatar from './ImageAvatar';
import blueExpIcon from './images/blue-exp-round.ico'

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: 'home', userAvatarName: '', userAvatarImageUrl: '' };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  handleLoginSuccess = (response) => {
    this.setState({ userAvatarName: response.profileObj.name });
    this.setState({ userAvatarImageUrl: response.profileObj.imageUrl });
    this.props.onLoginSuccess(response);
  }

  handleLoginFailure = (response) => {
    this.props.onLoginFail(response);
  }

  handleLogout = (response) => {
    this.setState({ userAvatarName: '' });
    this.setState({ userAvatarImageUrl: '' });
    this.props.onLogout(response);
  }

  render() {
    const { activeItem } = this.state.activeItem;

    let loginButton = <GoogleLogout
      buttonText="Logout"
      onLogoutSuccess={this.handleLogout}>
    </GoogleLogout>;

    let logoutButton = <GoogleLogin
      clientId="707870445329-iu74qui75vgsh1kthhnit54unadb9tva.apps.googleusercontent.com"
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
              <ImageAvatar image={this.state.userAvatarImageUrl} username={this.state.userAvatarName} />
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