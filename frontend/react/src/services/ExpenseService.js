import * as ServiceUtils from './ServiceUtils'

const url = 'http://localhost:8080/expenses'

export const getAll = async token => {
  const response = await fetch(url, {
    method: 'GET',
    headers: ServiceUtils.getHeaders(token)
  })
  const handledResponse = await ServiceUtils.handleResponse(response)
  const hal = await handledResponse.json()
  return hal._embedded.expenses
}

export const findAllByGoogleId = async (googleId, token) => {
  const search = `/search/findAllByUserGoogleId?googleId=${googleId}`
  const response = await fetch(url + search, {
    method: 'GET',
    headers: ServiceUtils.getHeaders(token)
  })
  const handledResponse = await ServiceUtils.handleResponse(response)
  const hal = await handledResponse.json()
  return hal._embedded.expenses
}

export const sortExpenses = expenses =>
  expenses.sort((a, b) => new Date(b.date) - new Date(a.date))

export const update = async (token, expense) => {
  const response = await fetch(url, {
    method: 'PUT',
    headers: ServiceUtils.getHeaders(token),
    body: JSON.stringify(expense)
  })
  return ServiceUtils.handleResponse(response)
}

export const create = async (expense, user, token) => {
  expense.tag = expense.tag._links.self.href
  expense.user = user._links.self.href
  const createExpense = await fetch(url, {
    method: 'POST',
    headers: ServiceUtils.getHeaders(token),
    body: JSON.stringify(expense)
  })
  const projetction = '?projection=completeExpense'
  const fetchExpense = await fetch(createExpense.headers.get('Location') + projetction)
  const newExpense = await ServiceUtils.handleResponse(fetchExpense)
  return newExpense.json()
}

// Named 'remove' due to 'delete' being a reserved keyword in JS
export const remove = async (token, expense) => {
  const response = await fetch(expense._links.self.href, {
    method: 'DELETE',
    headers: ServiceUtils.getHeaders(token)
  })
  return ServiceUtils.handleResponse(response)
}
