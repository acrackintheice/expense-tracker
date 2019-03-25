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
      homeMessage: 'You must be logged in in order to see content',
      url: 'http://localhost:8080/expenses/'
    };

    this.hasExpired = this.hasExpired.bind(this)
    this.onLogout = this.onLogout.bind(this)
    this.logout = this.logout.bind(this)
    this.onLoginSuccess = this.onLoginSuccess.bind(this)
    this.onLoginFailure = this.onLoginFailure.bind(this)
    this.onExpenseDelete = this.onExpenseDelete.bind(this)
    this.onExpenseSave = this.onExpenseSave.bind(this)
    this.getExpenses = this.getExpenses.bind(this)
  }

  componentDidMount() {
    if (localStorage.getItem('googleTokenObj')) {

      const parsedGoogleTokenObj = JSON.parse(localStorage.getItem('googleTokenObj'))

      if (!this.hasExpired(parsedGoogleTokenObj)) {
        this.setState({
          isLoggedIn: true,
          isLoading: true,
        });
        this.getExpenses();
      } else {
        this.setState({ homeMessage: 'Your current session has expired, re-login in order to access your expense list' })
        console.log('Current users token had already expired')
      }
    } else {
      console.log('No logged in user at app start')
    }
  }

  hasExpired(token) {
    return Date.now() > token.expires_at
  }

  onLogout(response) {
    console.log("This was google's response on logout:");
    console.log(response);
    this.logout()
  }

  logout() {
    this.setState({ isLoggedIn: false, expenses: [] });
    localStorage.removeItem('googleTokenObj');
    localStorage.removeItem('googleProfileObj');
  }

  onLoginSuccess(response) {
    console.log("This was google's response on success:");
    console.log(response);

    this.setState({ isLoggedIn: true });
    localStorage.setItem('googleTokenObj', JSON.stringify(response.tokenObj));
    localStorage.setItem('googleProfileObj', JSON.stringify(response.profileObj));
    this.getExpenses();
  }

  getExpenses() {

    const localGoogleTokenObj = localStorage.getItem('googleTokenObj')
    const localGoogleProfileObj = localStorage.getItem('googleProfileObj')

    if (localGoogleTokenObj && localGoogleProfileObj) {

      const parsedGoogleTokenObj = JSON.parse(localGoogleTokenObj)
      const parsedgoogleProfileObj = JSON.parse(localGoogleProfileObj)

      if (!this.hasExpired(parsedGoogleTokenObj)) {
        this.setState({ isLoading: true });
        fetch(this.state.url + parsedgoogleProfileObj.googleId, {
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

  onExpenseDelete(expense) {

    const localGoogleTokenObj = localStorage.getItem('googleTokenObj')

    if (localGoogleTokenObj) {

      const parsedGoogleTokenObj = JSON.parse(localGoogleTokenObj)

      if (!this.hasExpired(parsedGoogleTokenObj)) {
        fetch(this.state.url, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + parsedGoogleTokenObj.id_token
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
      else
        console.log('Unable to perform backend request because the current access token has already expired')
    } 
    else
      console.log('Unable to perform fetch, invalid access token')
  }

  onExpenseSave(expense) {

    const localGoogleTokenObj = localStorage.getItem('googleTokenObj')
    const localGoogleProfileObj = localStorage.getItem('googleProfileObj')

    if (localGoogleTokenObj && localGoogleProfileObj) {

      const parsedgoogleProfileObj = JSON.parse(localGoogleProfileObj);
      const parsedGoogleTokenObj = JSON.parse(localGoogleTokenObj);

      if (!this.hasExpired(parsedGoogleTokenObj)) {

        expense.user.name = parsedgoogleProfileObj.name
        expense.user.email = parsedgoogleProfileObj.email
        expense.user.googleId = parsedgoogleProfileObj.googleId

        fetch(this.state.url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + parsedGoogleTokenObj.id_token
          },
          body: JSON.stringify(expense)
        })
          .then(res => res.json())
          .then(
            (result) => {
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
      else
        console.log('Unable to perform backend request because the current access token has already expired')
    } 
    else
      console.log('Unable to perform fetch, invalid access token')
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
            <div className="login-message-div"> {this.state.homeMessage} </div>
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
