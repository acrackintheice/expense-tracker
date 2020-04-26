import * as ServiceUtils from './ServiceUtils'

const url = 'http://api.acrackintheice.com/users'

export const getUserByGoogleId = async (googleId, token) => {
  const search = `/search/findByGoogleId?googleId=${googleId}`
  const response = await fetch(url + search, {
    method: 'GET',
    headers: ServiceUtils.getHeaders(token)
  })
  const handledResponse = await ServiceUtils.handleResponse(response)
  const halUser = await handledResponse.json()
  return halUser
}
