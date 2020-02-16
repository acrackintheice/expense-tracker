import * as ServiceUtils from './ServiceUtils'
import GoogleService from './GoogleService'

const url = 'http://localhost:8080/expenses/'

const getHeaders = token => ({
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: 'Bearer ' + token
})

export const getAll = async accessToken => {
  const response = await fetch(url, {
    method: 'GET',
    headers: getHeaders(accessToken)
  })
  return ServiceUtils.handleResponse(response)
}

export const getAllByUser = async (userId, accessToken) => {
  const response = await fetch(url + '?user__googleId=' + userId, {
    method: 'GET',
    headers: getHeaders(accessToken)
  })
  return ServiceUtils.handleResponse(response)
}

export const update = async (accessToken, expense) => {
  const response = await fetch(url, {
    method: 'PUT',
    headers: getHeaders(accessToken),
    body: JSON.stringify(expense)
  })
  return ServiceUtils.handleResponse(response)
}

export const create = async expense => {
  const googleInfo = await GoogleService.getGoogleInfo()
  const googleProfile = googleInfo.profile
  expense.user.name = googleProfile.name
  expense.user.email = googleProfile.email
  expense.user.googleId = googleProfile.googleId

  const response = await fetch(url, {
    method: 'POST',
    headers: getHeaders(googleInfo.token.id_token),
    body: JSON.stringify(expense)
  })

  return ServiceUtils.handleResponse(response)
}

// Name 'remove' due to 'delete' being a reserved keyword in JS
export const remove = async (accessToken, expense) => {
  const response = await fetch(expense.url, {
    method: 'DELETE',
    headers: getHeaders(accessToken)
  })
  return ServiceUtils.handleResponse(response)
}
