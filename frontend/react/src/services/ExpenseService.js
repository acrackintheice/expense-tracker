class ExpenseService {

    static getUrl = () => 'http://localhost:8080/expenses/'

    // Returns a Promise for a list of expenses
    static getAll(userId, accessToken) {
        return fetch(ExpenseService.getUrl(), {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        })
    }

    static getAllByUser(userId, accessToken) {
        return fetch(ExpenseService.getUrl() + '?user__googleId=' +  userId, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        })
    }

    static update(accessToken, expense) {
        return fetch(ExpenseService.getUrl(), {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + accessToken
            },
            body: JSON.stringify(expense)
          })
    }

    static create(accessToken, expense) {
        return fetch(ExpenseService.getUrl(), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + accessToken
            },
            body: JSON.stringify(expense)
          })
    }

    static delete(accessToken, expense) {
        return fetch(expense.url, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + accessToken
            },
          })
    }
}

export default (ExpenseService); 