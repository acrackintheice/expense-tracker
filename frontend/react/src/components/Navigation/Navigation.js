import './navigation.css'
import React from 'react';
import {Menu} from 'semantic-ui-react'
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import ImageAvatar from './ImageAvatar/ImageAvatar';
import logo from './images/icon-snow.png'
import GoogleService from '../../services/GoogleService';

class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeItem: 'home',
        };
    }

    handleItemClick = (e, {name}) => this.setState({activeItem: name})

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
        const {activeItem} = this.state.activeItem;

        let userAvatarImageUrl = ''
        let userAvatarName = ''

        if (GoogleService.isGoogleInfoSet())
            if (!GoogleService.isGoogleInfoExpired()) {
                const googleProfile = GoogleService.getProfile();
                userAvatarImageUrl = googleProfile.imageUrl
                userAvatarName = googleProfile.name
            }

        let logoutButton = <GoogleLogout
                            buttonText="Logout"
                            onLogoutSuccess={this.handleLogout}>
                        </GoogleLogout>;

        let loginButton = <GoogleLogin
            clientId={GoogleService.clientId()}
            buttonText="Login"
            onSuccess={this.handleLoginSuccess}
            onFailure={this.handleLoginFailure}/>;

        let authButton = this.props.isLoggedIn ? logoutButton : loginButton;

        return (
            <Menu>
                <Menu.Item className="logo" name='ExpenseTracker' active={activeItem === 'expenses'} onClick={this.handleItemClick}>
                    <ImageAvatar image={logo} username="Expense Tracker" classname=""/>
                </Menu.Item>

                <Menu.Menu position='right'>
                    {
                        this.props.isLoggedIn &&
                        <Menu.Item>
                            <ImageAvatar image={userAvatarImageUrl} username={userAvatarName}/>
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