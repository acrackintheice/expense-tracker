class ExpenseService {

    static getUrl = () => 'http://localhost:8080/expenses/'

    // Returns a Promise for a list of expenses
    static getAll(userId, accessToken) {
        return fetch(ExpenseService.getUrl() + userId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        })
    }

    // Returns a Promise for the deleted expense
    static save(accessToken, expense) {
        return fetch(ExpenseService.getUrl(), {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + accessToken
            },
            body: JSON.stringify(expense)
          })
    }

    static delete(accessToken, expense) {
        return fetch(ExpenseService.getUrl(), {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + accessToken
            },
            body: JSON.stringify(expense)
          })
    }
}

export default (ExpenseService); 