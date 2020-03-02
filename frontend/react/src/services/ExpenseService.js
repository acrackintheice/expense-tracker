import * as ServiceUtils from './ServiceUtils'
import GoogleService from './GoogleService'

const url = 'http://localhost:8080/expenses'

export const getAll = async accessToken => {
  const response = await fetch(url, {
    method: 'GET',
    headers: ServiceUtils.getHeaders(accessToken)
  })
  const handledResponse = await ServiceUtils.handleResponse(response)
  const hal = await handledResponse.json()
  return hal._embedded.expenses
}

export const getAllByUser = async (userId, accessToken) => {
  const response = await fetch(url + '?user__googleId=' + userId, {
    method: 'GET',
    headers: ServiceUtils.getHeaders(accessToken)
  })
  const handledResponse = await ServiceUtils.handleResponse(response)
  const hal = await handledResponse.json()
  return hal._embedded.expenses
}

export const update = async (accessToken, expense) => {
  const response = await fetch(url, {
    method: 'PUT',
    headers: ServiceUtils.getHeaders(accessToken),
    body: JSON.stringify(expense)
  })
  return ServiceUtils.handleResponse(response)
}

export const create = async expense => {
  const googleInfo = await GoogleService.getGoogleInfo()
  const googleProfile = googleInfo.profile
  expense._link = {
    user: {
      name: googleProfile.name,
      email: googleProfile.email,
      googleId: googleProfile.googleId
    }
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: ServiceUtils.getHeaders(googleInfo.token.id_token),
    body: JSON.stringify(expense)
  })

  return ServiceUtils.handleResponse(response)
}

// Named 'remove' due to 'delete' being a reserved keyword in JS
export const remove = async (accessToken, expense) => {
  const response = await fetch(expense._links.self.href, {
    method: 'DELETE',
    headers: ServiceUtils.getHeaders(accessToken)
  })
  return ServiceUtils.handleResponse(response)
}
