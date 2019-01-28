import React from 'react';
import Navigation from './Navigation';
import ExpenseList from './ExpenseList';
import { Grid } from 'semantic-ui-react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false, accessToken: '', isLoading: false, expenses: [], url: 'http://localhost:8080/expenses/' };

    this.onLogout = this.onLogout.bind(this);
    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLoginFailure = this.onLoginFailure.bind(this);
  }

  onLogout(response) {
    console.log("This was google's response on logout:");
    console.log(response);
    this.setState({ isLoggedIn: false, accessToken: '', expenses: [] });
  }

  onLoginSuccess(response) {
    console.log("This was google's response on success:");
    console.log(response);
    this.setState({ isLoggedIn: true, accessToken: response.tokenId, isLoading: true });

    fetch(this.state.url + response.profileObj.googleId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.state.accessToken
      }
    })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoading: false,
            expenses: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoading: false,
          });
        }
      )
  }

  onLoginFailure(response) {
    console.log("This was google's response on failure:");
    console.log(response);
  }

  render() {
    return (
      <div className="App">
        <Navigation
          isLoggedIn={this.state.isLoggedIn}
          onLoginSuccess={this.onLoginSuccess}
          onLoginFail={this.onLoginFailure}
          onLogout={this.onLogout} />
        <div className="content">
          <Grid>
          <Grid.Column key={1} width={2}>
            </Grid.Column>
            <Grid.Column key={2} width={12}>
              <ExpenseList expenses={this.state.expenses} isLoggedIn={this.state.isLoggedIn} isLoading={this.state.isLoading} />
            </Grid.Column>
            <Grid.Column key={3} width={2}>
            </Grid.Column>
          </Grid>
          
        </div>
      </div>
    );
  }
}

export default App;
