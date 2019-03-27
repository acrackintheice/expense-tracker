import React from 'react';
import Navigation from '../../components/Navigation/Navigation';
import ExpenseList from '../../components/ExpenseList/ExpenseList';
import './home.css'
import { Grid } from 'semantic-ui-react';
import ExpenseService from '../../services/ExpenseService';
import GoogleService from '../../services/GoogleService';


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

    this.onLogout = this.onLogout.bind(this)
    this.logout = this.logout.bind(this)
    this.onLoginSuccess = this.onLoginSuccess.bind(this)
    this.onLoginFailure = this.onLoginFailure.bind(this)
    this.onExpenseDelete = this.onExpenseDelete.bind(this)
    this.onExpenseSave = this.onExpenseSave.bind(this)
    this.getExpenses = this.getExpenses.bind(this)
  }

  componentDidMount() {
    if (GoogleService.isGoogleInfoSet()) {
      if (!GoogleService.isGoogleInfoExpired()) {
        this.setState({
          isLoggedIn: true
        });
        this.getExpenses(GoogleService.getToken().id_token, GoogleService.getProfile().googleId);
      }
      else {
        this.setState({ homeMessage: 'Your current session has expired, re-login in order to access your expense list' })
        console.log('Current token has already expired')
      }
    }
    else {
      this.setState({ homeMessage: 'You must be logged in in order to see content' })
      console.log('No logged in user at app start')
    }
  }

  onLogout(response) {
    console.log("This was google's response on logout:");
    console.log(response);
    this.logout()
  }

  logout() {
    this.setState({ isLoggedIn: false, expenses: [] });
    GoogleService.clearGoogleInfo();
  }

  onLoginSuccess(response) {
    console.log("This was google's response on success:");
    console.log(response);
    // Sets the google info on local storage
    GoogleService.setGoogleInfo(response)
    // Gets the all expenses for the logged in user
    this.setState({ isLoggedIn : true})
    this.getExpenses(response.tokenObj.id_token, response.profileObj.googleId)
  }

  getExpenses(googleAccessToken, googleId) {

    this.setState({isLoading: true})

    ExpenseService.getAll(googleId, googleAccessToken)
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

  onLoginFailure(response) {
    console.log("This was google's response on failure:");
    console.log(response);
  }

  onExpenseDelete(expense) {

    if (GoogleService.isGoogleInfoSet) {
      if (!GoogleService.isGoogleInfoExpired()) {

        const googleAccessToken = GoogleService.getToken().id_token

        ExpenseService.delete(googleAccessToken, expense)
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

    if (GoogleService.isGoogleInfoSet) {
      if (!GoogleService.isGoogleInfoExpired()) {

        const googleProfile = GoogleService.getProfile() 
        const googleAccessToken = GoogleService.getToken().id_token

        expense.user.name = googleProfile.name
        expense.user.email = googleProfile.email
        expense.user.googleId = googleProfile.googleId

        ExpenseService.save(googleAccessToken, expense)
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
              <Grid.Column key={1} width={3}>
              </Grid.Column>
              <Grid.Column key={2} width={10}>
                <ExpenseList
                  onSave={this.onExpenseSave}
                  onDelete={this.onExpenseDelete}
                  expenses={this.state.expenses}
                  isLoggedIn={this.state.isLoggedIn}
                  isLoading={this.state.isLoading} />
              </Grid.Column>
              <Grid.Column key={3} width={3}>
              </Grid.Column>
            </Grid>
          </div>
        </div>
      )
    }
  }
}

export default App;
