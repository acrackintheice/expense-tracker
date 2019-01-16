import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Navigation from './Navigation';
import ExpensesTable from './ExpensesTable';

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#ffffff',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    // error: will use the default color
  },
});


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false, accessToken: '', isLoading: false, expenses: [], url: 'http://localhost:8080/expenses' };

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

    fetch(this.state.url, {
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
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Navigation
            isLoggedIn={this.state.isLoggedIn}
            onLoginSuccess={this.onLoginSuccess}
            onLoginFail={this.onLoginFailure}
            onLogout={this.onLogout} />
          <ExpensesTable expenses={this.state.expenses} isLoading={this.state.isLoading} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
