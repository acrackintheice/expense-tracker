import React from 'react';
import Navigation from './Navigation';
import ExpenseList from './ExpenseList';
/* import ExpenseFilter from './ExpenseFilter'; */
import './index.css'
import { Grid } from 'semantic-ui-react';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      isLoading: false,
      expenses: [],
      url: 'http://localhost:8080/expenses/'
    };

    this.onLogout = this.onLogout.bind(this);
    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLoginFailure = this.onLoginFailure.bind(this);
    this.onFilterBy = this.onFilterBy.bind(this);
    this.onExpenseDelete = this.onExpenseDelete.bind(this);
    this.onExpenseSave = this.onExpenseSave.bind(this);
    this.getExpenses = this.getExpenses.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem('googleTokenObj')) {

      const parsedGoogleTokenObj = JSON.parse(localStorage.getItem('googleTokenObj'))

      if (parsedGoogleTokenObj.expires_at > Date.now()) {
        this.setState({
          isLoggedIn: true,
          isLoading: true,
        });
        this.getExpenses();
      } else {
        console.log('Current users token had already expired')
      }
    } else {
      console.log('No logged in user at app start')
    }
  }

  onLogout(response) {
    console.log("This was google's response on logout:");
    console.log(response);
    this.setState({ isLoggedIn: false, expenses: [] });
    localStorage.removeItem('googleTokenObj');
    localStorage.removeItem('googleProfileObject');
  }

  onLoginSuccess(response) {
    console.log("This was google's response on success:");
    console.log(response);

    this.setState({ isLoggedIn: true });
    localStorage.setItem('googleTokenObj', JSON.stringify(response.tokenObj));
    localStorage.setItem('googleProfileObject', JSON.stringify(response.profileObj));
    this.getExpenses();
  }

  getExpenses() {

    const localGoogleTokenObj = localStorage.getItem('googleTokenObj')
    const localGoogleProfileObject = localStorage.getItem('googleProfileObject')

    if (localGoogleTokenObj && localGoogleProfileObject) {

      const parsedGoogleTokenObj = JSON.parse(localGoogleTokenObj)
      const parsedGoogleProfileObject = JSON.parse(localGoogleProfileObject)

      if (parsedGoogleTokenObj.expires_at > Date.now()) {
        this.setState({ isLoading: true });
        fetch(this.state.url + parsedGoogleProfileObject.googleId, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + parsedGoogleTokenObj.id_token
          }
        })
          .then(result => result.json())
          .then(
            (result) => {
              this.setState({
                isLoading: false,
                expenses: result.sort(function (a, b) {
                  return new Date(b.date) - new Date(a.date);
                })
              });
            },
            (error) => {
              console.log(error)
              this.setState({
                isLoading: false,
              });
            }
          )
      }
      else
        console.log('Unable to perform fetch because the current access token has already expired')
    }
    else
      console.log('Unable to perform fetch, invalid access token')
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
  }

  onExpenseDelete(expense) {

    fetch(this.state.url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.state.accessToken
      },
      body: JSON.stringify(expense)
    })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          this.setState({
            expenses: this.state.expenses.filter(e => e !== expense)
          })
        },
        (error) => {
          console.log(error)
        }
      )
  }

  onExpenseSave(expense) {
    // Adds user information to the expense
    expense.user.name = this.state.googleProfileObject.name
    expense.user.email = this.state.googleProfileObject.email
    expense.user.googleId = this.state.googleProfileObject.googleId

    fetch(this.state.url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.state.accessToken
      },
      body: JSON.stringify(expense)
    })
      .then(res => res.json())
      .then(
        (result) => {
          // After adding a new expense to the list, it is insert at the end of the
          // expenses list and shown to the user even if it doesn't satisfy
          // the current filters. If the user re-filters the list and the new
          // expense also doesn't satisfy the new filtering, it will be filtered
          // out normally.
          console.log(result)
          let newExpenses = this.state.expenses;
          newExpenses.unshift(expense);
          this.setState({
            expenses: newExpenses
          })
        },
        (error) => {
          console.log(error)
          alert('Error when inserting the new Expense in the back-end')
        }
      )
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
        <div className="app">
          <Navigation
            isLoggedIn={this.state.isLoggedIn}
            onLoginSuccess={this.onLoginSuccess}
            onLoginFail={this.onLoginFailure}
            onLogout={this.onLogout} />
          <div className="login-message-parent">
            <div className="login-message-div"> You must be logged in in order to see content </div>
          </div>
        </div>
      )
    }
    else {
      return (
        <div className="app">
          <Navigation
            isLoggedIn={this.state.isLoggedIn}
            onLoginSuccess={this.onLoginSuccess}
            onLoginFail={this.onLoginFailure}
            onLogout={this.onLogout} />
          <div className="app-content">
            <Grid>
              <Grid.Column key={1} width={4}>
                {/* <ExpenseFilter onFilterBy={this.onFilterBy} expenses={this.state.expenses} /> */}
              </Grid.Column>
              <Grid.Column key={2} width={8}>
                <ExpenseList
                  onSave={this.onExpenseSave}
                  onDelete={this.onExpenseDelete}
                  expenses={this.state.expenses}
                  isLoggedIn={this.state.isLoggedIn}
                  isLoading={this.state.isLoading} />
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
