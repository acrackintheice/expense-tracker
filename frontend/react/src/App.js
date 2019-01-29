import React from 'react';
import Navigation from './Navigation';
import ExpenseList from './ExpenseList';
import ExpenseFilter from './ExpenseFilter';
import './index.css'
import { Grid } from 'semantic-ui-react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      accessToken: '',
      isLoading: false,
      expenses: [],
      filteredExpenses: [],
      url: 'http://localhost:8080/expenses/'

    };

    this.onLogout = this.onLogout.bind(this);
    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLoginFailure = this.onLoginFailure.bind(this);
    this.onFilterBy = this.onFilterBy.bind(this);
  }

  onLogout(response) {
    console.log("This was google's response on logout:");
    console.log(response);
    this.setState({ isLoggedIn: false, accessToken: '', expenses: [], filteredExpenses: [] });
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
            expenses: result.sort(function (a, b) {
              return new Date(b.date) - new Date(a.date);
            }),
            filteredExpenses: result.sort(function (a, b) {
              return new Date(b.date) - new Date(a.date);
            })
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

  compare(attribute, expense, comp, value) {
    switch (comp) {
      case '>=':
        return expense[attribute] >= value
      case '>':
        return expense[attribute] > value
      case '<=':
        return expense[attribute] <= value
      case '<':
        return expense[attribute] < value
      case '=':
        return expense[attribute] === value
      case 'contains':
        return value.includes(expense[attribute])
      default:
        return expense[attribute] === value
    }
  }

  onFilterBy(attribute, value, comp) {
    let newFilteredExps = this.state.expenses.filter(e => this.compare(attribute, e, comp, value))
    this.setState({ filteredExpenses: newFilteredExps })
  }

  render() {

    if (this.state.isLoading) {
      return (
        <div className="App">
          <Navigation
            isLoggedIn={this.state.isLoggedIn}
            onLoginSuccess={this.onLoginSuccess}
            onLoginFail={this.onLoginFailure}
            onLogout={this.onLogout} />
          <div>Loading...</div>
        </div>
      )
    }
    else if (!this.state.isLoggedIn) {
      return (
        <div className="App">
          <Navigation
            isLoggedIn={this.state.isLoggedIn}
            onLoginSuccess={this.onLoginSuccess}
            onLoginFail={this.onLoginFailure}
            onLogout={this.onLogout} />
          <div className="login-message-parent">
            <div className="login-message-div"> You must login ir order to see content </div>
          </div>
        </div>
      )
    }
    else {
      return (
        <div className="App">
          <Navigation
            isLoggedIn={this.state.isLoggedIn}
            onLoginSuccess={this.onLoginSuccess}
            onLoginFail={this.onLoginFailure}
            onLogout={this.onLogout} />
          <div className="app-content">
            <Grid>
              <Grid.Column key={1} width={4}>
                <ExpenseFilter onFilterBy={this.onFilterBy} expenses={this.state.expenses} />
              </Grid.Column>
              <Grid.Column key={2} width={8}>
                <ExpenseList expenses={this.state.filteredExpenses} isLoggedIn={this.state.isLoggedIn} isLoading={this.state.isLoading} />
              </Grid.Column>
              <Grid.Column key={3} width={4}>
              </Grid.Column>
            </Grid>
          </div>
        </div>
      )
    }
  }
}

export default App;
