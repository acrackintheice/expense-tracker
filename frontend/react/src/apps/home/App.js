import React from 'react';
import Navigation from '../../components/Navigation/Navigation';
import ExpenseList from '../../components/ExpenseList/ExpenseList';
import './app.css'
import ExpenseService from '../../services/ExpenseService';
import GoogleService from '../../services/GoogleService';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: false,
            isLoading: false,
            expenses: [],
            homeMessage: 'You must be logged in order to see content',
            url: 'http://localhost:8080/expenses/'
        };

        this.onLogout = this.onLogout.bind(this)
        this.logout = this.logout.bind(this)
        this.onLoginSuccess = this.onLoginSuccess.bind(this)
        this.onLoginFailure = this.onLoginFailure.bind(this)
        this.onExpenseDelete = this.onExpenseDelete.bind(this)
        this.onExpenseSave = this.onExpenseSave.bind(this)
        this.getExpenses = this.getExpenses.bind(this)
        this.handleErrors = this.handleErrors.bind(this)
    }

    componentDidMount() {
        if (GoogleService.isGoogleInfoSet()) {
            if (!GoogleService.isGoogleInfoExpired()) {
                this.setState({
                    isLoggedIn: true
                });
                this.getExpenses(GoogleService.getToken().id_token, GoogleService.getProfile().googleId);
            } else {
                this.setState({ homeMessage: 'Your current session has expired, re-login in order to access your expense list' })
                console.log('Current token has already expired')
            }
        } else {
            this.setState({ homeMessage: 'You must be logged in order to see content' })
            console.log('No logged in user at app start')
        }
    }

    onLogout(responseponse) {
        console.log("This was google's responseponse on logout:");
        console.log(responseponse);
        this.logout()
    }

    logout() {
        this.setState({ isLoggedIn: false, expenses: [], homeMessage: 'You must be logged in order to see content' });
        GoogleService.clearGoogleInfo();
    }

    onLoginSuccess(responseponse) {
        console.log("This was google's responseponse on success:");
        console.log(responseponse);
        // Sets the google info on local storage
        GoogleService.setGoogleInfo(responseponse)
        // Gets the all expenses for the logged in user
        this.setState({ isLoggedIn: true })
        this.getExpenses(responseponse.tokenObj.id_token, responseponse.profileObj.googleId)
    }

    onLoginFailure(responseponse) {
        console.log("This was google's responseponse on failure:");
        console.log(responseponse);
    }

    getExpenses(googleAccessToken, googleId) {
        this.setState({ isLoading: true })
        ExpenseService.getAllByUser(googleId, googleAccessToken)
            .then(response => this.handleErrors(response))
            .then(responseult => responseult.json())
            .then((responseult) => {
                this.setState({
                    isLoading: false,
                    expenses: responseult.sort(function (a, b) {
                        return new Date(b.date) - new Date(a.date);
                    })
                });
            })
            .catch((error) => {
                alert(error)
                this.setState({
                    isLoading: false,
                });
            })
    }

    onExpenseDelete(expense) {
        if (GoogleService.isGoogleInfoSet) {
            if (!GoogleService.isGoogleInfoExpired()) {
                const googleAccessToken = GoogleService.getToken().id_token
                ExpenseService.delete(googleAccessToken, expense)
                    .then(response => this.handleErrors(response))
                    .then(() => this.setState({ expenses: this.state.expenses.filter(e => e !== expense)}))
                    .catch((error) => alert(error))
            } else
                alert('Unable to perform backend request because the current access token has already expired')
        } else
            alert('Unable to perform fetch, invalid access token')
    }

    async onExpenseSave(expense) {
        if (GoogleService.isGoogleInfoSet) {
            if (!GoogleService.isGoogleInfoExpired()) {

                const googleProfile = GoogleService.getProfile()
                const googleAccessToken = GoogleService.getToken().id_token

                expense.user.name = googleProfile.name
                expense.user.email = googleProfile.email
                expense.user.googleId = googleProfile.googleId

                return ExpenseService.create(googleAccessToken, expense)
                    .then(response => this.handleErrors(response))
                    .then((response) => {
                        expense.url = response.headers.get('location')
                        let newExpenses = this.state.expenses;
                        newExpenses.unshift(expense);
                        this.setState({expenses: newExpenses})
                        return true
                    })
                    .catch((error) => {
                        error.json()
                            .then((errors) => {
                                if (errors.location)
                                    alert('Error at field Location: ' + errors.location)
                                    return false
                            })
                            .catch(() => {
                                alert('Json parsing error on expense creation')
                                return false        
                            })
                    })
            } else
                alert('Unable to perform backend request because the current access token has already expired')
                return false
        } else
            alert('Unable to perform fetch, invalid access token')
            return false
    }

    handleErrors(responseponse) {
        if (responseponse.ok)
            return  responseponse
        else
            throw responseponse
    }

    render() {
        if (this.state.isLoading) {
            return (
                <div className="App">
                    <div className="app-menu">
                        <Navigation
                            isLoggedIn={this.state.isLoggedIn}
                            onLoginSuccess={this.onLoginSuccess}
                            onLoginFail={this.onLoginFailure}
                            onLogout={this.onLogout} />
                    </div>
                    <div className="app-content">Loading...</div>
                    <div className="app-summary"></div>
                </div>
            )
        } else if (!this.state.isLoggedIn) {
            return (
                <div className="app">
                    <div className="app-menu">
                        <Navigation
                            isLoggedIn={this.state.isLoggedIn}
                            onLoginSuccess={this.onLoginSuccess}
                            onLoginFail={this.onLoginFailure}
                            onLogout={this.onLogout} />
                    </div>
                    <div className="app-content login-message-parent">
                        <div className="login-message-div"> {this.state.homeMessage} </div>
                    </div>
                    <div className="app-summary"></div>
                </div>
            )
        } else {
            return (
                <div className="app">
                    <div className="app-menu">
                        <Navigation
                            isLoggedIn={this.state.isLoggedIn}
                            onLoginSuccess={this.onLoginSuccess}
                            onLoginFail={this.onLoginFailure}
                            onLogout={this.onLogout} />
                    </div>
                    <div className="app-content">
                        <ExpenseList
                            onSave={this.onExpenseSave}
                            onDelete={this.onExpenseDelete}
                            expenses={this.state.expenses}
                            isLoggedIn={this.state.isLoggedIn}
                            isLoading={this.state.isLoading} />
                    </div>
                    <div className="app-summary"> </div>
                </div>
            )
        }
    }
}

export default App;
