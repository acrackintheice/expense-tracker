class ExpenseService {
  static getUrl = () => 'http://localhost:8080/expenses/'

  static getHeaders = token => ({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: 'Bearer ' + token
  })

  static getAll (accessToken) {
    return fetch(ExpenseService.getUrl(), {
      method: 'GET',
      headers: this.getHeaders(accessToken)
    })
  }

  static getAllByUser (userId, accessToken) {
    return fetch(ExpenseService.getUrl() + '?user__googleId=' + userId, {
      method: 'GET',
      headers: this.getHeaders(accessToken)
    })
  }

  static update (accessToken, expense) {
    return fetch(ExpenseService.getUrl(), {
      method: 'PUT',
      headers: this.getHeaders(accessToken),
      body: JSON.stringify(expense)
    })
  }

  static create (accessToken, expense) {
    return fetch(ExpenseService.getUrl(), {
      method: 'POST',
      headers: this.getHeaders(accessToken),
      body: JSON.stringify(expense)
    })
  }

  static delete (accessToken, expense) {
    return fetch(expense.url, {
      method: 'DELETE',
      headers: this.getHeaders(accessToken)
    })
  }
}

export default ExpenseService
