import * as ServiceUtils from './ServiceUtils'

const baseUrl = 'http://api.acrackintheice.com/expenses'

export const getAll = async token => {
  const response = await fetch(baseUrl, {
    method: 'GET',
  })
  const handledResponse = await ServiceUtils.handleResponse(response)
  const hal = await handledResponse.json()
  return hal._embedded.expenses
}

export const findAllByGoogleId = async (googleId, token) => {
  const search = `/search/findAllByUserGoogleId?googleId=${googleId}`
  const sort = '&sort=date'
  const response = await fetch(baseUrl + search + sort, {
    method: 'GET',
  })
  const handledResponse = await ServiceUtils.handleResponse(response)
  const hal = await handledResponse.json()
  return hal._embedded.expenses
}

export const sortExpenses = expenses =>
  expenses.sort((a, b) => new Date(b.date) - new Date(a.date))

export const update = async (token, expense) => {
  const response = await fetch(baseUrl, {
    method: 'PUT',
    body: JSON.stringify(expense)
  })
  return ServiceUtils.handleResponse(response)
}

// Named 'remove' due to 'delete' being a reserved keyword in JS
export const remove = async (token, expense) => {
  const response = await fetch(expense._links.self.href, {
    method: 'DELETE'
  })
  return ServiceUtils.handleResponse(response)
}
